/**
 * @author 背锅切图仔
 * @date 2022-08-10
 */
import React, { useState, useEffect } from 'react'
import { Avatar, Button, List, Skeleton } from 'antd';
import { SideSheet, Space, Input, TagInput, Banner } from '@douyinfe/semi-ui';
import '../../style/itemlist.scss'

export default function Demo() {
    const [visible, setVisible] = useState(false);
    const change = () => {
        setVisible(!visible);
    };

    const advancedFooter = () => {
        return (<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Space>
                <Button theme='borderless' onClick={change}>取消</Button>
                <Button theme='solid'>确认</Button>
            </Space>
        </div>)
    }

    const count = 3;
    const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
    // const fakeDataUrl = `http://10.108.2.168:50070/api/thing_list`;

    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    useEffect(() => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                setInitLoading(false);
                setData(res.results);
                setList(res.results);
            });
    }, []);

    const onLoadMore = () => {
        setLoading(true);
        setList(
            data.concat(
                [...new Array(count)].map(() => ({
                    loading: true,
                    name: {},
                    picture: {},
                })),
            ),
        );
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                const newData = data.concat(res.results);
                setData(newData);
                setList(newData);
                setLoading(false);
                window.dispatchEvent(new Event('resize'));
            });
    };

    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>loading more</Button>
            </div>
        ) : null;
    return (
        <div>
            <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={list}
                renderItem={(item) => (
                    <List.Item onClick={change}>
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                avatar={<Avatar src='https://ts1.cn.mm.bing.net/th/id/R-C.6b21c09cb3426651884be95ea5ed484a?rik=jVHUGxj8GKvvzQ&riu=http%3a%2f%2fb.zol-img.com.cn%2fdesk%2fbizhi%2fstart%2f4%2f1392980276409.jpg&ehk=aKKsCzg3qxRsMXpgwkl7Q9fY7ZmDS2XM4jJCmMQGSj0%3d&risl=&pid=ImgRaw&r=0' />}
                                title={item.name?.last}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team sssssssssssssssssssss."
                            />
                            {/* <div>content</div> */}
                        </Skeleton>
                    </List.Item>
                )}
            />

            <SideSheet footer={advancedFooter()} title="高级筛选" visible={visible} onCancel={change} placement={"bottom"}>
                <h4>分类</h4>
                <Input defaultValue='hi'></Input>
                <h4>标签</h4>
                <TagInput></TagInput>
                <br /><br />
                <Banner fullMode={false} type="info" icon={null} closeIcon={null}
                    description={<div>分类只可输入单一分类，用于确认大类别<br />标签可以输入多个，敲击回车键后，输入内容将记录为一个标签</div>}
                />
            </SideSheet>
        </div>
    );
}