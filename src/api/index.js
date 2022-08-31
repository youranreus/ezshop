/**
 * @author 季悠然
 * @date 2022-08-05
 */

import axios from "axios";

const baseURL = process.env.REACT_APP_API + "/api";

const API = axios.create({
	baseURL,
});

const APIWithAuth = axios.create({
	baseURL,
});

APIWithAuth.interceptors.request.use((req) => {
	if (localStorage.getItem("access_token"))
		req.headers.Authorization =
			"Bearer " + localStorage.getItem("access_token");
	return req;
});

export default API;
export { APIWithAuth };
