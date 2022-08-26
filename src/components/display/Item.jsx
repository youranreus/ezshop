/**
 * @author 季悠然
 * @date 2022-08-07
 */
import {Card, Col, Row} from '@douyinfe/semi-ui';

export default function Item(props) {
    const {itemData} = props;

    return (<div className={"item"}>
        <Card
            cover={
                <img
                    alt={itemData.title}
                    src={itemData.path_img}
                />
            }
            bodyStyle={{padding: '8px'}}
        >
            <h4>{itemData.title}</h4>
            <div className="meta">
                <Row>
                    <Col span={12}>
                        <span className={"kind"}># {itemData.kind}</span>
                    </Col>
                    <Col span={12} style={{textAlign: "right"}}>
                        <span className={"price"}>{itemData.ori_price}</span>
                    </Col>
                </Row>
            </div>
        </Card>
    </div>)
}