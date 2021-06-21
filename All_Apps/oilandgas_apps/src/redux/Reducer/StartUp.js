import Types from "../Types";
import createReducer from "./CreateReducer";

export const isSplashScreenHide = createReducer(false, {
	[Types.startUp.SET_SPLASH_SCRREN](state, action) {
		return action.data.isHide;
	},
});
