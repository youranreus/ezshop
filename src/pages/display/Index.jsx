/**
 * @author 季悠然
 * @date 2022-08-05
 */
import Filter from "../../components/filter";
import { useEffect, useState } from "react";
import { QueryThingList } from "../../api/gift";
import { Spin, Toast, Button, Col, Row } from "@douyinfe/semi-ui";
import { IconLoading } from "@douyinfe/semi-icons";
import ItemList from "../../components/display/ItemList";
import SideMenu from "../../components/display/SideMenu";
import { useSelector, useDispatch } from "react-redux";
import { pageUp } from "../../slice/querySlice";

const Index = () => {
	const [itemList, updateItemList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [hasMore, setMore] = useState(true);
	const queryObj = useSelector((state) => state.query);
	const dispatch = useDispatch();

	/**
	 * 获取礼物列表
	 */
	useEffect(() => {
		const len = itemList.length;
		if (len === 0) setLoading(true);
		QueryThingList(queryObj)
			.then((res) => {
				if (res.data.code === 200) {
					if (queryObj.page !== 1) {
						updateItemList(itemList.concat(res.data.data));
						if (res.data.returned + len >= res.data.total)
							setMore(false);
						else setMore(true);
					} else {
						updateItemList(res.data.data);
						if (res.data.returned === res.data.total)
							setMore(false);
						else setMore(true);
					}

					setLoading(false);
				} else throw new Error(res.data.msg);
			})
			.catch((err) => {
				Toast.error(err.message);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [queryObj]);

	/**
	 * 加载更多
	 */
	const loadMore = () => {
		dispatch(pageUp());
	};

	return (
		<div className="index">
			<Filter />
			<Row style={{top: "-1px"}}>
				<Col span={6}>
					<SideMenu />
				</Col>
				<Col span={18}>
					<div className="content">
						{loading && (
							<div className="loading">
								<Spin
									indicator={<IconLoading />}
									size={"large"}
								/>
							</div>
						)}
						{!loading && <ItemList listData={itemList} />}

						{hasMore && (
							<div className="loadMore">
								<Button
									theme={"borderless"}
									block={true}
									onClick={loadMore}
								>
									加载更多
								</Button>
							</div>
						)}
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default Index;
