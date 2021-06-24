import Types from "../Types";

export function setUserAction(user) {
	return (dispatch, getState) => {
		dispatch({ type: Types.user.SET_USER, user });
	};
}

export function setUserTopicAction(topics) {
	return (dispatch, getState) => {
		dispatch({ type: Types.user.SET_USER_TOPICS, topics });
	};
}

export function setUserBrandAction(brands) {
	return (dispatch, getState) => {
		dispatch({ type: Types.user.SET_USER_BRANDS, brands });
	};
}

export function clearUserAction() {
	return (dispatch, getState) => {
		dispatch({ type: Types.user.CLEAR_USER });
	};
}

export function setUserSubscription(brand) {
	return (dispatch, getState) => {
		dispatch({ type: Types.podcast.SET_USER_SUBSCRIPTION, brand });
	};
}

export function setUserAuthorSubscription(author) {
	return (dispatch, getState) => {
		dispatch({ type: Types.user.SET_USER_AUTH_FOLLOW, author });
	};
}

export function setProfileName(name) {
	return (dispatch, getState) => {
		dispatch({ type: Types.profile.SET_PROFILE_NAME, name });
	};
}

export function setProfilePic(profilePicture) {
	return (dispatch, getState) => {
		dispatch({ type: Types.profile.SET_PROFILE_PIC, profilePicture });
	};
}

export function setSubscribeUserAction(user) {
	return (dispatch, getState) => {
		dispatch({ type: Types.user.SET_SUBSCRIPTION_USER, user });
	};
}

export function clearSubscribeUserAction() {
	return (dispatch, getState) => {
		dispatch({ type: Types.user.CLEAR_SUBSCRIPTION_USER });
	};
}

export function SaveUserPreferencesFont(font) {
	return (dispatch, getState) => {
		dispatch({ type: Types.user.SAVE_USER_PREFERENCES_FONT, font });
	};
}

export function SaveUserPreferencesBg(bg) {
	return (dispatch, getState) => {
		dispatch({ type: Types.user.SAVE_USER_PREFERENCES_BG, bg });
	};
}
