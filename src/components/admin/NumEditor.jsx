/**
 * @author 季悠然
 * @date 2022-08-09
 */
import { Button, InputNumber, Space } from "@douyinfe/semi-ui";
import { IconMinus, IconPlus } from "@douyinfe/semi-icons";
import { useState } from "react";

export default function NumEditor(props) {
	const { record, index, handler } = props;
	const [num, setNum] = useState(1);

	return (
		<Space>
			<Button
				type={"primary"}
				icon={<IconPlus />}
				onClick={() => handler(record, index, num)}
			/>
			<InputNumber
				hideButtons={true}
				style={{ width: 50 }}
				value={num}
				min={1}
				onChange={(v) => setNum(v)}
			/>
			<Button
				icon={<IconMinus />}
				onClick={() => handler(record, index, -num)}
			/>
		</Space>
	);
}
