/**
 * @author 季悠然
 * @date 2022-08-09
 */

import API from "./index";
import { APIWithAuth, API2Refresh } from "./index";
import { getQueryJson } from "../utils";

export const login = (username, password) =>
	API.post("/token", { username, password });

export const AddGift = (data) => APIWithAuth.post("/thing", data);

export const QueryThingList = (obj) =>
	API.get(`/thing_list${obj ? "?json=" + getQueryJson(obj) : ""}`);

export const DelGift = (id) =>
	APIWithAuth.delete("/thing?json=" + getQueryJson({ id: id }));

export const UpdateGift = (data) => APIWithAuth.put("/thing", data);

export const ResetPassword = (data) => APIWithAuth.put("/user", data);

export const UpdateToken = (username) =>
	API2Refresh.put("/token", { username });
