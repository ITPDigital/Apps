import Types from "../Types";

export function setPodcastChaptor(chaptor) {
	return (dispatch, getState) => {
		dispatch({ type: Types.podcast.SET_PODCAST_CHAPTOR, data: { chaptor } });
	};
}

export function onLoadStart() {
	return (dispatch, getState) => {
		dispatch({ type: Types.podcast.LOAD_START });
	};
}

export function onLoadEnd() {
	return (dispatch, getState) => {
		dispatch({ type: Types.podcast.LOAD_END });
	};
}
