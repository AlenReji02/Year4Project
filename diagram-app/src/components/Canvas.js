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
  saveDiagram,
  reset
} from "../state";
import { DRAG_DATA_KEY, SHAPE_TYPES } from "../constants";
import { Shape } from "../Shape";

const handleDragOver = (event) => event.preventDefault();

export function Canvas() {
  const shapes = useShapes((state) => Object.entries(state.shapes));
  const scaleBy = 1.01;
  const stageRef = useRef();

  const handleDrop = useCallback((event) => {
    const draggedData = event.nativeEvent.dataTransfer.getData(DRAG_DATA_KEY);

    if (draggedData) {
      const { offsetX, offsetY, type, clientHeight, clientWidth } = JSON.parse(
        draggedData
      );

      stageRef.current.setPointersPositions(event);

      const coords = stageRef.current.getPointerPosition();

      if (type === SHAPE_TYPES.RECT) {
        // rectangle x, y is at the top,left corner
        createRectangle({
          x: coords.x - offsetX,
          y: coords.y - offsetY
        });
      } else if (type === SHAPE_TYPES.CIRCLE) {
        // circle x, y is at the center of the circle
        createCircle({
          x: coords.x - (offsetX - clientWidth / 2),
          y: coords.y - (offsetY - clientHeight / 2)
        });
      } else if (type === SHAPE_TYPES.TRANST) {
        // circle x, y is at the center of the circle
        createTransT({
          x: coords.x - 100,
          y: coords.y - 150
        });
      } else if (type === SHAPE_TYPES.PROGT) {
        // circle x, y is at the center of the circle
        createProgT({
          x: coords.x - 100,
          y: coords.y - 150
        });
      } else if (type === SHAPE_TYPES.MACHT) {
        // circle x, y is at the center of the circle
        createMachT({
          x: coords.x - 100,
          y: coords.y - 150
        });
      } else if (type === SHAPE_TYPES.TRANSJ) {
        createTransJ({
          x: coords.x - 100,
          y: coords.y - 150
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
        <button onClick={saveDiagram}>Save</button>
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
