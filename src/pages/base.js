/**
 * @author 季悠然
 * @date 2022-08-08
 */
import {Outlet} from "react-router-dom";
import {Layout} from "@douyinfe/semi-ui";
import TopBar from "../components/Header";

export default function Base() {
    const {Header, Content, Footer} = Layout;

    return (
        <div>
            <Header className={"header"}><TopBar/></Header>
            <Content className={"content"}>
                <Outlet/>
            </Content>
            <Footer>
                <div className={"footer"}>
                    <p>made with ❤ by SZTU ACM</p>
                </div>
            </Footer>
        </div>
    );
}