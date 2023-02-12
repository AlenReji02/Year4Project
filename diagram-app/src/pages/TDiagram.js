import '../diagrams.css';

import Navbar from '../Components/Navbar';
import Infocard from '../Components/Infocard';

import transT from '../images/transT.PNG';
import interT from '../images/t-page-images/interT.png';
import progT from '../images/t-page-images/progT.png';
import machT from '../images/t-page-images/machT.png';
import compT from '../images/t-page-images/compT.png';
import hcomp from '../images/t-page-images/horizontal.png';
import ex_hcomp from '../images/t-page-images/ex_horiz.png';
import ex_dcomp from '../images/t-page-images/ex_diag.png';
import ex_dcompw from '../images/t-page-images/ex_diagw.png';
import ex_vertcom1 from '../images/t-page-images/ex_vert1.png';
import ex_vertcom2 from '../images/t-page-images/ex_vert2.png';
import ex_runprog from '../images/t-page-images/ex_runprog.png';

export default function TDiagram(){
    return (
        <>
            <Navbar />
            <br></br>
            <div className="heading-container">
                <h1 className="heading-title">{"T DIAGRAMS"}</h1>
                <h2 className="heading-subtitle">{
                "T-Diagrams, also known as tombstone diagrams are widely used in teaching to aid in the understanding of how compilers and interpreters, when composed together, lead to the building and execution of software. The 4 main components of T-Diagram are:"
                }</h2>
            </div>
            <br></br>
            <div className="diagram-key">
                <Infocard img={compT} title="Compiler" text="A compiler which translates from a source language S, to a target language T. The compiler itself is expressed in the langauge L."/>
                <Infocard img={interT} title="Interpreter" text="An interpreter for the source language S which itself is expressed in the language L."/>
                <Infocard img={progT} title="Program" text="A program P expressed in the language L."/>
                <Infocard img={machT} title="Machine" text="A machine M which can only run machine code specific to M."/>
            </div>
            <br></br>
            <div className="heading-container">
                <h1 className="heading-title">{"COMPOSITION SYNTAX OF T DIAGRAMS"}</h1>
            </div>
            <div className="card-container">
                <div className="card-image-container">
                    <img src={hcomp} alt="Image 1" className="card-image" />
                    <img src={ex_hcomp} alt="Image 1" className="card-image" />
                </div>
                <div className="card-text">
                    <h2>Horizontal Composition</h2>
                    <br></br>
                    <h3><p>This form of composition signifies that the output of the first compiler is the input of the second. The example on the right shows
                        Haskell to C using a Java compiler and then C to ARM assembly using another Java compiler. Note that the output (target) of the left and the input of the right (source) must match. </p></h3>
                </div>
            </div>
            <br></br>
            <div className="card-container">
                <div className="card-image-container">
                    <img src={ex_dcomp} alt="Image 1" className="card-image" />
                    <img src={ex_dcompw} alt="Image 2" className="card-image" />
                </div>
                <div className="card-text">
                    <h2>Diagonal Composition</h2>
                    <br></br>
                    <h3><p>Diagonal composition signifies that a compiler itself is compiled using a second compiler. Note that diagonal composition only works
                        one way - the left T shape above the right and not vice versa. Although the composition on the right is not valid compilation, it is often used with the
                        correct method to signify the end product of the compilation (see problem cases below). Also note that for diagonal composition, the implementation
                        language of the first compiler must be the input for the second.
                    </p></h3>
                </div>
            </div>
            <br></br>
            <div className="card-container">
                <div className="card-image-container">
                    <img src={ex_vertcom1} alt="Image 1" className="card-image" />
                    <img src={ex_vertcom2} alt="Image 2" className="card-image" />
                </div>
                <div className="card-text">
                    <h2>Vertical Composition</h2>
                    <br></br>
                    <h3><p>Vertical composition is used for interpreting programs or compilers and also for running programs, compilers and interpreters on machines.
                        For this form of composition, the languages on either side of the boundary of the attached components (highlighted green) must match.
                    </p></h3>
                </div>
            </div>
            <br></br>
            <div className="heading-container">
                <h1 className="heading-title">{"EXAMPLE USE CASES"}</h1>
            </div>
            <h2 className="use-case-subtitle">{"Running Programs on a Machine"}</h2>
            <br></br>
            <div className="card-container">
                <div className="card-image-container">
                    <img src={ex_runprog} alt="Image" className="single-card-image" />
                </div>
                <div className="card-text">
                    <h2><p>This example shows a progam called 'sort' that is written in x86 instruction set architecture being ran on a machine which also running on the same architecture.</p></h2>
                </div>
            </div>
            <br></br>
            <h2 className="use-case-subtitle">{"Compiling a Program"}</h2>
            <br></br>
            <div className="card-container">
                <div className="card-image-container">
                    <img src={ex_runprog} alt="Image" className="single-card-image" />
                </div>
                <div className="card-text">
                    <h2><p></p></h2>
                </div>
            </div>
            <br></br>
            <div className="card-container">
                <div className="card-image-container">
                    <img src={transT} alt="Image 1" className="card-image" />
                    <img src={transT} alt="Image 2" className="card-image" />
                </div>
                <div className="card-text">
                    <h3>Composition of T Diagram Shapes</h3>
                    <p>Some card text goes here</p>
                </div>
            </div>
        </>
    );    
}