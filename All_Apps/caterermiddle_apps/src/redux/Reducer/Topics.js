import Types from "../Types";
import createReducer from "./CreateReducer";

const initialTopicMenu = [];

export const menuTopics = createReducer(initialTopicMenu, {
	[Types.topic.SET_MENU_TOPIC](state, action) {
		return action.data.topics;
	},
	[Types.topic.CLEAR_MENU_TOPIC]() {
		return initialTopicMenu;
	},
});

const initialTopics = [];

export const allTopics = createReducer(initialTopics, {
	[Types.topic.SET_ALL_TOPICS](state, action) {
		return action.data.topics;
	},
	[Types.topic.CLEAR_MENU_TOPIC]() {
		return initialTopics;
	},
});
