import Firebase from "react-native-firebase";

const Events = {
	auth: {
		signUp: "SIGN_UP",
		signIn: "SIGN_IN",
		twitterLogin: "TWITTER_LOGIN",
		facebookLogin: "FACEBOOK_LOGIN",
		googleLogin: "GOOGLE_LOGIN",
		logout: "LOGOUT",
	},
	podcast: {
		subscribe: "PODCAST_SUBSCRIBE",
		unSubscribe: "PODCAST_UNSUBSCRIBE",
	},
	magazine: {
		download: "MAGAZINE_DOWNLOAD",
		subscribe: "MAGAZINE_SUBSCRIBE",
	},
	author: {
		follow: "AUTHOR_FOLLOW",
		unFollow: "UNFOLLOW",
	},
	
	share: "SHARE",
	bookmark: "BOOKMARK",
	unBookmark: "UNBOOKMARK",
	screen_view: "screen_view",
};

const Screen = {
	landingScreen: "LANDING",
	forgotPassword: "FORGOT_PASSWORD",
	topicsSelection: "SELECT_TOPICS",
	brandSelection: "SELECT_BRANDS",
	articleDetails: "ARTICLE_DETAILS",
	galleryPage: "GALLERY",
	galleryDetails: "BIG_PICTURE",
	videoHome: "VIDEO_HOME",
	videoDetails: "VIDEO_DETAILS",
	podcastHome: "PODCAST_HOME",
	podcastViewAll: "PODCAST_LIST",
	podcastChatpor: "PODCAST_CHAPTOR",
	podcastPlay: "PODCAST_PLAY",
	magazine: "MAGAZINE_HOME",
	magazineDetails: "MAGAZINE_DETAILS",
	magazinePreviousIssuePage: "MAGAZINE_LIST",
	alreadySubscribed: "MAGAZINE_LOGIN",
	history: "HISTORY",
	bookmark: "BOOKMARK",
	profile: "PROFILE",
	settings: "SETTINGS",
	help: "HELP",
	termsAndCondition: "TERMS_AND_CONDITION",
};

const Analytics = class {
	static logEvent(event, params) {
		Firebase.analytics().logEvent(event, params);
	}

	static setAnalyticsCollectionEnabled(enabled) {
		Firebase.analytics().setAnalyticsCollectionEnabled(enabled);
	}

	static setCurrentScreen(screenName, screenClassOverride) {
		Firebase.analytics().setCurrentScreen(screenName, screenClassOverride);
	}

	static setMinimumSessionDuration(miliseconds) {
		Firebase.analytics().setMinimumSessionDuration(miliseconds);
	}

	static setSessionTimeoutDuration(miliseconds) {
		Firebase.analytics().setSessionTimeoutDuration(miliseconds);
	}

	static setUserId(id) {
		Firebase.analytics().setUserId(id);
	}

	static setUserProperty(name, value) {
		Firebase.analytics().setUserProperty(name, value);
	}
};

export { Events, Analytics, Screen };
