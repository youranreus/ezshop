/**
 * @author 季悠然
 * @date 2022-08-06
 */
import React, { useState, useRef } from 'react';
import '../../style/filter.scss';
import { Col, Row, Select, SideSheet, Button, Space, Input, TagInput, Banner } from '@douyinfe/semi-ui';
import PubSub from 'pubsub-js'

export default function Filter() {
    const [visible, setVisible] = useState(false);
    const inputRef = useRef(null);

    const change = () => {
        setVisible(!visible);
    };

    function sendKind(flag) {
        PubSub.publish('kind', inputRef.current.value);
        if (flag === 1) {
            change();
        }
    }

    const advancedFooter = () => {
        return (<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Space>
                <Button theme='borderless' onClick={change}>取消</Button>
                <Button theme='solid' onClick={() => { sendKind(1) }}>确认</Button>
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
                    <span className={"advance"} onClick={() => { window.location.reload() }}>刷新 </span>
                    <span className={"advance"} onClick={change}>高级筛选</span>
                </Col>

                <SideSheet keepDOM={true} footer={advancedFooter()} title="高级筛选" visible={visible} onCancel={change} placement={"bottom"}>
                    <h4>分类</h4>
                    <Input ref={inputRef} onKeyDown={(e) => { if (e.key === 'Enter') { sendKind(0) } }}></Input>
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