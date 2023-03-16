import '../diagrams.css';

import Navbar from '../Components/Navbar';

import drag from '../images/drag.gif';
import connect from '../images/connect.gif';
import text from '../images/text.gif';
import change from '../images/change.gif';
import save from '../images/save.gif';
import zoom from '../images/zoom.gif';

export function EditorHelp(){
    return (
        <>
            <Navbar />
            <br></br>
            <br></br>
            <br></br>
            <div className="heading-container">
                <h1 className="heading-title">{"USING THE DIAGRAM EDITOR"}</h1>
            </div>
            <br></br>
            <br></br>
            <div className="wide-card-container">
                <div className="wide-card-image-container">
                    <img src={drag} alt="Image 1" className="wide-card-image" />
                </div>
                <div className="wide-card-text">
                    <br></br>
                    <h2><p>Select the required shape and drag it onto the canvas from the toolbar on the left to start making the diagrams.</p></h2>
                </div>
            </div>
            <br></br>
            <div className="wide-card-container">
                <div className="wide-card-image-container">
                    <img src={connect} alt="Image 1" className="wide-card-image" />
                </div>
                <div className="wide-card-text">
                    <br></br>
                    <h2><p>Drag the appropriate components together to create the diagrams.</p></h2>
                </div>
            </div>
            <br></br>
            <div className="wide-card-container">
                <div className="wide-card-image-container">
                    <img src={text} alt="Image 1" className="wide-card-image" />
                </div>
                <div className="wide-card-text">
                    <br></br>
                    <h2><p>Double clicking on the existing text will allow you to change it to match the required language.</p></h2>
                </div>
            </div>
            <br></br>
            <div className="wide-card-container">
                <div className="wide-card-image-container">
                    <img src={change} alt="Image 1" className="wide-card-image" />
                </div>
                <div className="wide-card-text">
                    <br></br>
                    <h2><p>Clicking on a shape selects it so that its properties can be viewed in the properties bar on the right. From here, stroke and fill attributes can be changed for each component.</p></h2>
                </div>
            </div>
            <br></br>
            <div className="wide-card-container">
                <div className="wide-card-image-container">
                    <img src={save} alt="Image 1" className="wide-card-image" />
                </div>
                <div className="wide-card-text">
                    <br></br>
                    <h2><p>Click the save button to save your created compilation diagram to your device.</p></h2>
                </div>
            </div>
            <br></br>
            <div className="wide-card-container">
                <div className="wide-card-image-container">
                    <img src={zoom} alt="Image 1" className="wide-card-image" />
                </div>
                <div className="wide-card-text">
                    <br></br>
                    <h2><p>Click and drag the canvas to pan it and give yourself more space for your diagrams. Using your mouse wheel will also zoom in and out.</p></h2>
                </div>
            </div>
            <br></br>
        </>
    );    
}