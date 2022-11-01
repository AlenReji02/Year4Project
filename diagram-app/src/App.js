import React from 'react';

import './App.css';

import Toolbar from './components/Toolbar';
import { Canvas } from './components/Canvas';
import { Properties } from './components/Properties';

function App() {
  return (
    <div className="App">
      <h1> Hello World</h1>
      <Toolbar />
      <Canvas />
      <Properties />
    </div>
  );
}

export default App;
