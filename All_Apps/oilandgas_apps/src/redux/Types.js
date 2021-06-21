const EXCEPTION = 'EXCEPTION';
const CLEAR_EXCEPTION_MSG = 'CLEAR_EXCEPTION_MSG';
const SET_USER = 'SET_USER';
const CLEAR_USER = 'CLEAR_USER';
const SET_MENU_TOPIC = 'SET_MENU_TOPIC';
const CLEAR_MENU_TOPIC = 'CLEAR_MENU_TOPIC';
const SET_ALL_TOPICS = 'SET_ALL_TOPICS';
const SET_ALL_BRANDS = 'SET_ALL_BRANDS';
const SET_SELECTED_BRANDS = 'SET_SELECTED_BRANDS';
const CLEAR_SELECTED_BRANDS = 'CLEAR_SELECTED_BRANDS';
const SET_MY_TROVE = 'SET_MY_TROVE';
const SET_PAGINATION_MY_TROVE = 'SET_PAGINATION_MY_TROVE';
const CLEAR_MY_TROVE = 'CLEAR_MY_TROVE';
const SET_ARTICLE_DISPLAY = 'SET_ARTICLE_DISPLAY';
const CLEAR_ARTICLE_DISPLAY = 'CLEAR_ARTICLE_DISPLAY';
const SET_SPLASH_SCRREN = 'SET_SPLASH_SCRREN';
const SET_PODCAST_LIST = 'SET_PODCAST_LIST';
const SET_PODCAST_CHAPTOR = 'SET_PODCAST_CHAPTOR';
const CLEAR_PODCAST_CHAPTOR = 'CLEAR_PODCAST_CHAPTOR';
const CLEAR_PODCAST_LIST = 'CLEAR_PODCAST_LIST';
const SET_PODCAST_VIEW = 'SET_PODCAST_VIEW';
const SET_PLAY = 'SET_PLAY';
const SET_USER_SUBSCRIPTION = 'SET_USER_SUBSCRIPTION';
const SET_USER_TOPICS = 'SET_USER_TOPICS';
const SET_USER_BRANDS = 'SET_USER_BRANDS';
const SET_HISTORY_LOAD = 'SET_HISTORY_LOAD';
const SET_BOOKMARK_LOAD = 'SET_BOOKMARK_LOAD';
const SET_PODCAST_VIEW_MORE = 'SET_PODCAST_VIEW_MORE';
const SET_PODCAST_HEADER = 'SET_PODCAST_HEADER';
const PAUSED = 'PAUSED';
const TOTAL_LENGTH = 'TOTAL_LENGTH';
const CURRENT_POSITION = 'CURRENT_POSITION';
const SELECTED_TRACK = 'SELECTED_TRACK';
const FLAG = 'FLAG';
const SHUFFLE_ON = 'SHUFFLE_ON';
const SET_TRACKS = 'SET_TRACKS';
const UPDATE_MY_TROVE = 'UPDATE_MY_TROVE';
const INITIAL_LIST = 'INITIAL_LIST';
const SET_USER_AUTH_FOLLOW = 'SET_USER_AUTH_FOLLOW';
const SET_PROFILE_NAME = 'SET_PROFILE_NAME';
const SET_PROFILE_PIC = 'SET_PROFILE_PIC';
const SET_SUBSCRIPTION_USER = 'SET_SUBSCRIPTION_USER';
const CLEAR_SUBSCRIPTION_USER = 'CLEAR_SUBSCRIPTION_USER';
const SAVE_USER_PREFERENCES_FONT = 'SAVE_USER_PREFERENCES_FONT';
const SAVE_USER_PREFERENCES_BG = 'SAVE_USER_PREFERENCES_BG';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const LOAD_START = 'LOAD_START';
const LOAD_END = 'LOAD_END';
const SET_CALL_DETECTION = 'SET_CALL_DETECTION';
const SET_MY_TROVE_TABLET = 'SET_MY_TROVE_TABLET';
const UPDATE_MY_TROVE_TABLET = 'UPDATE_MY_TROVE_TABLET';
const CLEAR_MY_TROVE_TABLET = 'CLEAR_MY_TROVE_TABLET';
const SET_PAGINATION_MY_TROVE_TABLET = 'SET_PAGINATION_MY_TROVE_TABLET';
const SET_BRAND = 'SET_BRAND';
const SET_PAGINATION_BRAND = 'SET_PAGINATION_BRAND';
const SET_PAGINATION_BRAND_TABLET = 'SET_PAGINATION_BRAND_TABLET';
const UPDATE_BRAND = 'UPDATE_BRAND';
const CLEAR_BRAND = 'CLEAR_BRAND';
const SET_BRAND_TABLET = 'SET_BRAND_TABLET';
const UPDATE_BRAND_TABLET = 'UPDATE_BRAND_TABLET';
const CLEAR_BRAND_TABLET = 'CLEAR_BRAND_TABLET';
const SET_AUTHOR = 'SET_AUTHOR';
const SET_PAGINATION_AUTHOR = 'SET_PAGINATION_AUTHOR';
const SET_PAGINATION_AUTHOR_TABLET = 'SET_PAGINATION_AUTHOR_TABLET';
const UPDATE_AUTHOR = 'UPDATE_AUTHOR';
const CLEAR_AUTHOR = 'CLEAR_AUTHOR';
const SET_AUTHOR_TABLET = 'SET_AUTHOR_TABLET';
const UPDATE_AUTHOR_TABLET = 'UPDATE_AUTHOR_TABLET';
const CLEAR_AUTHOR_TABLET = 'CLEAR_AUTHOR_TABLET';
const SET_MORESTORIES = 'SET_MORESTORIES';
const SET_PAGINATION_MORESTORIES = 'SET_PAGINATION_MORESTORIES';
const UPDATE_MORESTORIES = 'UPDATE_MORESTORIES';
const CLEAR_MORESTORIES = 'CLEAR_MORESTORIES';
const SET_DEVICE_INFO = 'SET_DEVICE_INFO';
const SET_DEEPLINK_DATA = 'SET_DEEPLINK_DATA';
const RESET_DEEPLINK_DATA = 'RESET_DEEPLINK_DATA';
const SET_INITIAL_WEBSERVICE_DATA = 'SET_INITIAL_WEBSERVICE_DATA';

const Types = {
	exception: {
		EXCEPTION,
		CLEAR_EXCEPTION_MSG,
	},
	initialWebService: {
		SET_INITIAL_WEBSERVICE_DATA,
	},
	user: {
		SET_USER,
		CLEAR_USER,
		SET_SUBSCRIPTION_USER,
		CLEAR_SUBSCRIPTION_USER,
		SET_USER_TOPICS,
		SET_USER_BRANDS,
		SET_USER_AUTH_FOLLOW,
		SAVE_USER_PREFERENCES_FONT,
		SAVE_USER_PREFERENCES_BG,
	},
	topic: {
		SET_MENU_TOPIC,
		CLEAR_MENU_TOPIC,
		SET_ALL_TOPICS,
	},
	brands: {
		SET_ALL_BRANDS,
		SET_SELECTED_BRANDS,
		CLEAR_SELECTED_BRANDS,
	},
	myTrove: {
		SET_MY_TROVE,
		SET_PAGINATION_MY_TROVE,
		SET_PAGINATION_MY_TROVE_TABLET,
		UPDATE_MY_TROVE,
		CLEAR_MY_TROVE,
		SET_MY_TROVE_TABLET,
		UPDATE_MY_TROVE_TABLET,
		CLEAR_MY_TROVE_TABLET,
	},
	articleDisplay: {
		SET_ARTICLE_DISPLAY,
		CLEAR_ARTICLE_DISPLAY,
	},
	bookmarkAndHistory: {
		SET_HISTORY_LOAD,
		SET_BOOKMARK_LOAD,
	},
	startUp: {
		SET_SPLASH_SCRREN,
	},
	podcast: {
		SET_PODCAST_LIST,
		SET_PODCAST_CHAPTOR,
		CLEAR_PODCAST_CHAPTOR,
		CLEAR_PODCAST_LIST,
		SET_PODCAST_VIEW,
		SET_PLAY,
		SET_USER_SUBSCRIPTION,
		SET_PODCAST_VIEW_MORE,
		SET_PODCAST_HEADER,
		INITIAL_LIST,
		LOAD_START,
		LOAD_END,
	},
	podcastPlayControl: {
		PAUSED,
		TOTAL_LENGTH,
		CURRENT_POSITION,
		SELECTED_TRACK,
		FLAG,
		SHUFFLE_ON,
		SET_TRACKS,
		SET_CALL_DETECTION,
	},
	profile: {
		SET_PROFILE_NAME,
		SET_PROFILE_PIC,
	},
	page: { SET_CURRENT_PAGE },
	brandTablet: {
		SET_BRAND,
		SET_PAGINATION_BRAND,
		SET_PAGINATION_BRAND_TABLET,
		UPDATE_BRAND,
		CLEAR_BRAND,
		SET_BRAND_TABLET,
		UPDATE_BRAND_TABLET,
		CLEAR_BRAND_TABLET,
	},
	authorTablet: {
		SET_AUTHOR,
		SET_PAGINATION_AUTHOR,
		SET_PAGINATION_AUTHOR_TABLET,
		UPDATE_AUTHOR,
		CLEAR_AUTHOR,
		SET_AUTHOR_TABLET,
		UPDATE_AUTHOR_TABLET,
		CLEAR_AUTHOR_TABLET,
	},
	moreStories: {
		SET_MORESTORIES,
		SET_PAGINATION_MORESTORIES,
		UPDATE_MORESTORIES,
		CLEAR_MORESTORIES,
	},
	deviceInfo: {
		SET_DEVICE_INFO,
	},
	deeplink: {
		SET_DEEPLINK_DATA,
		RESET_DEEPLINK_DATA,
	},
};

export default Types;
