import Types from "../Types";

export function isPaused(paused) {
	return (dispatch, getState) => {
		dispatch({ type: Types.podcastPlayControl.PAUSED, data: { paused } });
	};
}

export function setTotalLength(totalLength) {
	return (dispatch, getState) => {
		dispatch({ type: Types.podcastPlayControl.TOTAL_LENGTH, data: { totalLength } });
	};
}

export function setSelectedTrack(selectedTrack) {
	return (dispatch, getState) => {
		dispatch({ type: Types.podcastPlayControl.SELECTED_TRACK, data: { selectedTrack } });
	};
}

export function setFlag(flag) {
	return (dispatch, getState) => {
		dispatch({ type: Types.podcastPlayControl.FLAG, data: { flag } });
	};
}

export function setTrack(tracks) {
	return (dispatch, getState) => {
		dispatch({ type: Types.podcastPlayControl.SET_TRACKS, data: { tracks } });
	};
}

export function callDetection(isCallDetected) {
	return (dispatch, getState) => {
		dispatch({ type: Types.podcastPlayControl.SET_CALL_DETECTION, isCallDetected });
	};
}
