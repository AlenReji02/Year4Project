import '../diagrams.css';

import Navbar from '../Components/Navbar';
import Infocard from '../Components/Infocard';

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
import ex_compprog from '../images/t-page-images/ex_compprog.png';
import ex_compprog2 from '../images/t-page-images/ex_compprog2.png';
import ex_compcomp from '../images/t-page-images/ex_compcomp.png';
import ex_inter from '../images/t-page-images/ex_inter.png';
import issue1 from '../images/t-page-images/issue1.png';
import issue2a from '../images/t-page-images/issue2a.png';
import issue2b from '../images/t-page-images/issue2b.png';

export default function TDiagram(){
    return (
        <>
            <Navbar />
            <br></br>
            <div className="heading-container">
                <h1 className="heading-title">{"T DIAGRAMS"}</h1>
                <h2 className="heading-subtitle">{
                "T-Diagrams, also known as tombstone diagrams are widely used in teaching to aid in the understanding of how compilers and interpreters, when composed together, lead to the building and execution of software. The diagrams are used in visually representing the running, translation, interpretation, emulation, etc, of various programs. The 4 main components of the T-Diagram are:"
                }</h2>
            </div>
            <br></br>
            <br></br>
            <div className="diagram-key">
                <Infocard img={compT} title="Compiler" text="A compiler which translates from a source language S, to a target language T. The compiler itself is expressed in the langauge L."/>
                <Infocard img={interT} title="Interpreter" text="An interpreter for the source language S which itself is expressed in the language L."/>
                <Infocard img={progT} title="Program" text="A program P expressed in the language L."/>
                <Infocard img={machT} title="Machine" text="A machine M which can only run machine code specific to M."/>
            </div>
            <br></br>
            <br></br>
            <div className="heading-container">
                <h1 className="heading-title">{"COMPOSITION SYNTAX OF T DIAGRAMS"}</h1>
            </div>
            <br></br>
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
            <br></br>
            <div className="heading-container">
                <h1 className="heading-title">{"EXAMPLE USE CASES"}</h1>
            </div>
            <br></br>
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
            <h2 className="use-case-subtitle">{"Compiling / Translating a Program"}</h2>
            <br></br>
            <div className="card-container">
                <div className="card-image-container">
                    <img src={ex_compprog} alt="Image" className="single-card-image" />
                </div>
                <div className="card-text">
                    <h2><p>A program 'max' being compiled/translated from C into x86 assembly using a C to x86 compiler running on an x86 machine.
                         The compiled program can later be run on a machine (see above).</p>
                    <br></br><p>Note that the rightmost shape is the product of the compilation i.e. the program 'max' written in x86.</p></h2>
                </div>
            </div>
            <div className="card-container">
                <div className="card-image-container">
                    <img src={ex_compprog2} alt="Image" className="single-card-image" />
                </div>
                <div className="card-text">
                    <h2><p>Programs can also be translated in steps using multiple compilers.
                        An initial program written in Java is translated to C and then x86. As before,
                        the rightmost 'tombstone' shape is the end product.</p></h2>
                </div>
            </div>
            <br></br>
            <h2 className="use-case-subtitle">{"Compiling a compiler"}</h2>
            <br></br>
            <div className="card-container">
                <div className="card-image-container">
                    <img src={ex_compcomp} alt="Image" className="single-card-image" />
                </div>
                <div className="card-text">
                    <h2><p>Even compilers can be compiled themselves. Here, a Java to JVM compiler made in C is translated
                        to a Java to JVM compiler written in x86 using another C to x86 compiler. The rightmost 'T' piece is the product.</p></h2>
                </div>
            </div>
            <br></br>
            <h2 className="use-case-subtitle">{"Interpreting Programs"}</h2>
            <br></br>
            <div className="card-container">
                <div className="card-image-container">
                    <img src={ex_inter} alt="Image" className="single-card-image" />
                </div>
                <div className="card-text">
                    <h2><p>Programs can also be ran using an interpreter running on the machine code rather than being compiled into machine code and then ran.
                        Here, a 'sort' program written in C is ran on a x86 machine using a C to x86 interpreter.</p></h2>
                </div>
            </div>
            <br></br>
            <br></br>
            <div className="heading-container">
                <h1 className="heading-title">{"PROBLEMS ENCOUNTERED WHEN USING T DIAGRAMS"}</h1>
            </div>
            <br></br>
            <h2 className="use-case-subtitle">{"Uncertainty when showing resulting compiler"}</h2>
            <br></br>
            <div className="card-container">
                <div className="card-image-container">
                    <img src={issue1} alt="Image" className="single-card-image" />
                </div>
                <div className="card-text">
                    <h2><p>There is often confusion when showing the result of compiling a compiler. It must be stressed that the compilation step concerns only the two leftmost 'T' shapes (green),
                        the right 'T' shape (red) is simply the compiler produced (compiled) as a result of the compilation step.
                        The right shape is often mistaken as another compilation step.</p></h2>
                </div>
            </div>
            <br></br>
            <h2 className="use-case-subtitle">{"Uncertainty during compilation of a compiler"}</h2>
            <br></br>
            <div className="card-container">
                <div className="card-image-container">
                    <img src={issue2a} alt="Image 1" className="card-image" />
                    <img src={issue2b} alt="Image 2" className="card-image" />
                </div>
                <div className="card-text">
                    <h2><p>Due to the fact that there seem to be two intersections at which two compilers meet (left image),
                        there is often confusion as to which is the input to the second compiler. Note that always, the language that the first compiler is written in
                        is the source for the second compiler. i.e. (using the images) C and D must be the same.</p></h2>
                </div>
            </div>
        </>
    );    
}