import React, { useEffect, useState } from 'react';
import { List, Skeleton, Button, Avatar } from '@douyinfe/semi-ui';
// import { SideSheet, Space, Input, TagInput, Banner } from '@douyinfe/semi-ui';
import '../../style/itemlist.scss'

export default function LoadMoreList() {
    const [state, setState] = useState({
        loading: false,
        dataSource: [],
        list: [],
        noMore: false,
        visible: false,
    })

    const count = 3;
    const data = [];
    for (let i = 0; i < 40; i++) {
        data.push({
            color: 'grey',
            title: `Semi Design Title ${i}`,
            loading: false,
        });
    }
    let data1 = data;
    let count1 = 0;

    // function change() {
    //     setState({
    //         visible: !state.visible
    //     })
    //     console.log('@')
    // };

    function fetchData() {
        let placeholders = [0, 1, 2].map(key => ({ loading: true }));
        setState({
            loading: true,
            list: [...state.dataSource, ...placeholders],
        });

        return new Promise((res, rej) => {
            setTimeout(() => {
                let dataSource = data1.slice(count1 * count, count1 * count + count);
                res(dataSource);
            }, 1000);
        }).then(dataSource => {
            let newData = [...state.dataSource, ...dataSource];
            setState({
                loading: false,
                dataSource: newData,
                list: newData,
                noMore: !dataSource.length,
            });
        });
    };

    // setState({
    //     loading: false,
    //     dataSource: [],
    //     list: [],
    //     noMore: false,
    //     visible: false,
    // });

    useEffect(() => {
        fetchData();
    }, [])

    function onLoadMore() {
        count1++;
        fetchData();
    }

    // function advancedFooter() {
    //     return (<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
    //         <Space>
    //             <Button theme='borderless' onClick={change}>取消</Button>
    //             <Button theme='solid'>确认</Button>
    //         </Space>
    //     </div>)
    // }

    const loadMore =
        !state.loading && !state.noMore ? (
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

    return (
        <div>
            <List
                loading={state.loading}
                loadMore={loadMore}
                dataSource={state.list}
                renderItem={item => (
                    <Skeleton placeholder={placeholder} loading={item.loading}>
                        <List.Item /* onClick={change} */
                            header={<Avatar src='https://ts1.cn.mm.bing.net/th/id/R-C.6b21c09cb3426651884be95ea5ed484a?rik=jVHUGxj8GKvvzQ&riu=http%3a%2f%2fb.zol-img.com.cn%2fdesk%2fbizhi%2fstart%2f4%2f1392980276409.jpg&ehk=aKKsCzg3qxRsMXpgwkl7Q9fY7ZmDS2XM4jJCmMQGSj0%3d&risl=&pid=ImgRaw&r=0'></Avatar>}
                            main={
                                <div>
                                    <span>{item.title}</span>
                                    <p>
                                        Semi Design
                                        设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的
                                        Web 应用。
                                    </p>
                                </div>
                            }
                        />
                    </Skeleton>
                )}
            />

            {/* <SideSheet footer={advancedFooter()} title="高级筛选" visible={state.visible} onCancel={change} placement={"bottom"}>
                <h4>分类</h4>
                <Input defaultValue='hi'></Input>
                <h4>标签</h4>
                <TagInput></TagInput>
                <br /><br />
                <Banner fullMode={false} type="info" icon={null} closeIcon={null}
                    description={<div>分类只可输入单一分类，用于确认大类别<br />标签可以输入多个，敲击回车键后，输入内容将记录为一个标签</div>}
                />
            </SideSheet> */}
        </div>
    );
}