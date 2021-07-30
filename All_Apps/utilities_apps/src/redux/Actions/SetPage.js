import Types from "../Types";

export function setCurrentPage(page) {
	return (dispatch, getState) => {
		dispatch({ type: Types.page.SET_CURRENT_PAGE, page });
	};
}
