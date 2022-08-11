/**
 * @author 季悠然
 * @date 2022-08-06
 */
import React, { useState } from 'react';
import '../../style/filter.scss';
import { Col, Row, Select, SideSheet, Button, Space, Input, TagInput, Banner } from '@douyinfe/semi-ui';
import PubSub from 'pubsub-js'

export default function Filter() {
    const [visible, setVisible] = useState(false);
    const change = () => {
        setVisible(!visible);
    };

    const advancedFooter = () => {
        return (<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Space>
                <Button theme='borderless' onClick={change}>取消</Button>
                <Button theme='solid' onClick={change}>确认</Button>
            </Space>
        </div>)
    }

    return (
        <div className={"filter"}>
            <Row>
                <Col span={18} className={"left"}>
                    <Select onChange={(value) => { PubSub.publish('order', value) }} defaultValue={"default"} size='small' className={"order"}>
                        <Select.Option value='default'>默认排序</Select.Option>
                        <Select.Option value='priceh'>价格从高到低</Select.Option>
                        <Select.Option value='pricel'>价格从低到高</Select.Option>
                    </Select>
                </Col>
                <Col span={6} className={"right"}>
                    <span className={"advance"} onClick={change}>高级筛选</span>
                </Col>

                <SideSheet footer={advancedFooter()} title="高级筛选" visible={visible} onCancel={change} placement={"bottom"}>
                    <h4>分类</h4>
                    <Input onChange={(value) => { PubSub.publish('kind', value) }} /* defaultValue='hi' */></Input>
                    <h4>标签</h4>
                    <TagInput onChange={(value) => { PubSub.publish('labels', value) }}></TagInput>
                    <br /><br />
                    <Banner fullMode={false} type="info" icon={null} closeIcon={null}
                        description={<div>分类只可输入单一分类，用于确认大类别<br />标签可以输入多个，敲击回车键后，输入内容将记录为一个标签</div>}
                    />
                </SideSheet>
            </Row>
        </div>
    )
}