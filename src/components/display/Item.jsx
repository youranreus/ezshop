/**
 * @author 季悠然
 * @date 2022-08-07
 */
import {Card, Col, Row, Skeleton} from '@douyinfe/semi-ui';
import {useEffect, useState} from "react";

export default function Item(props) {
    const {itemData} = props;
    const [loading, setLoading] = useState(true);

    /**
     * 图片懒加载
     */
    useEffect(() => {
        new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                resolve(img.src);
            }
            img.src = itemData.path_img;
        }).then(success => {
            setLoading(false);
        })
    }, []);

    return (<div className={"item"}>
        <Card
            cover={
                <Skeleton loading={loading} placeholder={<Skeleton.Image/>} active={true}
                          style={{width: "calc((100vw - 1.5rem) /2)", height: "calc((100vw - 1.5rem) /2)"}}>
                    <img
                        alt={itemData.title}
                        src={itemData.path_img}
                    />
                </Skeleton>
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
                        <span className={"price"}>￥{itemData.ori_price}</span>
                    </Col>
                </Row>
            </div>
        </Card>
    </div>)
}