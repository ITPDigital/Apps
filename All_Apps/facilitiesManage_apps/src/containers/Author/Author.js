import React, { PureComponent } from "react";
import {
	View,
	Image,
	StyleSheet,
	FlatList,
	ActivityIndicator,
	NativeModules,
	Platform,
} from "react-native";
import ImageLoad from "react-native-image-placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
	ScalePerctFullWidth,
	ScalePerctFullHeight,
	Colors,
	TemplateConfig,
	Images,
	Metrics,
	Strings,
} from "../../asset";
import {
	AuthorInfo,
	ProfileHeader,
	BuildFeedButton,
	Article,
	ListLoading,
	AlertComp,
	PodcastPlayView,
} from "../../components";
import { Actions } from "../../redux";
import { AuthorDetails, FollowAuthor, ManageBoookmarkApi } from "../../service";
import { Analytics, Events } from "../../Analytics";
import { getCurrentUserToken } from "../../storage";

type Props = {
	authorId?: any,
	authorName?: any,
	navigation: any,
	site?: any,
};

class Author extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			isStop: false,
			refresh: false,
			loader: true,
			items: [],
			pageNumber: 0,
			authorName: "Author",
			storyCount: 0,
			followers: 0,
			isFollowing:
				props.user.authors.indexOf(
					`${props.navigation.getParam("authorId")}~${props.navigation.getParam(
						"site",
					)}`,
				) > -1,
			refreshKey: 1,
			imageUrl: Images.fb_fav,
		};
	}

	componentDidMount() {
		AuthorDetails(
			this.props.navigation.getParam("authorId"),
			this.props.navigation.getParam("site"),
			0,
			this.props.user.id,
			this.onSuccess,
			this.onFailure,
			this.onError,
		);
	}

	componentDidUpdate(prevProps) {
		if (
			prevProps.navigation.getParam("authorId") !==
				this.props.navigation.getParam("authorId") ||
			prevProps.navigation.getParam("site") !== this.props.navigation.getParam("site")
		) {
			this.setState({ loading: true, items: [] });
			AuthorDetails(
				this.props.navigation.getParam("authorId"),
				this.props.navigation.getParam("site"),
				0,
				this.props.user.id,
				this.onSuccess,
				this.onFailure,
				this.onError,
			);
		}
	}

	onManageBookmark = (nId: string, siteKey: string, isBookmarked: boolean, index: number) => {
		const { user } = this.props;
		const { items } = this.state;
		const changes = !items[index].bookmark;
		const refresh = Math.random();
		const updated = [...items];
		updated[index].bookmark = changes;
		this.setState({
			items: updated,
			refreshKey: refresh,
		});
		ManageBoookmarkApi(user.id, nId, siteKey, isBookmarked);
	};

	onItemPress = (nid: number, site: string, item: any) => {
		console.log("itemAuthor", item);
		const { navigation, user } = this.props;
		//const nextScreen = item.video ? "VideoDetail" : "ArticleDisplayHomeScreen";
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
							screenProps.navigation.navigate("ArticleDisplayHomeScreen", {
								nid: item.nid,
								site: item.site,
								refreshKey: Math.random(),
						  });
					  })
					: screenProps.navigation.navigate("ArticleDisplayHomeScreen", {
							nid: item.nid,
							site: item.site,
							refreshKey: Math.random(),
					  })
				: screenProps.navigation.push("ArticleDisplayHomeScreen", {
						video: item.video,
						nid: item.nid,
						site: item.site,
				  });
		} else if (item.content_type === "gallery") {
			navigation.navigate("GalleryHomeScreen", { nid, site });
		} else {
			console.log("Artilce");
			navigation.push("ArticleDisplayHomeScreen", { nid, site });
		}
	};

	onPressBrand = (site, brandLogo) => {
		const { navigation } = this.props;
		navigation.navigate("BrandsPage", {
			brand: site,
			brandLogo,
		});
	};

	onEndReached = () => {
		const { pageNumber, isStop } = this.state;
		const { user } = this.props;
		if (this.state.loading === false) {
			const updated = pageNumber + 1;
			const authorId = this.props.navigation.getParam("authorId");
			const siteKey = this.props.navigation.getParam("site");

			this.setState({ pageNumber: updated, loading: true });
			console.log("authorPage num", updated);
			//if (isStop) {
			AuthorDetails(
				authorId,
				siteKey,
				updated,
				user.id,
				this.onSuccess,
				this.onFailure,
				this.onError,
				this.stop,
			);
			// } else {
			// 	this.setState({ loading: false });
			// }
		}
	};

	stop = () => {
		this.setState({ isStop: false, loading: false });
	};

	onSuccess = (response: Object) => {
		const { items } = this.state;
		const updated = [...items, ...response.items];
		console.log("auth response", response);
		console.log("updated auth data", updated);
		this.setState({
			items: updated,
			authorName: response && response.author_name,
			storyCount: response && response.count,
			followers: response.follower_count,
			imageUrl:
				response &&
				response.field_picture_ref &&
				response.field_picture_ref.und &&
				response.field_picture_ref.und[0] &&
				response.field_picture_ref.und[0].image_crop_square,
			loading: false,
			loader: false,
		});
		console.log("authItems", items);
	};

	onRefresh = async () => {
		this.setState({ refresh: true });
		AuthorDetails(
			this.props.navigation.getParam("authorId"),
			this.props.navigation.getParam("site"),
			0,
			this.props.user.id,
			this.onSuccess,
			this.onFailure,
			this.onError,
		);
		this.setState({ refresh: false });
	};

	onFollow = () => {
		const { navigation, setUserAuthorSubscription, user } = this.props;
		const authorId = navigation.getParam("authorId");
		const site = navigation.getParam("site");
		const followFlag = user.authors.indexOf(`${authorId}~${site}`) > -1;
		const flag = followFlag ? "U" : "F";
		if (flag === "U") {
			Analytics.logEvent(Events.author.unFollow, {});
		} else {
			Analytics.logEvent(Events.author.follow, {});
		}
		const changedStatus = !followFlag;
		FollowAuthor(authorId, site, flag);
		setUserAuthorSubscription(`${authorId}~${site}`);
		this.setState({ isFollowing: changedStatus });
	};

	renderAuthorDetails = (items: any) => {
		const { imageUrl, loading, storyCount, followers, refreshKey, refresh } = this.state;
		const { navigation, user } = this.props;

		const authorName = this.props.navigation.getParam("authorName");
		const authorId = navigation.getParam("authorId");
		const site = navigation.getParam("site");
		const noOfColumn = Metrics.isTablet ? 2 : 1;
		const numberOfLines = Metrics.isTablet ? 3 : null;
		const followFlag = user.authors.indexOf(`${authorId}~${site}`) > -1;
		return (
			<View style={styles.ListItems}>
				<FlatList
					data={items}
					onRefresh={() => this.onRefresh()}
					onEndReachedThreshold={1}
					onEndReached={() => this.onEndReached()}
					refreshing={refresh}
					keyExtractor={(x, i) => i.toString()}
					numColumns={noOfColumn}
					style={styles.ListItems}
					ListHeaderComponent={() => (
						<View style={styles.authorDetails}>
							<Image
								style={styles.image}
								source={imageUrl ? { uri: imageUrl } : Images.defaultProfilePic}
							/>
							<View style={styles.textInfo}>
								<AuthorInfo
									authorName={authorName}
									storyCount={storyCount}
									followers={followers}
								/>
								<View style={styles.followButton}>
									<BuildFeedButton
										title={followFlag ? "Following" : "Follow"}
										onPress={() => this.onFollow()}
										style={styles.follow}
									/>
								</View>
							</View>
						</View>
					)}
					ListFooterComponent={() => <ListLoading loading={loading} />}
					contentContainerStyle={styles.contentContainerStyles}
					renderItem={({ item, index }) => (
						<Article
							onPress={() => this.onItemPress(item.nid, item.site, item)}
							key={index.toString()}
							onPressBookmark={() =>
								this.onManageBookmark(item.nid, item.site, item.bookmark, index)
							}
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
							refreshKey={refreshKey}
							tabContainerStyle={styles.tabContainerStyle}
							numberOfLines={numberOfLines}
							articleContainerStyle={styles.articleContainerStyle}
							imageStyle={styles.imageStyle}
							imagePlaceHolderStyle={styles.imagePlaceHolderStyle}
							articleDescriptionstyle={styles.articleDescriptionstyle}
							onPressBrand={this.onPressBrand}
							seperator={styles.lineSeperator}
							bookmarkRequired
						/>
					)}
				/>
			</View>
		);
	};

	loadingIndicator = () => {
		return (
			<View style={styles.indicator}>
				<ActivityIndicator size="large" color="white" />
			</View>
		);
	};

	onFailure = () => {
		const { navigation } = this.props;
		AlertComp(Strings.authentication.ALERT, "No data found", () => navigation.goBack());
	};

	onError = (error: error) => {
		const { navigation } = this.props;
		console.log("error occured:", error);
		AlertComp(Strings.authentication.ALERT, "No data found", () => navigation.goBack());
	};

	handlePlay = () => {
		const { navigation } = this.props;
		navigation.navigate("PlayScreen");
	};

	render() {
		const { loader, items } = this.state;
		const { navigation, control } = this.props;
		return (
			<View style={styles.container}>
				<ProfileHeader
					onAction={() => {
						navigation.navigate("ProfileDrawerScreen");
					}}
					actionLabel={"Skip"}
					onBack={() => {
						navigation.goBack();
					}}
					page={"1"}
					navigation={navigation}
				/>
				{loader ? this.loadingIndicator() : this.renderAuthorDetails(items)}
				{control.flag && <PodcastPlayView onPress={this.handlePlay} />}
			</View>
		);
	}
}

const tabStyles = StyleSheet.create({
	contentContainerStyles: {
		justifyContent: "space-between",
		marginHorizontal: (ScalePerctFullWidth(100) - ScalePerctFullWidth(94)) / 2,
		//backgroundColor: "blue",
		//alignItems: "flex-start",
	},
	container: {
		height: ScalePerctFullHeight(100),
		width: ScalePerctFullWidth(100),
	},
	authorDetails: {
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullHeight(29),
		alignItems: "center",
		justifyContent: "center",
		// backgroundColor: "yellow",
		paddingRight: (ScalePerctFullWidth(100) - ScalePerctFullWidth(94)) / 2,
	},
	image: {
		height: ScalePerctFullWidth(18),
		width: ScalePerctFullWidth(18),
		marginTop: ScalePerctFullHeight(3),
		marginBottom: ScalePerctFullHeight(2),
		borderRadius: ScalePerctFullWidth(9),
		alignSelf: "center",
	},
	ListItems: {
		//	flex: 1,
	},
	textInfo: {
		flex: 1,
		textAlign: "center",
	},
	followButton: {
		height: ScalePerctFullHeight(4),
		width: ScalePerctFullWidth(17),
		alignSelf: "center",
		//marginLeft: ScalePerctFullWidth(7),
		marginTop: ScalePerctFullHeight(1),
	},
	follow: {
		height: ScalePerctFullHeight(3),
		width: ScalePerctFullWidth(16.2),
		alignSelf: "center",
	},
	header: {
		marginTop: 20,
	},
	footer: {
		marginBottom: 150,
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
		width: ScalePerctFullWidth(47),
		alignSelf: "flex-start",
	},
	articleContainerStyle: {
		width: ScalePerctFullWidth(47),
		//flex: 1,
		//height: ScalePerctFullHeight(32),
	},
	articleDescriptionstyle: {
		height: 80,
		width: ScalePerctFullWidth(47),
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
});

const mobileStyles = StyleSheet.create({
	container: {
		height: ScalePerctFullHeight(100),
		width: ScalePerctFullWidth(100),
	},
	authorDetails: {
		borderBottomWidth: 2,
		borderColor: Colors.borderLine,
		flexDirection: "row",
		width: ScalePerctFullWidth(100),
		marginBottom: 15,
	},
	image: {
		height: ScalePerctFullWidth(32),
		width: ScalePerctFullWidth(32),
		marginLeft: ScalePerctFullWidth(6),
		marginTop: ScalePerctFullHeight(4),
		marginBottom: ScalePerctFullHeight(4),
		borderRadius: ScalePerctFullWidth(16),
	},
	ListItems: {
		flex: 1,
	},
	textInfo: {
		backgroundColor: Colors.bgPrimaryLight,
		marginBottom: ScalePerctFullHeight(4),
		width: ScalePerctFullWidth(100),
	},
	followButton: {
		height: ScalePerctFullHeight(6),
		width: ScalePerctFullWidth(44),
		marginLeft: ScalePerctFullWidth(7),
		marginTop: ScalePerctFullHeight(4),
	},
	follow: {
		height: ScalePerctFullHeight(6),
		width: ScalePerctFullWidth(44),
	},
	header: {
		marginTop: 20,
	},
	footer: {
		marginBottom: 150,
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

const styles = Metrics.isTablet ? tabStyles : mobileStyles;

const mapStateToProps = state => ({
	user: state.user,
	history: state.history,
	control: state.podcastPlayControl,
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Author);

Author.defaultProps = {
	authorName: "Solomon",
	authorId: "181957",
	site: "msl_en",
	data: [],
};
