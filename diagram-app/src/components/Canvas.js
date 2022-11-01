import React from "react";
import { Layer, Stage } from "react-konva";

export function Canvas() {

  return (
    <main className="canvas">
      <Stage
        width={window.innerWidth - 400}
        height={window.innerHeight}
      >
        <Layer />
      </Stage>
    </main>
  );
}