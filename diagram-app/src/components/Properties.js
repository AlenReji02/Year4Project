import React, { useCallback } from "react";
import { Link } from 'react-router-dom';

import { useShapes, updateAttribute } from "../state";

const shapeSelector = (state) => state.shapes[state.selected];

export function Properties() {
  const selectedShape = useShapes(shapeSelector);

  const updateAttr = useCallback((event) => {
    const attr = event.target.name;

    updateAttribute(attr, event.target.value);
  }, []);

  return (
    <aside className="panel">
      <div className="selected">
        <h2>Properties</h2>
        <div className="properties">
          {selectedShape ? (
            <>
              <div className="key">
                Type <span className="value">{selectedShape.type}</span>
              </div>

              <div className="key">
                Stroke{" "}
                <input
                  className="value"
                  id="style1" 
                  name="stroke"
                  type="color"
                  value={selectedShape.stroke}
                  onChange={updateAttr}
                />
              </div>

              <div className="key">
                Fill{" "}
                <input
                  className="value"
                  id="style1" 
                  name="fill"
                  type="color"
                  value={selectedShape.fill}
                  onChange={updateAttr}
                />
              </div>
            </>
          ) : (
            <div className="no-data">Click on a shape to select it and view its properties</div>
          )}
        </div>
      </div>
      
      <div className="info">
        <h2>Support</h2>
        <br></br>
        <h3><Link to='/editor'>Using the editor</Link></h3>
        <br></br>
        <h3><Link to='/t-diagrams'>T Diagrams</Link></h3>
        <br></br>
        <h3><Link to='/j-diagrams'>J Diagrams</Link></h3>
      </div>
    </aside>
  );
}
