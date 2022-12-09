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

export function InterJ({ id, isSelected, type, ...shapeProps }) {
  const shapeRef = useRef();
  const transformerRef = useRef();

  React.useEffect(() => {
    shapeRef.current.getSelfRect = () => {
      return {
        x: 100,
        y: 150,
        width: 280,
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
          context.moveTo(100, 150);
          context.lineTo(300, 150);
          context.lineTo(300, 250);
          context.quadraticCurveTo(300, 270, 330, 270);
          context.lineTo(370, 270);
          context.quadraticCurveTo(400, 320, 370, 350);
          context.lineTo(290, 350);
          context.quadraticCurveTo(200, 350, 200, 280);
          context.lineTo(200, 230);
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