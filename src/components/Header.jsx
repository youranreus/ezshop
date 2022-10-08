/**
 * @author 季悠然
 * @date 2022-08-06
 */
import { useRef } from "react";
import "../style/Header.scss";
import { Col, Row, Input } from "@douyinfe/semi-ui";
import { IconSearch } from "@douyinfe/semi-icons";

export default function TopBar(props) {
	const inputRef = useRef();
	const { searchCallback } = props;

	/**
	 * 搜索回调
	 */
	function search() {
		searchCallback(inputRef.current.value);
	}

	return (
		<div className={"top-bar"}>
			<Row>
				<Col span={12}>
					<h3>易支富礼品</h3>
				</Col>
				<Col span={12}>
					<div className="right">
						<Input
							ref={inputRef}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									search();
								}
							}}
							suffix={<IconSearch onClick={search} />}
							className={"search"}
						></Input>
					</div>
				</Col>
			</Row>
		</div>
	);
}
