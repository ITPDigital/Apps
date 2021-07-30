import Types from "../Types";

export function setDisplayArticleAction(articles) {
	return (dispatch, getState) => {
		dispatch({ type: Types.articleDisplay.SET_ARTICLE_DISPLAY, data: { articles } });
	};
}

export function clearDisplayArticleAction() {
	return (dispatch, getState) => {
		dispatch({ type: Types.articleDisplay.CLEAR_ARTICLE_DISPLAY });
	};
}

export function setArticleBookmark(value) {
	return (dispatch, getState) => {
		dispatch({ type: Types.bookmarkAndHistory.SET_BOOKMARK_LOAD, data: value });
	};
}

export function setArticleHistory(value) {
	return (dispatch, getState) => {
		dispatch({ type: Types.bookmarkAndHistory.SET_HISTORY_LOAD, data: value });
	};
}
