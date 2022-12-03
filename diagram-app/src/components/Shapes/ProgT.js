import React, { useRef, useEffect, useCallback } from "react";
import { Transformer, Shape } from "react-konva";

import { LIMITS } from "../../constants";
import { selectShape, moveShape, transformTransTShape } from "../../state";

const boundBoxCallbackForProgT = (oldBox, newBox) => {
  // limit resize
  if (
    newBox.width < LIMITS.PROGT.MIN ||
    newBox.height < LIMITS.PROGT.MIN ||
    newBox.width > LIMITS.PROGT.MAX ||
    newBox.height > LIMITS.PROGT.MAX
  ) {
    return oldBox;
  }
  return newBox;
};

export function ProgT({ id, isSelected, type, ...shapeProps }) {
  const shapeRef = useRef();
  const transformerRef = useRef();

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

  const transformerInitial = {
    x: 100,
    y: 150,
    width: 300,
    height: 200
  }

  return (
    <>
      <Shape
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(100, 150);
          context.lineTo(340, 150);
          context.lineTo(370, 175);
          context.lineTo(370, 225);
          context.lineTo(340, 250);
          context.lineTo(340, 350);
          context.lineTo(100, 350);
          context.lineTo(100, 250);
          context.lineTo(70, 225);
          context.lineTo(70, 175);
          context.closePath();
          context.fillStrokeShape(shape);
        }}
        getSelfRect={{
          x: 0,
          y: 0,
          width: 300,
          height: 200
        }}
        {...shapeProps}
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
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-right",
            "bottom-left",
          ]}
          boundBoxFunc={boundBoxCallbackForProgT}
         />
      )}
    </>
  );
}