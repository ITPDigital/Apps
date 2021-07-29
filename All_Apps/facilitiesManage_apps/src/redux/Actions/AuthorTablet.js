import Types from "../Types";

export function setAuthorTabletAction(tid, list) {
	return (dispatch, getState) => {
		console.log("authoraction", list);
		dispatch({ type: Types.authorTablet.SET_AUTHOR_TABLET, data: { tid, list } });
	};
}

export function updateAuthorTabletAction(tid, list) {
	return (dispatch, getState) => {
		dispatch({
			type: Types.authorTablet.UPDATE_AUTHOR_TABLET,
			data: { tid, list },
		});
	};
}

export function setPaginationAuthorTabletAction(tid, list) {
	return (dispatch, getState) => {
		console.log("action_data", tid);
		console.log("action_data", list);

		dispatch({
			type: Types.authorTablet.SET_PAGINATION_AUTHOR_TABLET,
			data: { tid, list },
		});
	};
}

export function clearAuthorTabletAction(tid) {
	return (dispatch, getState) => {
		dispatch({ type: Types.authorTablet.CLEAR_AUTHOR_TABLET, data: { tid } });
	};
}
