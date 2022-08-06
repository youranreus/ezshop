/**
 * @author 季悠然
 * @date 2022-08-06
 */
import '../../style/filter.scss';
import { Col, Row, Select } from '@douyinfe/semi-ui';
import { IconSort } from '@douyinfe/semi-icons';

export default function Filter() {
    return (
        <div className={"filter"}>
            <Row>
                <Col span={"18"} className={"left"}>
                    <Select prefix={<IconSort/>} defaultValue={"default"} size='small' className={"order"}>
                        <Select.Option value='default'>默认排序</Select.Option>
                        <Select.Option value='priceh'>价格从高到低</Select.Option>
                        <Select.Option value='pricel'>价格从低到高</Select.Option>
                    </Select>
                </Col>
                <Col span={"6"} className={"right"}>
                    <span className={"advance"}>高级筛选</span>
                </Col>
            </Row>
        </div>
    )
}