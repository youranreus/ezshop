/**
 * @author 背锅切图仔
 * @date 2022-08-10
 */

import API from './index'
import { getQueryJson } from "../utils";

export const QueryThingList = data => API.get(`/thing_list${data ? '?json=' + getQueryJson(data) : ''}`)