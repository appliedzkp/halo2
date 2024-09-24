use halo2_backend::poly::kzg::commitment::{KZGCommitmentScheme, ParamsKZG};
use halo2_backend::poly::kzg::multiopen::{ProverSHPLONK, VerifierSHPLONK};
use halo2_backend::poly::kzg::strategy::SingleStrategy;
use halo2_backend::{
    plonk::{
        keygen::{keygen_pk, keygen_vk},
        prover::Prover,
        verifier::verify_proof,
    },
    transcript::{
        Blake2bRead, Blake2bWrite, Challenge255, TranscriptReadBuffer, TranscriptWriterBuffer,
    },
};
use halo2_debug::check_witness;
use halo2_debug::test_rng;
use halo2_middleware::circuit::CompiledCircuit;
use halo2_middleware::zal::impls::H2cEngine;
use halo2curves::bn256::{Bn256, Fr, G1Affine};
use p3_air::Air;
use p3_frontend::{
    compile_circuit_cs, compile_preprocessing, get_public_inputs, trace_to_wit, CompileParams,
    FWrap, SymbolicAirBuilder,
};
use p3_matrix::dense::RowMajorMatrix;
use std::time::Instant;

#[allow(clippy::type_complexity)]
pub(crate) fn compile_witgen<A>(
    air: A,
    params: &CompileParams,
    k: u32,
    size: usize,
    num_public_values: usize,
    trace: RowMajorMatrix<FWrap<Fr>>,
) -> (CompiledCircuit<Fr>, Vec<Option<Vec<Fr>>>, Vec<Vec<Fr>>)
where
    A: Air<SymbolicAirBuilder<FWrap<Fr>>>,
{
    let n = 2usize.pow(k);
    println!("k = {k}");
    println!("n = {n}");
    println!("size = {size}");
    println!("columns = {}", A::width(&air));
    let (cs, preprocessing_info) = compile_circuit_cs::<Fr, _>(&air, params, num_public_values);
    println!(
        "degree = {}",
        cs.gates.iter().map(|g| g.poly.degree()).max().unwrap()
    );
    let preprocessing = compile_preprocessing::<Fr, _>(k, size, &preprocessing_info, &air);
    let compiled_circuit = CompiledCircuit { cs, preprocessing };
    let witness = trace_to_wit(k, trace);
    let pis = get_public_inputs(&preprocessing_info, size, &witness);

    check_witness(&compiled_circuit, k, 5, &witness, &pis);
    (
        compiled_circuit,
        witness.into_iter().map(Some).collect(),
        pis,
    )
}

pub(crate) fn setup_prove_verify(
    compiled_circuit: &CompiledCircuit<Fr>,
    k: u32,
    pis: &[Vec<Fr>],
    witness: Vec<Option<Vec<Fr>>>,
) {
    // Setup
    let mut rng = test_rng();
    let params = ParamsKZG::<Bn256>::setup(k, &mut rng);
    let verifier_params = params.verifier_params();
    let start = Instant::now();
    let vk = keygen_vk(&params, compiled_circuit).expect("keygen_vk should not fail");
    let pk = keygen_pk(&params, vk.clone(), compiled_circuit).expect("keygen_pk should not fail");
    println!("Keygen: {:?}", start.elapsed());

    // Proving
    println!("Proving...");
    let start = Instant::now();
    let mut transcript = Blake2bWrite::<_, G1Affine, Challenge255<_>>::init(vec![]);
    let mut prover = Prover::<
        KZGCommitmentScheme<Bn256>,
        ProverSHPLONK<'_, Bn256>,
        _,
        _,
        _,
        H2cEngine,
    >::new(&params, &pk, pis.to_vec(), &mut rng, &mut transcript)
    .unwrap();
    println!("phase 0");
    prover.commit_phase(0, witness).unwrap();
    prover.create_proof().unwrap();
    let proof = transcript.finalize();
    println!("Prove: {:?}", start.elapsed());

    // Verify
    let start = Instant::now();
    println!("Verifying...");
    let mut verifier_transcript =
        Blake2bRead::<_, G1Affine, Challenge255<_>>::init(proof.as_slice());

    assert!(
        verify_proof::<KZGCommitmentScheme<Bn256>, VerifierSHPLONK<Bn256>, _, _, SingleStrategy<_>>(
            &verifier_params,
            &vk,
            pis.to_vec(),
            &mut verifier_transcript,
        ),
        "failed to verify proof"
    );
    println!("Verify: {:?}", start.elapsed());
}
