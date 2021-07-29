import Types from "../Types";
import createReducer from "./CreateReducer";

const initialSelectedBrands = [];

export const articleDisplay = createReducer(null, {
	[Types.articleDisplay.SET_ARTICLE_DISPLAY](state, action) {
		console.log("data", action.data.articles.data);
		return { ...action.data.articles.data };
	},
	[Types.articleDisplay.CLEAR_ARTICLE_DISPLAY]() {
		return null;
	},
});

export const bookmark = createReducer(null, {
	[Types.bookmarkAndHistory.SET_BOOKMARK_LOAD](state, action) {
		return action.data;
	},
});

export const history = createReducer(null, {
	[Types.bookmarkAndHistory.SET_HISTORY_LOAD](state, action) {
		return action.data;
	},
});
