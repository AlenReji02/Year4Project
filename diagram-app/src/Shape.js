import React, { useCallback } from "react";

import { SHAPE_TYPES } from "./constants";
import { useShapes } from "./state";
import { Circle } from "./Components/Shapes/Circle";
import { Rectangle } from "./Components/Shapes/Rectangle";
import { TransT } from "./Components/Shapes/TransT";
import { ProgT } from "./Components/Shapes/ProgT";
import { MachT } from "./Components/Shapes/MachT";
import { TransJ } from "./Components/Shapes/TransJ";
import { InterJ } from "./Components/Shapes/InterJ";
import { CompJ } from "./Components/Shapes/CompJ";
import { MachJ } from "./Components/Shapes/MachJ";

export function Shape({ shape }) {
  const isSelectedSelector = useCallback(
    (state) => state.selected === shape.id,
    [shape]
  );
  const isSelected = useShapes(isSelectedSelector);

  if (shape.type === SHAPE_TYPES.RECT) {
    return <Rectangle {...shape} isSelected={isSelected} />;
  } else if (shape.type === SHAPE_TYPES.CIRCLE) {
    return <Circle {...shape} isSelected={isSelected} />;
  } else if (shape.type === SHAPE_TYPES.TRANST) {
    return <TransT {...shape} isSelected={isSelected} />;
  } else if (shape.type === SHAPE_TYPES.PROGT) {
    return <ProgT {...shape} isSelected={isSelected} />;
  } else if (shape.type === SHAPE_TYPES.MACHT) {
    return <MachT {...shape} isSelected={isSelected} />;
  } else if (shape.type === SHAPE_TYPES.TRANSJ) {
    return <TransJ {...shape} isSelected={isSelected} />;
  } else if (shape.type === SHAPE_TYPES.INTERJ) {
    return <InterJ {...shape} isSelected={isSelected} />;
  } else if (shape.type === SHAPE_TYPES.COMPJ) {
    return <CompJ {...shape} isSelected={isSelected} />;
  } else if (shape.type === SHAPE_TYPES.MACHJ) {
    return <MachJ {...shape} isSelected={isSelected} />;
  }
  return null;
}
