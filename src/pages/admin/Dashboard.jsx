/**
 * @author 季悠然
 * @date 2022-08-09
 */
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {IconPlus, IconDelete, IconEdit} from "@douyinfe/semi-icons";
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
import {AddGift, DelGift, QueryThingList, UpdateGift} from "../../api/admin";
import NumEditor from "./NumEditor";

export default function Dashboard() {
    const navi = useNavigate();
    const [addPanel, setAddPanel] = useState(false);
    const [editPanel, setEditPanel] = useState(false);
    const {Title} = Typography;
    const [newItem, setNewItem] = useState({});
    const [itemList, updateItemList] = useState([]);
    const [selectedList, setSelectedList] = useState([]);

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
            title: '状态',
            dataIndex: 'is_active',
            render: (text, record) => <div>{record.is_active ? "已上架" : "已下架"}</div>
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
            title: '数量操作',
            dataIndex: 'numOperate',
            render: (text, record, index) => {
                return (
                    <NumEditor record={record} index={index} handler={handleUpdateNum}/>
                );
            }
        },
        {
            title: '其他操作',
            dataIndex: 'otherOperate',
            render: (text, record, index) => {
                return (
                    <ButtonGroup>
                        <Button icon={<IconEdit />} onClick={() => handleEditOpen(record, index)}/>
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
            Toast.info('请先登录')
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
                Toast.info(res.data.msg)
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
                if(res.data.code === 200) {
                    updateItemList([res.data.data].concat(itemList));
                    Toast.success(`${newItem.title} 添加成功`)
                } else {
                    Toast.error(res.data.msg)
                }
            })
        } else {
            Toast.error({
                content: paramCheck(),
                duration: 2
            })
        }
    }

    /**
     * 处理礼品删除回调
     * @param record
     * @param index
     */
    const handleDelete = (record, index) => {
        DelGift(record.id).then(res => {
            console.log(res.data)
            if (res.data.code === 200) {
                updateItemList(itemList.filter((_, i) => i !== index))
                Toast.success("删除成功")
            }
            else
                Toast.error(res.data.msg)
        })

    }

    /**
     * 数量调整回调
     * @param record
     * @param index
     * @param num
     */
    const handleUpdateNum = (record, index, num = 1) => {
        if(record.num + num < 0)
            Toast.error("数量不能小于0")
        else {
            UpdateGift({id: record.id, num: record.num + num}).then(res => {
                if(res.data.code === 200) {
                    const arr = [].concat(itemList);
                    arr[index].num = record.num + num;
                    updateItemList(arr)
                }
                else
                    Toast.error(res.data.msg)
            })
        }
    }

    /**
     * 礼品开启修改回调
     * @param record
     * @param index
     */
    const handleEditOpen = (record, index) => {
        const obj = {...record}
        obj.labels = obj.labels.slice(1, -1).split("#")
        setNewItem(obj);
        setEditPanel(true);
    }

    /**
     * 礼品修改回调
     */
    const handleEdit = () => {
        const obj = {}
        const keys = ['id', 'title', 'description', 'kind', 'path_img', 'labels', 'num']
        keys.forEach(key => { obj[key] = newItem[key] })
        obj.labels = '#' + obj.labels.join('#') + '#'

        UpdateGift(obj).then(res => {
            if(res.data.code === 200) {
                const arr = [].concat(itemList)
                arr.forEach(e => {
                    if (e.id === obj.id)
                        keys.forEach(key => e[key] = obj[key])
                })

                updateItemList(arr)
                Toast.success(`${obj.title} 修改成功`)
            } else
                Toast.success(res.data.msg)
        })
    }

    /**
     * 行操作handlers
     */
    const rowSelection = {
        getCheckboxProps: record => ({
            name: record.title,
        }),
        onSelect: (record, selected) => {
            setSelectedList([record].concat(selectedList))
        },
        onSelectAll: (selected, selectedRows) => {
            setSelectedList(selectedRows)
        }
    };

    /**
     * 批量上下架
     * @param status
     */
    const handleActive = (status) => {
        const arr = []
        selectedList.forEach(e => {
            arr.push(UpdateGift({
                id: e.id,
                is_active: status
            }))
        })

        Promise.all(arr).then(res => {
            for(const e of res)
                if(e.data.code !== 200)
                    throw new Error(e.data.msg)

            const list = [].concat(itemList)
            selectedList.forEach(e => {
                list[list.findIndex(item => item.id === e.id)].is_active = status
            })
            updateItemList(list)
            Toast.success("操作成功")
        }).catch(e => {
            Toast.error(e.message)
        })
    }

    const AddFooter = (
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button theme="solid" onClick={handleSubmit}>添加</Button>
        </div>
    );

    const EditFooter = (
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button theme="solid" onClick={handleEdit}>修改</Button>
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
                                <Button onClick={() => handleActive(true)}>批量上架礼品</Button>
                                <Button onClick={() => handleActive(false)}>批量下架礼品</Button>
                            </ButtonGroup>
                        </Space>
                    </Col>
                </Row>
            </div>

            <div className="thing-list">
                {
                    itemList && <Table columns={columns} dataSource={itemList} rowSelection={rowSelection} rowKey={'id'}/>
                }
            </div>

            <SideSheet title={"添加礼品"} keepDOM={true} footer={AddFooter} visible={addPanel} onCancel={() => {
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

            <SideSheet title={"修改礼品"} footer={EditFooter} visible={editPanel} onCancel={() => {
                setEditPanel(false)
            }}>
                <div className="edit-panel">
                    <Form onChange={(v) => {
                        setNewItem(v.values)
                    }} initValues={newItem}>
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
