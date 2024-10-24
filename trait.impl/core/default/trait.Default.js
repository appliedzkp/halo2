(function() {var implementors = {
"halo2_backend":[["impl&lt;C: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a> + <a class=\"trait\" href=\"halo2_backend/arithmetic/trait.CurveAffine.html\" title=\"trait halo2_backend::arithmetic::CurveAffine\">CurveAffine</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a> for <a class=\"struct\" href=\"halo2_backend/plonk/verifier/struct.BatchVerifier.html\" title=\"struct halo2_backend::plonk::verifier::BatchVerifier\">BatchVerifier</a>&lt;C&gt;"],["impl&lt;E: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a> + Engine&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a> for <a class=\"struct\" href=\"halo2_backend/poly/kzg/msm/struct.DualMSM.html\" title=\"struct halo2_backend::poly::kzg::msm::DualMSM\">DualMSM</a>&lt;E&gt;<div class=\"where\">where\n    E::G1Affine: <a class=\"trait\" href=\"halo2_backend/arithmetic/trait.CurveAffine.html\" title=\"trait halo2_backend::arithmetic::CurveAffine\">CurveAffine</a>&lt;ScalarExt = &lt;E as Engine&gt;::Fr, CurveExt = &lt;E as Engine&gt;::G1&gt;,\n    E::G1: <a class=\"trait\" href=\"halo2_backend/arithmetic/trait.CurveExt.html\" title=\"trait halo2_backend::arithmetic::CurveExt\">CurveExt</a>&lt;AffineExt = E::G1Affine&gt;,</div>"],["impl&lt;E: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a> + Engine&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a> for <a class=\"struct\" href=\"halo2_backend/poly/kzg/msm/struct.MSMKZG.html\" title=\"struct halo2_backend::poly::kzg::msm::MSMKZG\">MSMKZG</a>&lt;E&gt;<div class=\"where\">where\n    E::G1Affine: <a class=\"trait\" href=\"halo2_backend/arithmetic/trait.CurveAffine.html\" title=\"trait halo2_backend::arithmetic::CurveAffine\">CurveAffine</a>&lt;ScalarExt = &lt;E as Engine&gt;::Fr, CurveExt = &lt;E as Engine&gt;::G1&gt;,\n    E::G1: <a class=\"trait\" href=\"halo2_backend/arithmetic/trait.CurveExt.html\" title=\"trait halo2_backend::arithmetic::CurveExt\">CurveExt</a>&lt;AffineExt = E::G1Affine&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a>,\n    E::Fr: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a>,</div>"],["impl&lt;F: <a class=\"trait\" href=\"halo2_backend/arithmetic/trait.Field.html\" title=\"trait halo2_backend::arithmetic::Field\">Field</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a> for <a class=\"struct\" href=\"halo2_backend/poly/commitment/struct.Blind.html\" title=\"struct halo2_backend::poly::commitment::Blind\">Blind</a>&lt;F&gt;"]],
"halo2_frontend":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a> for <a class=\"struct\" href=\"halo2_frontend/dev/struct.CircuitLayout.html\" title=\"struct halo2_frontend::dev::CircuitLayout\">CircuitLayout</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a> for <a class=\"struct\" href=\"halo2_frontend/plonk/permutation/struct.Argument.html\" title=\"struct halo2_frontend::plonk::permutation::Argument\">Argument</a>"],["impl&lt;F: Field&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a> for <a class=\"struct\" href=\"halo2_frontend/plonk/circuit/constraint_system/struct.ConstraintSystem.html\" title=\"struct halo2_frontend::plonk::circuit::constraint_system::ConstraintSystem\">ConstraintSystem</a>&lt;F&gt;"],["impl&lt;V&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a> for <a class=\"struct\" href=\"halo2_frontend/circuit/struct.Value.html\" title=\"struct halo2_frontend::circuit::Value\">Value</a>&lt;V&gt;"]],
"halo2_middleware":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a> for <a class=\"struct\" href=\"halo2_middleware/zal/impls/struct.H2cEngine.html\" title=\"struct halo2_middleware::zal::impls::H2cEngine\">H2cEngine</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a> for <a class=\"struct\" href=\"halo2_middleware/zal/impls/struct.NoCurve.html\" title=\"struct halo2_middleware::zal::impls::NoCurve\">NoCurve</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a> for <a class=\"struct\" href=\"halo2_middleware/zal/impls/struct.NoMsmEngine.html\" title=\"struct halo2_middleware::zal::impls::NoMsmEngine\">NoMsmEngine</a>"],["impl&lt;C: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a> + CurveAffine&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a> for <a class=\"struct\" href=\"halo2_middleware/zal/impls/struct.HasCurve.html\" title=\"struct halo2_middleware::zal::impls::HasCurve\">HasCurve</a>&lt;C&gt;"],["impl&lt;C: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a>, M: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a> for <a class=\"struct\" href=\"halo2_middleware/zal/impls/struct.PlonkEngineConfig.html\" title=\"struct halo2_middleware::zal::impls::PlonkEngineConfig\">PlonkEngineConfig</a>&lt;C, M&gt;"]],
"p3_frontend":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a> for <a class=\"struct\" href=\"p3_frontend/struct.CompileParams.html\" title=\"struct p3_frontend::CompileParams\">CompileParams</a>"],["impl&lt;F: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a> + Field&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a> for <a class=\"struct\" href=\"p3_frontend/struct.FWrap.html\" title=\"struct p3_frontend::FWrap\">FWrap</a>&lt;F&gt;"],["impl&lt;F: Field&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a> for <a class=\"enum\" href=\"p3_frontend/enum.SymbolicExpression.html\" title=\"enum p3_frontend::SymbolicExpression\">SymbolicExpression</a>&lt;F&gt;"]]
};if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()