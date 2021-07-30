import Types from "../Types";
import createReducer from "./CreateReducer";

export const user = createReducer(null, {
	[Types.user.SET_USER](state, action) {
		return {
			...action.user,
			podcasts: action.user["podcasts"] && action.user["podcasts"].split("|"),
			authors: action.user["authors"] && action.user["authors"].split("|"),
		};
	},
	[Types.user.SET_USER_TOPICS](state, action) {
		return {
			...state,
			topics: action.topics,
		};
	},
	[Types.user.SET_USER_BRANDS](state, action) {
		return {
			...state,
			brands: action.brands,
		};
	},
	[Types.user.CLEAR_USER]() {
		return null;
	},
	[Types.podcast.SET_USER_SUBSCRIPTION](state, action) {
		const podcast =
			state.podcasts.indexOf(action.brand) > -1
				? state.podcasts.filter(item => item !== action.brand)
				: [...state.podcasts, action.brand];
		return { ...state, podcasts: podcast };
	},
	[Types.user.SET_USER_AUTH_FOLLOW](state, action) {
		const author =
			state.authors.indexOf(action.author) > -1
				? state.authors.filter(item => item !== action.author)
				: [...state.authors, action.author];
		console.log("author in redux", author);
		return { ...state, authors: author };
	},
	[Types.profile.SET_PROFILE_NAME](state, action) {
		return {
			...state,
			name: action.name,
		};
	},
	[Types.profile.SET_PROFILE_PIC](state, action) {
		return {
			...state,
			profile_picture: action.profilePicture,
		};
	},
	[Types.user.SAVE_USER_PREFERENCES_FONT](state, action) {
		console.log("changed fontSize is ", action.font);
		return {
			...state,
			article_font_size: action.font,
		};
	},
	[Types.user.SAVE_USER_PREFERENCES_BG](state, action) {
		console.log("changed fontSize is ", action.bg);
		return {
			...state,
			article_bg_color: action.bg,
		};
	},
});

export const userSubscribe = createReducer(null, {
	[Types.user.SET_SUBSCRIPTION_USER](state, action) {
		return {
			...action.user,
		};
	},
	[Types.user.CLEAR_SUBSCRIPTION_USER]() {
		return null;
	},
});
