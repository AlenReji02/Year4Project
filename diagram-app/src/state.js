import { createStore } from "@halka/state";
import produce from "immer";
import clamp from "clamp";
import { nanoid } from "nanoid";

import { SHAPE_TYPES, DEFAULTS, LIMITS } from "./constants";

const APP_NAMESPACE = "__integrtr_diagrams__";

const baseState = {
  selected: null,
  shapes: {}
};

export const useShapes = createStore(() => {
  const initialState = JSON.parse(localStorage.getItem(APP_NAMESPACE));

  return { ...baseState, shapes: initialState ?? {} };
});
const setState = (fn) => useShapes.set(produce(fn));

export const reset = () => {
  localStorage.removeItem(APP_NAMESPACE);

  useShapes.set(baseState);
};

export const refreshPage = () => {
  window.location.reload(false);
}

export const createRectangle = ({ x, y }) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.RECT,
      width: DEFAULTS.RECT.WIDTH,
      height: DEFAULTS.RECT.HEIGHT,
      fill: DEFAULTS.RECT.FILL,
      stroke: DEFAULTS.RECT.STROKE,
      rotation: DEFAULTS.RECT.ROTATION,
      x,
      y
    };
  });
};

export const createCircle = ({ x, y }) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.CIRCLE,
      radius: DEFAULTS.CIRCLE.RADIUS,
      fill: DEFAULTS.CIRCLE.FILL,
      stroke: DEFAULTS.CIRCLE.STROKE,
      x,
      y
    };
  });
};

export const createTransT = ({ x, y }) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.TRANST,
      fill: DEFAULTS.TRANST.FILL,
      stroke: DEFAULTS.TRANST.STROKE,
      x,
      y
    };
  });
};

export const createProgT = ({ x, y }) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.PROGT,
      fill: DEFAULTS.PROGT.FILL,
      stroke: DEFAULTS.PROGT.STROKE,
      strokewidth: 3,
      x,
      y
    };
  });
};

export const createMachT = ({ x, y }) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.MACHT,
      fill: DEFAULTS.MACHT.FILL,
      stroke: DEFAULTS.MACHT.STROKE,
      x,
      y
    };
  });
};

export const createTransJ = ({ x, y }) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.TRANSJ,
      fill: DEFAULTS.TRANSJ.FILL,
      stroke: DEFAULTS.TRANSJ.STROKE,
      x,
      y
    };
  });
};

export const createInterJ = ({ x, y }) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.INTERJ,
      fill: DEFAULTS.INTERJ.FILL,
      stroke: DEFAULTS.INTERJ.STROKE,
      x,
      y
    };
  });
};

export const createCompJ = ({ x, y }) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.COMPJ,
      fill: DEFAULTS.COMPJ.FILL,
      stroke: DEFAULTS.COMPJ.STROKE,
      x,
      y
    };
  });
};

export const createMachJ = ({ x, y }) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.MACHJ,
      fill: DEFAULTS.MACHJ.FILL,
      stroke: DEFAULTS.MACHJ.STROKE,
      x,
      y
    };
  });
};

export const selectShape = (id) => {
  setState((state) => {
    state.selected = id;
  });
};

export const clearSelection = () => {
  setState((state) => {
    state.selected = null;
  });
};

export const moveShape = (id, event) => {
  setState((state) => {
    const shape = state.shapes[id];

    if (shape) {
      shape.x = event.target.x();
      shape.y = event.target.y();
    }
  });
};

export const deleteShape = () => {
  setState((state) => {
    if (state.selected && state.shapes[state.selected]) {
      const newShapes = { ...state.shapes };
      delete newShapes[state.selected];
      return { ...state, selected: null, shapes: newShapes };
    } else {
      return state;
    }
  });
};

export const updateAttribute = (attr, value) => {
  setState((state) => {
    const shape = state.shapes[state.selected];

    if (shape) {
      shape[attr] = value;
    }
  });
};

export const transformRectangleShape = (node, id, event) => {
  // transformer is changing scale of the node
  // and NOT its width or height
  // but in the store we have only width and height
  // to match the data better we will reset scale on transform end
  const scaleX = node.scaleX();
  const scaleY = node.scaleY();

  // we will reset the scale back
  node.scaleX(1);
  node.scaleY(1);

  setState((state) => {
    const shape = state.shapes[id];

    if (shape) {
      shape.x = node.x();
      shape.y = node.y();

      shape.rotation = node.rotation();

      shape.width = clamp(
        // increase the width in order of the scale
        node.width() * scaleX,
        // should not be less than the minimum width
        LIMITS.RECT.MIN,
        // should not be more than the maximum width
        LIMITS.RECT.MAX
      );
      shape.height = clamp(
        node.height() * scaleY,
        LIMITS.RECT.MIN,
        LIMITS.RECT.MAX
      );
    }
  });
};

export const transformCircleShape = (node, id, event) => {
  // transformer is changing scale of the node
  // and NOT its width or height
  // but in the store we have only width and height
  // to match the data better we will reset scale on transform end
  const scaleX = node.scaleX();

  // we will reset the scale back
  node.scaleX(1);
  node.scaleY(1);

  setState((state) => {
    const shape = state.shapes[id];

    if (shape) {
      shape.x = node.x();
      shape.y = node.y();

      shape.radius = clamp(
        (node.width() * scaleX) / 2,
        LIMITS.CIRCLE.MIN,
        LIMITS.CIRCLE.MAX
      );
    }
  });
};

export const transformTransTShape = (node, id, event) => {
  // transformer is changing scale of the node
  // and NOT its width or height
  // but in the store we have only width and height
  // to match the data better we will reset scale on transform end
  const scaleX = node.scaleX();
  const scaleY = node.scaleY();

  // we will reset the scale back
  node.scaleX(1);
  node.scaleY(1);

  setState((state) => {
    const shape = state.shapes[id];

    if (shape) {
      shape.x = node.x();
      shape.y = node.y();

      shape.width = clamp(
        node.width() * scaleX,
        LIMITS.TRANST.MIN,
        LIMITS.TRANST.MAX
      );
      shape.height = clamp(
        node.height() * scaleY,
        LIMITS.TRANST.MIN,
        LIMITS.TRANST.MAX
      );
    }
  });
};