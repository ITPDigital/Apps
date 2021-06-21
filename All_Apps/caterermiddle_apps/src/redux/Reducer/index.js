import { combineReducers } from "redux";
import * as HandleException from "./HandleException";
import * as User from "./User";
import * as Topics from "./Topics";
import * as Brands from "./Brands";
import * as MyTrove from "./MyTrove";
import * as ArticleDisplay from "./ArticleDisplay";
import * as StartUp from "./StartUp";
import * as PodcastList from "./PodcastList";
import * as PodcastPlayControl from "./PodcastPlayControl";
import * as CurrentPage from "./SetPage";
import * as IsLoading from "./Loader";
import * as IsCallDetected from "./CallDetection";
import * as MyTroveTablet from "./MyTroveTablet";
import * as BrandTablet from "./BrandTablet";
import * as AuthorTablet from "./AuthorTablet";
import * as MoreStories from "./MoreStories";
import * as DeviceInfo from "./DeviceInfo";
import * as Deeplink from "./Deeplink";
import * as InitialWebService from "./InitialWebService";

const reducer = combineReducers(
	Object.assign(
		HandleException,
		User,
		Topics,
		Brands,
		MyTrove,
		StartUp,
		ArticleDisplay,
		PodcastList,
		PodcastPlayControl,
		CurrentPage,
		IsLoading,
		IsCallDetected,
		MyTroveTablet,
		BrandTablet,
		AuthorTablet,
		MoreStories,
		DeviceInfo,
		Deeplink,
		InitialWebService,
	),
);

export default reducer;
