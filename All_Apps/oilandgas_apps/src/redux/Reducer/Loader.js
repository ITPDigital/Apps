import Types from "../Types";
import createReducer from "./CreateReducer";

export const isLoading = createReducer(null, {
	[Types.podcast.LOAD_START](state, action) {
		console.log("reached");
		return true;
	},
	[Types.podcast.LOAD_END](state, action) {
		console.log("reached");

		return false;
	},
});
