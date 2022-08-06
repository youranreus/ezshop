/**
 * @author 季悠然
 * @date 2022-08-06
 */
import '../style/Header.scss'
import { Col, Row, Input } from '@douyinfe/semi-ui';
import { IconSearch } from '@douyinfe/semi-icons';

export default function TopBar() {
    return (<div className={"top-bar"}>
        <Row>
            <Col span={12}>
                <h3>礼品Go</h3>
            </Col>
            <Col span={12}>
                <div className="right">
                    <Input suffix={<IconSearch />} className={"search"}></Input>
                </div>
            </Col>
        </Row>
    </div>);
}