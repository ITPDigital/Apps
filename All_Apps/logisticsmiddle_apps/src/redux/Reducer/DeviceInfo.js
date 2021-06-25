import Types from "../Types";
import createReducer from "./CreateReducer";

export const deviceInfo = createReducer(null, {
	[Types.deviceInfo.SET_DEVICE_INFO](state, action) {
		return action.data;
	},
});
