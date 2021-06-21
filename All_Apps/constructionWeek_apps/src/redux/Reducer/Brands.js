import Types from "../Types";
import createReducer from "./CreateReducer";

const initialSelectedBrands = [];

export const selectedBrands = createReducer(initialSelectedBrands, {
	[Types.brands.SET_SELECTED_BRANDS](state, action) {
		return initialSelectedBrands.concat(action.data.brands);
	},
	[Types.brands.CLEAR_SELECTED_BRANDS]() {
		return initialSelectedBrands;
	},
});

const initialBrands = [];

export const allBrands = createReducer(initialBrands, {
	[Types.brands.SET_ALL_BRANDS](state, action) {
		return action.data.brands;
	},
});
