import Types from "../Types";

export function saveDeviceInfo(data) {
	return (dispatch, getState) => {
		dispatch({ type: Types.deviceInfo.SET_DEVICE_INFO, data });
	};
}
