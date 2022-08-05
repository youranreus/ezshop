import './app.scss'
import { BrowserRouter as Router, Routes } from "react-router-dom";
import renderRoutes from "./router/router-config.js";
import route from "./router";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="content">
          <Routes>{renderRoutes(route)}</Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
