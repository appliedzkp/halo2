use crate::plonk::Error;
use halo2_backend::plonk::{
    keygen::{keygen_pk_v2, keygen_vk_v2},
    ProvingKey, VerifyingKey,
};
use halo2_backend::{arithmetic::CurveAffine, poly::commitment::Params};
use halo2_frontend::circuit::compile_circuit;
use halo2_frontend::plonk::Circuit;
use halo2_middleware::ff::FromUniformBytes;

/// Generate a `VerifyingKey` from an instance of `Circuit`.
/// By default, selector compression is turned **ON**.
///
/// **NOTE**: This `keygen_vk` is legacy one, assuming that `compress_selector: true`.
/// Hence, this one MUST be paired with `keygen_pk` util.
/// In addition, when using this for key generation, user MUST use `compress_selectors: true`.
pub fn keygen_vk<'params, C, P, ConcreteCircuit>(
    params: &P,
    circuit: &ConcreteCircuit,
) -> Result<VerifyingKey<C>, Error>
where
    C: CurveAffine,
    P: Params<'params, C>,
    ConcreteCircuit: Circuit<C::Scalar>,
    C::Scalar: FromUniformBytes<64>,
{
    keygen_vk_custom(params, circuit, true)
}

/// Generate a `VerifyingKey` from an instance of `Circuit`.
///
/// The selector compression optimization is turned on only if `compress_selectors` is `true`.
///
/// **NOTE**: This `keygen_vk_custom` MUST share the same `compress_selectors` with `keygen_pk_custom`.
/// Otherwise, the user would get unmatching pk/vk pair.
pub fn keygen_vk_custom<'params, C, P, ConcreteCircuit>(
    params: &P,
    circuit: &ConcreteCircuit,
    compress_selectors: bool,
) -> Result<VerifyingKey<C>, Error>
where
    C: CurveAffine,
    P: Params<'params, C>,
    ConcreteCircuit: Circuit<C::Scalar>,
    C::Scalar: FromUniformBytes<64>,
{
    let (compiled_circuit, _, _) = compile_circuit(params.k(), circuit, compress_selectors)?;
    Ok(keygen_vk_v2(params, &compiled_circuit)?)
}

/// Generate a `ProvingKey` from a `VerifyingKey` and an instance of `Circuit`.
/// By default, selector compression is turned **ON**.
///
/// **NOTE**: This `keygen_pk` is legacy one, assuming that `compress_selector: true`.
/// Hence, this one MUST be paired with `keygen_vk` util.
/// In addition, when using this for key generation, user MUST use `compress_selectors: true`.
pub fn keygen_pk<'params, C, P, ConcreteCircuit>(
    params: &P,
    vk: VerifyingKey<C>,
    circuit: &ConcreteCircuit,
) -> Result<ProvingKey<C>, Error>
where
    C: CurveAffine,
    P: Params<'params, C>,
    ConcreteCircuit: Circuit<C::Scalar>,
{
    keygen_pk_custom(params, vk, circuit, true)
}

/// Generate a `ProvingKey` from an instance of `Circuit`.
///
/// The selector compression optimization is turned on only if `compress_selectors` is `true`.
///
/// **NOTE**: This `keygen_pk_custom` MUST share the same `compress_selectors` with `keygen_vk_custom`.
/// Otherwise, the user would get unmatching pk/vk pair.
pub fn keygen_pk_custom<'params, C, P, ConcreteCircuit>(
    params: &P,
    vk: VerifyingKey<C>,
    circuit: &ConcreteCircuit,
    compress_selectors: bool,
) -> Result<ProvingKey<C>, Error>
where
    C: CurveAffine,
    P: Params<'params, C>,
    ConcreteCircuit: Circuit<C::Scalar>,
{
    let (compiled_circuit, _, _) = compile_circuit(params.k(), circuit, compress_selectors)?;
    Ok(keygen_pk_v2(params, vk, &compiled_circuit)?)
}
