/**
 * @author 季悠然
 * @date 2022-08-09
 */

import API from "./index";

export const login = (username, password) => API.post('/token', {username, password});