import React, { useRef, useEffect, useCallback, useState } from "react";
import { Rect as KonvaRectangle, Group, Text } from "react-konva";
import { Html } from "react-konva-utils";

import { LIMITS } from "../../constants";
import { selectShape, moveShape } from "../../state";

export function InterT({ id, isSelected, type, ...shapeProps }) {
  const shapeRef = useRef();
  
  const srctextRef = useRef();
  const lngtextRef = useRef();

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

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (shapeRef.current) {
      const pos = shapeRef.current.position();
      
      setsrctext({
        ...srctext,
        x: pos.x + 25,
        y: pos.y + 40
      });
      setlngtext({
        ...lngtext,
        x: pos.x + 25,
        y: pos.y + 140
      });
    }
  }, [shapeRef.current]);

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
    [srctext, lngtext]
  );

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

  return (
    <>
      <Group draggable>
        <KonvaRectangle
          onClick={handleSelect}
          onTap={handleSelect}
          onDragStart={handleSelect}
          ref={shapeRef}
          {...shapeProps}
          onDragEnd={handleDrag}
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
    </>
  );
}
