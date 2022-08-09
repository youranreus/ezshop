/**
 * @author 季悠然
 * @date 2022-08-08
 */
import { Layout, Col, Row } from '@douyinfe/semi-ui';
import {Outlet} from "react-router-dom";
import {Link} from "react-router-dom";
import '../style/admin.scss';

export default function Admin() {
    const {Header, Content, Footer} = Layout;

    return (
        <div className={"admin"}>
            <Layout>
                <Header>
                    <div className="header">
                        <div style={{margin: "0 0.5rem"}}>
                            <Row>
                                <Col span={12}>礼品Go 后台管理</Col>
                                <Col span={12} style={{textAlign: "right"}}>
                                    <Link to={'/'} className={"return"}>返回前台</Link>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Header>
                <Content>
                    <div style={{marginTop: "3rem"}}>
                        <Outlet/>
                    </div>
                </Content>
                <Footer>
                    <div className="footer">
                        <div style={{margin: "0 0.5rem"}}>
                            <p>made with ❤ by SZTU ACM</p>
                        </div>
                    </div>
                </Footer>
            </Layout>
        </div>
    )
}