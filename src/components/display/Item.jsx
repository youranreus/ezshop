/**
 * @author 季悠然
 * @date 2022-08-07
 */
import {
	Card,
	Col,
	Row,
	Skeleton,
	SideSheet,
	Space,
	Tag,
	Divider,
} from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";

export default function Item(props) {
	const { itemData } = props;
	const [loading, setLoading] = useState(true);
	const [showDetail, setShowDetail] = useState(false);
	const [aspectRatio, setRatio] = useState("1/1");

	/**
	 * 图片懒加载
	 */
	useEffect(() => {
		new Promise((resolve) => {
			const img = new Image();
			img.onload = () => {
				resolve(img.src);
			};
			img.src = itemData.path_img;
		}).then((success) => {
			setLoading(false);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/**
	 * 放大缩小图片
	 */
	const zoom = () => {
		const img = new Image();
		img.onload = () => {
			console.log(img.width, img.height);
			if (aspectRatio === "1/1") {
				setRatio(`${img.width}/${img.height}`);
			} else {
				setRatio("1/1");
			}
		};
		img.src = itemData.path_img;
	};

	return (
		<div className={"item"}>
			<div onClick={() => setShowDetail(true)}>
				<Card
					cover={
						<Skeleton
							loading={loading}
							placeholder={<Skeleton.Image />}
							active={true}
							style={{
								width: "calc((100vw - 1.5rem) /2)",
								height: "200px",
								aspectRatio: "1/1",
							}}
						>
							<div
								className="cover"
								style={{ backgroundImage: `url(${itemData.path_img})` }}
							>
								<span>还剩 {itemData.num} 件</span>
							</div>
						</Skeleton>
					}
					bodyStyle={{ padding: "8px" }}
				>
					<h4>{itemData.title}</h4>
					<div className="meta">
						<Row>
							<Col span={12}>
								<span className={"kind"}># {itemData.kind}</span>
							</Col>
							<Col span={12} style={{ textAlign: "right" }}>
								<span className={"price"}>
									{itemData.ori_price === 0
										? "（0.0）"
										: "￥ " + itemData.ori_price}
								</span>
							</Col>
						</Row>
					</div>
				</Card>
			</div>

			<SideSheet
				title={"礼品详情"}
				visible={showDetail}
				height={"90vh"}
				placement={"bottom"}
				onCancel={() => setShowDetail(false)}
			>
				<div className="detail" style={{ maxWidth: "580px", margin: "0 auto" }}>
					<Skeleton
						loading={loading}
						placeholder={<Skeleton.Image />}
						active={true}
						style={{
							width: "90%",
							height: "200px",
						}}
					>
						<div
							className="cover"
							style={{ backgroundImage: `url(${itemData.path_img})`, aspectRatio: aspectRatio }}
						>
							<span className="zoom" onClick={zoom}>
								查看大图
							</span>
							<span className="num">还剩 {itemData.num} 件</span>
						</div>
					</Skeleton>
					<h4>{itemData.title}</h4>

					<div className="meta">
						<Row>
							<Col span={12}>
								<span className={"kind"}># {itemData.kind}</span>
							</Col>
							<Col span={12} style={{ textAlign: "right" }}>
								<span className={"price"}>
									{itemData.ori_price === 0
										? "卖多少好呢～"
										: "￥ " + itemData.ori_price}
								</span>
							</Col>
						</Row>
						<br />
						<Row>
							<Col span={24}>
								<Space wrap={true}>
									{itemData.labels
										.slice(1, -1)
										.split("#")
										.map((tag, index) => {
											return (
												<Tag key={index} color={"green"} type={"light"}>
													{tag}
												</Tag>
											);
										})}
								</Space>
							</Col>
						</Row>

						<Divider margin="12px">详细信息</Divider>

						<div className="info">{itemData.description}</div>
					</div>
				</div>
			</SideSheet>
		</div>
	);
}
