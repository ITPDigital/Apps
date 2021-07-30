import Types from "../Types";

export function setMenuTopicsAction(topics) {
	return (dispatch, getState) => {
		dispatch({ type: Types.topic.SET_MENU_TOPIC, data: { topics } });
	};
}

export function clearMenuTopicsAction() {
	return (dispatch, getState) => {
		dispatch({ type: Types.topic.CLEAR_MENU_TOPIC });
	};
}

export function setAllTopics(topics) {
	return (dispatch, getState) => {
		dispatch({ type: Types.topic.SET_ALL_TOPICS, data: { topics } });
	};
}
