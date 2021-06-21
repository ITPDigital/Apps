import Types from "../Types";

export function setMoreStoriesAction(tid, list, type) {
	return (dispatch, getState) => {
		dispatch({ type: Types.moreStories.SET_MORESTORIES, data: { tid, list, type } });
	};
}

export function updateMoreStoriesAction(tid, list) {
	return (dispatch, getState) => {
		dispatch({
			type: Types.moreStories.UPDATE_MORESTORIES,
			data: { tid, list },
		});
	};
}

export function setPaginationMorestoriesAction(tid, list, type) {
	return (dispatch, getState) => {
		console.log("action_data", tid);
		console.log("action_data", list);

		dispatch({
			type: Types.moreStories.SET_PAGINATION_MORESTORIES,
			data: { tid, list, type },
		});
	};
}

export function clearMoreStoriesAction(tid) {
	return (dispatch, getState) => {
		dispatch({ type: Types.moreStories.CLEAR_MORESTORIES, data: { tid } });
	};
}
