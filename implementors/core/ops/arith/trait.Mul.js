(function() {var implementors = {
"halo2_backend":[["impl&lt;F: <a class=\"trait\" href=\"halo2_backend/arithmetic/trait.Field.html\" title=\"trait halo2_backend::arithmetic::Field\">Field</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/arith/trait.Mul.html\" title=\"trait core::ops::arith::Mul\">Mul</a>&lt;<a class=\"struct\" href=\"halo2_backend/poly/commitment/struct.Blind.html\" title=\"struct halo2_backend::poly::commitment::Blind\">Blind</a>&lt;F&gt;&gt; for <a class=\"struct\" href=\"halo2_backend/poly/commitment/struct.Blind.html\" title=\"struct halo2_backend::poly::commitment::Blind\">Blind</a>&lt;F&gt;"],["impl&lt;F: <a class=\"trait\" href=\"halo2_backend/arithmetic/trait.Field.html\" title=\"trait halo2_backend::arithmetic::Field\">Field</a>, B: <a class=\"trait\" href=\"halo2_backend/poly/trait.Basis.html\" title=\"trait halo2_backend::poly::Basis\">Basis</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/arith/trait.Mul.html\" title=\"trait core::ops::arith::Mul\">Mul</a>&lt;F&gt; for <a class=\"struct\" href=\"halo2_backend/poly/struct.Polynomial.html\" title=\"struct halo2_backend::poly::Polynomial\">Polynomial</a>&lt;F, B&gt;"]],
"halo2_frontend":[["impl&lt;F: Field&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/arith/trait.Mul.html\" title=\"trait core::ops::arith::Mul\">Mul</a>&lt;F&gt; for <a class=\"struct\" href=\"halo2_frontend/circuit/struct.Value.html\" title=\"struct halo2_frontend::circuit::Value\">Value</a>&lt;&amp;<a class=\"enum\" href=\"halo2_frontend/plonk/assigned/enum.Assigned.html\" title=\"enum halo2_frontend::plonk::assigned::Assigned\">Assigned</a>&lt;F&gt;&gt;"],["impl&lt;F: Field&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/arith/trait.Mul.html\" title=\"trait core::ops::arith::Mul\">Mul</a>&lt;F&gt; for <a class=\"struct\" href=\"halo2_frontend/circuit/struct.Value.html\" title=\"struct halo2_frontend::circuit::Value\">Value</a>&lt;<a class=\"enum\" href=\"halo2_frontend/plonk/assigned/enum.Assigned.html\" title=\"enum halo2_frontend::plonk::assigned::Assigned\">Assigned</a>&lt;F&gt;&gt;"],["impl&lt;F: Field&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/arith/trait.Mul.html\" title=\"trait core::ops::arith::Mul\">Mul</a>&lt;F&gt; for <a class=\"enum\" href=\"halo2_frontend/plonk/circuit/expression/enum.Expression.html\" title=\"enum halo2_frontend::plonk::circuit::expression::Expression\">Expression</a>&lt;F&gt;"],["impl&lt;V, O&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/arith/trait.Mul.html\" title=\"trait core::ops::arith::Mul\">Mul</a>&lt;&amp;<a class=\"struct\" href=\"halo2_frontend/circuit/struct.Value.html\" title=\"struct halo2_frontend::circuit::Value\">Value</a>&lt;V&gt;&gt; for <a class=\"struct\" href=\"halo2_frontend/circuit/struct.Value.html\" title=\"struct halo2_frontend::circuit::Value\">Value</a>&lt;V&gt;<span class=\"where fmt-newline\">where\n    for&lt;'v&gt; V: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/arith/trait.Mul.html\" title=\"trait core::ops::arith::Mul\">Mul</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;'v V</a>, Output = O&gt;,</span>"],["impl&lt;F: Field&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/arith/trait.Mul.html\" title=\"trait core::ops::arith::Mul\">Mul</a>&lt;F&gt; for &amp;<a class=\"enum\" href=\"halo2_frontend/plonk/assigned/enum.Assigned.html\" title=\"enum halo2_frontend::plonk::assigned::Assigned\">Assigned</a>&lt;F&gt;"],["impl&lt;V, O&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/arith/trait.Mul.html\" title=\"trait core::ops::arith::Mul\">Mul</a>&lt;<a class=\"struct\" href=\"halo2_frontend/circuit/struct.Value.html\" title=\"struct halo2_frontend::circuit::Value\">Value</a>&lt;V&gt;&gt; for &amp;<a class=\"struct\" href=\"halo2_frontend/circuit/struct.Value.html\" title=\"struct halo2_frontend::circuit::Value\">Value</a>&lt;V&gt;<span class=\"where fmt-newline\">where\n    for&lt;'v&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;'v V</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/arith/trait.Mul.html\" title=\"trait core::ops::arith::Mul\">Mul</a>&lt;V, Output = O&gt;,</span>"],["impl&lt;V, O&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/arith/trait.Mul.html\" title=\"trait core::ops::arith::Mul\">Mul</a>&lt;<a class=\"struct\" href=\"halo2_frontend/circuit/struct.Value.html\" title=\"struct halo2_frontend::circuit::Value\">Value</a>&lt;V&gt;&gt; for <a class=\"struct\" href=\"halo2_frontend/circuit/struct.Value.html\" title=\"struct halo2_frontend::circuit::Value\">Value</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;V</a>&gt;<span class=\"where fmt-newline\">where\n    for&lt;'v&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;'v V</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/arith/trait.Mul.html\" title=\"trait core::ops::arith::Mul\">Mul</a>&lt;V, Output = O&gt;,</span>"],["impl&lt;F: Field&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/arith/trait.Mul.html\" title=\"trait core::ops::arith::Mul\">Mul</a>&lt;<a class=\"enum\" href=\"halo2_frontend/plonk/circuit/expression/enum.Expression.html\" title=\"enum halo2_frontend::plonk::circuit::expression::Expression\">Expression</a>&lt;F&gt;&gt; for <a class=\"enum\" href=\"halo2_frontend/plonk/circuit/expression/enum.Expression.html\" title=\"enum halo2_frontend::plonk::circuit::expression::Expression\">Expression</a>&lt;F&gt;"],["impl&lt;F: Field&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/arith/trait.Mul.html\" title=\"trait core::ops::arith::Mul\">Mul</a>&lt;<a class=\"struct\" href=\"halo2_frontend/circuit/struct.Value.html\" title=\"struct halo2_frontend::circuit::Value\">Value</a>&lt;F&gt;&gt; for <a class=\"struct\" href=\"halo2_frontend/circuit/struct.Value.html\" title=\"struct halo2_frontend::circuit::Value\">Value</a>&lt;&amp;<a class=\"enum\" href=\"halo2_frontend/plonk/assigned/enum.Assigned.html\" title=\"enum halo2_frontend::plonk::assigned::Assigned\">Assigned</a>&lt;F&gt;&gt;"],["impl&lt;F: Field&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/arith/trait.Mul.html\" title=\"trait core::ops::arith::Mul\">Mul</a>&lt;<a class=\"enum\" href=\"halo2_frontend/plonk/assigned/enum.Assigned.html\" title=\"enum halo2_frontend::plonk::assigned::Assigned\">Assigned</a>&lt;F&gt;&gt; for <a class=\"enum\" href=\"halo2_frontend/plonk/assigned/enum.Assigned.html\" title=\"enum halo2_frontend::plonk::assigned::Assigned\">Assigned</a>&lt;F&gt;"],["impl&lt;V, O&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/arith/trait.Mul.html\" title=\"trait core::ops::arith::Mul\">Mul</a>&lt;&amp;<a class=\"struct\" href=\"halo2_frontend/circuit/struct.Value.html\" title=\"struct halo2_frontend::circuit::Value\">Value</a>&lt;V&gt;&gt; for &amp;<a class=\"struct\" href=\"halo2_frontend/circuit/struct.Value.html\" title=\"struct halo2_frontend::circuit::Value\">Value</a>&lt;V&gt;<span class=\"where fmt-newline\">where\n    for&lt;'v&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;'v V</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/arith/trait.Mul.html\" title=\"trait core::ops::arith::Mul\">Mul</a>&lt;Output = O&gt;,</span>"],["impl&lt;F: Field&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/arith/trait.Mul.html\" title=\"trait core::ops::arith::Mul\">Mul</a>&lt;F&gt; for <a class=\"enum\" href=\"halo2_frontend/plonk/assigned/enum.Assigned.html\" title=\"enum halo2_frontend::plonk::assigned::Assigned\">Assigned</a>&lt;F&gt;"],["impl&lt;F: Field&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/arith/trait.Mul.html\" title=\"trait core::ops::arith::Mul\">Mul</a>&lt;<a class=\"struct\" href=\"halo2_frontend/circuit/struct.Value.html\" title=\"struct halo2_frontend::circuit::Value\">Value</a>&lt;F&gt;&gt; for <a class=\"struct\" href=\"halo2_frontend/circuit/struct.Value.html\" title=\"struct halo2_frontend::circuit::Value\">Value</a>&lt;<a class=\"enum\" href=\"halo2_frontend/plonk/assigned/enum.Assigned.html\" title=\"enum halo2_frontend::plonk::assigned::Assigned\">Assigned</a>&lt;F&gt;&gt;"],["impl&lt;F: Field&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/arith/trait.Mul.html\" title=\"trait core::ops::arith::Mul\">Mul</a>&lt;&amp;<a class=\"enum\" href=\"halo2_frontend/plonk/assigned/enum.Assigned.html\" title=\"enum halo2_frontend::plonk::assigned::Assigned\">Assigned</a>&lt;F&gt;&gt; for <a class=\"enum\" href=\"halo2_frontend/plonk/assigned/enum.Assigned.html\" title=\"enum halo2_frontend::plonk::assigned::Assigned\">Assigned</a>&lt;F&gt;"],["impl&lt;V, O&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/arith/trait.Mul.html\" title=\"trait core::ops::arith::Mul\">Mul</a>&lt;<a class=\"struct\" href=\"halo2_frontend/circuit/struct.Value.html\" title=\"struct halo2_frontend::circuit::Value\">Value</a>&lt;V&gt;&gt; for <a class=\"struct\" href=\"halo2_frontend/circuit/struct.Value.html\" title=\"struct halo2_frontend::circuit::Value\">Value</a>&lt;V&gt;<span class=\"where fmt-newline\">where\n    V: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/arith/trait.Mul.html\" title=\"trait core::ops::arith::Mul\">Mul</a>&lt;Output = O&gt;,</span>"],["impl&lt;V, O&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/arith/trait.Mul.html\" title=\"trait core::ops::arith::Mul\">Mul</a>&lt;<a class=\"struct\" href=\"halo2_frontend/circuit/struct.Value.html\" title=\"struct halo2_frontend::circuit::Value\">Value</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;V</a>&gt;&gt; for <a class=\"struct\" href=\"halo2_frontend/circuit/struct.Value.html\" title=\"struct halo2_frontend::circuit::Value\">Value</a>&lt;V&gt;<span class=\"where fmt-newline\">where\n    for&lt;'v&gt; V: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/arith/trait.Mul.html\" title=\"trait core::ops::arith::Mul\">Mul</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.reference.html\">&amp;'v V</a>, Output = O&gt;,</span>"]],
"halo2_middleware":[["impl&lt;F: Field, V: <a class=\"trait\" href=\"halo2_middleware/expression/trait.Variable.html\" title=\"trait halo2_middleware::expression::Variable\">Variable</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/arith/trait.Mul.html\" title=\"trait core::ops::arith::Mul\">Mul</a>&lt;F&gt; for <a class=\"enum\" href=\"halo2_middleware/expression/enum.Expression.html\" title=\"enum halo2_middleware::expression::Expression\">Expression</a>&lt;F, V&gt;"],["impl&lt;F: Field, V: <a class=\"trait\" href=\"halo2_middleware/expression/trait.Variable.html\" title=\"trait halo2_middleware::expression::Variable\">Variable</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/arith/trait.Mul.html\" title=\"trait core::ops::arith::Mul\">Mul</a>&lt;<a class=\"enum\" href=\"halo2_middleware/expression/enum.Expression.html\" title=\"enum halo2_middleware::expression::Expression\">Expression</a>&lt;F, V&gt;&gt; for <a class=\"enum\" href=\"halo2_middleware/expression/enum.Expression.html\" title=\"enum halo2_middleware::expression::Expression\">Expression</a>&lt;F, V&gt;"]]
};if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()