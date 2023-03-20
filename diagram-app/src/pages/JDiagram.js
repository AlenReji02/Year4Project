import '../diagrams.css';

import Navbar from '../components/Navbar';
import Infocard from '../components/Infocard';

import transJ from '../images/j-page-images/transJ.png';
import interJ from '../images/j-page-images/interJ.png';
import tube from '../images/j-page-images/tube.png';
import machJ from '../images/j-page-images/machJ.png';
import ex_horiz from '../images/j-page-images/ex_horiz.png';
import ex_diag from '../images/j-page-images/ex_diag.png';
import ex_diag2 from '../images/j-page-images/ex_diag2.png';
import ex_inter from '../images/j-page-images/ex_inter.png';
import ex_inter2 from '../images/j-page-images/ex_inter2.png';
import ex_exec from '../images/j-page-images/ex_exec.png';
import ex_exec2 from '../images/j-page-images/ex_exec2.png';


export default function TDiagram(){
    return (
        <>
            <Navbar />
            <br></br>
            <br></br>
            <br></br>
            <div className="heading-container">
                <h1 className="heading-title">{"J DIAGRAMS"}</h1>
                <h2 className="heading-subtitle">{
                "J-Diagrams are a proposed alternative to T-Diagrams to solve the confusion and shortcomings of T-Diagrams. J-Diagrams elect to leave the product of compositions missing. J-Diagrams were proposed in this "}<a href="https://johnwickerson.github.io/papers/jdiagrams.pdf">paper.</a></h2> 
                <h2 className="heading-subtitle">{"The components of a J-Diagram are:"
                }</h2>
            </div>
            <br></br>
            <br></br>
            <div className="diagram-key">
                <Infocard img={transJ} title="Compiler" text="A compiler which translates from a source language S, to a target language T. The compiler itself is expressed in the langauge L."/>
                <Infocard img={interJ} title="Interpreter" text="An interpreter for the source language S which itself is expressed in the language L."/>
                <Infocard img={tube} title="Compilation Step" text="A compilation step not requiring an implementation. An example would be compiling a subset language to its superset."/>
                <Infocard img={machJ} title="Machine" text="A machine that directly executes programs in the source language."/>
            </div>
            <br></br>
            <br></br>
            <div className="heading-container">
                <h1 className="heading-title">{"COMPOSITION SYNTAX"}</h1>
            </div>
            <br></br>
            <div className="card-container">
                <div className="card-image-container">
                    <img src={ex_horiz} alt="Image 1" className="single-card-image" />
                </div>
                <div className="card-text">
                    <h2>Horizontal Composition</h2>
                    <br></br>
                    <h3><p>As before with T-Diagrams, horizontal composition signifies passing the output of one component straight into another.
                        Here, the output of a Haskell to C compiler is passed to a C to ARM compiler. Both
                        compilers are written in Java.</p></h3>
                </div>
            </div>
            <br></br>
            <div className="card-container">
                <div className="card-image-container">
                    <img src={ex_diag} alt="Image 1" className="single-card-image" />
                </div>
                <div className="card-text">
                    <h2>Diagonal Composition</h2>
                    <br></br>
                     <h3><p>Also as before, diagonal composition signifies the compilation of a component.
                        Here, an OCaml to x86 compiler is built using a C to x86 compiler.</p></h3>
                </div>
            </div>
            <br></br>
            <div className="card-container">
                <div className="card-image-container">
                    <img src={ex_diag} alt="Image 1" className="single-card-image" />
                </div>
                <div className="card-text">
                    <h2>Diagonal Composition</h2>
                    <br></br>
                     <h3><p>Also as before, diagonal composition signifies the compilation of a component.
                        Here, an OCaml to x86 compiler is built using a C to x86 compiler.</p></h3>
                </div>
            </div>
            <br></br>
            <div className="card-container">
                <div className="card-text">
                    <h2>Special Note</h2>
                    <br></br>
                     <h2><p>Unlike T-Diagrams, J-Diagrams do not explicitly show the final result/operation of the process i.e. 
                        the final program that is created or the execution on a machine at the end as these are inferred. Rather, J-Diagrams
                         highlight the flow of the compilation process. These diagrams also do not explicitly have a component to represent a program.</p></h2>
                </div>
            </div>
            <br></br>
            <br></br>
            <div className="heading-container">
                <h1 className="heading-title">{"EXAMPLE USE CASES"}</h1>
            </div>
            <br></br>
            <h2 className="use-case-subtitle">{"Compilation"}</h2>
            <br></br>
            <div className="card-container">
                <div className="card-image-container">
                    <img src={ex_diag2} alt="Image" className="single-card-image" />
                </div>
                <div className="card-text">
                    <h2><p>The output Haskell to C compiler is passed to a C to ARM compiler. Both
                        compilers are written in Java.</p></h2>
                </div>
            </div>
            <br></br>
            <h2 className="use-case-subtitle">{"Interpretation"}</h2>
            <br></br>
            <div className="card-container">
                <div className="card-image-container">
                    <img src={ex_inter} alt="Image" className="card-image" />
                    <img src={ex_inter2} alt="Image 1" className="card-image" />
                </div>
                <div className="card-text">
                    <h2><p>Here the result of a Java to Bytecode compilation is interpreted to C++ (left).
                        The interpreter itself is also compiled (right) using a C++ to x86 compiler.</p></h2>
                </div>
            </div>
            <br></br>
            <h2 className="use-case-subtitle">{"Execution"}</h2>
            <br></br>
            <div className="card-container">
                <div className="card-image-container">
                    <img src={ex_exec} alt="Image" className="card-image" />
                    <img src={ex_exec2} alt="Image 1" className="card-image" />
                </div>
                <div className="card-text">
                    <h2><p>On the left we see the result of a C to x86 compilation being ran on a x86 machine however,
                        on the right, the compiler itself is running on the machine.</p></h2>
                </div>
            </div>
            <br></br>
        </>
    );    
}