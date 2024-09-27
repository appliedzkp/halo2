searchState.loadedDescShard("halo2_frontend", 0, "Traits and structs for implementing circuit components.\nTools for developing circuits.\nAn assigned cell.\nA pointer to a cell within a circuit.\nA chip implements a set of instructions that can be used …\nA type that holds the configuration for this chip, and any …\nA layout strategy within a circuit. The layouter is …\nA type that holds any general chip state that needs to be …\nThis is a “namespaced” layouter which borrows a …\nA region of the circuit in which a <code>Chip</code> can assign cells.\nIndex of a region in a layouter\nStarting row of a region in a layouter\nRepresents the type of the “root” of this layouter, so …\nA table layouter that can be used to assign values to a …\nA lookup table in the circuit.\nHelper trait for implementing a custom <code>Layouter</code>.\nA value that might exist within a circuit.\nWitness calculator.  Frontend function\nReturns <code>Value::unknown()</code> if the value is <code>Value::unknown()</code>, …\nConverts from <code>&amp;mut Value&lt;V&gt;</code> to <code>Value&lt;&amp;mut V&gt;</code>.\nConverts from <code>&amp;Value&lt;V&gt;</code> to <code>Value&lt;&amp;V&gt;</code>.\nEnforces an assertion on the contained value, if known.\nObtains the inner value for assigning into the circuit.\nAssign an advice column value (witness).\nAssigns a constant value to the column <code>advice</code> at <code>offset</code> …\nAssign the value of the instance column’s cell at …\nAssigns a fixed value to a table cell.\nAssigns a fixed value to a table cell.\nAssign a fixed value.\nAssign a region of gates to an absolute row number.\nAssign a table region to an absolute row number.\nCalculate witness at phase\nReturns the cell.\nMaps a <code>Value&lt;&amp;mut V&gt;</code> to a <code>Value&lt;V&gt;</code> by cloning the contents …\nMaps a <code>Value&lt;&amp;V&gt;</code> to a <code>Value&lt;V&gt;</code> by cloning the contents of …\nThe column of this cell.\nCompile a circuit.  Runs configure and synthesize on the …\nThe chip holds its own configuration.\nConstrains a cell to have a constant value.\nConstrains two cells to have the same value.\nConstrains a <code>Cell</code> to equal an instance column’s row …\nMaps a <code>Value&lt;&amp;mut V&gt;</code> to a <code>Value&lt;V&gt;</code> by copying the contents …\nMaps a <code>Value&lt;&amp;V&gt;</code> to a <code>Value&lt;V&gt;</code> by copying the contents of …\nCopies the value to a given advice cell and constrains …\nCubes this field element.\nmaps from a fixed column to a pair (default value, vector …\nDoubles this field element.\nEnables a selector at the given offset.\nChecks the contained value for an error condition, if …\nEvaluates this value directly, performing an unbatched …\nEvaluates this assigned cell’s value directly, …\nImplementations of common circuit floor planners.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nTakes each element in the <code>Iterator</code>: if it is …\nQueries the value of the given challenge.\nGets the “root” of this assignment, bypassing the …\nReturns the value of the instance column’s cell at …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns the field element corresponding to this value.\nInverts this assigned value (taking the inverse of zero to …\nConstructs a known value.\nImplementations of common circuit layouters.\nProvides access to general chip state loaded at the …\nMaps a <code>Value&lt;V&gt;</code> to <code>Value&lt;W&gt;</code> by applying a function to the …\nAllows the circuit implementor to name/annotate a Column …\nEnters into a namespace.\nReturns a new SimpleTableLayouter\nCreate a new WitnessCalculator\nExits out of the existing namespace.\nCreates a new (sub)namespace and enters into it.\nIdentifies the region in which this cell resides.\nThe relative offset of this cell within its region.\nSquares this field element.\nReturns the field element corresponding to this value.\nTransposes a <code>Value&lt;[V; LEN]&gt;</code> into a <code>[Value&lt;V&gt;; LEN]</code>.\nTransposes a <code>Value&lt;impl IntoIterator&lt;Item = V&gt;&gt;</code> into a …\nConstructs an unwitnessed value.\nUnzips a value containing a tuple of two values.\nReturns the value of the <code>AssignedCell</code>.\nReturns the field element value of the <code>AssignedCell</code>.\nZips <code>self</code> with another <code>Value</code>.\nA simple <code>FloorPlanner</code> that performs minimal optimizations.\nA <code>Layouter</code> for a single-chip circuit.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCreates a new single-chip layouter.\nAssigns the circuit.\nMeasures the circuit.\nThe version 1 <code>FloorPlanner</code> provided by <code>halo2</code>.\nA single pass of the <code>V1</code> layouter.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nConcrete column\nThe virtual column involved in a region. This includes …\nHelper trait for implementing a custom <code>Layouter</code>.\nThe shape of a region. For a region at a certain index, we …\nVirtual column representing a (boolean) selector\nIntermediate trait requirements for <code>RegionLayouter</code> when …\nHelper trait for implementing a custom <code>Layouter</code>.\nAssign an advice column value (witness)\nAssigns a constant value to the column <code>advice</code> at <code>offset</code> …\nAssign the value of the instance column’s cell at …\nAssigns a fixed value to a table cell.\nAssigns a fixed value\nGet a reference to the set of <code>columns</code> used in a <code>RegionShape</code>…\nConstrains a cell to have a constant value.\nConstraint two cells to have the same value.\nEnables a selector at the given offset.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the value of the instance column’s cell at …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nAllows the circuit implementor to name/annotate a Column …\nCreate a new <code>RegionShape</code> for a region at <code>region_index</code>.\nGet the <code>region_index</code> of a <code>RegionShape</code>.\nGet the <code>row_count</code> of a <code>RegionShape</code>.\nA cell that has been assigned a value.\nAssigned instance value\nA cell used in an active gate was not assigned to.\nThe value of a particular cell within the circuit.\nA struct for collecting and displaying the gates within a …\nGraphical renderer for circuit layouts.\nA constraint was not satisfied for a particular row.\nA constraint was active on an unusable row, and is likely …\nThe location within the circuit at which a particular …\nA location inside a region.\nAn instance cell used in an active gate was not assigned …\nInstance Value\nA lookup input did not exist in its corresponding table.\nA test prover for debugging circuits.\nA location outside of a region.\nPadding\nA permutation did not preserve the original value of a …\nA unique poisoned cell.\nA shuffle input did not exist in its corresponding map.\nA helper type that augments a <code>FloorPlanner</code> with <code>tracing</code> …\nAn unassigned cell.\nThe reasons why a particular circuit is not satisfied.\nReturns the list of Advice Columns used within a …\nReturn the content of an advice column as mutable\nReturn the content of an advice column as assigned by the …\nPanics if the circuit being checked by this <code>MockProver</code> is …\nPanics if the circuit being checked by this <code>MockProver</code> is …\nBuilds a dot graph string representing the given circuit.\nCollects the gates from within the circuit.\nDeveloper tools for investigating the cost of a circuit.\nThe cost estimator takes high-level parameters for a …\nReturns the constraint system\nEmits this failure in pretty-printed format to stderr.\nReturns the list of Fixed Columns used within a MockProver …\nReturn the content of a fixed column as assigned by the …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the list of Instance Columns used within a …\nReturn the content of an instance column as mutable\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nMarks cells involved in equality constraints, in red.\nMetadata about circuits.\nPrints the queries in this circuit to a CSV grid.\nRenders the given circuit on the given drawing area.\nRuns a synthetic keygen-and-prove operation on the given …\nReturns the list of Selector Columns used within a …\nDraws red lines between equality-constrained cells.\nSets the visibility of region labels.\nReturns the usable rows\nField value on the instance cell\nReturns <code>Ok(())</code> if this <code>MockProver</code> is satisfied, or a list …\nReturns <code>Ok(())</code> if this <code>MockProver</code> is satisfied, or a list …\nSets the view height for this layout, as a number of rows.\nSets the view width for this layout, as a number of …\nThe offset (relative to the start of the region) at which …\nThe region in which the failure occurred.\nThe circuit row on which the failure occurred.\nThe values of the virtual cells used by this constraint.\nThe column in which this cell should be assigned.\nThe column in which this cell should be assigned.\nThe column in which this permutation is not satisfied.\nThe polynomial constraint that is not satisfied.\nThe polynomial constraint that is not satisfied.\nThe index of the active gate.\nThe index of the active gate.\nThe offset (relative to the start of the region) at which …\nThe offset (relative to the start of the region) at which …\nThe location at which this constraint is not satisfied.\nThe location at which the lookup is not satisfied.\nThe location at which the lookup is not satisfied.\nThe location at which the permutation is not satisfied.\nThe index of the lookup that is not satisfied. These …\nThe name of the lookup that is not satisfied.\nThe name of the lookup that is not satisfied.\nThe offset (relative to the start of the region) at which …\nThe region in which this cell should be assigned.\nThe region in which this gate was activated.\nThe absolute row at which this cell should be assigned.\nThe index of the lookup that is not satisfied. These …\nMeasures a circuit to determine its costs, and explain …\nThe marginal size of a Halo 2 proof, broken down into its …\nThe size of a Halo 2 proof, broken down into its …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns the marginal proof size per instance of this …\nMeasures a circuit with parameter constant <code>k</code>.\nReturns the proof size for the given number of instances …\nSupported commitment schemes\nOptions to build a circuit specification to measure the …\nInner Product Argument commitment scheme\nKZG with GWC19 multi-open strategy\nKZG with BDFG20 multi-open strategy\nStructure holding the Lookup related data for circuit …\nHigh-level specifications of an abstract circuit.\nNumber of permutation enabled columns\nStructure holding polynomial related data for benchmarks\nStructure holding the Shuffle related data for circuit …\nAn advice column with the given rotations. May be repeated.\nNumber of advice columns.\nNumber of distinct column queries across all gates.\nA fixed column with the given rotations. May be repeated.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nGiven a Plonk circuit, this function returns CostOptions\nGiven a Plonk circuit, this function returns a ModelCircuit\nMaximum degree of the custom gates.\nAn instance column with the given rotations. May be …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nConvert CostOptions to ModelCircuit. The proof sizè is …\n2^K bound on the number of rows.\nPower-of-2 bound on the number of rows in the circuit.\nA lookup over N columns with max input degree I and max …\nNumber of lookup arguments.\nMaximum degree of the circuit.\nMaximum degree of the constraint system.\nA permutation over N columns. May be repeated.\nEquality constraint enabled columns.\nNumber of distinct sets of points in the multiopening …\nRotations for the given polynomial\nA shuffle over N columns with max input degree I and max …\nNumber of shuffle arguments\nSize of the proof for the circuit\nA column with an index and type\nMetadata about a configured constraint within a circuit.\nMetadata about a configured gate within a circuit.\nMetadata about an assigned region within a circuit.\nA “virtual cell” is a PLONK cell that has been queried …\nThe type of the column.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nThe index of the column.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nImplementation of permutation argument.\nA value assigned to a cell within a circuit.\nA value stored as a fraction to enable batch inversion.\nA value that does not require inversion to evaluate.\nThe field element zero.\nCubes this element.\nReturns the denominator, if non-trivial.\nDoubles this element.\nEvaluates this assigned value directly, performing an …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nInverts this assigned value (taking the inverse of zero to …\nReturns true iff this element is zero.\nReturns the numerator.\nSquares this element.\nAn advice column\nThis trait allows a <code>Circuit</code> to direct some backend to …\nThis is a trait that circuits provide implementations for …\nA column type\nThis is a configuration object that stores things like …\nA fixed column\nA floor planning strategy for a circuit.\nThe floor planner used for this circuit. This is an …\nAn instance column\nOptional circuit configuration parameters. Requires the …\nAllows the developer to include an annotation for an …\nAssign an advice column value (witness)\nAssign a fixed value\nThe circuit is given an opportunity to describe the exact …\nThe circuit is given an opportunity to describe the exact …\nAssign two cells to have the same value\nEnables a selector at the given row.\nCreates a new region and enters into it.\nExits the current region.\nFills a fixed <code>column</code> starting from the given <code>row</code> with …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nQueries the value of the given challenge.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns a reference to the parameters that should be used …\nExits out of the existing namespace.\nCreates a new (sub)namespace and enters into it.\nReturn expression from cell\nQueries the cell of an instance column at a particular …\nGiven the provided <code>cs</code>, synthesize the given circuit.\nGiven the provided <code>cs</code>, synthesize the circuit. The …\nReturns a copy of this circuit with no witness values …\nAn individual polynomial constraint.\nThis is a description of the circuit environment, such as …\nA set of polynomial constraints with a common selector.\nGate\nA “virtual cell” is a PLONK cell that has been queried …\nExposes the “virtual cells” that can be queried while …\nAllocate a new advice column at <code>FirstPhase</code>\nAllocate a new advice column in given phase\nReturns phase of advice columns\nReturns advice queries\nAnnotate a column.\nAnnotate an Instance column.\nAnnotate a Lookup column.\nCompute the number of blinding factors necessary to …\nReturns phase of challenges\nRequests a challenge that is usable after the given phase.\nAllocate a new complex selector that can appear anywhere …\nThis will compress selectors together depending on their …\nReturns constants\nReturns the name of the constraint at index …\nCreates a new gate.\nCompute the degree of the constraint system (the maximum …\nDoes not combine selectors and directly replaces them …\nEnables this fixed column to be used for global constant …\nEnable the ability to enforce equality over cells in this …\nAllocate a new fixed column\nReturns fixed queries\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns gates\nReturns general column annotations\nAllocate a new instance column\nReturns instance queries\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nAdd a lookup argument for some input expressions and table …\nAdd a lookup argument for some input expressions and table …\nAllocates a new fixed column that can be used in a lookup …\nReturns lookup arguments\nReturns the minimum necessary rows that need to exist in …\nReturns the gate name.\nReturns number of advice columns\nReturns number of challenges\nReturns number of fixed columns\nReturns number of instance columns\nReturns number of selectors\nReturns permutation argument\nReturns the list of phases\nReturns constraints of this gate\nQuery an advice column at a relative position\nQuery an Any column at a relative position\nQuery a challenge\nQuery a fixed column at a relative position\nQuery an instance column at a relative position\nQuery a selector at the current position.\nAllocate a new (simple) selector. Simple selectors cannot …\nSets the minimum degree required by the circuit, which can …\nAdd a shuffle argument for some input expressions and …\nReturns shuffle arguments\nAllocate a new unblinded advice column at <code>FirstPhase</code>\nAllocate a new unblinded advice column in given phase. …\nConstructs a set of constraints that are controlled by the …\nThis is an advice (witness) column queried at a certain …\nQuery of advice column at a certain relative location\nA challenge squeezed from transcript after advice columns …\nThis is a challenge\nA column with an index and type\nThis is a constant polynomial\nLow-degree expression representing an identity that must …\nFirst phase\nThis is a fixed column queried at a certain relative …\nQuery of fixed column at a certain relative location\nThis is an instance (external) column queried at a certain …\nQuery of instance column at a certain relative location\nThis is a negated polynomial\nPhase of advice column\nThis is the product of two polynomials\nThis is a scaled polynomial\nSecond phase\nA selector, representing a fixed boolean value per row of …\nThis is a virtual selector\nThis is the sum of two polynomials\nA fixed column of a lookup table.\nThird phase\nColumn index\nColumn index\nColumn index\nColumn index\nColumn index\nColumn index\nType of this column.\nApproximate the computational complexity of this …\nReturn expression from column at the current row\nCompute the degree of this polynomial\nEnable this selector at the given offset within the given …\nEvaluate the polynomial using the provided closures to …\nEvaluate the polynomial lazily using the provided closures …\nReturn expression from selector\nReturn Expression\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nIdentifier for this expression. Expressions with identical …\nIndex of this column.\nReturns index of this selector\nIndex of this challenge.\nQuery index\nQuery index\nQuery index\nReturns inner column\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nIs this selector “simple”? Simple selectors can only …\nReturn expression from column at the next row\nPhase of this challenge.\nReturn expression from column at the previous row\nReturn expression from column at a relative position\nMake side effects\nReturn expression from column at the specified rotation\nRotation of this query\nRotation of this query\nRotation of this query\nRotation of this query\nRotation of this query\nRotation of this query\nSquare this expression.\nPhase of advice column\nSealed trait to help keep <code>Phase</code> private.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nThis is an error that could occur during <code>assign_advice</code>, …\nAn error relating to a circuit assignment.\nOut of bounds index passed to a backend\nA <code>TableColumn</code> has not been assigned.\nThe instance sets up a copy constraint involving a column …\nThis is an error that could occur during circuit synthesis.\nCircuit synthesis requires global constants, but circuit …\n<code>k</code> is too small for the given circuit.\nGeneric error not covered by previous cases\nAttempt to overwrite a default value\nThis is an error that can occur during synthesis of the …\nThis is an error that could occur during table synthesis.\nAn error relating to a lookup table.\nA Table has columns of uneven lengths.\nAttempt to assign a used <code>TableColumn</code>\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nConstructs an <code>Error::NotEnoughRowsAvailable</code>.\nThe current value of <code>k</code> being used.\nExpressions involved in a lookup argument, with a name as …\nReturns the argument unchanged.\nReturns input of this argument\nCalls <code>U::from(self)</code>.\nReturns name of this argument\nConstructs a new lookup argument.\nReturns table of this argument\nA permutation argument.\nReturns the argument unchanged.\nReturns columns that participate on the permutation …\nCalls <code>U::from(self)</code>.\nExpressions involved in a shuffle argument, with a name as …\nReturns the argument unchanged.\nReturns input of this argument\nCalls <code>U::from(self)</code>.\nReturns name of this argument\nConstructs a new shuffle argument.\nReturns table of this argument")