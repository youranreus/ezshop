/**
 * @author 季悠然
 * @date 2022-08-08
 */
import { Layout, Col, Row } from "@douyinfe/semi-ui";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../style/admin.scss";

export default function Admin() {
	const { Header, Content, Footer } = Layout;
	const navi = useNavigate();

	/**
	 * 登出
	 */
	const logout = () => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");

		navi("/admin/login");
	};

	return (
		<div className={"admin"}>
			<Layout>
				<Header>
					<div className="header">
						<div className={"header-content"}>
							<Row>
								<Col span={12}>礼品Go 后台管理</Col>
								<Col span={12} style={{ textAlign: "right" }}>
									{localStorage.getItem("access_token") ? (
										<Link to={"/admin/reset"} className={"return"}>
											修改密码
										</Link>
									) : (
										""
									)}
									{localStorage.getItem("access_token") ? (
										<span onClick={logout} className={"return"}>
											退出登录
										</span>
									) : (
										""
									)}
									<Link to={"/"} className={"return"}>
										返回前台
									</Link>
								</Col>
							</Row>
						</div>
					</div>
				</Header>
				<Content>
					<div style={{ marginTop: "3rem" }}>
						<Outlet />
					</div>
				</Content>
				<Footer>
					<div className="footer">
						<div style={{ margin: "0 5rem" }}>
							<p>made with ❤ by S-ACM</p>
						</div>
					</div>
				</Footer>
			</Layout>
		</div>
	);
}
