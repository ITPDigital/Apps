import Types from "../Types";

export function setMyTroveTabletAction(tid, list, type) {
	return (dispatch, getState) => {
		console.log("action_data", list);

		dispatch({ type: Types.myTrove.SET_MY_TROVE_TABLET, data: { tid, list, type } });
	};
}

export function updateMyTroveTabletAction(tid, list) {
	return (dispatch, getState) => {
		dispatch({
			type: Types.myTrove.UPDATE_MY_TROVE_TABLET,
			data: { tid, list },
		});
	};
}

export function setPaginationMyTroveTabletAction(tid, list, type) {
	return (dispatch, getState) => {
		console.log("action_data", list);

		dispatch({
			type: Types.myTrove.SET_PAGINATION_MY_TROVE_TABLET,
			data: { tid, list, type },
		});
	};
}

export function clearMyTroveTabletAction(tid) {
	return (dispatch, getState) => {
		dispatch({ type: Types.myTrove.CLEAR_MY_TROVE_TABLET, data: { tid } });
	};
}
