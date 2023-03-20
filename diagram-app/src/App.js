import React from "react";

import { Toolbar } from "./components/Toolbar";
import { Canvas } from "./components/Canvas";
import { Properties } from "./components/Properties";

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
