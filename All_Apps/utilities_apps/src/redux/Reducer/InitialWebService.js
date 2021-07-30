import Types from "../Types";
import createReducer from "./CreateReducer";

const initialHomeScreenData = {};

export const HomeScreenData = createReducer(initialHomeScreenData, {
	[Types.initialWebService.SET_INITIAL_WEBSERVICE_DATA](state, action) {
		console.log("initialHomeScreenData details,  state:", state, "Action:", action);
		// action.data.articles;
		return {
			...action.data.articles,
		};
	},
});
