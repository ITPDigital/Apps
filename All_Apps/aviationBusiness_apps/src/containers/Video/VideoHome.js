import React, { PureComponent, useRef, useEffect } from "react";
import { View, StyleSheet, FlatList, Animated, Platform } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../redux";
import {
	Article,
	ListLoading,
	PodcastPlayView,
	AnimatedHeaderList,
	ProfileHeader,
} from "../../components";
import {
	ScalePerctFullWidth,
	ScalePerctFullHeight,
	Colors,
	TemplateConfig,
	Metrics,
} from "../../asset";
import { VideoHomeAPI, ManageBoookmarkApi } from "../../service";
import HomeHeaderContainer from "../../navigators/HomeHeaderContainer";
import { Analytics, Screen } from "../../Analytics";
import { NativeModules } from "react-native";
import { getCurrentUserToken } from "../../storage";
const fadeAnim = new Animated.Value(0) ;

class VideoHome extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			video: [],
			pageNumber: 0,
			refresh: false,
			refreshKey: 1,
			imageUrl: "https://facebook.github.io/react-native/docs/assets/favicon.png",
		};
		console.log("user id", this.props.user.id);
		VideoHomeAPI(props.user.id, 0, this.onSuccess, this.onFailure, this.onError);
	}


// Initial value for opacity: 0

	componentDidMount = () => {
		Analytics.setCurrentScreen("VIDEO_HOME");
		Animated.timing(
			fadeAnim,
			{
			  toValue: 1,
			  duration: 3000, 
			}
		  ).start();
	};

	onSuccess = (videoDetails: array) => {
		const { video } = this.state;
		console.log("VIDEODATA"+JSON.stringify(videoDetails));
		const updated = [...video, ...videoDetails];
		this.setState({ video: updated, loading: false });
	};

	onManageBookmark = (nId: string, siteKey: string, isBookmarked: boolean, index: number) => {
		const { user } = this.props;
		const { video } = this.state;
		const changes = !video[index].bookmark;
		const refresh = Math.random();
		const updated = [...video];
		updated[index].bookmark = changes;
		this.setState({
			video: updated,
			refreshKey: refresh,
		});
		console.log("MANAGE BOOKMARK--> In VIDEO HOME", user.id, nId, siteKey, isBookmarked);

		ManageBoookmarkApi(user.id, nId, siteKey, isBookmarked);
	};

	onRefresh = async () => {
		const { user } = this.props;
		this.setState({ refresh: true, loading: true, video: [] });
		VideoHomeAPI(user.id, 0, this.onSuccess, this.onFailure, this.onError);
		this.setState({ refresh: false });
	};

	onFailure = (message: string) => {
		console.log(message);
	};

	onError = (error: any) => {
		console.log("Error occured in VideoHomeAPI ", error);
	};

	onEndReached = () => {
		const { user } = this.props;
		const { pageNumber } = this.state;
		if (this.state.loading === false) {
			const updated = pageNumber + 1;
			console.log("page number:", updated);
			this.setState({ pageNumber: updated, loading: true });
			VideoHomeAPI(user.id, updated, this.onSuccess, this.onFailure, this.onError);
			console.log("Video list:", this.state.video);
		}
	};

	onPressBrand = (site, brandLogo) => {
		const { navigation } = this.props;
		navigation.navigate("BrandsPage", {
			brand: site,
			brandLogo,
		});
	};

	onPressItem = (nid, site, video, link) => {
		const { isPaused, navigation } = this.props;
		console.log("link in video", link);
		isPaused(true);
		video
		? Platform.OS === "android"
			? navigation.navigate("ArticleDisplayHomeScreen", {
				nid,
				site,
				refreshKey: Math.random(),
		  })
			: navigation.navigate("ArticleDisplayHomeScreen", {
					nid,
					site,
					refreshKey: Math.random(),
			  })
		: navigation.navigate("ArticleDisplayHomeScreen", {
				nid,
				site,
				refreshKey: Math.random(),
		  });
		// video
		// 	? Platform.OS === "android"
		// 		? getCurrentUserToken().then((token: string) => {
		// 				NativeModules.BlueConic.setBlueconic(
		// 					nid.toString(),
		// 					site,
		// 					this.props.user.id.toString(),
		// 					token,
		// 					link,
		// 				);
		// 		  })
		// 		: navigation.navigate("VideoDetail", {
		// 				nid,
		// 				site,
		// 				refreshKey: Math.random(),
		// 		  })
		// 	: navigation.navigate("ArticleDisplayHomeScreen", {
		// 			nid,
		// 			site,
		// 			refreshKey: Math.random(),
		// 	  });
	};

	handlePlay = () => {
		const { navigation } = this.props;
		navigation.navigate("PlayScreen");
	};

	render() {
		const { video, loading, refreshKey, refresh } = this.state;
		const { navigation, control } = this.props;
		return (
			<AnimatedHeaderList 
				header={() => (
					// <ProfileHeader
					// 	navigation={navigation}
					// 	onSearch={() => navigation.navigate("SearchDrawerScreen")}
					// 	color={Colors.bgPrimaryLight}
					// />
					<HomeHeaderContainer navigation={navigation}  title={"Videos"} isCollapsed = {true}/>
				)}
				flatListProps={{  
					data: video,
					// onRefresh: () => this.onRefresh(),
					// refreshing: refresh,
					style: styles.ListItems,
					contentContainerStyle: styles.contentContainerStyle,
					keyExtractor: (x, i) => i.toString(),
					onEndReachedThreshold: 0.5,
					onEndReached: () => this.onEndReached(),
					ListFooterComponent: () => <ListLoading loading={loading} />,
					renderItem: ({ item, index }) => ( 
						<Animated.View style={{opacity:fadeAnim, transform:[
							{translateY:fadeAnim.interpolate({
							inputRange:[0,1],
							outputRange:[-600,0]})}  
							]}}>
						<Article
							onPress={() => {
								this.onPressItem(item.nid, item.site, item.video, item.link);
								// this.props.isPaused(true);
								// navigation.navigate("VideoDetail", {
								// 	nid: item.nid,
								// 	site: item.site,
								// 	refreshKey: Math.random(),
								// });
							}}
							key={index.toString()}
							onPressBookmark={() =>
								this.onManageBookmark(item.nid, item.site, item.bookmark, index)
							}
							// order={TemplateConfig.articleTemplates[item.video ? 13 : 13]}
							// settings={TemplateConfig.articleTemplateSettings[item.video ? 13 : 13]}
							order={TemplateConfig.articleTemplates[index == 0 ? 1: 2]}
							settings={TemplateConfig.articleTemplateSettings[index == 0 ? 1: 2]}
							data={item}
							refreshKey={refreshKey}
							onPressBrand={this.onPressBrand}
							bookmarkRequired
							user={this.props.user}
							isFromHomePage={true}
							// textStyle={StyleSheet.flatten([{color: "white"}])}
						/>
						</Animated.View> 
					),
				}}
				headerHeight={Metrics.HEADER_HEIGHT}
			/>
		);
	}
}

const styles = StyleSheet.create({ 
	container: { flex: 1 },
	authorDetails: {
		flexDirection: "row",
		width: ScalePerctFullWidth(100),
	},
	footer: {
		marginBottom: ScalePerctFullHeight(20),
	},
	ListItems: {
		flex: 1,
		// backgroundColor:"black"
	},
	contentContainerStyle: {
		flexGrow: 1,
		justifyContent: "center",
	},
	image: {
		height: ScalePerctFullWidth(32),
		width: ScalePerctFullWidth(32),
		marginLeft: ScalePerctFullWidth(6),
		marginTop: ScalePerctFullHeight(4),
		borderRadius: ScalePerctFullWidth(15),
	},
	textInfo: {
		backgroundColor: Colors.bgPrimaryLight,
		width: ScalePerctFullWidth(100),
	},
	followButton: {
		height: ScalePerctFullHeight(6),
		width: ScalePerctFullWidth(44),
		marginLeft: ScalePerctFullWidth(7),
		marginTop: ScalePerctFullHeight(4),
	},
});

const mapStateToProps = state => ({
	user: state.user,
	topics: state.user.topics,
	brands: state.user.brands,
	control: state.podcastPlayControl,
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(VideoHome);
