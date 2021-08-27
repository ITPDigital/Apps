import React, { PureComponent } from "react";
import { ActivityIndicator, Image, StyleSheet, View, NativeModules, Platform } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Analytics, Events } from "../../Analytics";
import { Images, ScalePerctFullHeight, ScalePerctFullWidth, Strings } from "../../asset";
import {
	AlertComp,
	AuthorInfo,
	BuildFeedButton,
	PodcastPlayView,
	ProfileHeader,
} from "../../components";
import { Actions } from "../../redux";
import { AuthorDetailsTabletAPI, BrandsPreferenceAPI, ManageBoookmarkApi } from "../../service";
import { ArticleTabletSectionList } from "../ArticleList";
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
			loader: true,
			refresh: false,
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
		Analytics.setCurrentScreen("AUTHOR_PAGE");

		AuthorDetailsTabletAPI(
			this.props.navigation.getParam("authorId"),
			this.props.navigation.getParam("site"),
			0,
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
			AuthorDetailsTabletAPI(
				this.props.navigation.getParam("authorId"),
				this.props.navigation.getParam("site"),
				0,
				this.onSuccess,
				this.onFailure,
				this.onError,
			);
		}
	}

	// onFollow = (isFollow, brand: string) => {
	// 	const { user } = this.props;
	// 	const alreadySelected = new Set(user["brands"].split("|"));
	// 	if (!isFollow && alreadySelected.has(brand)) {
	// 		alreadySelected.delete(brand);
	// 	}
	// 	if (isFollow && !alreadySelected.has(brand)) {
	// 		alreadySelected.add(brand);
	// 	}
	// 	BrandsPreferenceAPI(
	// 		user.id,
	// 		Array.from(alreadySelected).join("|"),
	// 		this.onFollowSuccess,
	// 		this.onFailure,
	// 		this.onError,
	// 	);
	// };

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
		AuthorDetailsTabletAPI(authorId, site, flag);
		setUserAuthorSubscription(`${authorId}~${site}`);
		this.setState({ isFollowing: changedStatus });
	};

	onRefresh = () => {
		this.setState({
			refresh: true,
		});
		AuthorDetailsTabletAPI(
			this.props.navigation.getParam("authorId"),
			this.props.navigation.getParam("site"),
			0,
			this.onSuccess,
			this.onFailure,
			this.onError,
		);
		this.setState({ refresh: false });
	};

	onFollowSuccess = (response: Object) => {
		this.setState({
			authorName: response && response.author_name,
			storyCount: response && response.count,
			followers: response.follower_count,
			imageUrl: response && response.field_picture_ref,
			loading: false,
			refresh: false,
			loader: false,
		});
	};

	onItemPress = (nid: number, site: string, item: any) => {
		const { screenProps, user } = this.props;
		console.log("onItemPress", item);
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
			this.props.navigation.navigate("GalleryHomeScreen", { nid, site });
		} else {
			this.props.navigation.push("ArticleDisplayHomeScreen", { nid, site });
		}
	};

	onPodcastPress = (item: any) => {
		const { screenProps } = this.props;
		this.props.navigation.navigate("ChaptorPodcastScreen", {
			id: item.nid,
			brand: item.site,
			brand_key: item.site,
			logo: "",
			item,
		});
	};

	onManageBookmark = (nId: string, siteKey: string, isBookMark: boolean) => {
		const { user, data, tid, updateAuthorTabletAction } = this.props;
		try {
			const newData = data[tid].map(obj => ({
				...obj,
				data: obj.data.map((subObj: any) => {
					if (Array.isArray(subObj)) {
						return subObj.map(arrObj => ({
							...arrObj,
							bookmark:
								arrObj.nid == nId && arrObj.site == siteKey
									? !arrObj.bookmark
									: arrObj.bookmark,
						}));
					}
					return {
						...subObj,
						bookmark:
							subObj.nid == nId && subObj.site == siteKey
								? !subObj.bookmark
								: subObj.bookmark,
					};
				}),
			}));
			updateAuthorTabletAction(tid, newData);
			ManageBoookmarkApi(user.id, nId, siteKey, isBookMark);
		} catch (error) {
			console.log("add bookamrk ", error);
		}
	};

	onEndReached = () => {
		const { pageNumber } = this.state;
		if (this.state.loading === false) {
			const updated = pageNumber + 1;
			this.setState({ pageNumber: updated, loading: true });

			AuthorDetailsTabletAPI(
				this.props.navigation.getParam("authorId"),
				this.props.navigation.getParam("site"),
				updated,
				this.onFetchUpdateSuccess,
				this.onFailure,
				this.onError,
			);
		}
	};

	onSuccess = (response: Object) => {
		const { setAuthorTabletAction, tid } = this.props;

		this.setState({
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
			refresh: false,
			loader: false,
		});
		setAuthorTabletAction(tid, response);
	};

	onFetchUpdateSuccess = (response: Object) => {
		const { setPaginationAuthorTabletAction, tid } = this.props;

		this.setState({
			loading: false,
			refresh: false,
		});
		setPaginationAuthorTabletAction(tid, response);
	};

	renderAuthorDetails = (items: any) => {
		const { loading, storyCount, followers, refresh, imageUrl } = this.state;
		const { navigation, user } = this.props;

		const authorName = this.props.navigation.getParam("authorName");
		const authorId = navigation.getParam("authorId");
		const site = navigation.getParam("site");
		const followFlag = user.authors.indexOf(`${authorId}~${site}`) > -1;
		const { data, tid } = this.props;
		console.log("Author_follow", data);

		return (
			<View style={{ paddingBottom: ScalePerctFullHeight(4) }}>
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

				<ArticleTabletSectionList
					loading={loading}
					//	message={message}
					refresh={refresh}
					{...this.props}
					onItemPress={this.onItemPress}
					data={data[tid] ? data[tid] : []}
					onRefresh={this.onRefresh}
					onManageBookmark={this.onManageBookmark}
					onPodcastPress={this.onPodcastPress}
					onFollow={this.onFollow}
					onPressBrand={() => {}}
					onEndReached={this.onEndReached}
					bookmarkRequired
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
		AlertComp(Strings.authentication.ALERT, "No data found", () => navigation.goBack());
	};

	handlePlay = () => {
		const { navigation } = this.props;
		navigation.navigate("PlayScreen");
	};

	render() {
		const { loader, items, imageUrl } = this.state;
		const { navigation, control } = this.props;
		return (
			<View style={styles.container}>
				<ProfileHeader
					onAction={() => {
						navigation.navigate("ProfileDrawerScreen");
					}}
					actionLabel="Skip"
					onBack={() => {
						navigation.goBack();
					}}
					page="1"
					navigation={navigation}
				/>
				{loader ? this.loadingIndicator() : this.renderAuthorDetails(items)}
				{control.flag && <PodcastPlayView onPress={this.handlePlay} />}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: ScalePerctFullHeight(100),
		width: ScalePerctFullWidth(100),
		paddingBottom: ScalePerctFullHeight(30),
	},
	authorDetails: {
		marginBottom: ScalePerctFullHeight(2),
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullHeight(29),
		alignItems: "center",
		justifyContent: "center",
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
		// marginLeft: ScalePerctFullWidth(7),
		marginTop: ScalePerctFullHeight(2),
	},
	follow: {
		height: ScalePerctFullHeight(3),
		width: ScalePerctFullWidth(16.2),
		alignSelf: "center",
		marginTop: ScalePerctFullHeight(1),
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

const mapStateToProps = state => ({
	data: state.AuthorTablet,
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
