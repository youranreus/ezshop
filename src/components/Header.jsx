/**
 * @author 季悠然
 * @date 2022-08-06
 */
import { useRef } from 'react'
import PubSub from 'pubsub-js'
import '../style/Header.scss'
import { Col, Row, Input } from '@douyinfe/semi-ui';
import { IconSearch } from '@douyinfe/semi-icons';

export default function TopBar() {
    const inputRef = useRef()

    function search() {
        PubSub.publish('search', inputRef.current.value)
    }

    return (<div className={"top-bar"}>
        <Row>
            <Col span={12}>
                <h3>礼品Go</h3>
            </Col>
            <Col span={12}>
                <div className="right">
                    <Input ref={inputRef} suffix={<IconSearch onClick={search} />} className={"search"}></Input>
                </div>
            </Col>
        </Row>
    </div>);
}