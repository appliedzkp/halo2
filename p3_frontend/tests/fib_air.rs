// The MIT License (MIT)
//
// Copyright (c) 2022 The Plonky3 Authors
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

use std::borrow::Borrow;

use p3_air::{Air, AirBuilder, BaseAir};
use p3_field::PrimeField;
use p3_frontend::AirBuilderWithPublicValues;
use p3_matrix::dense::RowMajorMatrix;
use p3_matrix::MatrixRowSlices;

/// For testing the public values feature

pub struct FibonacciAir {}

impl<F> BaseAir<F> for FibonacciAir {
    fn width(&self) -> usize {
        NUM_FIBONACCI_COLS
    }
}

impl<AB: AirBuilderWithPublicValues> Air<AB> for FibonacciAir {
    fn eval(&self, builder: &mut AB) {
        let main = builder.main();
        let pis = builder.public_values();

        let a = pis[0];
        let b = pis[1];
        let x = pis[2];

        let local: &FibonacciRow<AB::Var> = main.row_slice(0).borrow();
        let next: &FibonacciRow<AB::Var> = main.row_slice(1).borrow();

        let mut when_first_row = builder.when_first_row();

        when_first_row.assert_eq(local.left, a);
        when_first_row.assert_eq(local.right, b);

        let mut when_transition = builder.when_transition();

        // a' <- b
        when_transition.assert_eq(local.right, next.left);

        // b' <- a + b
        when_transition.assert_eq(local.left + local.right, next.right);

        builder.when_last_row().assert_eq(local.right, x);
    }
}

pub fn generate_trace_rows<F: PrimeField>(a: u64, b: u64, n: usize) -> RowMajorMatrix<F> {
    assert!(n.is_power_of_two());

    let mut trace =
        RowMajorMatrix::new(vec![F::zero(); n * NUM_FIBONACCI_COLS], NUM_FIBONACCI_COLS);

    let (prefix, rows, suffix) = unsafe { trace.values.align_to_mut::<FibonacciRow<F>>() };
    assert!(prefix.is_empty(), "Alignment should match");
    assert!(suffix.is_empty(), "Alignment should match");
    assert_eq!(rows.len(), n);

    rows[0] = FibonacciRow::new(F::from_canonical_u64(a), F::from_canonical_u64(b));

    for i in 1..n {
        rows[i].left = rows[i - 1].right;
        rows[i].right = rows[i - 1].left + rows[i - 1].right;
    }

    trace
}

const NUM_FIBONACCI_COLS: usize = 2;

pub struct FibonacciRow<F> {
    pub left: F,
    pub right: F,
}

impl<F> FibonacciRow<F> {
    fn new(left: F, right: F) -> FibonacciRow<F> {
        FibonacciRow { left, right }
    }
}

impl<F> Borrow<FibonacciRow<F>> for [F] {
    fn borrow(&self) -> &FibonacciRow<F> {
        debug_assert_eq!(self.len(), NUM_FIBONACCI_COLS);
        let (prefix, shorts, suffix) = unsafe { self.align_to::<FibonacciRow<F>>() };
        debug_assert!(prefix.is_empty(), "Alignment should match");
        debug_assert!(suffix.is_empty(), "Alignment should match");
        debug_assert_eq!(shorts.len(), 1);
        &shorts[0]
    }
}

use halo2_backend::poly::commitment::ParamsProver;
use halo2_backend::poly::kzg::commitment::{KZGCommitmentScheme, ParamsKZG};
use halo2_backend::poly::kzg::multiopen::{ProverSHPLONK, VerifierSHPLONK};
use halo2_backend::poly::kzg::strategy::SingleStrategy;
use halo2_backend::{
    plonk::{
        keygen::{keygen_pk_v2, keygen_vk_v2},
        prover::ProverV2Single,
        verifier::verify_proof_single,
    },
    transcript::{
        Blake2bRead, Blake2bWrite, Challenge255, TranscriptReadBuffer, TranscriptWriterBuffer,
    },
};
use halo2_middleware::circuit::CompiledCircuitV2;
use halo2curves::bn256::{Bn256, Fr, G1Affine};
use p3_frontend::{
    check_witness, compile_circuit_cs, compile_preprocessing, get_public_inputs, trace_to_wit,
    CompileParams, FWrap,
};
use rand_core::block::BlockRng;
use rand_core::block::BlockRngCore;
use std::time::Instant;

// One number generator, that can be used as a deterministic Rng, outputing fixed values.
struct OneNg {}

impl BlockRngCore for OneNg {
    type Item = u32;
    type Results = [u32; 16];

    fn generate(&mut self, results: &mut Self::Results) {
        for elem in results.iter_mut() {
            *elem = 1;
        }
    }
}

#[test]
fn test_fib() {
    let k = 5;
    let n = 2usize.pow(k);
    // TODO: 6 must be bigger than unusable rows.  Add a helper function to calculate this
    let size = n - 6;
    let air = FibonacciAir {};
    let num_public_values = 3;
    let (cs, preprocessing_info) =
        compile_circuit_cs::<Fr, _>(&air, num_public_values, &CompileParams::default());
    let preprocessing = compile_preprocessing::<Fr, _>(k, size, &preprocessing_info, &air);
    // println!("{:#?}", cs);
    // println!("{:?}", preprocessing);
    let compiled_circuit = CompiledCircuitV2 { cs, preprocessing };
    let trace = generate_trace_rows::<FWrap<Fr>>(0, 1, n);
    let witness = trace_to_wit(k, trace);
    let pis = get_public_inputs(&preprocessing_info, size, &witness);

    check_witness(&compiled_circuit, k, &witness, &[&pis]);
    // println!("{:?}", witness);

    // Setup
    let mut rng = BlockRng::new(OneNg {});
    let params = ParamsKZG::<Bn256>::setup(k, &mut rng);
    let verifier_params = params.verifier_params();
    let start = Instant::now();
    let vk = keygen_vk_v2(&params, &compiled_circuit).expect("keygen_vk should not fail");
    let pk =
        keygen_pk_v2(&params, vk.clone(), &compiled_circuit).expect("keygen_pk should not fail");
    println!("Keygen: {:?}", start.elapsed());
    drop(compiled_circuit);

    // Proving
    println!("Proving...");
    let start = Instant::now();
    let instances_slice: &[&[Fr]] = &[&pis];
    let mut transcript = Blake2bWrite::<_, G1Affine, Challenge255<_>>::init(vec![]);
    let mut prover =
        ProverV2Single::<KZGCommitmentScheme<Bn256>, ProverSHPLONK<'_, Bn256>, _, _, _>::new(
            &params,
            &pk,
            instances_slice,
            &mut rng,
            &mut transcript,
        )
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
    let strategy = SingleStrategy::new(verifier_params);

    verify_proof_single::<KZGCommitmentScheme<Bn256>, VerifierSHPLONK<'_, Bn256>, _, _, _>(
        &params,
        &vk,
        strategy,
        instances_slice,
        &mut verifier_transcript,
    )
    .expect("verify succeeds");
    println!("Verify: {:?}", start.elapsed());
}
