import React, { PureComponent } from "react";
import {
	View,
	StyleSheet,
	FlatList,
	ActivityIndicator,
	Text,
	TouchableOpacity,
	NativeModules,
	Platform,
} from "react-native";

import { StackActions } from "react-navigation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../redux";
import { NavigationActions } from "react-navigation";
import {
	ProfileHeader,
	Article,
	ListLoading,
	PodcastPlayView,
	AnimatedHeaderList,
	BottomBar,
} from "../../components";
import {
	ScalePerctFullWidth,
	ScalePerctFullHeight,
	Colors,
	TemplateConfig,
	Strings,
	Metrics,
} from "../../asset";
import { ShowBoookmarkApi, ManageBoookmarkApi } from "../../service";
import { TabModal } from "../ChaptorPodcastScreen";
import { Analytics, Screen } from "../../Analytics";
import { getCurrentUserToken } from "../../storage";

class Bookmark extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			bookmarks: [],
			loading: true,
			pageNumber: 0,
			refresh: false,
			refreshKey: 1,
			bookmarkLoad: false,
			imageUrl: "https://facebook.github.io/react-native/docs/assets/favicon.png",
			showModal: false,
			flag: false,
		};
	}

	componentDidMount() {
		Analytics.setCurrentScreen("BOOKMARK_PAGE");
		const { user } = this.props;
		ShowBoookmarkApi(user.id, 0, this.onSuccess, this.onFailure, this.onError);
	}

	componentDidUpdate(prevProps) {
		const { user, bookmark, setArticleBookmark } = this.props;

		if (bookmark && !prevProps.bookmark) {
			ShowBoookmarkApi(user.id, 0, this.onSuccess, this.onFailure, this.onError);
			setArticleBookmark(false);
		} else if (bookmark) {
			setArticleBookmark(false);
		}
		//
	}

	onManageBookmark = async (nId: string, siteKey: string) => {
		const { user } = this.props;
		const { bookmarks } = this.state;
		const refresh = Math.random();
		const updatedBookmark = bookmarks.filter((item: Object) => item.nid !== nId);
		//if (updatedBookmark.length === 0) this.isEmpty();
		this.setState({ bookmarks: updatedBookmark, refreshKey: refresh });
		ManageBoookmarkApi(user.id, nId, siteKey, "U");
	};

	renderLoading = () => {
		return (
			<View style={styles.indicator}>
				<ActivityIndicator size="large" color="black" />
			</View>
		);
	};

	onSuccess = (bookmarksResponse: any) => {
		const { bookmarks, pageNumber, flag } = this.state;
		if (bookmarksResponse.length === 0) {
			this.setState({ flag: true });
		}
		let updated = [];
		if (pageNumber === 0) {
			updated = [...bookmarksResponse];
		} else {
			updated = [...bookmarks, ...bookmarksResponse];
		}
		this.setState({ bookmarks: updated, loading: false });
	};

	onEndReached = () => {
		const { user } = this.props;
		const { pageNumber, flag } = this.state;
		if (!flag) {
			const updated = pageNumber + 1;
			this.setState({ pageNumber: updated, loading: true });
			ShowBoookmarkApi(user.id, updated, this.onSuccess, this.stopLoading, this.onError);
			console.log("Bookmarks on End reachd:", this.state.bookmarks);
		}
	};

	onFailure = (message: string) => {
		console.log("message:", message);
		if (message === "No data found for this page") {
			this.setState({ loading: false, bookmarks: [] });
		} else {
			alert("Something went wrong, Please Try again later.");
		}
	};

	onError = (error: any) => {
		alert(Strings.bookmark.CHECK_CONNECTION);
	};

	stopLoading = () => {
		this.setState({ loading: false });
	};

	onRefresh = async () => {
		const { user } = this.props;
		this.setState({ pageNumber: 0, loading: true, bookmarks: [] });
		ShowBoookmarkApi(user.id, 0, this.onSuccess, this.onFailure, this.onError);
		//this.setState({ refresh: false });
	};

	isEmpty = () => {
		const { loading, bookmarks } = this.state;
		const flag = bookmarks.length === 0;
		return flag && !loading ? (
			<View style={styles.emptyContainer}>
				<Text style={styles.emptymessageText}> There is no item to show in bookmarks</Text>
			</View>
		) : null;
	};

	onItemPress = (nid: number, site: string, item: any) => {
		//const nextScreen = item.video ? "VideoDetail" : "ArticleDisplayHomeScreen";

		const { navigation, user } = this.props;
		const userId = user.id;
		if (item.content_type === "video") {
			item.video
				? Platform.OS === "android"
					? getCurrentUserToken().then((token: string) => {
							NativeModules.BlueConic.setBlueconic(
								item.nid.toString(),
								item.site,
								userId.toString(),
								token,
								item.link,
							);
							navigation.navigate("ArticleDisplayHomeScreen", {
								video: item.video,
								nid: item.nid,
								site: item.site,
								refreshKey: Math.random(),
						  });
					  })
					: navigation.navigate("ArticleDisplayHomeScreen", {
							video: item.video,
							nid: item.nid,
							site: item.site,
							refreshKey: Math.random(),
					  })
				: navigation.navigate("ArticleDisplayHomeScreen", {
						video: item.video,
						nid: item.nid,
						site: item.site,
				  });
			// if (item.content_type === "video") {
			// 	navigation.navigate(nextScreen, {
			// 		video: item.video,
			// 		nid: item.nid,
			// 		site: item.site,
			// 	});
		} else if (item.content_type === "gallery") {
			navigation.navigate("GalleryHomeScreen", { nid, site });
		} else {
			navigation.navigate("ArticleDisplayHomeScreen", { nid, site });
		}
	};

	renderTabPlayScreen = () => {
		const { showModal } = this.state;
		this.setState({ showModal: !showModal });
	};

	handlePlay = () => {
		const { navigation } = this.props;
		return Metrics.isTablet ? this.renderTabPlayScreen() : navigation.navigate("PlayScreen");
	};

	onPressBrand = (site, brandLogo) => {
		const { navigation } = this.props;
		navigation.navigate("BrandsPage", {
			brand: site,
			brandLogo,
		});
	};

	renderBottomStrip = () => {
		const { navigation } = this.props;
		return (
			<TouchableOpacity
				style={{
					position: "absolute",
					backgroundColor: "red",
					bottom: 20,
					zIndex: 1,
				}}
				onPress={() => {
					this.props.navigation.openDrawer();
				}}
			>
				<Text>click here1</Text>
			</TouchableOpacity>
		);
	};

	componentDidUnMount() {
		console.log("unmounted");
		this.setState({ loading: true });
	}

	render() {
		const { bookmarks, loading, refresh, bookmarkLoad, refreshKey, showModal } = this.state;
		const { navigation } = this.props;
		const { flag } = this.props;
		const noOfColumn = Metrics.isTablet ? 2 : 1;
		const numberOfLines = Metrics.isTablet ? 3 : null;
		const tabletTemplate = Metrics.isTablet
			? 12
			: console.log("Bookmark loading: ", bookmarkLoad);
		console.log("bookmark");
		return (
			<View style={styles.container}>
				<AnimatedHeaderList
					header={() => (
						<ProfileHeader
							onAction={() => {
								navigation.navigate("ProfileDrawerScreen");
							}}
							onBack={() => {
								this.setState({ loading: true, bookmarks: [] });
								navigation.goBack(null);
							}}
							title={"Bookmarks"}
						/>
					)}
					flatListProps={{
						data: bookmarks,
						extraData: refreshKey,
						onRefresh: () => this.onRefresh(),
						onEndReachedThreshold: 0.5,
						onEndReached: () => this.onEndReached(),
						numColumns: noOfColumn,
						refreshing: refresh,
						style: styles.ListItems,
						keyExtractor: (x, i) => i.toString(),
						contentContainerStyle: styles.contentcontainerStyles,
						ListFooterComponent: () => <ListLoading loading={loading} />,
						renderItem: ({ item, index }) => (
							<Article
								onPress={() => {
									this.onItemPress(item.nid, item.site, item, true);
								}}
								onPressBookmark={() => this.onManageBookmark(item.nid, item.site)}
								key={index.toString()}
								order={
									TemplateConfig.articleTemplates[
										Metrics.isTablet ? 15 : item.template
									]
								}
								settings={
									TemplateConfig.articleTemplateSettings[
										Metrics.isTablet ? 14 : item.template
									]
								}
								data={item}
								tabContainerStyle={styles.tabContainerStyle}
								numberOfLines={numberOfLines}
								articleContainerStyle={styles.articleContainerStyle}
								imageStyle={styles.imageStyle}
								imagePlaceHolderStyle={styles.imagePlaceHolderStyle}
								articleDescriptionstyle={styles.articleDescriptionstyle}
								onPressBrand={this.onPressBrand}
								seperator={styles.lineSeperator}
								routeFlag={2}
							/>
						),
					}}
					headerHeight={Metrics.HEADER_HEIGHT}
				/>
				{this.isEmpty()}
				{!showModal ? flag && <PodcastPlayView onPress={this.handlePlay} /> : null}
				{showModal && <TabModal showModal={showModal} handlePlay={this.handlePlay} />}
				{/* <BottomBar navigation={navigation} /> */}
			</View>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
	bookmark: state.bookmark,
	flag: state.podcastPlayControl ? state.podcastPlayControl.flag : false,
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

const normalStyles = StyleSheet.create({
	container: {
		height: ScalePerctFullHeight(100),
		width: ScalePerctFullWidth(100),
	},
	onLoad: {
		position: "absolute",
		alignSelf: "center",
	},
	emptyContainer: {
		height: ScalePerctFullHeight(40),
		width: ScalePerctFullWidth(100),
		justifyContent: "flex-end",
		alignItems: "center",
		alignSelf: "center",
		marginBottom: 300,
	},
	emptymessageText: {
		fontFamily: "BentonSans Regular",
		color: Colors.bgPrimaryDark,
		fontSize: 14,
	},
	authorDetails: {
		flexDirection: "row",
		width: ScalePerctFullWidth(100),
	},
	contentContainerStyle: {
		flexGrow: 1,
		justifyContent: "center",
	},
	ListItems: {
		flex: 1,
	},
	footer: {
		marginBottom: ScalePerctFullHeight(20),
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
	indicator: {
		position: "absolute",
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#00000080",
	},
});

const tabStyles = StyleSheet.create({
	container: {
		height: ScalePerctFullHeight(100),
		width: ScalePerctFullWidth(100),
	},
	onLoad: {
		position: "absolute",
		alignSelf: "center",
	},
	emptyContainer: {
		height: ScalePerctFullHeight(40),
		width: ScalePerctFullWidth(100),
		justifyContent: "flex-end",
		alignItems: "center",
	},
	emptymessageText: {
		fontFamily: "BentonSans Regular",
		color: Colors.bgPrimaryDark,
		fontSize: 14,
	},
	authorDetails: {
		flexDirection: "row",
		width: ScalePerctFullWidth(100),
	},
	contentContainerStyle: {
		flexGrow: 1,
		justifyContent: "center",
	},
	ListItems: {
		flex: 1,
	},
	footer: {
		marginBottom: ScalePerctFullHeight(20),
	},
	image: {
		height: ScalePerctFullWidth(12),
		width: ScalePerctFullWidth(15),
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
	indicator: {
		position: "absolute",
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#00000080",
	},
	tabContainerStyle: {
		width: ScalePerctFullWidth(46),
		alignSelf: "flex-start",
	},
	articleContainerStyle: {
		width: ScalePerctFullWidth(46),
		//flex: 1,
		//height: ScalePerctFullHeight(32),
	},
	articleDescriptionstyle: {
		height: 80,
		width: ScalePerctFullWidth(46),
	},
	imageStyle: {
		width: ScalePerctFullWidth(14.6),
		height: ScalePerctFullHeight(8.4),
		borderRadius: Metrics.SMALL_RADIUS,
		marginLeft: Metrics.DEFAULT_LIST_PADDING,
		marginTop: 4,
	},
	imagePlaceHolderStyle: {
		width: ScalePerctFullWidth(14.6),
		height: ScalePerctFullHeight(8.4),
		borderRadius: Metrics.SMALL_RADIUS,
	},
	lineSeperator: {
		width: ScalePerctFullWidth(42),
		alignSelf: "flex-start",
		borderBottomWidth: 5,
		borderColor: Colors.linePrimary,
		//marginBottom: 5,
		marginLeft: ScalePerctFullWidth(3),
		// marginRight: ScalePerctFullWidth(10),
	},
	contentcontainerStyles: {
		justifyContent: "space-between",
		marginHorizontal: (ScalePerctFullWidth(100) - ScalePerctFullWidth(93)) / 2,
		//alignItems: "flex-start",
	},
});

const styles = Metrics.isTablet ? tabStyles : normalStyles;

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Bookmark);

Bookmark.defaultProps = {};
