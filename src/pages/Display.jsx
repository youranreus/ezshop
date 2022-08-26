/**
 * @author 季悠然
 * @date 2022-08-08
 */
import {Outlet} from "react-router-dom";
import {Layout} from "@douyinfe/semi-ui";
import TopBar from "../components/Header";
import '../style/display.scss';

export default function Display() {
    const {Header, Content, Footer} = Layout;

    return (
        <div className={"display"}>
            <Header className={"header"}><TopBar/></Header>
            <Content className={"content"}>
                <Outlet/>
            </Content>
            <Footer>
                <div className={"footer"}>
                    <p>made with ❤ by S-ACM</p>
                </div>
            </Footer>
        </div>
    );
}