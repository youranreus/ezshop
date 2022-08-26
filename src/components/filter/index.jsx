/**
 * @author 季悠然
 * @date 2022-08-06
 */
import React, {useRef, useState} from 'react';
import '../../style/filter.scss';
import {Col, Row, Select, SideSheet, Button, Space, Banner, Form} from '@douyinfe/semi-ui';

export default function Filter(props) {

    /**
     * 排序方式映射表
     */
    const orderMap = {
        default: ['default', '默认排序'],
        priceh: ["ori_price", "desc"],
        pricel: ["ori_price", "asc"],
    };

    /**
     * 高级筛选弹窗控制
     */
    const [visible, setVisible] = useState(false);

    /**
     * 高级筛选表单值
     */
    const [filterObj, updateFilterObj] = useState({
        filter: {
            ori_price: [">=", "0"],
            is_active: ["==", "1"]
        },
        order: {},
        page: 1,
        per_page: 10
    });

    /**
     * 表单API
     */
    const formApi = useRef();

    /**
     * 回调函数，用于更新筛选表单值
     */
    const {callback} = props;

    /**
     * 开关弹窗
     */
    const toggle = () => {
        setVisible(!visible);
    };

    /**
     * 更新表单值
     * @param formValue
     */
    const update = (formValue) => {
        const newValue = {...filterObj};
        if (formValue.filter && formValue.filter.kind)
            newValue.filter.kind = ["like", formValue.filter.kind];
        else
            delete newValue.filter.kind

        if (formValue.filter && formValue.filter.labels)
            newValue.filter.labels = ["like", [...formValue.filter.labels]];
        else
            delete newValue.filter.labels;
        updateFilterObj(newValue);
    }

    /**
     * 提交筛选表单
     */
    const submit = () => {
        const newValue = {...filterObj};
        if (Object.keys(newValue.filter).length === 0) delete newValue.filter;
        callback(filterObj);
        toggle();
    }

    /**
     * 更新排序方式
     * @param order
     */
    const updateOrder = (order) => {
        const newValue = {...filterObj};
        if (order === 'default') newValue.order = {}
        else newValue.order = {[orderMap[order][0]]: orderMap[order][1]};
        updateFilterObj(newValue);
        callback(newValue);
    }

    /**
     * 重置筛选表单
     */
    const reset = () => {
        updateFilterObj({
            filter: {
                ori_price: [">=", "0"],
                is_active: ["==", "1"]
            },
            order: {},
            page: 1,
            per_page: 10
        });
        callback({
            filter: {
                ori_price: [">=", "0"],
                is_active: ["==", "1"]
            },
            order: {},
            page: 1,
            per_page: 10
        });
        formApi.current.reset();
        toggle();
    }


    /**
     * 自定义筛选表单Footer
     * @returns {JSX.Element}
     */
    const advancedFooter = () => {
        return (<div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Space>
                <Button theme='borderless' onClick={toggle}>取消</Button>
                <Button theme='borderless' onClick={reset}>重置</Button>
                <Button theme='solid' onClick={submit}>确认</Button>
            </Space>
        </div>)
    }

    return (
        <div className={"filter"}>
            <Row>
                <Col span={18} className={"left"}>
                    <Select defaultValue={"default"} size='small' className={"order"} onChange={updateOrder}>
                        <Select.Option value='default'>默认排序</Select.Option>
                        <Select.Option value='priceh'>价格从高到低</Select.Option>
                        <Select.Option value='pricel'>价格从低到高</Select.Option>
                    </Select>
                </Col>
                <Col span={6} className={"right"}>
                    <span className={"advance"} onClick={toggle}>高级筛选</span>
                </Col>

                <SideSheet keepDOM={true} footer={advancedFooter()} title="高级筛选" visible={visible} onCancel={toggle}
                           placement={"bottom"}>
                    <Form onValueChange={update} getFormApi={a => formApi.current = a}>
                        <Form.Input label={"分类"} field={"filter.kind"}/>
                        <Form.TagInput label={"标签"} field={"filter.labels"}/>
                    </Form>
                    <br/><br/>
                    <Banner fullMode={false} type="info" icon={null} closeIcon={null}
                            description={<div>分类只可输入单一分类，用于确认大类别<br/>标签可以输入多个，敲击回车键后，输入内容将记录为一个标签
                            </div>}
                    />
                </SideSheet>
            </Row>
        </div>
    )
}