import './app.scss'
import {BrowserRouter as Router, Routes} from "react-router-dom";
import renderRoutes from "./router/router-config.js";
import route from "./router";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>{renderRoutes(route)}</Routes>
            </Router>
        </div>
    );
}

export default App;
