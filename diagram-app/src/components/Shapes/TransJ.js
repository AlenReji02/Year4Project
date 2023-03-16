import React, { useRef, useEffect, useCallback, useState } from "react";
import { Shape, Group, Text, Transformer } from "react-konva";
import { Html } from "react-konva-utils";

import { selectShape, moveShape } from "../../state";

export function TransJ({ id, isSelected, type, ...shapeProps }) {
  const shapeRef = useRef();
  const transformerRef = useRef();

  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

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
        x: pos.x + 120,
        y: pos.y + 180
      });
      settgttext({
        ...tgttext,
        x: pos.x + 280,
        y: pos.y + 180
      });
      setlngtext({
        ...lngtext,
        x: pos.x + 280,
        y: pos.y + 300
      });
    }
  }, [shapeRef.current]);

  useEffect(() => {
    shapeRef.current.getSelfRect = () => {
      return {
        x: 100,
        y: 150,
        width: 300,
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
            context.lineTo(370, 150);
            context.quadraticCurveTo(400, 200, 370, 230);
            context.lineTo(300, 230);
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