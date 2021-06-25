import Types from "../Types";

export function setAllBrands(brands) {
	return (dispatch, getState) => {
		dispatch({ type: Types.brands.SET_ALL_BRANDS, data: { brands } });
	};
}

export function setSelectedBrands(brands) {
	return (dispatch, getState) => {
		dispatch({ type: Types.brands.SET_SELECTED_BRANDS, data: { brands } });
	};
}
