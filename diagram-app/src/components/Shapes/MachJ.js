import React, { useRef, useEffect, useCallback, useState } from "react";
import { Shape, Group, Text, Transformer } from "react-konva";
import { Html } from "react-konva-utils";

import { selectShape, moveShape } from "../../state";

// J Diagram Machine Component
export function MachJ({ id, isSelected, type, ...shapeProps }) {

  // Shape and Transformer Refs
  const shapeRef = useRef();
  const transformerRef = useRef();

  // Update Transformer on Shape Select
  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  // Text Refs
  const lngtextRef = useRef();

  // Text States
  const [lngtext, setlngtext] = useState({
    text: "language",
    x: 0,
    y: 0
  });

  // Text Editing State
  const [editing, setEditing] = useState(false);

  // Update Text Positions on Shape Move
  useEffect(() => {
    if (shapeRef.current) {
      const pos = shapeRef.current.position();
      
      setlngtext({
        ...lngtext,
        x: pos.x + 250,
        y: pos.y + 180
      });
    }
  }, [shapeRef.current]);

  // Define Self Rect for Shape
  useEffect(() => {
    shapeRef.current.getSelfRect = () => {
      return {
        x: 100,
        y: 150,
        width: 270,
        height: 80
      };
    };
  }, []);

  // Define Select, Drag, and DblClick Event Handlers
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

  const handleDblClick = useCallback(
    (text) => () => {
      // Set Edit State
      setEditing(true);
    },
    []
  );

  // Update Selected Text
  const finishtextChange = useCallback(
    (e) => {
      if (e.key === "Enter") {
        setEditing(false);
        setlngtext((lngtext) => ({ ...lngtext, text: e.target.value }));
      }
    },
    [lngtext]
  );

  // Return a Grouped Konva component containing the custom Shape, Text, and Transformer
  return (
    <>
      <Group draggable>
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
          onClick={handleSelect}
          onTap={handleSelect}
          onDragStart={handleSelect}
          onDragEnd={handleDrag}
          ref={shapeRef}
        />
        <Text
          ref={lngtextRef}
          x={lngtext.x}
          y={lngtext.y}
          text={lngtext.text}
          fontSize={16}
          width={100}
          padding={5}
          align="center"
          fill="black"
          listening={true}
          onDblClick={handleDblClick}
        />
        <Html>
          {editing && (
            <input
              placeholder={lngtext.text}
              onKeyDown={finishtextChange}
              contentEditable={true}
              suppressContentEditableWarning={true}
              style={{
                position: "absolute",
                top: lngtext.y,
                left: lngtext.x,
                width: "100px",
                height: "20px",
                fontSize: 16,
                padding: 5,
                align: "center",
                border: "1px solid black",
                backgroundColor: "white",
                zIndex: 1
              }}
            />
          )}
        </Html>
      </Group>
      {isSelected && (
        <Transformer
          anchorSize={5}
          borderDash={[6, 2]}
          enabledAnchors={[]}
          rotateEnabled={false}
          ref={transformerRef}
        />
      )}
    </>
  );
}