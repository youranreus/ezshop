/**
 * @author 季悠然
 * @date 2022-08-08
 */

import { Layout } from "@douyinfe/semi-ui";
import TopBar from "../components/Header";
import "../style/display.scss";
import Index from "./display/Index";
import { useDispatch } from "react-redux";
import { search, cancelSearch } from "../slice/querySlice";

export default function Display() {
	const { Header, Content, Footer } = Layout;
	const dispatch = useDispatch();

	/**
	 * 搜索回调
	 * @param value
	 */
	const handleSearch = (value) => {
		if (value !== "") dispatch(search(value));
		else dispatch(cancelSearch());
	};

	return (
		<div className={"display"}>
			<Header className={"header"}>
				<TopBar searchCallback={handleSearch} />
			</Header>
			<Content className={"content"}>
				<Index/>
			</Content>
			<Footer>
				<div className={"footer"}>
					<p>made with ❤ by S-ACM</p>
				</div>
			</Footer>
		</div>
	);
}
