import { useDispatch } from "react-redux";
import { setObj, reset } from "../../slice/querySlice";
import { QueryThingList } from "../../api/gift";
import { useEffect, useState } from "react";

export default function SideMenu() {
	const dispatch = useDispatch();
	const [kindList, setKindList] = useState([]);

	useEffect(() => {
		if (
			localStorage.getItem("kinds") &&
			localStorage.getItem("kinds_date")
		) {
			console.log(
				"上次获取分类列表时间：",
				new Date(
					parseInt(localStorage.getItem("kinds_date"))
				).toLocaleString()
			);

			if (Date.now() - localStorage.getItem("kinds_date") > 604800000) {
				console.log("重新获取分类列表");
			} else {
				console.log("获取本地分类列表");
				setKindList(JSON.parse(localStorage.getItem("kinds")));
			}
		} else {
			console.log("首次获取分类列表");
			QueryKindList();
		}
	}, []);

	/**
	 * 获取分类列表
	 */
	const QueryKindList = () => {
		QueryThingList({
			filter: {
				ori_price: [">=", "0"],
				is_active: ["==", "1"],
			},
			order: {},
			page: 1,
			per_page: 1000,
		}).then((res) => {
			const raw = res.data.data;
			let tmpKinds = [];

			raw.forEach((element) => {
				tmpKinds.push(element.kind);
			});

			tmpKinds = [...new Set(tmpKinds)];
			setKindList(tmpKinds);
			localStorage.setItem("kinds", JSON.stringify(tmpKinds));
			localStorage.setItem("kinds_date", Date.now());
		});
	};

	/**
	 * 选择分类
	 * @param {string} kind 分类
	 */
	const handleClick = (kind) => {
		if (!kind) dispatch(reset());
		else {
			dispatch(
				setObj({
					filter: {
						ori_price: [">=", "0"],
						is_active: ["==", "1"],
						kind: ["==", kind],
					},
					order: {},
					page: 1,
					per_page: 10,
				})
			);
		}
	};

	return (
		<div className={"side-menu"}>
			<div
				className="menu-item"
				onClick={() => {
					handleClick();
				}}
			>
				<p>全部</p>
			</div>
			{kindList.map((kind) => (
				<div
					className="menu-item"
					key={kind}
					onClick={() => {
						handleClick(kind);
					}}
				>
					<p>{kind}</p>
				</div>
			))}
		</div>
	);
}
