export const SHAPE_TYPES = {
  RECT: "rect",
  CIRCLE: "circle",
  TRANST: "transT",
  PROGT: "progT",
  MACHT: "machT",
  TRANSJ: "transJ",
  INTERJ: "interJ",
  COMPJ: "compJ",
  MACHJ: "machJ"
};

export const DEFAULTS = {
  RECT: {
    STROKE: "#000000",
    FILL: "#ffffff",
    WIDTH: 150,
    HEIGHT: 200,
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
  },
  TRANSJ: {
    STROKE: "#000000",
    FILL: "#ffffff"
  },
  INTERJ: {
    STROKE: "#000000",
    FILL: "#ffffff"
  },
  COMPJ: {
    STROKE: "#000000",
    FILL: "#ffffff"
  },
  MACHJ: {
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
  },
  TRANSJ: {
    MAX: 1000,
    MIN: 10
  },
  INTERJ: {
    MAX: 1000,
    MIN: 10
  },
  COMPJ: {
    MAX: 1000,
    MIN: 10
  },
  MACHJ: {
    MAX: 1000,
    MIN: 10
  }
};

export const DRAG_DATA_KEY = "__drag_data_payload__";
