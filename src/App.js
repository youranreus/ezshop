import "./app.scss";
import { HashRouter as Router, Routes } from "react-router-dom";
import renderRoutes from "./router/router-config.js";
import route from "./router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { readLocal } from "./slice/userSlice";

function App() {
	const dispatch = useDispatch();

	/**
	 * 读取本地登录态
	 */
	useEffect(() => {
		const keys = ["access_token", "refresh_token", "user_id"];
		if (keys.every((key) => localStorage.getItem(key)))
			dispatch(
				readLocal({
					status: true,
					data: {
						access_token: localStorage.getItem("access_token"),
						refresh_token: localStorage.getItem("refresh_token"),
						user_id: localStorage.getItem("user_id"),
						local: true,
					},
				})
			);
		else dispatch(readLocal({ status: false, data: {} }));
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
