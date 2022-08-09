/**
 * @author 季悠然
 * @date 2022-08-09
 */
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {IconPlus} from "@douyinfe/semi-icons";
import {Toast, Typography, Button, ButtonGroup, Col, Row, Space} from "@douyinfe/semi-ui";

export default function Dashboard() {
    const navi = useNavigate();
    const {Title} = Typography;

    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            Toast.info({
                content: '请先登录',
                duration: 2
            })
            navi('/admin/login');
        } else {
            Toast.info({
                content: '自动登录成功',
                duration: 2
            })
        }
    }, [])

    return (
        <div className={"dashboard"}>
            <div className="head">
                <Row>
                    <Col span={12}>
                        <Title heading={3}>物品管理</Title>
                    </Col>
                    <Col span={12} className={"right"}>
                        <Space>
                            <Button icon={<IconPlus/>} theme={"solid"}>添加礼品</Button>
                            <ButtonGroup type={"secondary"}>
                                <Button>上架礼品</Button>
                                <Button>下架礼品</Button>
                            </ButtonGroup>
                        </Space>
                    </Col>
                </Row>
            </div>

        </div>
    )
}
