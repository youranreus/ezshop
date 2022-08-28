/**
 * @author 季悠然
 * @date 2022-08-08
 */

import { Layout } from "@douyinfe/semi-ui";
import TopBar from "../components/Header";
import "../style/display.scss";
import Index from "./display/Index";
import { useRef } from "react";

export default function Display() {
	const { Header, Content, Footer } = Layout;
	const list = useRef();

	/**
	 * 搜索回调
	 * @param value
	 */
	const handleSearch = (value) => {
		if (value !== "") {
			list.current.setData({
				filter: {
					ori_price: [">=", "0"],
					is_active: ["==", "1"],
					title: ["like", value],
				},
				order: {},
				page: 1,
				per_page: 10,
			});
		} else {
			list.current.setData({
				filter: {
					ori_price: [">=", "0"],
					is_active: ["==", "1"],
				},
				order: {},
				page: 1,
				per_page: 10,
			});
		}
	};

	return (
		<div className={"display"}>
			<Header className={"header"}>
				<TopBar searchCallback={handleSearch} />
			</Header>
			<Content className={"content"}>
				<Index ref={list} />
			</Content>
			<Footer>
				<div className={"footer"}>
					<p>made with ❤ by S-ACM</p>
				</div>
			</Footer>
		</div>
	);
}
