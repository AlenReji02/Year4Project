import React, { useRef, useEffect, useCallback } from "react";
import { Transformer, Shape } from "react-konva";

import { LIMITS } from "../../constants";
import { selectShape, moveShape, transformTransTShape } from "../../state";

const boundBoxCallbackForTransT = (oldBox, newBox) => {
  // limit resize
  if (
    newBox.width < LIMITS.TRANST.MIN ||
    newBox.height < LIMITS.TRANST.MIN ||
    newBox.width > LIMITS.TRANST.MAX ||
    newBox.height > LIMITS.TRANST.MAX
  ) {
    return oldBox;
  }
  return newBox;
};

export function MachJ({ id, isSelected, type, ...shapeProps }) {
  const shapeRef = useRef();
  const transformerRef = useRef();

  React.useEffect(() => {
    shapeRef.current.getSelfRect = () => {
      return {
        x: 100,
        y: 150,
        width: 270,
        height: 80
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
          context.moveTo(100, 150);
          context.lineTo(370, 150);
          context.lineTo(370, 230);
          context.lineTo(100, 230);
          context.quadraticCurveTo(130, 200, 100, 150);
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
          boundBoxFunc={boundBoxCallbackForTransT}
         />
      )}
    </>
  );
}