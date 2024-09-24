searchState.loadedDescShard("halo2_proofs", 0, "Legacy halo2 API that wraps the frontend-backend split …\nCurve elements are serialized in compressed form. Field …\nCurve elements are serialized in uncompressed form. Field …\nSerialization is the same as <code>RawBytes</code>, but no checks are …\nThis enum specifies how various types are serialized and …\nThis module provides common utilities, traits and …\nTraits and structs for implementing circuit components.\nTools for developing circuits.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nThis module provides an implementation of a variant of …\nContains utilities for performing arithmetic over …\nThis module contains utilities and traits for dealing with …\nThe affine version of the curve\nThe base field over which this elliptic curve is …\nThe base field over which this elliptic curve is …\nCURVE_ID used for hash-to-curve.\nThis trait is the affine counterpart to <code>Curve</code> and is used …\nThis trait is a common interface for dealing with elements …\nThe projective form of the curve\nThis trait represents an element of a field.\nThe one element of the field, the multiplicative identity.\nThe scalar field of this elliptic curve.\nThe scalar field of this elliptic curve.\nThe zero element of the field, the additive identity.\nReturns the curve constant a.\nReturns the curve constant $a$.\nReturns the curve constant b.\nReturns the curve constant $b$.\nGets the coordinates of this point.\nCubes this element.\nDoubles this element.\nApply the curve endomorphism by multiplying the …\nObtains a point given $(x, y)$, failing if it is not on the\nRequests a hasher that accepts messages and returns …\nComputes the multiplicative inverse of this element, …\nReturns whether or not this element is on the curve; should\nReturns whether or not this element is on the curve; should\nReturns true iff this element is zero.\nReturns true iff this element is zero.\nReturn the Jacobian coordinates of this point.\nObtains a point given Jacobian coordinates $X : Y : Z$, …\nThis utility function will parallelize an operation that …\nExponentiates <code>self</code> by <code>exp</code>, where <code>exp</code> is a little-endian …\nExponentiates <code>self</code> by <code>exp</code>, where <code>exp</code> is a little-endian …\nReturns an element chosen uniformly at random using a …\nReturns the square root of the field element, if it is …\nEquivalent to <code>Self::sqrt_ratio(self, one())</code>.\nComputes:\nSquares this element.\nAn assigned cell.\nA pointer to a cell within a circuit.\nA chip implements a set of instructions that can be used …\nA type that holds the configuration for this chip, and any …\nA layout strategy within a circuit. The layouter is …\nA type that holds any general chip state that needs to be …\nThis is a “namespaced” layouter which borrows a …\nA region of the circuit in which a <code>Chip</code> can assign cells.\nIndex of a region in a layouter\nRepresents the type of the “root” of this layouter, so …\nA simple <code>FloorPlanner</code> that performs minimal optimizations.\nA lookup table in the circuit.\nA value that might exist within a circuit.\nReturns <code>Value::unknown()</code> if the value is <code>Value::unknown()</code>, …\nConverts from <code>&amp;mut Value&lt;V&gt;</code> to <code>Value&lt;&amp;mut V&gt;</code>.\nConverts from <code>&amp;Value&lt;V&gt;</code> to <code>Value&lt;&amp;V&gt;</code>.\nEnforces an assertion on the contained value, if known.\nObtains the inner value for assigning into the circuit.\nAssign an advice column value (witness).\nAssigns a constant value to the column <code>advice</code> at <code>offset</code> …\nAssign the value of the instance column’s cell at …\nAssigns a fixed value to a table cell.\nAssign a fixed value.\nAssign a region of gates to an absolute row number.\nAssign a table region to an absolute row number.\nReturns the cell.\nMaps a <code>Value&lt;&amp;V&gt;</code> to a <code>Value&lt;V&gt;</code> by cloning the contents of …\nMaps a <code>Value&lt;&amp;mut V&gt;</code> to a <code>Value&lt;V&gt;</code> by cloning the contents …\nThe column of this cell.\nThe chip holds its own configuration.\nConstrains a cell to have a constant value.\nConstrains two cells to have the same value.\nConstrains a <code>Cell</code> to equal an instance column’s row …\nMaps a <code>Value&lt;&amp;V&gt;</code> to a <code>Value&lt;V&gt;</code> by copying the contents of …\nMaps a <code>Value&lt;&amp;mut V&gt;</code> to a <code>Value&lt;V&gt;</code> by copying the contents …\nCopies the value to a given advice cell and constrains …\nCubes this field element.\nDoubles this field element.\nEnables a selector at the given offset.\nChecks the contained value for an error condition, if …\nEvaluates this value directly, performing an unbatched …\nEvaluates this assigned cell’s value directly, …\nImplementations of common circuit floor planners.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nTakes each element in the <code>Iterator</code>: if it is …\nQueries the value of the given challenge.\nGets the “root” of this assignment, bypassing the …\nReturns the value of the instance column’s cell at …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns the field element corresponding to this value.\nInverts this assigned value (taking the inverse of zero to …\nConstructs a known value.\nProvides access to general chip state loaded at the …\nMaps a <code>Value&lt;V&gt;</code> to <code>Value&lt;W&gt;</code> by applying a function to the …\nAllows the circuit implementor to name/annotate a Column …\nEnters into a namespace.\nExits out of the existing namespace.\nCreates a new (sub)namespace and enters into it.\nIdentifies the region in which this cell resides.\nThe relative offset of this cell within its region.\nSquares this field element.\nReturns the field element corresponding to this value.\nTransposes a <code>Value&lt;[V; LEN]&gt;</code> into a <code>[Value&lt;V&gt;; LEN]</code>.\nTransposes a <code>Value&lt;impl IntoIterator&lt;Item = V&gt;&gt;</code> into a …\nConstructs an unwitnessed value.\nUnzips a value containing a tuple of two values.\nReturns the value of the <code>AssignedCell</code>.\nReturns the field element value of the <code>AssignedCell</code>.\nZips <code>self</code> with another <code>Value</code>.\nThe version 1 <code>FloorPlanner</code> provided by <code>halo2</code>.\nA single pass of the <code>V1</code> layouter.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nA simple <code>FloorPlanner</code> that performs minimal optimizations.\nA <code>Layouter</code> for a single-chip circuit.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCreates a new single-chip layouter.\nAssigns the circuit.\nMeasures the circuit.\nThe version 1 <code>FloorPlanner</code> provided by <code>halo2</code>.\nA single pass of the <code>V1</code> layouter.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nA cell that has been assigned a value.\nAssigned instance value\nA cell used in an active gate was not assigned to.\nThe value of a particular cell within the circuit.\nGraphical renderer for circuit layouts.\nA constraint was not satisfied for a particular row.\nA constraint was active on an unusable row, and is likely …\nThe location within the circuit at which a particular …\nA location inside a region.\nAn instance cell used in an active gate was not assigned …\nInstance Value\nA lookup input did not exist in its corresponding table.\nA test prover for debugging circuits.\nA location outside of a region.\nPadding\nA permutation did not preserve the original value of a …\nA unique poisoned cell.\nA shuffle input did not exist in its corresponding map.\nAn unassigned cell.\nThe reasons why a particular circuit is not satisfied.\nReturns the list of Advice Columns used within a …\nReturn the content of an advice column as mutable\nReturn the content of an advice column as assigned by the …\nPanics if the circuit being checked by this <code>MockProver</code> is …\nPanics if the circuit being checked by this <code>MockProver</code> is …\nBuilds a dot graph string representing the given circuit.\nThe cost estimator takes high-level parameters for a …\nReturns the constraint system\nEmits this failure in pretty-printed format to stderr.\nReturns the list of Fixed Columns used within a MockProver …\nReturn the content of a fixed column as assigned by the …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the list of Instance Columns used within a …\nReturn the content of an instance column as mutable\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nMarks cells involved in equality constraints, in red.\nMetadata about circuits.\nRenders the given circuit on the given drawing area.\nRuns a synthetic keygen-and-prove operation on the given …\nReturns the list of Selector Columns used within a …\nDraws red lines between equality-constrained cells.\nSets the visibility of region labels.\nReturns the usable rows\nField value on the instance cell\nReturns <code>Ok(())</code> if this <code>MockProver</code> is satisfied, or a list …\nReturns <code>Ok(())</code> if this <code>MockProver</code> is satisfied, or a list …\nSets the view height for this layout, as a number of rows.\nSets the view width for this layout, as a number of …\nThe offset (relative to the start of the region) at which …\nThe region in which the failure occurred.\nThe circuit row on which the failure occurred.\nThe values of the virtual cells used by this constraint.\nThe column in which this cell should be assigned.\nThe column in which this cell should be assigned.\nThe column in which this permutation is not satisfied.\nThe polynomial constraint that is not satisfied.\nThe polynomial constraint that is not satisfied.\nThe index of the active gate.\nThe index of the active gate.\nThe offset (relative to the start of the region) at which …\nThe offset (relative to the start of the region) at which …\nThe location at which this constraint is not satisfied.\nThe location at which the lookup is not satisfied.\nThe location at which the lookup is not satisfied.\nThe location at which the permutation is not satisfied.\nThe index of the lookup that is not satisfied. These …\nThe name of the lookup that is not satisfied.\nThe name of the lookup that is not satisfied.\nThe offset (relative to the start of the region) at which …\nThe region in which this cell should be assigned.\nThe region in which this gate was activated.\nThe absolute row at which this cell should be assigned.\nThe index of the lookup that is not satisfied. These …\nSupported commitment schemes\nOptions to build a circuit specification to measure the …\nInner Product Argument commitment scheme\nKZG with GWC19 multi-open strategy\nKZG with BDFG20 multi-open strategy\nStructure holding the Lookup related data for circuit …\nHigh-level specifications of an abstract circuit.\nNumber of permutation enabled columns\nStructure holding polynomial related data for benchmarks\nStructure holding the Shuffle related data for circuit …\nAn advice column with the given rotations. May be repeated.\nNumber of advice columns.\nNumber of distinct column queries across all gates.\nA fixed column with the given rotations. May be repeated.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nGiven a Plonk circuit, this function returns CostOptions\nGiven a Plonk circuit, this function returns a ModelCircuit\nMaximum degree of the custom gates.\nAn instance column with the given rotations. May be …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nConvert CostOptions to ModelCircuit. The proof sizè is …\n2^K bound on the number of rows.\nPower-of-2 bound on the number of rows in the circuit.\nA lookup over N columns with max input degree I and max …\nNumber of lookup arguments.\nMaximum degree of the circuit.\nMaximum degree of the constraint system.\nA permutation over N columns. May be repeated.\nEquality constraint enabled columns.\nNumber of distinct sets of points in the multiopening …\nRotations for the given polynomial\nA shuffle over N columns with max input degree I and max …\nNumber of shuffle arguments\nSize of the proof for the circuit\nA column with an index and type\nMetadata about a configured constraint within a circuit.\nMetadata about a configured gate within a circuit.\nMetadata about an assigned region within a circuit.\nA “virtual cell” is a PLONK cell that has been queried …\nThe type of the column.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nThe index of the column.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nAn advice column\nAn Advice variant\nThis is an advice (witness) column queried at a certain …\nAn enum over the Advice, Fixed, Instance structs\nA value assigned to a cell within a circuit.\nThis trait allows a <code>Circuit</code> to direct some backend to …\nAn error relating to an <code>Assignment</code>.\nBackend error case\nOut of bounds index passed to a backend\nOut of bounds index passed to a backend\nA challenge squeezed from transcript after advice columns …\nThis is a challenge\nThis is a trait that circuits provide implementations for …\nA column with an index and type\nThe instance sets up a copy constraint involving a column …\nThe instance sets up a copy constraint involving a column …\nA column type\nThis is a configuration object that stores things like …\nThis is a constant polynomial\nThis is a description of the circuit environment, such as …\nThe constraint system is not satisfied.\nThis is a description of the circuit environment, such as …\nA set of polynomial constraints with a common selector.\nThis is an error that could occur during proving or …\nThis is an error that could occur during proving.\nThis is an error that could occur during circuit synthesis.\nLow-degree expression representing an identity that must …\nFirst phase\nA fixed column\nA Fixed variant\nThis is a fixed column queried at a certain relative …\nQuery of fixed column at a certain relative location\nA floor planning strategy for a circuit.\nThe floor planner used for this circuit. This is an …\nFrontend error case\nAn instance column\nAn Instance variant\nThis is an instance (external) column queried at a certain …\nInstance provided exceeds number of available rows\nThe provided instances do not match the circuit parameters.\nThis is a negated polynomial\nCircuit synthesis requires global constants, but circuit …\n<code>k</code> is too small for the given circuit.\n<code>k</code> is too small for the given circuit.\nOpening error\nGeneric error not covered by previous cases\nGeneric error not covered by previous cases\nOptional circuit configuration parameters. Requires the …\nPhase of advice column\nThis is the product of two polynomials\nThis is a proving key which allows for the creation of …\nA value stored as a fraction to enable batch inversion.\nThis is a scaled polynomial\nSecond phase\nA selector, representing a fixed boolean value per row of …\nThis is a virtual selector\nThis is the sum of two polynomials\nThis is an error that can occur during synthesis of the …\nA fixed column of a lookup table.\nAn error relating to a lookup table.\nThird phase\nTranscript error\nA value that does not require inversion to evaluate.\nThis is a verifying key which allows for the verification …\nExposes the “virtual cells” that can be queried while …\nThe field element zero.\nAllocate a new advice column at <code>FirstPhase</code>\nAllocate a new advice column in given phase\nReturns phase of advice columns\nContains the phase for each advice column. Should have …\nReturns advice queries\nAllows the developer to include an annotation for an …\nAnnotate a column.\nAnnotate an Instance column.\nAnnotate a Lookup column.\nAssign an advice column value (witness)\nAssign a fixed value\nCompute the number of blinding factors necessary to …\nReturns phase of challenges\nContains the phase for each challenge. Should have same …\nRequests a challenge that is usable after the given phase.\nColumn index\nColumn index\nType of this column.\nAllocate a new complex selector that can appear anywhere …\nApproximate the computational complexity of this …\nThis will compress selectors together depending on their …\nThe circuit is given an opportunity to describe the exact …\nThe circuit is given an opportunity to describe the exact …\nReturns constants\nAssign two cells to have the same value\nCreates a new gate.\nThis creates a proof for the provided <code>circuit</code> when given …\nThis creates a proof for the provided <code>circuit</code> when given …\nCubes this element.\nReturn expression from column at the current row\nCompute the degree of the constraint system (the maximum …\nCompute the degree of this polynomial\nReturns the denominator, if non-trivial.\nDoes not combine selectors and directly replaces them …\nDoubles this element.\nEnable this selector at the given offset within the given …\nEnables this fixed column to be used for global constant …\nEnable the ability to enforce equality over cells in this …\nEnables a selector at the given row.\nCreates a new region and enters into it.\nEvaluates this assigned value directly, performing an …\nEvaluate the polynomial using the provided closures to …\nEvaluate the polynomial lazily using the provided closures …\nExits the current region.\nReturn expression from selector\nReturn Expression\nFills a fixed <code>column</code> starting from the given <code>row</code> with …\nAllocate a new fixed column\nReturns commitments of fixed polynomials\nReturns fixed queries\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReads a verification key from a slice of bytes using …\nReads a proving key from a slice of bytes using <code>Self::read</code>.\nReturns gates\nReturns general column annotations\nQueries the value of the given challenge.\nGet the underlying <code>EvaluationDomain</code>.\nGet the underlying <code>VerifyingKey</code>.\nHashes a verification key into a transcript.\nIdentifier for this expression. Expressions with identical …\nIndex of this column.\nReturns index of this selector\nIndex of this challenge.\nQuery index\nReturns inner column\nAllocate a new instance column\nReturns instance queries\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nInverts this assigned value (taking the inverse of zero to …\nIs this selector “simple”? Simple selectors can only …\nReturns true iff this element is zero.\nGenerate a <code>ProvingKey</code> from a <code>VerifyingKey</code> and an instance …\nGenerate a <code>ProvingKey</code> from an instance of <code>Circuit</code>.\nGenerate a <code>VerifyingKey</code> from an instance of <code>Circuit</code>. By …\nGenerate a <code>VerifyingKey</code> from an instance of <code>Circuit</code>.\nAdd a lookup argument for some input expressions and table …\nAdd a lookup argument for some input expressions and table …\nAllocates a new fixed column that can be used in a lookup …\nReturns lookup arguments\nReturns the minimum necessary rows that need to exist in …\nReturn expression from column at the next row\nConstructs an <code>Error::NotEnoughRowsAvailable</code>.\nConstructs an <code>Error::NotEnoughRowsAvailable</code>.\nReturns number of advice columns\nReturns number of challenges\nReturns number of fixed columns\nReturns number of instance columns\nReturns number of selectors\nReturns the numerator.\nReturns a reference to the parameters that should be used …\nReturns permutation argument\nPhase of this challenge.\nReturns the number of phases\nReturns the list of phases\nObtains a pinned representation of this verification key …\nReads a proving key from a buffer. Does so by reading …\nExits out of the existing namespace.\nReturn expression from column at the previous row\nCreates a new (sub)namespace and enters into it.\nQuery an advice column at a relative position\nQuery an Any column at a relative position\nReturn expression from cell\nReturn expression from column at a relative position\nMake side effects\nQuery a challenge\nQuery a fixed column at a relative position\nQueries the cell of an instance column at a particular …\nQuery an instance column at a relative position\nQuery a selector at the current position.\nReads a verification key from a buffer.\nReads a proving key from a buffer. Does so by reading …\nReturn expression from column at the specified rotation\nRotation of this query\nRotation of this query\nAllocate a new (simple) selector. Simple selectors cannot …\nSets the minimum degree required by the circuit, which can …\nAdd a shuffle argument for some input expressions and …\nReturns shuffle arguments\nSquares this element.\nSquare this expression.\nGiven the provided <code>cs</code>, synthesize the given circuit.\nGiven the provided <code>cs</code>, synthesize the circuit. The …\nWrites a verifying key to a vector of bytes using …\nWrites a proving key to a vector of bytes using <code>Self::write</code>…\nReturns representative of this <code>VerifyingKey</code> in transcripts\nAllocate a new unblinded advice column at <code>FirstPhase</code>\nAllocate a new unblinded advice column in given phase. …\nContains the index of each advice column that is left …\nReturns a boolean indicating whether or not the proof is …\nReads a verification key from a buffer.\nConstructs a set of constraints that are controlled by the …\nReturns a copy of this circuit with no witness values …\nWrites a verifying key to a buffer.\nWrites a proving key to a buffer.\nThe current value of <code>k</code> being used.\nThe current value of <code>k</code> being used.\nThis structure contains precomputed constants and other …\nThe output type of this verification strategy after …\nDescribes the relative rotation of a vector. Negative …\nTrait representing a strategy for verifying Halo 2 proofs.\nObtains a polynomial in coefficient form when given a …\nThis takes us from an n-length coefficient vector into a …\nGeneric commitment scheme structures\nReturns a constant polynomial in the extended Lagrange …\nReturns a constant polynomial in the Lagrange coefficient …\nThe current location in the evaluation domain\nThis divides the polynomial (in the extended domain) by …\nReturns an empty (zero) polynomial in the coefficient basis\nReturns an empty (zero) polynomial in the extended …\nReturns an empty (zero) polynomial in the Lagrange …\nGet the size of the extended domain\nGet the size of the extended domain\nThis takes us from the extended evaluation domain and gets …\nFinalizes the batch and checks its validity.\nReturns the argument unchanged.\nReturns the argument unchanged.\nGet the generator of the extended domain’s …\nGet $\\omega$, the generator of the $2^k$ order …\nGet $\\omega^{-1}$, the inverse of the generator of the …\nGets the quotient polynomial’s degree (as a multiple of …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nInner product argument commitment scheme\nGet the size of the domain\nKZG commitment scheme\nComputes evaluations (at the point <code>x</code>, where <code>xn = x^n</code>) of …\nObtains a polynomial in Lagrange form when given a vector …\nThis takes us from an n-length vector into the coefficient …\nCreates new verification strategy instance\nThis constructs a new evaluation domain object based on …\nThe next location in the evaluation domain\nObtain a pinned version of this evaluation domain; a …\nThe previous location in the evaluation domain\nObtains an MSM from the verifier strategy and yields back …\nRotate the extended domain polynomial over the original …\nMultiplies a value by some power of $\\omega$, essentially …\nWrapper type around a blinding factor.\nCan commit to instance or not.\nDefines components of a commitment scheme.\nElliptic curve used to commit the application and witnesses\nUnfinalized verification result. This is returned in …\nMultiscalar multiplication engine\nMultiscalar multiplication engine\nAccumulator for compressed verification\nCommon for Verifier and Prover.\nParameters for circuit synthesis and prover parameters.\nConstant prover parameters\nVerifier specific functionality with circuit constraints\nConstant verifier parameters\nCommon multi-open prover interface for various commitment …\nQuery instance or not\nQuery instance or not\nApplication field of this commitment scheme\nCommon multi-open verifier interface for various …\nAdd another multiexp into this one\nAdd arbitrary term (the scalar and the point)\nReturn base points\nPerform multiexp and check that it results in zero\nThis computes a commitment to a polynomial described by …\nThis commits to a polynomial using its evaluations over …\nCreate a multi-opening proof\nCreate a multi-opening proof\nDownsize <code>Params</code> with smaller <code>k</code>.\nGenerates an empty multiscalar multiplication struct using …\nPerform multiexp and return the result\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nLogarithmic size of the circuit\nSize of the circuit\nReturns new instance of parameters\nCreates new prover instance\nCreates new verifier instance\nGiven <code>rng</code> creates new blinding scalar\nWrapper for parameter generator\nReads params from a buffer.\nWrapper for parameter reader\nScalars\nScale all scalars in the MSM by some scaling factor\nProcess the proof and return unfinished result named <code>Guard</code>\nWrites params to a buffer.\nThis module contains an implementation of the polynomial …\nMultiscalar multiplication engines\nIPA multi-open scheme This module contains an optimisation …\nStrategies used with KZG scheme\nConcrete IPA commitment scheme\nPublic parameters for IPA commitment scheme\nVerifier parameters\nThis computes a commitment to a polynomial described by …\nThis commits to a polynomial using its evaluations over …\nCreate a polynomial commitment opening proof for the …\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nInitializes parameters for the curve, given a random …\nReads params from a buffer.\nChecks to see if the proof represented within <code>transcript</code> …\nWrites params to a buffer.\nA multiscalar multiplication in the polynomial commitment …\nAdd a value to the first entry of <code>g_scalars</code>.\nAdd another multiexp into this one\nAdd another multiexp into this one\nAdd a vector of scalars to <code>g_scalars</code>. This function will …\nAdd to <code>u_scalar</code>\nAdd to <code>w_scalar</code>\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nGiven verifier parameters Creates an empty multi scalar …\nIPA multi-open prover\nIPA multi-open verifier\nCreate a multi-opening proof\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nAn accumulator instance consisting of an evaluation claim …\nA verifier that checks multiple proofs in a batch.\nWrapper for verification accumulator\nA verifier that checks single proof\nComputes G = ⟨s, params.g⟩\nFinalizes the batch and checks its validity.\nFinalizes the batch and checks its validity.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nThe claimed output of the linear-time polycommit opening …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nA vector of challenges u_0, …, u_{k - 1} sampled by the …\nLets caller supply the challenges and obtain an MSM with …\nLets caller supply the purported G point and simply appends\nKZG commitment scheme\nMultiscalar multiplication engines\nKZG multi-open scheme\nStrategies used with KZG scheme\nUmbrella commitment scheme construction for all KZG …\nThese are the public parameters for the polynomial …\nParameters KZG-based proof verification:\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nInitializes parameters for the curve through existing …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReads params from a buffer.\nReads params from a buffer.\nReads params from a buffer.\nInitializes parameters for the curve, draws toxic secret …\nWrites params to a buffer.\nWrites params to a buffer.\nWrites parameters to buffer\nTwo channel MSM accumulator\nA multiscalar multiplication in the polynomial commitment …\nAdd another multiexp into this one\nPerforms final pairing check with given verifier params …\nPrepares all scalars in the MSM to linear combination\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCreate an empty MSM instance\nCreate a new two channel MSM accumulator instance\nScale all scalars in the MSM by some scaling factor\nConcrete KZG prover with GWC variant\nConcrete KZG prover with SHPLONK variant\nConcrete KZG verifier with GWC variant\nConcrete KZG multiopen verifier with SHPLONK variant\nCreate a multi-opening proof\nCreate a multi-opening proof\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nGiven parameters creates new prover instance\nVerify a multi-opening proof\nA verifier that checks multiple proofs in a batch\nWrapper for linear verification accumulator\nA verifier that checks a single proof\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nConstructs an empty batch verifier\nConstructs an empty batch verifier\nConstructs and initialized new batch verifier\nWe will replace BLAKE2b with an algebraic hash function in …\nWe will replace BLAKE2b with an algebraic hash function in …\nA 255-bit challenge.\n<code>EncodedChallenge&lt;C&gt;</code> defines a challenge encoding with a …\nThe Input type used to derive the challenge encoding. For …\nGeneric transcript view (from either the prover or verifier…\nTranscript view from the perspective of a verifier that …\nInitializes transcript at verifier side.\nTranscript view from the perspective of a prover that has …\nManages beginning and finishing of transcript pipeline.\nCast an encoded challenge as a typed <code>ChallengeScalar</code>.\nWriting the point to the transcript without writing it to …\nWriting the scalar to the transcript without writing it to …\nConclude the interaction and return the output buffer …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nGet a scalar field element from an encoded challenge.\nInitialize a transcript given an input buffer.\nInitialize a transcript given an output buffer.\nInitialize a transcript given an input buffer.\nInitialize a transcript given an output buffer.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nGet an encoded challenge from a given input challenge.\nRead a curve point from the prover.\nRead a curve scalar from the prover.\nSqueeze an encoded verifier challenge from the transcript.\nSqueeze a typed challenge (in the scalar field) from the …\nWrite a curve point to the proof and the transcript.\nWrite a scalar to the proof and the transcript.")