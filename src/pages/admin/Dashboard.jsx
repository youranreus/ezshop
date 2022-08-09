/**
 * @author 季悠然
 * @date 2022-08-09
 */
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {IconPlus, IconDelete, IconMinus} from "@douyinfe/semi-icons";
import {
    TagGroup,
    Toast,
    Typography,
    Button,
    ButtonGroup,
    Col,
    Row,
    Space,
    SideSheet,
    Form,
    Table,
    Avatar
} from "@douyinfe/semi-ui";
import {AddGift, DelGift, QueryThingList} from "../../api/admin";
import {getDate, getQueryJson} from "../../utils";

export default function Dashboard() {
    const navi = useNavigate();
    const [addPanel, setAddPanel] = useState(false);
    const {Title} = Typography;
    const [newItem, setNewItem] = useState({});
    const [itemList, updateItemList] = useState([]);

    /**
     * 表格列定义
     * @type {[{dataIndex: string, title: string, render: (function(*, *, *))},{dataIndex: string, title: string},{dataIndex: string, title: string},{dataIndex: string, title: string, render: (function(*))},{dataIndex: string, title: string, render: (function(*, *, *))},null]}
     */
    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
            render: (text, record, index) => {
                return (
                    <div>
                        <Avatar size="small" shape="square" src={record.path_img} style={{ marginRight: 12 }}></Avatar>
                        {text}
                    </div>
                );
            }
        },
        {
            title: '数量',
            dataIndex: 'num',
        },
        {
            title: '分类',
            dataIndex: 'kind',

        },
        {
            title: '标签',
            dataIndex: 'labels',
            render: (text) => {
                const arr = []
                text.slice(1, -1).split('#').forEach(e => {
                    arr.push({children: e})
                })

                return (<div><TagGroup tagList={arr}/></div>)
            }
        },
        {
            title: "发布时间",
            dataIndex: 'created_at',
            render: (text, record, index) => {
                return (
                    <div>
                        {getDate(text)}
                    </div>
                );
            }
        },
        {
            title: '',
            dataIndex: 'operate',
            render: (text, record, index) => {
                return (
                    <ButtonGroup>
                        <Button type={"primary"} icon={<IconPlus />}/>
                        <Button icon={<IconMinus />}/>
                        <Button type={"danger"} icon={<IconDelete />} onClick={() => handleDelete(record, index)}/>
                    </ButtonGroup>
                );
            }
        },
    ];

    /**
     * 判断登录态
     */
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
        // eslint-disable-next-line
    }, []);

    /**
     * 获取礼品列表
     */
    useEffect(() => {
        QueryThingList().then(res => {
            if(res.data.code !== 200) {
                Toast.info({
                    content: "礼品列表获取出错",
                    duration: 2
                })
            } else {
                updateItemList(res.data.data)
            }
        })
    }, []);

    /**
     * 参数判断
     * @returns {string|boolean}
     */
    const paramCheck = () => {
        const keys = ['title', 'description', 'kind', 'path_img', 'labels', 'num']
        if (!keys.every((key) => Object.hasOwn(newItem, key)))
            return '不能留空噢';
        return false
    }

    /**
     * 确认添加物品回调
     */
    const handleSubmit = () => {
        if (!paramCheck()) {
            newItem.labels = '#' + newItem.labels.join('#') + '#';
            AddGift(newItem).then(res => {
                console.log(res)
                Toast.success({
                    content: `${newItem.title} 添加成功`,
                    duration: 2
                })
            })
        } else {
            Toast.error({
                content: paramCheck(),
                duration: 2
            })
        }
    }

    const handleDelete = (record, index) => {
        DelGift(record.id).then(res => {
            console.log(res.data)
            if (res.data.code === 200) {
                updateItemList(itemList.filter((_, i) => i !== index))
                Toast.success({
                    content: "删除成功",
                    duration: 2
                })
            }
            else
            {
                Toast.error({
                    content: res.data.msg,
                    duration: 2
                })
            }
        })

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

            <div className="thing-list">
                {
                    itemList && <Table columns={columns} dataSource={itemList}/>
                }
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
