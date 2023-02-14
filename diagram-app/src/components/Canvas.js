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
  reset
} from "../state";
import { DRAG_DATA_KEY, SHAPE_TYPES } from "../constants";
import { Shape } from "../Shape";

const handleDragOver = (event) => event.preventDefault();

export function Canvas() {
  const shapes = useShapes((state) => Object.entries(state.shapes));
  const scaleBy = 1.01;
  const stageRef = useRef();

  window.onresize = function(event) {
    refreshPage();
  };

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

  const handleDrop = useCallback((event) => {
    const draggedData = event.nativeEvent.dataTransfer.getData(DRAG_DATA_KEY);

    if (draggedData) {
      const { offsetX, offsetY, type, clientHeight, clientWidth } = JSON.parse(
        draggedData
      );

      stageRef.current.setPointersPositions(event);

      const coords = stageRef.current.getPointerPosition();
      const invertedTransform = stageRef.current.getAbsoluteTransform().copy().invert();
      const icoords = invertedTransform.point(coords);

      if (type === SHAPE_TYPES.RECT) {
        // rectangle x, y is at the top,left corner
        createRectangle({
          x: icoords.x,
          y: icoords.y
        });
      } else if (type === SHAPE_TYPES.TRANST) {
        // circle x, y is at the center of the circle
        createTransT({
          x: icoords.x - 100,
          y: icoords.y - 150
        });
      } else if (type === SHAPE_TYPES.PROGT) {
        // circle x, y is at the center of the circle
        createProgT({
          x: icoords.x - 100,
          y: icoords.y - 150
        });
      } else if (type === SHAPE_TYPES.MACHT) {
        // circle x, y is at the center of the circle
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

  function zoomStage(event) {
    event.evt.preventDefault();
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

  return (
    <main className="canvas" onDrop={handleDrop} onDragOver={handleDragOver}>
      <div className="buttons">
        <button onClick={download}>Save</button>
        <button onClick={reset}>Reset</button>
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
