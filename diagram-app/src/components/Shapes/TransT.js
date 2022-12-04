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

export function TransT({ id, isSelected, type, ...shapeProps }) {
  const shapeRef = useRef();
  const transformerRef = useRef();

  React.useEffect(() => {
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
          context.moveTo(100, 150);
          context.lineTo(400, 150);
          context.lineTo(400, 250);
          context.lineTo(300, 250);
          context.lineTo(300, 350);
          context.lineTo(200, 350);
          context.lineTo(200, 250);
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
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-right",
            "bottom-left",
          ]}
          boundBoxFunc={boundBoxCallbackForTransT}
         />
      )}
    </>
  );
}
