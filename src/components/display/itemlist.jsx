/**
 * @author 背锅切图仔
 * @date 2022-08-10
 */

import React, { useEffect, useState } from 'react';
import { List, Skeleton, Button, Avatar } from '@douyinfe/semi-ui';
import { SideSheet, Space, Banner } from '@douyinfe/semi-ui';
import PubSub from 'pubsub-js'
import { QueryThingList } from '../../api/gift'
import '../../style/itemlist.scss'

let count = 0;
const once = 3;
let data = [];

let setObj = {
    "filter": {
        "kind": ["like", ""],
        // "labels": ["like", ["玩偶", "真实"]]
        "labels": ["like", ""]
    },
    "order": {
        "created_at": "desc"
    },
    "page": 1,
    "per_page": 10
}

export default function LoadMoreList() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [list, setList] = useState([]);
    const [noMore, setNoMore] = useState(false);
    const [visible, setVisible] = useState(false);
    // const [kind, setKind] = useState("");
    const [detailData, setDetailData] = useState({})

    // console.log('labels: ', labels)

    function fetchData() {
        let placeholders = [0, 1, 2].map(key => ({ loading: true }));
        setLoading(true);
        setList([...dataSource, ...placeholders]);

        return new Promise((res, rej) => {
            setTimeout(() => {
                let newDataSource = data.slice(count * once, count * once + once);
                res(newDataSource);
            }, 1000);
        }).then(newDataSource => {
            let newData = [...dataSource, ...newDataSource];
            setLoading(false);
            setDataSource(newData);
            setList(newData);
            setNoMore(!newDataSource.length);
        });
    };

    useEffect(() => {
        QueryThingList(setObj).then(res => {
            data = res.data.data.filter((dataObj) => {
                return dataObj["is_active"] === true
            })
            console.log('data: ', data)
            for (let i = 0; i < data.length; i++) {
                data[i]['loading'] = false
            }
        })
        fetchData();

        // 排序功能
        const order_token = PubSub.subscribe('order', (_, order_get) => {
            if (order_get === "priceh") {
                setObj["order"] = { "created_at": "desc" }
            }
            else if (order_get === "pricel") {
                setObj["order"] = { "created_at": "asc" }
            }
            else if (order_get === "default") {
                if (setObj["order"]) {
                    setObj["order"] = undefined
                }
            }
            console.log(setObj)
            QueryThingList(setObj).then(res => {
                data = res.data.data.filter((dataObj) => {
                    return dataObj["is_active"] === true
                })
                console.log('data: ', data)
                for (let i = 0; i < data.length; i++) {
                    data[i]['loading'] = false
                }
            })
            setList([]);
            fetchData()
        })

        // 检索功能
        const search_token = PubSub.subscribe('search', (_, search_get) => {
            console.log(search_get)
            QueryThingList(setObj).then(res => {
                data = res.data.data.filter((dataObj) => {
                    return dataObj["title"].includes(search_get) && dataObj["is_active"] === true
                })
                console.log('data: ', data)
                for (let i = 0; i < data.length; i++) {
                    data[i]['loading'] = false
                }
            })
            setList([]);
            fetchData()
        })

        // 高级筛选-筛选分类功能
        const kind_token = PubSub.subscribe('kind', (_, kind_get) => {
            // setObj["filter"]["kind"][0] = kind_get[0]
            // console.log('setObj: ', setObj)
            // QueryThingList(setObj).then(res => {
            //     console.log(res.data)
            //     console.log(res.data.data)
            //     data = res.data.data.filter((dataObj) => {
            //         return dataObj["is_active"] === true
            //     })
            //     console.log('data: ', data)
            //     for (let i = 0; i < data.length; i++) {
            //         data[i]['loading'] = false
            //     }
            // })
            // setList([]);
            // fetchData()
        })

        // 高级筛选-筛选标签功能
        const labels_token = PubSub.subscribe('labels', (_, labels_get) => {
            if (labels_get.length === 0) { setObj["filter"]["labels"][1] = "" }
            else { setObj["filter"]["labels"][1] = labels_get[0] }
            QueryThingList(setObj).then(res => {
                data = res.data.data.filter((dataObj) => {
                    return dataObj["is_active"] === true
                })
                console.log('data: ', data)
                for (let i = 0; i < data.length; i++) {
                    data[i]['loading'] = false
                }
            })
            setList([]);
            fetchData()
        })

        return () => { // 在组件卸载前执行
            PubSub.unsubcribe(order_token);
            PubSub.unsubcribe(search_token);
            PubSub.unsubcribe(kind_token);
            PubSub.unsubcribe(labels_token);
        }
    }, [])

    function onLoadMore() {
        count++;
        fetchData();
    }

    const loadMore =
        !loading && !noMore ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={() => onLoadMore()}>显示更多</Button>
            </div>
        ) : null;

    const placeholder = (
        <div>
            <Skeleton.Avatar />
            <div>
                <Skeleton.Title />
                <Skeleton.Paragraph />
            </div>
        </div>
    );

    function advancedFooter() {
        return (<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Space>
                <Button onClick={change}>退出</Button>
                <Button theme='borderless' >点赞</Button>
                <Button theme='borderless' >收藏</Button>
                <Button theme='solid' onClick={change}>购买</Button>
            </Space>
        </div>)
    }

    function change() {
        setVisible(!visible);
    };

    return (
        <div>
            <List
                loading={loading}
                loadMore={loadMore}
                dataSource={list}
                renderItem={item => (
                    <Skeleton placeholder={placeholder} loading={item.loading}>
                        <List.Item
                            onClick={() => {
                                change()
                                console.log(item)
                                setDetailData(item)
                            }}
                            header={<Avatar src={item.path_img}></Avatar>}
                            main={
                                <div>
                                    <div className="gift-title">{item.title}</div>
                                    {
                                        item.ori_price > 0 ?
                                            <div className="gift-price"><span className="gift-price-number">{item.ori_price}</span><span className="gift-price-word">元</span></div>
                                            :
                                            <div className="gift-price">免费</div>
                                    }
                                    <p>{item.description}</p>
                                </div>
                            }
                        />
                    </Skeleton>
                )}
            />

            <SideSheet footer={advancedFooter()} title="礼品详情" visible={visible} onCancel={change} placement={"bottom"}>
                <img style={{ width: '100%' }} src={detailData.path_img} alt="" />
                {/* <h4>创建时间：{detailData.created_at}</h4> */}
                {/* <h4>更新时间：{detailData.updated_at}</h4> */}
                <h4>分类：{detailData.title}</h4>
                <h4>标签：{detailData.labels}</h4>
                <h4 style={{ color: 'orangered' }}>价格：{detailData.ori_price}</h4>
                <h4>剩余数量：{detailData.num}</h4>
                <Banner fullMode={false} type="info" icon={null} closeIcon={null}
                    description={<div>描述：{detailData.description}</div>}
                />
            </SideSheet>
        </div>
    );
}