import Types from "../Types";
import createReducer from "./CreateReducer";

const initialState = {
	paused: true,
	totalLength: 0,

	selectedTrack: 0,
	repeatOn: false,
	flag: false,
	tracks: null,
};

export const podcastPlayControl = createReducer(initialState, {
	[Types.podcastPlayControl.PAUSED](state, action) {
		return { ...state, paused: action.data.paused };
	},
	[Types.podcastPlayControl.TOTAL_LENGTH](state, action) {
		return { ...state, totalLength: action.data.totalLength };
	},

	[Types.podcastPlayControl.SELECTED_TRACK](state, action) {
		return { ...state, selectedTrack: action.data.selectedTrack };
	},
	[Types.podcastPlayControl.FLAG](state, action) {
		return { ...state, flag: action.data.flag };
	},
	[Types.podcastPlayControl.SET_TRACKS](state, action) {
		return { ...state, tracks: { ...action.data.tracks } };
	},
});
