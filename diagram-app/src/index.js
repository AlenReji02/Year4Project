import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from "./App";
import { EditorHelp } from "./pages/EditorHelp";
import TDiagram from "./pages/TDiagram";
import JDiagram from "./pages/JDiagram";

function renderApp(NextApp) {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NextApp />} />
          <Route path="/editor" element={<EditorHelp />} />
          <Route path="/t-diagrams" element={<TDiagram />} />
          <Route path="/j-diagrams" element={<JDiagram />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept("./App", () => {
      const NextApp = require("./App").default;

      renderApp(NextApp);
    });
  }
}

renderApp(App);
