import Types from "../Types";
import createReducer from "./CreateReducer";

export const podcastChaptor = createReducer(null, {
	[Types.podcast.SET_PODCAST_CHAPTOR](state, action) {
		return { ...action.data.chaptor.data };
	},
});
