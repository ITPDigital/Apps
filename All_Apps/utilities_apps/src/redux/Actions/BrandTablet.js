import Types from "../Types";

export function setBrandTabletAction(tid, list) {
	return (dispatch, getState) => {
		console.log("brandact", list);
		dispatch({ type: Types.brandTablet.SET_BRAND_TABLET, data: { tid, list } });
	};
}

export function updateBrandTabletAction(tid, list) {
	return (dispatch, getState) => {
		dispatch({
			type: Types.brandTablet.UPDATE_BRAND_TABLET,
			data: { tid, list },
		});
	};
}

export function setPaginationBrandTabletAction(tid, list) {
	return (dispatch, getState) => {
		console.log("action_data", tid);
		console.log("action_data", list);

		dispatch({
			type: Types.brandTablet.SET_PAGINATION_BRAND_TABLET,
			data: { tid, list },
		});
	};
}

export function clearBrandTabletAction(tid) {
	return (dispatch, getState) => {
		dispatch({ type: Types.brandTablet.CLEAR_BRAND_TABLET, data: { tid } });
	};
}
