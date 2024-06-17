use crate::plonk::{Error, ErrorBack};
use crate::poly::commitment::{self, CommitmentScheme, Params};
use crate::transcript::{EncodedChallenge, TranscriptWrite};
use halo2_backend::plonk::{prover::Prover, ProvingKey};
use halo2_frontend::circuit::WitnessCalculator;
use halo2_frontend::plonk::{Circuit, ConstraintSystem, FieldFr};
use halo2_middleware::ff::{FromUniformBytes, WithSmallOrderMulGroup};
use halo2_middleware::zal::{
    impls::{PlonkEngine, PlonkEngineConfig},
    traits::MsmAccel,
};
use rand_core::RngCore;
use std::collections::HashMap;

/// This creates a proof for the provided `circuit` when given the public
/// parameters `params` and the proving key [`ProvingKey`] that was
/// generated previously for the same circuit. The provided `instances`
/// are zero-padded internally.
pub fn create_proof_with_engine<
    'params,
    Scheme: CommitmentScheme,
    P: commitment::Prover<'params, Scheme>,
    E: EncodedChallenge<Scheme::Curve>,
    R: RngCore,
    T: TranscriptWrite<Scheme::Curve, E>,
    ConcreteCircuit: Circuit<EF>,
    M: MsmAccel<Scheme::Curve>,
    EF: FieldFr<Field = Scheme::Scalar>,
>(
    engine: PlonkEngine<Scheme::Curve, M>,
    params: &'params Scheme::ParamsProver,
    pk: &ProvingKey<Scheme::Curve>,
    circuits: &[ConcreteCircuit],
    instances: &[Vec<Vec<EF>>],
    rng: R,
    transcript: &mut T,
) -> Result<(), Error>
where
    Scheme::Scalar: WithSmallOrderMulGroup<3> + FromUniformBytes<64>,
{
    if circuits.len() != instances.len() {
        return Err(Error::Backend(ErrorBack::InvalidInstances));
    }

    let mut cs = ConstraintSystem::default();
    #[cfg(feature = "circuit-params")]
    let config = ConcreteCircuit::configure_with_params(&mut cs, circuits[0].params());
    #[cfg(not(feature = "circuit-params"))]
    let config = ConcreteCircuit::configure(&mut cs);
    let cs = cs;

    let mut witness_calcs: Vec<_> = circuits
        .iter()
        .enumerate()
        .map(|(i, circuit)| {
            WitnessCalculator::new(params.k(), circuit, &config, &cs, instances[i].as_slice())
        })
        .collect();

    let instances: Vec<Vec<Vec<Scheme::Scalar>>> = instances
        .iter()
        .map(|v| {
            v.into_iter()
                .map(|v| v.into_iter().map(|f| f.into_field()).collect())
                .collect()
        })
        .collect();

    let mut prover = Prover::<Scheme, P, _, _, _, _>::new_with_engine(
        engine, params, pk, &instances, rng, transcript,
    )?;
    let mut challenges = HashMap::new();
    let phases = prover.phases().to_vec();
    for phase in phases.iter() {
        let mut witnesses = Vec::with_capacity(circuits.len());
        for witness_calc in witness_calcs.iter_mut() {
            witnesses.push(witness_calc.calc(*phase, &challenges)?);
        }

        let witnesses: Vec<Vec<Option<Vec<Scheme::Scalar>>>> = witnesses
            .iter()
            .map(|v| {
                v.into_iter()
                    .map(|v| v.as_ref().map(|v| v.into_iter().map(|f| f.into_field()).collect()))
                    .collect()
            })
            .collect();

        challenges = prover.commit_phase(*phase, witnesses).unwrap().into_iter().map(|(k, v)| (k, EF::into_field_fr(v))).collect();
    }
    Ok(prover.create_proof()?)
}

/// This creates a proof for the provided `circuit` when given the public
/// parameters `params` and the proving key [`ProvingKey`] that was
/// generated previously for the same circuit. The provided `instances`
/// are zero-padded internally.
pub fn create_proof<
    'params,
    Scheme: CommitmentScheme,
    P: commitment::Prover<'params, Scheme>,
    E: EncodedChallenge<Scheme::Curve>,
    R: RngCore,
    T: TranscriptWrite<Scheme::Curve, E>,
    ConcreteCircuit: Circuit<EF>,
    EF: FieldFr<Field = Scheme::Scalar>,
>(
    params: &'params Scheme::ParamsProver,
    pk: &ProvingKey<Scheme::Curve>,
    circuits: &[ConcreteCircuit],
    instances: &[Vec<Vec<EF>>],
    rng: R,
    transcript: &mut T,
) -> Result<(), Error>
where
    Scheme::Scalar: WithSmallOrderMulGroup<3> + FromUniformBytes<64>,
{
    let engine = PlonkEngineConfig::build_default();

    create_proof_with_engine::<Scheme, P, _, _, _, _, _, _>(
        engine, params, pk, circuits, &instances, rng, transcript,
    )
}

#[cfg(test)]
mod test {
    use crate::plonk::Error;
    use halo2_frontend::plonk::{Circuit, FieldFr};
    use super::*;

    #[test]
    fn test_create_proof() {
        use crate::{
            circuit::SimpleFloorPlanner,
            plonk::{keygen_pk, keygen_vk, ConstraintSystem, ErrorFront},
            poly::kzg::{
                commitment::{KZGCommitmentScheme, ParamsKZG},
                multiopen::ProverSHPLONK,
            },
            transcript::{Blake2bWrite, Challenge255, TranscriptWriterBuffer},
        };
        use halo2_middleware::ff::Field;
        use halo2curves::bn256::Bn256;
        use rand_core::OsRng;

        #[derive(Clone, Copy)]
        struct MyCircuit;

        impl<F: FieldFr> Circuit<F> for MyCircuit {
            type Config = ();
            type FloorPlanner = SimpleFloorPlanner;
            #[cfg(feature = "circuit-params")]
            type Params = ();

            fn without_witnesses(&self) -> Self {
                *self
            }

            fn configure(_meta: &mut ConstraintSystem<F>) -> Self::Config {}

            fn synthesize(
                &self,
                _config: Self::Config,
                _layouter: impl crate::circuit::Layouter<F>,
            ) -> Result<(), ErrorFront> {
                Ok(())
            }
        }

        let params: ParamsKZG<Bn256> = ParamsKZG::setup(3, OsRng);
        let vk = keygen_vk::<_, _, _,halo2curves::bn256::Fr>(&params, &MyCircuit).expect("keygen_vk should not fail");
        let pk = keygen_pk::<_,_,_,halo2curves::bn256::Fr>(&params, vk, &MyCircuit).expect("keygen_pk should not fail");
        let mut transcript = Blake2bWrite::<_, _, Challenge255<_>>::init(vec![]);

        // Create proof with wrong number of instances
        let proof = create_proof::<KZGCommitmentScheme<_>, ProverSHPLONK<_>,_, _, _, _, halo2curves::bn256::Fr>(
            &params,
            &pk,
            &[MyCircuit, MyCircuit],
            &[],
            OsRng,
            &mut transcript,
        );
        assert!(matches!(
            proof.unwrap_err(),
            Error::Backend(ErrorBack::InvalidInstances)
        ));

        // Create proof with correct number of instances
        create_proof::<KZGCommitmentScheme<_>, ProverSHPLONK<_>, _, _,_, _, halo2curves::bn256::Fr>(
            &params,
            &pk,
            &[MyCircuit, MyCircuit],
            &[vec![], vec![]],
            OsRng,
            &mut transcript,
        )
        .expect("proof generation should not fail");
    }

    #[cfg(test)]
    #[test]
    fn test_create_proof_custom() {
        use crate::{
            circuit::SimpleFloorPlanner,
            plonk::{keygen_pk_custom, keygen_vk_custom, ConstraintSystem, ErrorFront},
            poly::kzg::{
                commitment::{KZGCommitmentScheme, ParamsKZG},
                multiopen::ProverSHPLONK,
            },
            transcript::{Blake2bWrite, Challenge255, TranscriptWriterBuffer},
        };
        use halo2_frontend::plonk::FieldFr;
        use halo2_middleware::ff::Field;
        use halo2curves::bn256::Bn256;
        use rand_core::OsRng;

        #[derive(Clone, Copy)]
        struct MyCircuit;

        impl<F: FieldFr> Circuit<F> for MyCircuit {
            type Config = ();
            type FloorPlanner = SimpleFloorPlanner;
            #[cfg(feature = "circuit-params")]
            type Params = ();

            fn without_witnesses(&self) -> Self {
                *self
            }

            fn configure(_meta: &mut ConstraintSystem<F>) -> Self::Config {}

            fn synthesize(
                &self,
                _config: Self::Config,
                _layouter: impl crate::circuit::Layouter<F>,
            ) -> Result<(), ErrorFront> {
                Ok(())
            }
        }

        let params: ParamsKZG<Bn256> = ParamsKZG::setup(3, OsRng);
        let compress_selectors = true;
        let vk = keygen_vk_custom::<_,_,_,halo2curves::bn256::Fr>(&params, &MyCircuit, compress_selectors)
            .expect("keygen_vk_custom should not fail");
        let pk = keygen_pk_custom::<_,_,_,halo2curves::bn256::Fr>(&params, vk, &MyCircuit, compress_selectors)
            .expect("keygen_pk_custom should not fail");
        let mut transcript = Blake2bWrite::<_, _, Challenge255<_>>::init(vec![]);
        let engine = PlonkEngineConfig::build_default();

        create_proof_with_engine::<KZGCommitmentScheme<_>, ProverSHPLONK<_>,_,_,  _, _, _, halo2curves::bn256::Fr>(
            engine,
            &params,
            &pk,
            &[MyCircuit, MyCircuit],
            &[vec![], vec![]],
            OsRng,
            &mut transcript,
        )
        .expect("proof generation should not fail");
    }
}