import React, { useRef, useEffect, useCallback } from "react";
import { Transformer, Shape } from "react-konva";

import { selectShape, moveShape } from "../../state";

export function TransT({ id, isSelected, type, ...shapeProps }) {
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
        onClick={handleSelect}
        onTap={handleSelect}
        onDragStart={handleSelect}
        ref={shapeRef}
      />
      {isSelected && (
        <Transformer anchorSize={5} borderDash={[6, 2]} ref={transformerRef} />
      )}
    </>
  );
}
