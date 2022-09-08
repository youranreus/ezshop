import { createSlice } from "@reduxjs/toolkit";

export const querySlice = createSlice({
	name: "query",
	initialState: {
		filter: {
			ori_price: [">=", "0"],
			is_active: ["==", "1"],
		},
		order: {},
		page: 1,
		per_page: 10,
	},
	reducers: {
		reset: (state) => {
			state.filter = {
				ori_price: [">=", "0"],
				is_active: ["==", "1"],
			};
			state.order = {};
			state.page = 1;
			state.per_page = 10;
		},
		pageUp: (state) => {
			state.page += 1;
		},
		pageDown: (state) => {
			state.page -= 1;
		},
		search: (state, action) => {
			state.filter = {
				ori_price: [">=", "0"],
				is_active: ["==", "1"],
				title: ["like", action.payload],
			};
		},
		cancelSearch: (state) => {
			state.filter = {
				ori_price: [">=", "0"],
				is_active: ["==", "1"],
			};
		},
		setObj: (state, action) => {
			state.filter = action.payload.filter;
			state.order = action.payload.order;
			state.page = action.payload.page;
			state.per_page = action.payload.per_page;
		},
	},
});

export const { reset, pageUp, pageDown, search, cancelSearch, setObj } =
	querySlice.actions;

export default querySlice.reducer;
