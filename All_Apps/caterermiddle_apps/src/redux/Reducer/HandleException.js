import Types from "../Types";
import createReducer from "./CreateReducer";

export const exception = createReducer(null, {
	[Types.exception.EXCEPTION](state, action) {
		return action.exception;
	},
	[Types.exception.CLEAR_EXCEPTION_MSG]() {
		return null;
	},
});
