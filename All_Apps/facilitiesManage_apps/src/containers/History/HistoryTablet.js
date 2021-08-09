import React, { PureComponent } from "react";
import { View, StyleSheet, FlatList, NativeModules, Platform } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../redux";
import {
	ProfileHeader,
	Article,
	ListLoading,
	PodcastPlayView,
	AlertComp,
	AnimatedHeaderList,
	BottomBar,
} from "../../components";
import {
	ScalePerctFullWidth,
	ScalePerctFullHeight,
	Colors,
	TemplateConfig,
	Metrics,
	Strings,
} from "../../asset";
import { ShowHistoryApi, ManageBoookmarkApi } from "../../service";
import { TabModal } from "../ChaptorPodcastScreen";
import ArticletabletSmall from "../../components/articleListItems/ArticleTabletSmall";
import { Analytics } from "../../Analytics";
import { getCurrentUserToken } from "../../storage";

class HistoryTablet extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			history: [],
			loading: true,
			refreshKey: 1,
			pageNumber: 0,
			manageHistoryLoad: false,
			imageUrl: "https://facebook.github.io/react-native/docs/assets/favicon.png",
			showModal: false,
		};
		ShowHistoryApi(props.user.id, 0, this.onSuccess, this.onFailure, this.onError);
	}

	componentDidMount(prevProps) { 
		
		Analytics.setCurrentScreen("HISTORY");

		const { user, history, setArticleHistory } = this.props;
		if (history && !prevProps.history) {
			ShowHistoryApi(user.id, 0, this.onSuccess, this.onFailure, this.onError);
			setArticleHistory(false);
		} else if (history) {
			setArticleHistory(false);
		}
	}

	onSuccess = (historyResponse: any) => {
		const { flag } = this.state;
		const { setArticleHistory } = this.props;
		if (historyResponse.length === 0) {
			this.setState({ flag: true });
		}
		let updated = [];
		const { history, pageNumber } = this.state;
		const FirstUpdate = [...historyResponse];
		if (pageNumber === 0) {
			updated = [...FirstUpdate];
		} else {
			updated = [...history, ...historyResponse];
		}
		this.setState({
			history: updated,
			loading: false,
			manageHistoryLoad: false,
			refreshKey: Math.random(),
		});
		setArticleHistory(false);
	};

	onManageBookmark = (nId: string, siteKey: string, isBookmarked: boolean, index: number) => {
		const { user, setArticleHistory } = this.props;
		const { history } = this.state;
		const changes = !history[index].bookmark;
		let refresh = Math.random();
		const updated = [...history];
		updated[index].bookmark = changes;
		this.setState({
			history: updated,
			refreshKey: refresh,
		});
		ManageBoookmarkApi(user.id, nId, siteKey, isBookmarked);
	};

	onFailure = (message: string) => {
		const { navigation } = this.props;
		AlertComp(Strings.authentication.ALERT, "No data found", () => navigation.goBack());
	};

	onError = (error: any) => {
		this.setState({ loading: false });
		const { navigation } = this.props;
		AlertComp(
			Strings.authentication.ALERT,
			"Something went wrong please try again later",
			() => navigation.goBack(),
		);
	};

	onRefresh = () => {
		const { user } = this.props;
		console.log("on Refresh called in history");
		this.setState({ pageNumber: 0, loading: true, history: [] });
		ShowHistoryApi(user.id, 0, this.onSuccess, this.onFailure, this.onError);
		// this.setState({ manageHistoryLoad: false, refreshKey: Math.random() });
	};

	onItemPress = (nid: number, site: string, item: any) => {
		console.log("ItemHistory", item);

		const nextScreen = item.video ? "ArticleDisplayHomeScreen" : "ArticleDisplayHomeScreen";
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

	onEndReached = () => {
		const { user } = this.props;
		const { pageNumber, flag } = this.state;

		if (!flag) {
			const updated = pageNumber + 1;
			this.setState({ pageNumber: updated, loading: true });
			ShowHistoryApi(user.id, updated, this.onSuccess, this.onFailure, this.onError);
		}
	};

	render() {
		const { history, loading, manageHistoryLoad, refreshKey, showModal } = this.state;
		const { navigation, flag } = this.props;
		const noOfColumn = Metrics.isTablet ? 2 : 1;
		const numberOfLines = Metrics.isTablet ? 3 : null;
		console.log("History");
		return (
			<View style={styles.container}>
				<AnimatedHeaderList
					header={() => (
						<ProfileHeader
							onAction={() => {
								navigation.navigate("ProfileDrawerScreen");
							}}
							onBack={() => {
								navigation.goBack(null);
							}}
							title="History"
						/>
					)}
					flatListProps={{
						data: history,
						extraData: refreshKey,
						onRefresh: () => this.onRefresh(),
						onEndReachedThreshold: 0.5,
						onEndReached: () => this.onEndReached(),
						numColumns: noOfColumn,
						refreshing: manageHistoryLoad,
						style: styles.ListItems,
						keyExtractor: (x, i) => i.toString(),
						contentContainerStyle: styles.contentContainerStyles,
						ListFooterComponent: () => <ListLoading loading={loading} />,
						renderItem: ({ item, index }) => (
							<ArticletabletSmall
								onPress={() => {
									this.onItemPress(item.nid, item.site, item, item.bookmark);
								}}
								onPressBookmark={() =>
									this.onManageBookmark(
										item.nid,
										item.site,
										item.bookmark,
										index,
									)
								}
								key={index.toString()}
								data={item}
								refreshKey={refreshKey}
								isImage
								tabContainerStyle={{
									marginRight: ScalePerctFullWidth(5),
								}}
								onPressBrand={this.onPressBrand}
								bookmarkRequired
								routeFlag={1}
							/>
						),
					}}
					headerHeight={Metrics.HEADER_HEIGHT}
				/>
				{!showModal ? flag && <PodcastPlayView onPress={this.handlePlay} /> : null}
				{showModal && <TabModal showModal={showModal} handlePlay={this.handlePlay} />}
				<BottomBar navigation={navigation} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: ScalePerctFullHeight(100),
		width: ScalePerctFullWidth(100),
	},
	authorDetails: {
		flexDirection: "row",
		width: ScalePerctFullWidth(100),
	},
	footer: {
		marginBottom: ScalePerctFullHeight(20),
	},
	ListItems: {
		flex: 1,
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

	lineSeperator: {
		width: ScalePerctFullWidth(42),
		alignSelf: "flex-start",
		borderBottomWidth: 5,
		borderColor: Colors.linePrimary,
		//marginBottom: 5,
		marginLeft: ScalePerctFullWidth(3),
		// marginRight: ScalePerctFullWidth(10),
	},
	contentContainerStyles: {
		justifyContent: "space-between",
		marginLeft: ScalePerctFullWidth(5),
		//alignItems: "flex-start",
	},
});

const mapStateToProps = state => ({
	user: state.user,
	history: state.history,
	flag: state.podcastPlayControl ? state.podcastPlayControl.flag : false,
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(HistoryTablet);

HistoryTablet.defaultProps = {};
