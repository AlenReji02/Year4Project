import React, { useRef, useCallback } from "react";
import { Layer, Stage } from "react-konva";

import {
  useShapes,
  clearSelection,
  createCircle,
  createRectangle,
  createTransT,
  createProgT,
  createMachT,
  createTransJ,
  createInterJ,
  createCompJ,
  createMachJ,
  refreshPage,
  deleteShape,
  reset
} from "../state";
import { DRAG_DATA_KEY, SHAPE_TYPES } from "../constants";
import { Shape } from "../Shape";

// Prevent default dragover behaviour to allow drop
const handleDragOver = (event) => event.preventDefault();

// Canvas component
export function Canvas() {

  // Get shapes from state
  const shapes = useShapes((state) => Object.entries(state.shapes));

  // Zoom Scale
  const scaleBy = 1.01;

  // Stage Ref
  const stageRef = useRef();

  // Refresh page on window resize to fix element ratio
  window.onresize = function(event) {
    refreshPage();
  };

  // Download Canvas as image
  const download = useCallback((event) => {
    var filename = prompt("Enter a filename for the image:", "stage.png");
    if (!filename) {
      return;
    }
    var dataURL = stageRef.current.toDataURL({ pixelRatio: 3 });

    var link = document.createElement("a");
    link.download = filename;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // Handler for dropping shapes onto canvas]
  const handleDrop = useCallback((event) => {

    // Receive dragged data
    const draggedData = event.nativeEvent.dataTransfer.getData(DRAG_DATA_KEY);

    // Unpack data
    if (draggedData) {
      const { offsetX, offsetY, type, clientHeight, clientWidth } = JSON.parse(
        draggedData
      );

      // Grab Pointer Position
      stageRef.current.setPointersPositions(event);
      const coords = stageRef.current.getPointerPosition();

      // Adjust Pointer Position for zoom and pan level
      const invertedTransform = stageRef.current.getAbsoluteTransform().copy().invert();
      const icoords = invertedTransform.point(coords);

      // Pass coords to shape creation function based on type
      // Created shapes are added to state
      if (type === SHAPE_TYPES.RECT) {
        createRectangle({
          x: icoords.x,
          y: icoords.y
        });
      } else if (type === SHAPE_TYPES.TRANST) {
        createTransT({
          x: icoords.x - 100,
          y: icoords.y - 150
        });
      } else if (type === SHAPE_TYPES.PROGT) {
        createProgT({
          x: icoords.x - 100,
          y: icoords.y - 150
        });
      } else if (type === SHAPE_TYPES.MACHT) {
        createMachT({
          x: icoords.x - 100,
          y: icoords.y - 150
        });
      } else if (type === SHAPE_TYPES.TRANSJ) {
        createTransJ({
          x: icoords.x - 100,
          y: icoords.y - 150
        });
      } else if (type === SHAPE_TYPES.INTERJ) {
        createInterJ({
          x: icoords.x - 100,
          y: icoords.y - 150
        });
      } else if (type === SHAPE_TYPES.COMPJ) {
        createCompJ({
          x: icoords.x - 100,
          y: icoords.y - 150
        });
      } else if (type === SHAPE_TYPES.MACHJ) {
        createMachJ({
          x: icoords.x - 100,
          y: icoords.y - 150
        });
      }
    }
  }, []);

  // Event handler for zooming in and out
  function zoomStage(event) {

    // Disable default scroll behaviour
    event.evt.preventDefault();

    // Grabs current stage scale and updates it
    //Updates stage position to keep mouse in same place
    if (stageRef.current !== null) {
      const stage = stageRef.current;
      const oldScale = stage.scaleX();
      const { x: pointerX, y: pointerY } = stage.getPointerPosition();
      const mousePointTo = {
        x: (pointerX - stage.x()) / oldScale,
        y: (pointerY - stage.y()) / oldScale,
      };
      const newScale = event.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
      stage.scale({ x: newScale, y: newScale });
      const newPos = {
        x: pointerX - mousePointTo.x * newScale,
        y: pointerY - mousePointTo.y * newScale,
      }
      stage.position(newPos);
      stage.batchDraw();
    }
  }

  // Returns Canvas element with buttons and shapes
  // Shapes are rendered in on Layer by iterating through shape state
  return (
    <main className="canvas" onDrop={handleDrop} onDragOver={handleDragOver}>
      <div className="buttons">
        <button onClick={download}>Save</button>
        <button onClick={reset}>Reset</button>
        <button onClick={deleteShape}>Delete</button>
      </div>
      <Stage
        ref={stageRef}
        width={window.innerWidth - 400}
        height={window.innerHeight}
        onClick={clearSelection}
        onWheel={zoomStage}
        draggable
      >
        <Layer>
          {shapes.map(
            ([key, shape]) =>
              console.log({ key, shape }) || (
                <Shape key={key} shape={{ ...shape, id: key }} />
              )
          )}
        </Layer>
      </Stage>
    </main>
  );
}
