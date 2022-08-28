/**
 * @author 季悠然
 * @date 2022-08-08
 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Input, Button, Toast } from "@douyinfe/semi-ui";
import { ResetPassword } from "../../api/admin";

export default function ResetPwd() {
	const [currentPwd, setCurrentPwd] = useState("");
	const [password, setPwd] = useState("");
	const [verify_password, setVPwd] = useState("");
	const [loading, setLoading] = useState(false);
	const navi = useNavigate();

	/**
	 * 登录态检查
	 */
	useEffect(() => {
		if (
			!localStorage.getItem("access_token") ||
			!localStorage.getItem("user_id")
		) {
			Toast.info("请先登录");
			navi("/admin/login");
		}
		// eslint-disable-next-line
	}, []);

	/**
	 * 提交
	 */
	const submit = () => {
		if (password === "") {
			Toast.warning("密码不能为空");
		} else if (password !== verify_password) {
			Toast.warning("两次密码不一致");
		} else {
			setLoading(true);
			ResetPassword({
				name: localStorage.getItem("user_id"),
				password: password,
				verify_password: currentPwd
			}).then((res) => {
				if (res.data.code === 200) {
					Toast.success("修改成功");
					localStorage.removeItem("access_token");
					localStorage.removeItem("refresh_token");
					navi("/admin/login");
				} else {
					Toast.error(res.data.msg);
				}
				setLoading(false);
			});
		}
	};

	return (
		<div className={"login-wrapper"}>
			<Card
				style={{ Width: "90vw" }}
				bordered
				headerLine={true}
				title="修改密码"
			>
				<div className={"login-box"}>
					<h4>用户名</h4>
					<Input
						className={"input"}
						value={localStorage.getItem("user_id")}
						disabled={true}
					></Input>
					<h4>当前密码</h4>
					<Input
						className={"input"}
						value={currentPwd}
						onChange={(v) => {
							setCurrentPwd(v);
						}}
						type={"password"}
					></Input>
					<h4>新密码</h4>
					<Input
						className={"input"}
						value={password}
						onChange={(v) => {
							setPwd(v);
						}}
						type={"password"}
					></Input>
					<h4>确认密码</h4>
					<Input
						className={"input"}
						value={verify_password}
						onChange={(v) => {
							setVPwd(v);
						}}
						type={"password"}
					></Input>
					<Button
						disabled={loading}
						block
						theme={"solid"}
						type={"primary"}
						onClick={submit}
					>
						登录
					</Button>
				</div>
			</Card>
		</div>
	);
}
