import React, { useRef, useEffect, useCallback, useState } from "react";
import { Shape, Group, Text, Transformer } from "react-konva";
import { Html } from "react-konva-utils";

import { selectShape, moveShape } from "../../state";

// J Diagram Interpreter Component
export function InterJ({ id, isSelected, type, ...shapeProps }) {

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
  const srctextRef = useRef();
  const lngtextRef = useRef();

  // Text States
  const [srctext, setsrctext] = useState({
    text: "source",
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
      
      setsrctext({
        ...srctext,
        x: pos.x + 120,
        y: pos.y + 180
      });
      setlngtext({
        ...lngtext,
        x: pos.x + 280,
        y: pos.y + 300
      });
    }
  }, [shapeRef.current]);

  // Define Self Rect for Shape
  useEffect(() => {
    shapeRef.current.getSelfRect = () => {
      return {
        x: 100,
        y: 150,
        width: 280,
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
    [srctext, lngtext]
  );

  // Update Selected Text
  const finishtextChange = useCallback(
    (e) => {
      if (e.key === "Enter") {
        setEditing(false);
        if (seltext.x === srctext.x && seltext.y === srctext.y) {
          setsrctext((srctext) => ({ ...srctext, text: e.target.value }));
        } else if (seltext.x === lngtext.x && seltext.y === lngtext.y) {
          setlngtext((lngtext) => ({ ...lngtext, text: e.target.value }));
        }
      }
    },
    [seltext, srctext, lngtext]
  );

  // Return grouped Konva component with custom Shape, Text, and Transformer
  return (
    <>
      <Group draggable>
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
          onClick={handleSelect}
          onTap={handleSelect}
          onDragStart={handleSelect}
          onDragEnd={handleDrag}
          ref={shapeRef}
        />
        <Text
            ref={srctextRef}
            x={srctext.x}
            y={srctext.y}
            text={srctext.text}
            fontSize={16}
            width={100}
            padding={5}
            align="center"
            fill="black"
            listening={true}
            onDblClick={handleDblClick({ ...srctext })}
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