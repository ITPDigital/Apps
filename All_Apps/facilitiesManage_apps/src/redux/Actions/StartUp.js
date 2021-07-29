import Types from "../Types";

export function setStartUpAction(isHide) {
	return (dispatch, getState) => {
		dispatch({ type: Types.startUp.SET_SPLASH_SCRREN, data: { isHide } });
	};
}
