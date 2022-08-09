/**
 * @author 季悠然
 * @date 2022-08-09
 */

import API from "./index";
import {APIWithAuth} from "./index";
import {getQueryJson} from "../utils";

export const login = (username, password) => API.post('/token', {username, password});

export const AddGift = (data) => APIWithAuth.post('/thing', data);

export const QueryThingList = (json) => API.get(`/thing_list${json ? '?json='+json : ''}`)

export const DelGift = id => APIWithAuth.delete('/thing?json='+ getQueryJson({id: id}));