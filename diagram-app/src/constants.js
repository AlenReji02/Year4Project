export const SHAPE_TYPES = {
  RECT: "rect",
  CIRCLE: "circle",
  TRANST: "transT",
  PROGT: "progT",
  MACHT: "machT"
};

export const DEFAULTS = {
  RECT: {
    STROKE: "#000000",
    FILL: "#ffffff",
    WIDTH: 150,
    HEIGHT: 100,
    ROTATION: 0
  },
  CIRCLE: {
    STROKE: "#000000",
    FILL: "#ffffff",
    RADIUS: 50
  },
  TRANST: {
    STROKE: "#000000",
    FILL: "#ffffff"
  },
  PROGT: {
    STROKE: "#000000",
    FILL: "#ffffff"
  },
  MACHT: {
    STROKE: "#000000",
    FILL: "#ffffff"
  }
};

export const LIMITS = {
  RECT: {
    MAX: 1000,
    MIN: 10
  },
  CIRCLE: {
    MAX: 500,
    MIN: 5
  },
  TRANST: {
    MAX: 1000,
    MIN: 10
  },
  PROGT: {
    MAX: 1000,
    MIN: 10
  },
  MACHT: {
    MAX: 1000,
    MIN: 10
  }
};

export const DRAG_DATA_KEY = "__drag_data_payload__";
