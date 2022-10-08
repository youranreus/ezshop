import "./app.scss";
import { HashRouter as Router, Routes } from "react-router-dom";
import renderRoutes from "./router/router-config.js";
import route from "./router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { readLocal, logout } from "./slice/userSlice";
import { UpdateToken } from "./api/admin";

function App() {
	const dispatch = useDispatch();

	/**
	 * 读取本地登录态
	 */
	useEffect(() => {
		const keys = [
			"access_token",
			"refresh_token",
			"user_id",
			"user_last_login",
		];
		if (keys.every((key) => localStorage.getItem(key))) {
			console.log(
				"上次登陆时间：",
				new Date(
					parseInt(localStorage.getItem("user_last_login"))
				).toLocaleString()
			);
			if (
				Date.now() - localStorage.getItem("user_last_login") >
				1440000
			) {
				console.log("登录态已过期，重新获取");
				UpdateToken(localStorage.getItem("user_id")).then((res) => {
					console.log("登录态已刷新");
					localStorage.setItem("access_token", res.data.access_token);
					localStorage.setItem(
						"refresh_token",
						res.data.refresh_token
					);
					localStorage.setItem("user_last_login", Date.now());

					dispatch(
						readLocal({
							status: true,
							data: {
								access_token: res.data.access_token,
								refresh_token: res.data.refresh_token,
								user_id: localStorage.getItem("user_id"),
								local: true,
							},
						})
					);
				}).catch((error => {
					console.log(error.message);
					localStorage.removeItem("access_token");
					localStorage.removeItem("refresh_token");
					localStorage.removeItem("user_id");

					dispatch(logout());
				}))
			} else {
				dispatch(
					readLocal({
						status: true,
						data: {
							access_token: localStorage.getItem("access_token"),
							refresh_token:
								localStorage.getItem("refresh_token"),
							user_id: localStorage.getItem("user_id"),
							local: true,
						},
					})
				);
			}
		} else dispatch(readLocal({ status: false, data: {} }));
	}, [dispatch]);

	return (
		<div className="App">
			<Router>
				<Routes>{renderRoutes(route)}</Routes>
			</Router>
		</div>
	);
}

export default App;
