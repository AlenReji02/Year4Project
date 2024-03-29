import React, { useRef, useEffect, useCallback, useState } from "react";
import { Transformer, Shape, Group, Text } from "react-konva";
import { Html } from "react-konva-utils";

import { selectShape, moveShape, transformTransTShape } from "../../state";

// T Diagram Program Component
export function ProgT({ id, isSelected, type, ...shapeProps }) {

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
  const prgtextRef = useRef();
  const lngtextRef = useRef();

  // Text States
  const [prgtext, setprgtext] = useState({
    text: "program",
    x: 0,
    y: 0
  });
  const [lngtext, setlngtext] = useState({
    text: "language",
    x: 0,
    y: 0
  });
  const [seltext, setseltext] = useState({
    text: null,
    x: 0,
    y: 0
  });

  // Text Editing State
  const [editing, setEditing] = useState(false);

  // Update Text Positions on Shape Move
  useEffect(() => {
    if (shapeRef.current) {
      const pos = shapeRef.current.position();
      
      setprgtext({
        ...prgtext,
        x: pos.x + 125,
        y: pos.y + 195
      });
      setlngtext({
        ...lngtext,
        x: pos.x + 125,
        y: pos.y + 290
      });
    }
  }, [shapeRef.current]);

  // Define SelfRect for Shape
  useEffect(() => {
    shapeRef.current.getSelfRect = () => {
      return {
        x: 70,
        y: 150,
        width: 210,
        height: 200
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
      // Set Edit State and Selected Text State
      setEditing(true);
      setseltext((seltext) => ({
        ...seltext,
        text: text.text,
        x: text.x,
        y: text.y
      }));
    },
    [prgtext, lngtext]
  );

  // Update Selected Text
  const finishtextChange = useCallback(
    (e) => {
      if (e.key === "Enter") {
        setEditing(false);
        if (seltext.x === prgtext.x && seltext.y === prgtext.y) {
          setprgtext((prgtext) => ({ ...prgtext, text: e.target.value }));
        } else if (seltext.x === lngtext.x && seltext.y === lngtext.y) {
          setlngtext((lngtext) => ({ ...lngtext, text: e.target.value }));
        }
      }
    },
    [seltext, prgtext, lngtext]
  );

  // Return a Grouped Konva component containing the custom Shape, Text, and Transformer
  return (
    <>
      <Group draggable>
      <Shape
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(100, 150);
          context.lineTo(250, 150);
          context.lineTo(280, 175);
          context.lineTo(280, 225);
          context.lineTo(250, 250);
          context.lineTo(250, 350);
          context.lineTo(100, 350);
          context.lineTo(100, 250);
          context.lineTo(70, 225);
          context.lineTo(70, 175);
          context.closePath();
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
          ref={prgtextRef}
          x={prgtext.x}
          y={prgtext.y}
          text={prgtext.text}
          fontSize={16}
          width={100}
          padding={5}
          align="center"
          fill="black"
          listening={true}
          onDblClick={handleDblClick({ ...prgtext })}
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
          onDblClick={handleDblClick({ ...lngtext })}
        />
        <Html>
          {editing && (
            <input
              placeholder={seltext.text}
              onKeyDown={finishtextChange}
              contentEditable={true}
              suppressContentEditableWarning={true}
              style={{
                position: "absolute",
                top: seltext.y,
                left: seltext.x,
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