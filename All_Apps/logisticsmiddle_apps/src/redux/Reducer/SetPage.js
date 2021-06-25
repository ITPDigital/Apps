import Types from "../Types";
import createReducer from "./CreateReducer";

export const currentPage = createReducer(null, {
	[Types.page.SET_CURRENT_PAGE](state, action) {
		return action.page;
	},
});
