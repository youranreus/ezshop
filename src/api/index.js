/**
 * @author 季悠然
 * @date 2022-08-05
 */

import axios from "axios";

const baseURL = (process.env.REACT_APP_API || "") + "/api";

const API = axios.create({
	baseURL,
});

const APIWithAuth = axios.create({
	baseURL,
});

const API2Refresh = axios.create({
	baseURL,
});

APIWithAuth.interceptors.request.use((req) => {
	if (localStorage.getItem("access_token"))
		req.headers.Authorization =
			"Bearer " + localStorage.getItem("access_token");
	return req;
});

API2Refresh.interceptors.request.use((req) => {
	if (localStorage.getItem("refresh_token"))
		req.headers.Authorization =
			"Bearer " + localStorage.getItem("refresh_token");
	return req;
});

export default API;
export { APIWithAuth, API2Refresh };
