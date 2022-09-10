import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		access_token: "",
		refresh_token: "",
		user_id: "",
		status: false,
		local: false,
		manual: false,
	},
	reducers: {
		login: (state, actions) => {
			["access_token", "refresh_token", "user_id"].forEach((key) => {
				state[key] = actions.payload[key];
			});
			state.manual = true;
			state.status = true;
		},
		logout: (state) => {
			state.status = false;
		},
		readLocal: (state, actions) => {
			const { status, data } = actions.payload;
			if (status) {
				["access_token", "refresh_token", "user_id"].forEach((key) => {
					state[key] = data[key];
				});
				state.status = true;
			}
			state.local = true;
		},
	},
});

export const { login, logout, readLocal } = userSlice.actions;

export default userSlice.reducer;
