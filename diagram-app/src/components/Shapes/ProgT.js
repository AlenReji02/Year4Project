import React, { useRef, useEffect, useCallback, useState } from "react";
import { Transformer, Shape, Group, Text } from "react-konva";
import { Html } from "react-konva-utils";

import { LIMITS } from "../../constants";
import { selectShape, moveShape, transformTransTShape } from "../../state";

export function ProgT({ id, isSelected, type, ...shapeProps }) {
  const shapeRef = useRef();
  
  const prgtextRef = useRef();
  const lngtextRef = useRef();

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

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (shapeRef.current) {
      const { x, y, width, height } = shapeRef.current.getClientRect();
      setprgtext({
        ...prgtext,
        x: x + 55,
        y: y + 35
      });
      setlngtext({
        ...lngtext,
        x: x + 55,
        y: y + 135
      });
    }
  }, [shapeRef.current]);

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
    </>
  );
}