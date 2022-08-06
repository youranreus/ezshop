import './app.scss'
import {BrowserRouter as Router, Routes} from "react-router-dom";
import renderRoutes from "./router/router-config.js";
import {Layout} from '@douyinfe/semi-ui';
import TopBar from './components/Header'
import route from "./router";

function App() {
    const {Header, Footer, Content} = Layout;

    return (
        <div className="App">
            <Layout>
                <Header className={"header"}><TopBar/></Header>
                <Content>
                    <Router>
                        <Routes>{renderRoutes(route)}</Routes>
                    </Router>
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </div>
    );
}

export default App;
