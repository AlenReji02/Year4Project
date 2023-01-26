import { Link } from "react-router-dom";

export default function Navbar(){
    return (
        <div className="Navbar">
            <h3><Link to="/">Diagram Canvas</Link></h3>
            <h3><Link to="/editor">Using the Editor</Link></h3>
            <h3><Link to="/t-diagrams">T Diagrams</Link></h3>
            <h3><Link to="/j-diagrams">J Diagrams</Link></h3>
        </div>
    );    
}