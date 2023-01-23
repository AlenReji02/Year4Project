import React from "react";
import { DRAG_DATA_KEY, SHAPE_TYPES } from "../constants";

const handleDragStart = (event) => {
  const type = event.target.dataset.shape;

  if (type) {
    // x,y coordinates of the mouse pointer relative to the position of the padding edge of the target node
    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;

    // dimensions of the node on the browser
    const clientWidth = event.target.clientWidth;
    const clientHeight = event.target.clientHeight;

    const dragPayload = JSON.stringify({
      type,
      offsetX,
      offsetY,
      clientWidth,
      clientHeight,
    });

    event.nativeEvent.dataTransfer.setData(DRAG_DATA_KEY, dragPayload);
  }
};

export function Toolbar() {
  return (
    <aside className="toolbar">
      <h2>Shapes</h2>
      <br></br>
      <h3>T Diagram Shapes</h3>
      <br></br>
      <div
        className="shape translatorT"
        data-shape={SHAPE_TYPES.TRANST}
        draggable
        onDragStart={handleDragStart}
      />
      <div
        className="shape programT"
        data-shape={SHAPE_TYPES.PROGT}
        draggable
        onDragStart={handleDragStart}
      />
      <div
        className="shape machineT"
        data-shape={SHAPE_TYPES.MACHT}
        draggable
        onDragStart={handleDragStart}
      />
      <div
        className="shape interpreterT"
        data-shape={SHAPE_TYPES.RECT}
        draggable
        onDragStart={handleDragStart}
      />
      <br></br>
      <h3>J Diagram Shapes</h3>
    
      <div
        className="shape translatorJ"
        data-shape={SHAPE_TYPES.TRANSJ}
        draggable
        onDragStart={handleDragStart}
      />
      <div
        className="shape interpreterJ"
        data-shape={SHAPE_TYPES.INTERJ}
        draggable
        onDragStart={handleDragStart}
      />
      <div
        className="shape compilerJ"
        data-shape={SHAPE_TYPES.COMPJ}
        draggable
        onDragStart={handleDragStart}
      />
      <div
        className="shape machineJ"
        data-shape={SHAPE_TYPES.MACHJ}
        draggable
        onDragStart={handleDragStart}
      />
    </aside>
  );
}
