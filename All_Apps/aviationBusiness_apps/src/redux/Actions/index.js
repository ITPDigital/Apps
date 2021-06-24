import * as UserActions from "./User";
import * as TopicsActions from "./Topics";
import * as BrandsActions from "./Brands";
import * as MyTroveActions from "./MyTrove";
import * as MyTroveTabletActions from "./MyTroveTablet";
import * as ArticleDisplayActions from "./ArticleDisplay";
import * as StartUpActions from "./StartUp";
import * as SetPodcastList from "./PodcastList";
import * as PodcastPlayControl from "./PodcastPlayControl";
import * as SetCurrentPage from "./SetPage";
import * as BrandTabletAction from "./BrandTablet";
import * as AuthorTabletaction from "./AuthorTablet";
import * as MoreStoriesAction from "./MoreStories";
import * as DeviceInfo from "./DeviceInfo";
import * as Deeplink from "./Deeplink";
import * as InitialWebServiceData from "./InitialWebService";

const Actions = Object.assign(
	{},
	UserActions,
	TopicsActions,
	InitialWebServiceData,
	BrandsActions,
	MyTroveActions,
	StartUpActions,
	SetPodcastList,
	ArticleDisplayActions,
	PodcastPlayControl,
	SetCurrentPage,
	MyTroveTabletActions,
	BrandTabletAction,
	AuthorTabletaction,
	MoreStoriesAction,
	DeviceInfo,
	Deeplink,
);
export default Actions;
