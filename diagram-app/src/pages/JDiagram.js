import '../diagrams.css';

import Navbar from '../Components/Navbar';
import Infocard from '../Components/Infocard';

import transx from '../images/transJ.PNG';
import transJ from '../images/j-page-images/transJ.png';
import interJ from '../images/j-page-images/interJ.png';
import compJ from '../images/compJ.PNG';
import machJ from '../images/machJ.PNG';

export default function TDiagram(){
    return (
        <>
            <Navbar />
            <br></br>
            <div className="heading-container">
                <h1 className="heading-title">{"T DIAGRAMS"}</h1>
                <h3 className="heading-subtitle">{
                "T-Diagrams, also known as tombstone diagrams are widely used in teaching to aid in the understanding of how compilers and interpreters, when composed together, lead to the building and execution of software. The 4 main components of T-Diagram are:"
                }</h3>
            </div>
            <br></br>
            <div className="diagram-key">
                <Infocard img={transJ} title="Compiler" text="A compiler which translates from a source language S, to a target language T. The compiler itself is expressed in the langauge L."/>
                <Infocard img={interJ} title="Interpreter" text="An interpreter for the source language S which itself is expressed in the language L."/>
                <Infocard img={compJ} title="Program" text="A program P expressed in the language L."/>
                <Infocard img={machJ} title="Machine" text="A machine M which can only run machine code specific to M."/>
            </div>
            <br></br>
            <div className="card-container">
                <div className="card-image-container">
                    <img src={transx} alt="Image 1" className="card-image" />
                    <img src={transx} alt="Image 2" className="card-image" />
                </div>
                <div className="card-text">
                    <h3>Composition of T Diagram Shapes</h3>
                    <p>Some card text goes here</p>
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
                    <img src={transx} alt="Image 1" className="card-image" />
                    <img src={transx} alt="Image 2" className="card-image" />
                </div>
                <div className="card-text">
                    <h3>Composition of T Diagram Shapes</h3>
                    <p>Some card text goes here</p>
                </div>
            </div>
            <br></br>
            <h2 className="use-case-subtitle">{"Translating Programs"}</h2>
            <br></br>
            <div className="card-container">
                <div className="card-image-container">
                    <img src={transx} alt="Image 1" className="card-image" />
                    <img src={transx} alt="Image 2" className="card-image" />
                </div>
                <div className="card-text">
                    <h3>Composition of T Diagram Shapes</h3>
                    <p>Some card text goes here</p>
                </div>
            </div>
            <br></br>
        </>
    );    
}