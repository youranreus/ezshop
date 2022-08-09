/**
 * @author 季悠然
 * @date 2022-08-09
 */
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {IconPlus} from "@douyinfe/semi-icons";
import {Toast, Typography, Button, ButtonGroup, Col, Row, Space, SideSheet, Form} from "@douyinfe/semi-ui";

export default function Dashboard() {
    const navi = useNavigate();
    const [addPanel, setAddPanel] = useState(false);
    const {Title} = Typography;
    const [newItem, setNewItem] = useState({
        title: '',
        description: '',
        kind: '',
        path_img: '',
        labels: '',
        num: 0
    });

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

    const handleSubmit = () => {
        console.log(newItem)
    }

    const footer = (
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button theme="solid" onClick={handleSubmit}>添加</Button>
        </div>
    );

    return (
        <div className={"dashboard"}>
            <div className="head">
                <Row>
                    <Col span={12}>
                        <Title heading={3}>物品管理</Title>
                    </Col>
                    <Col span={12} className={"right"}>
                        <Space>
                            <Button icon={<IconPlus/>} theme={"solid"} onClick={() => {
                                setAddPanel(true)
                            }}>添加礼品</Button>
                            <ButtonGroup type={"secondary"}>
                                <Button>上架礼品</Button>
                                <Button>下架礼品</Button>
                            </ButtonGroup>
                        </Space>
                    </Col>
                </Row>
            </div>
            <SideSheet title={"添加礼品"} keepDOM={true} footer={footer} visible={addPanel} onCancel={() => {
                setAddPanel(false)
            }}>
                <div className="add-panel">
                    <Form onChange={(v) => {
                        setNewItem(v.values)
                    }}>
                        <Form.Input field={'title'} label={'标题'}/>
                        <Row>
                            <Col span={12}>
                                <Form.Input field={'kind'} label={'分类'} style={{width: "90%"}}/>
                            </Col>
                            <Col span={12}>
                                <Form.InputNumber field={'num'} label={'数量'} min={0}/>
                            </Col>
                        </Row>
                        <Form.Input field={'path_img'} label={'图片url'}/>
                        <Form.TagInput field={'labels'} label={'标签'}/>
                        <Form.TextArea field={'description'} label={'描述'}/>
                    </Form>
                </div>
            </SideSheet>
        </div>
    )
}
