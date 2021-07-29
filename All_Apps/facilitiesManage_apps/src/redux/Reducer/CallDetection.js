import Types from "../Types";
import createReducer from "./CreateReducer";

export const isCallDetected = createReducer(null, {
	[Types.podcastPlayControl.SET_CALL_DETECTION](state, action) {
		console.log("reached", action.isCallDetected);
		return action.isCallDetected;
	},
});
