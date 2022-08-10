import API from './index'
import { getQueryJson } from "../utils";

export const QueryThingList = data => API.get(`/thing_list${data ? '?json=' + getQueryJson(data) : ''}`)