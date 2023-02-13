import React, { useRef, useEffect, useCallback, useState } from "react";
import { Transformer, Shape, Group, Text, Arrow } from "react-konva";
import { Html } from "react-konva-utils";

import { selectShape, moveShape } from "../../state";

export function TransT({ id, isSelected, type, ...shapeProps }) {
  const shapeRef = useRef();
  
  const srctextRef = useRef();
  const tgttextRef = useRef();
  const lngtextRef = useRef();

  const [srctext, setsrctext] = useState({
    text: "source",
    x: 0,
    y: 0
  });
  const [tgttext, settgttext] = useState({
    text: "target",
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
        x: pos.x + 115,
        y: pos.y + 185
      });
      settgttext({
        ...tgttext,
        x: pos.x + 335,
        y: pos.y + 185
      });
      setlngtext({
        ...lngtext,
        x: pos.x + 225,
        y: pos.y + 285
      });
    }
  }, [shapeRef.current]);

  useEffect(() => {
    shapeRef.current.getSelfRect = () => {
      return {
        x: 100,
        y: 150,
        width: 350,
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
    [srctext, tgttext, lngtext]
  );

  const finishtextChange = useCallback(
    (e) => {
      if (e.key === "Enter") {
        setEditing(false);
        if (seltext.x === srctext.x && seltext.y === srctext.y) {
          setsrctext((srctext) => ({ ...srctext, text: e.target.value }));
        } else if (seltext.x === tgttext.x && seltext.y === tgttext.y) {
          settgttext((tgttext) => ({ ...tgttext, text: e.target.value }));
        } else if (seltext.x === lngtext.x && seltext.y === lngtext.y) {
          setlngtext((lngtext) => ({ ...lngtext, text: e.target.value }));
        }
      }
    },
    [seltext, srctext, tgttext, lngtext]
  );

  return (
    <>
      <Group draggable>
        <Shape
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(100, 150);
            context.lineTo(450, 150);
            context.lineTo(450, 250);
            context.lineTo(350, 250);
            context.lineTo(350, 350);
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
          ref={tgttextRef}
          x={tgttext.x}
          y={tgttext.y}
          text={tgttext.text}
          fontSize={16}
          width={100}
          padding={5}
          align="center"
          fill="black"
          listening={true}
          onDblClick={handleDblClick({ ...tgttext })}
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
        <Arrow
          x={srctext.x + 110}
          y={srctext.y + 12}
          points={[0, 0, 100, 0]}
          fill="black"
          stroke="black"
          strokeWidth={2}
        />
      </Group>
    </>
  );
}
