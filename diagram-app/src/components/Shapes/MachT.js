import React, { useRef, useEffect, useCallback, useState } from "react";
import { Shape, Group, Text } from "react-konva";
import { Html } from "react-konva-utils";

import { selectShape, moveShape } from "../../state";

export function MachT({ id, isSelected, type, ...shapeProps }) {
  const shapeRef = useRef();
  
  const lngtextRef = useRef();

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
      const pos = shapeRef.current.position();
      
      setlngtext({
        ...lngtext,
        x: pos.x + 125,
        y: pos.y + 205
      });
    }
  }, [shapeRef.current]);

  useEffect(() => {
    shapeRef.current.getSelfRect = () => {
      return {
        x: 100,
        y: 150,
        width: 150,
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
    () => {
      setEditing(true);
    },
    []
  );

  const finishtextChange = useCallback(
    (e) => {
      if (e.key === "Enter") {
        setEditing(false);
        setlngtext((lngtext) => ({ ...lngtext, text: e.target.value }));
      }
    },
    [lngtext]
  );

  return (
    <>
      <Group draggable>
        <Shape
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.beginPath();
            context.moveTo(100, 150);
            context.lineTo(250, 150);
            context.lineTo(250, 250);
            context.lineTo(175, 350);
            context.lineTo(100, 250);
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
    </>
  );
}