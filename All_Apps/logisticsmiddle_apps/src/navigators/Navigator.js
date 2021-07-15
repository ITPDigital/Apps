import React from "react";
import {
	createSwitchNavigator, createAppContainer
} from "react-navigation";
import {
	createDrawerNavigator
} from "react-navigation-drawer";
import {
	createBottomTabNavigator
} from "react-navigation-tabs";
import {
	createStackNavigator
} from "react-navigation-stack";
import { View, Animated, I18nManager } from "react-native";

import {
	getLanguage
  } from '../../src/storage';

import {
	AuthLoading,
	FirstAuthScreen,
	Login,
	SignUpAuthScreen,
	ForgotAuthScreen,
	MessageAuthScreen,
	Profile,
	Topics,
	Brands,
	ArticleView,
	ListPodcastScreen,
	StartUp,
	Bookmark,
	BookmarkTablet,
	History,
	HistoryTablet,
	Author,
	AuthorTablet,
	ChaptorPodcastScreen,
	GalleryView,
	BigImage,
	Search,
	VideoHome,
	ViewListPodcastScreen,
	PlayScreen,
	FlowPlayerContainer,
	VideoDetail,
	MagazineListContainer,
	MagazinePrevListContainer,
	MagazineDetailContainer,
	MagazineSubscribeContainer,
	Comments,
	Brand,
	BrandTablet,
	TabletVideoHome,
	MoreStories,
	Subscription,
	
} from "../containers";
import TabBarNavigator from "./TabBarNavigator";
import { Colors, Metrics } from "../asset";
import HomeMenuNavigator from "./HomeMenuNavigatorAnimate";
import DrawerNavigator from "./DrawerNavigator";
import PodcastRoot from "./Podcast";
// import AuthNavigator from "./AuthNavigator";

const LoginScreen = Metrics.isTablet ? Login : Login;
const AuthStack = createStackNavigator(
	{
		//FirstAuthScreen: { screen: LoginScreen },
		LoginAuthScreen: { screen: Login, navigationOptions: { header: null } },
		SignUpAuthScreen: { screen: SignUpAuthScreen, navigationOptions: { header: null } },
		ForgotAuthScreen: { screen: ForgotAuthScreen, navigationOptions: { header: null } },
		SuccessAuthScreen: { screen: AuthLoading, navigationOptions: { header: null } },
		MessageAuthScreen: { screen: MessageAuthScreen, navigationOptions: { header: null } },
	},
	{
		navigationOptions: () => ({
			header: null,
			headerLeft: null
		}),
	},
);

const SubscriptionStack = createStackNavigator(
	{
		SubscriptionScreen: { screen: Subscription, navigationOptions: { header: null } },
		
	},
	{
		navigationOptions: () => ({
			header: null,
		}),
	},
	
);

const NewUserStack = createStackNavigator(
	{
		TopicsAuthScreen: { screen: Topics, navigationOptions: { header: null } },
		BrandsAuthScreen: { screen: Brands, navigationOptions: { header: null } },
	},
	{
		navigationOptions: () => ({
			header: null,
		}),
	},
);

const TopicsBrandsStack = createStackNavigator(
	{
		TopicsStackScreen: { screen: props => <Topics isNotStartUp {...props} /> },
		BrandsStackScreen: { screen: Brands, navigationOptions: { header: null } },
	},
	{
		navigationOptions: () => ({
			header: null,
		}),
	},
);

const HomeTab = createBottomTabNavigator(
	{
		HomeTabScreen: { screen: HomeMenuNavigator, navigationOptions: { header: null } },
		VideoTabScreen: { screen: Metrics.isTablet ? TabletVideoHome : VideoHome, navigationOptions: { header: null } },
		//PodcastTabScreen: { screen: ViewListPodcastScreen, navigationOptions: { header: null } },
		MagazineTabScreen: { screen: MagazinePrevListContainer, navigationOptions: { header: null } },
	},
	{
		lazy: true,
		tabBarComponent: TabBarNavigator,
		swipeEnabled: true,
		tabBarPosition: "bottom",
		tabBarOptions: {
			activeTintColor: Colors.bodyPrimaryVarient,
			inactiveTintColor: Colors.bodySecondaryDark,
		},
	},
);

const HomeStack = createStackNavigator(
	{
		TabHomeScreen: { screen: HomeTab, navigationOptions: { header: null } },
		ArticleDisplayHomeScreen: { screen: ArticleView, navigationOptions: { header: null } },
		GalleryHomeScreen: { screen: GalleryView, navigationOptions: { header: null } },
		PlayScreen: { screen: PlayScreen, navigationOptions: { header: null } },
		PlayVideoHomeScreen: { screen: AuthLoading, navigationOptions: { header: null } },
		VideoCommentsHomeScreen: { screen: AuthLoading, navigationOptions: { header: null } },
		MagazineIssueHomeScreen: { screen: MagazineDetailContainer, navigationOptions: { header: null } },
		MagazinePrevHomeScreen: { screen: MagazinePrevListContainer, navigationOptions: { header: null } },
		FlowPlayerHomeScreen: { screen: FlowPlayerContainer, navigationOptions: { header: null } },
		MagazineSubscriptionHomeScreen: { screen: MagazineSubscribeContainer, navigationOptions: { header: null } },
		VideoDetail: { screen: VideoDetail, navigationOptions: { header: null } },
		Author: { screen: Metrics.isTablet ? AuthorTablet : Author, navigationOptions: { header: null } },
		Comments: { screen: Comments, navigationOptions: { header: null } },
		BigImage: { screen: BigImage, navigationOptions: { header: null } },
		ChaptorPodcastScreen: { screen: ChaptorPodcastScreen, navigationOptions: { header: null } },
		BrandsPage: { screen: Metrics.isTablet ? BrandTablet : Brand, navigationOptions: { header: null } },
		AuthorArticleScreen: { screen: AuthLoading, navigationOptions: { header: null } },
		ViewListPodcastScreen: { screen: ViewListPodcastScreen, navigationOptions: { header: null } },
		MoreStories: { screen: MoreStories, navigationOptions: { header: null } },
		SearchDrawerScreen: { screen: Search, navigationOptions: { header: null } },
	},
	{
		navigationOptions: () => ({
			header: null,
		}),
		transitionConfig: () => ({
			transitionSpec: {
				duration: 250,
				timing: Animated.timing,
				useNativeDriver: true,
			},
		}),
		cardStyle: { backgroundColor: Colors.bgPrimaryLight },
	},
);

HomeStack.navigationOptions = ({ navigation }) => {
	let drawerLockMode = "unlocked";
	if (navigation.state.index > 0) {
		drawerLockMode = "locked-closed";
	}

	return {
		drawerLockMode,
	};
};

const HistoryStack = createStackNavigator(  
	{
		History: { screen: Metrics.isTablet ? History : History , key: Math.random(), navigationOptions: { header: null } },
		ArticleDisplayHomeScreen: { screen: ArticleView,  key: Math.random(), navigationOptions: { header: null } },
		BrandsPage: { screen: Metrics.isTablet ? BrandTablet : Brand,  key: Math.random(), navigationOptions: { header: null } },
		Author: { screen: Metrics.isTablet ? AuthorTablet : Author,  key: Math.random(), navigationOptions: { header: null } },
		GalleryHomeScreen: { screen: GalleryView,  key: Math.random(), navigationOptions: { header: null } },
		VideoDetail: { screen: VideoDetail,   key: Math.random(),navigationOptions: { header: null } },
	},
	{
		navigationOptions: () => ({
			header: null,
		}),
		cardStyle: { backgroundColor: Colors.bgPrimaryLight },
	},
);

const BookmarkStack = createStackNavigator(
	{
		Bookmark: { screen: Metrics.isTablet ? BookmarkTablet : Bookmark, navigationOptions: { header: null } },
		ArticleDisplayHomeScreen: { screen: ArticleView, navigationOptions: { header: null } },
		BrandsPage: { screen: Metrics.isTablet ? BrandTablet : Brand, navigationOptions: { header: null } },
		Author: { screen: Metrics.isTablet ? AuthorTablet : Author, navigationOptions: { header: null } },
		GalleryHomeScreen: { screen: GalleryView, navigationOptions: { header: null } },
		VideoDetail: { screen: VideoDetail, navigationOptions: { header: null } },
	},
	{
		navigationOptions: () => ({
			header: null,
		}),
		cardStyle: { backgroundColor: Colors.bgPrimaryLight },
	},
);

// var lang = getLanguage().then(language => {
// 	console.log("LANUGUAGE", language);
// 	lang = language;
// });

const HomeDrawer = createDrawerNavigator(
	
	{
		HomeDrawerScreen: { screen: HomeStack, navigationOptions: { header: null } },
		HistoryDrawerScreen: { screen: HistoryStack, navigationOptions: { header: null } },
		BookmarkDrawerScreen: { screen: BookmarkStack, navigationOptions: { header: null } },
		// CustomizeInterestDrawerScreen: { screen: TopicsBrandsStack, navigationOptions: { header: null } },
		BrandsDrawerScreen: { screen: Metrics.isTablet ? BrandTablet : Brand, navigationOptions: { header: null } },
		ProfileDrawerScreen: { screen: Profile, navigationOptions: { header: null } },
		TosDrawerScreen: { screen: MagazineSubscribeContainer, navigationOptions: { header: null } },
		SettingsDrawerScreen: { screen: Brand, navigationOptions: { header: null } },
		HelpDrawerScreen: { screen: AuthLoading, navigationOptions: { header: null } },
	},
	{
		initialRouteName: "HomeDrawerScreen",
		contentComponent: DrawerNavigator,
		drawerPosition: I18nManager.isRTL ? 'left' : 'right',
		drawerType: "slide",
		drawerWidth: 300,
	},
);

const NavContainer = createSwitchNavigator(
	{
		StartUp,
		HomeNavigation: { screen: HomeDrawer, path: "chat/:user", navigationOptions: { header: null } },
		AuthNavigation: AuthStack,
		NewUserNavigation: NewUserStack,
		SubscriptionPaywall:SubscriptionStack,

	},
	{
		initialRouteName: "StartUp",
	},
);

const Navigator = () => {
	return (
		<View style={{ flex: 1 }}>
			<NavContainer />
			<PodcastRoot />
		</View>
	);
};

export default createAppContainer(NavContainer);
