import React from "react";

import { Toolbar } from "./Components/Toolbar";
import { Canvas } from "./Components/Canvas";
import { Properties } from "./Components/Properties";

import "./index.css";

function App() {
  return (
    <div className="app">
      <Toolbar />
      <Canvas />
      <Properties />
    </div>
  );
}

export default App;
