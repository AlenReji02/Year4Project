import '../diagrams.css';

import Navbar from '../Components/Navbar';
import Infocard from '../Components/Infocard';

import transT from '../images/transT.PNG';
import interT from '../images/interT.PNG';
import progT from '../images/progT.PNG';
import machT from '../images/machT.PNG';

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
                <Infocard img={transT} title="Compiler" text="A compiler which translates from a source language S, to a target language T. The compiler itself is expressed in the langauge L."/>
                <Infocard img={interT} title="Interpreter" text="An interpreter for the source language S which itself is expressed in the language L."/>
                <Infocard img={progT} title="Program" text="A program P expressed in the language L."/>
                <Infocard img={machT} title="Machine" text="A machine M which can only run machine code specific to M."/>
            </div>
            <br></br>
            <div className="card-container">
            <div className="card-image-container">
                <img src="image1.jpg" alt="Image 1" className="card-image" />
                <img src="image2.jpg" alt="Image 2" className="card-image" />
            </div>
            <div className="card-text">
                <h3>Card Title</h3>
                <p>Some card text goes here</p>
            </div>
            </div>
        </>
    );    
}