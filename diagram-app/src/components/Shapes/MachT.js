import React, { useRef, useEffect, useCallback } from "react";
import { Transformer, Shape } from "react-konva";

import { LIMITS } from "../../constants";
import { selectShape, moveShape, transformTransTShape } from "../../state";

const boundBoxCallbackForMachT = (oldBox, newBox) => {
  // limit resize
  if (
    newBox.width < LIMITS.MACHT.MIN ||
    newBox.height < LIMITS.MACHT.MIN ||
    newBox.width > LIMITS.MACHT.MAX ||
    newBox.height > LIMITS.MACHT.MAX
  ) {
    return oldBox;
  }
  return newBox;
};

export function MachT({ id, isSelected, type, ...shapeProps }) {
  const shapeRef = useRef();
  const transformerRef = useRef();

  useEffect(() => {
    shapeRef.current.getSelfRect = () => {
      return {
        x: 100,
        y: 150,
        width: 300,
        height: 200
      };
    };
  }, []);

  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleSelect = useCallback(
    (event) => {
      event.cancelBubble = true;

      selectShape(id);
    },
    [id]
  );

  const handleDrag = useCallback(
    (event) => {
      moveShape(id, event);
    },
    [id]
  );

  const handleTransform = useCallback(
    (event) => {
      transformTransTShape(shapeRef.current, id, event);
    },
    [id]
  );

  return (
    <>
      <Shape
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.beginPath();
          context.moveTo(100, 150);
          context.lineTo(400, 150);
          context.lineTo(400, 250);
          context.lineTo(250, 350);
          context.lineTo(100, 250);
          context.closePath();
          context.fillStrokeShape(shape);
        }}
        {...shapeProps}
        draggable
        onClick={handleSelect}
        onTap={handleSelect}
        onDragStart={handleSelect}
        onDragEnd={handleDrag}
        ref={shapeRef}
        onTransformEnd={handleTransform}
      />
      {isSelected && (
        <Transformer 
          anchorSize={5}
          borderDash={[6, 2]}
          ref={transformerRef}
          rotateEnabled={false}
          boundBoxFunc={boundBoxCallbackForMachT}
         />
      )}
    </>
  );
}