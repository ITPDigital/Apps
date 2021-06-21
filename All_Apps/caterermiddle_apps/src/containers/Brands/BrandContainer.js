import React, { PureComponent } from "react";
import { View, Animated, StyleSheet, NativeModules, Platform } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Analytics } from "../../Analytics";
import { Constants, Metrics, ScalePerctFullHeight, Images } from "../../asset";
import { PodcastPlayView, ProfileHeader, BottomBar } from "../../components";
import { Actions } from "../../redux";
import { BrandsPreferenceAPI, BrandTabletPageApi, ManageBoookmarkApi } from "../../service";
import { ArticleListTabletUI } from "../ArticleList";
import { TabModal } from "../ChaptorPodcastScreen";
import { getCurrentUserToken } from "../../storage";

type Props = {
	screenProps: any,
	navigation: any,
};

class BrandContainer extends PureComponent<Props> {
	clampedScrollValue = 0;

	offsetValue = 0;

	scrollValue = 0;

	constructor(props) {
		super(props);
		const scrollAnim = new Animated.Value(0);
		const offsetAnim = new Animated.Value(0);
		this.state = {
			loading: false,
			refresh: false,
			pageNumber: 0,
			message: Constants.emptyMessages.noRecord,
			showModal: false,
			flag: false,
			scrollAnim,
			offsetAnim,
			clampedScroll: Animated.diffClamp(
				Animated.add(
					scrollAnim.interpolate({
						inputRange: [0, 1],
						outputRange: [0, 1],
						extrapolateLeft: "clamp",
					}),
					offsetAnim,
				),
				0,
				Metrics.HEADER_HEIGHT,
			),
		};
		// this.AnimatedFlatList = Animated.createAnimatedComponent(); // TODO
	}

	componentDidMount = () => {
		Analytics.setCurrentScreen("BRAND_PAGE");

		this.fetchArticles();
		this.state.scrollAnim.addListener(({ value }) => {
			// This is the same calculations that diffClamp does.
			const diff = value - this.scrollValue;
			this.scrollValue = value;
			this.clampedScrollValue = Math.min(
				Math.max(this.clampedScrollValue + diff, 0),
				Metrics.HEADER_HEIGHT,
			);
		});
		this.state.offsetAnim.addListener(({ value }) => {
			this.offsetValue = value;
		});
	};

	componentDidUpdate(prevProps) {
		const { navigation } = this.props;
		const previousBrand = prevProps.navigation.getParam("brand");
		const currentBrand = navigation.getParam("brand");
		if (currentBrand !== previousBrand) {
			BrandTabletPageApi(
				currentBrand || "ahl_en",
				0,
				this.onSuccess,
				this.onFailure,
				this.onError,
			);
		}
	}

	componentWillUnmount() {
		// Don't forget to remove the listeners!
		this.state.scrollAnim.removeAllListeners();
		this.state.offsetAnim.removeAllListeners();
	}

	onScrollEndDrag = () => {
		this.scrollEndTimer = setTimeout(this.onMomentumScrollEnd, 250);
	};

	onMomentumScrollBegin = () => {
		clearTimeout(this.scrollEndTimer);
	};

	onMomentumScrollEnd = () => {
		const headerHeight = Metrics.HEADER_HEIGHT;
		const toValue =
			this.scrollValue > headerHeight && this.clampedScrollValue > headerHeight / 2
				? this.offsetValue + headerHeight
				: this.offsetValue - headerHeight;

		Animated.timing(this.state.offsetAnim, {
			toValue,
			duration: 350,
			useNativeDriver: true,
		}).start();
	};

	renderTabPlayScreen = () => {
		const { showModal } = this.state;
		this.setState({ showModal: !showModal });
	};

	handlePlay = () => {
		const { navigation } = this.props;
		return Metrics.isTablet ? this.renderTabPlayScreen() : navigation.navigate("PlayScreen");
	};

	onRefresh = () => {
		this.setState({
			refresh: true,
		});
		this.fetchArticles();
	};

	fetchArticles = () => {
		console.log("fetcharticle");
		const { tid, clearBrandTabletAction } = this.props;
		clearBrandTabletAction(tid);

		BrandTabletPageApi(
			this.props.navigation.getParam("brand") || "ahl_en",
			0,
			this.onFetchSuccess,
			this.onFetchFailure,
			this.onFetchError,
		);

		this.setState({
			pageNumber: 0,
			loading: true,
		});
	};

	onFetchSuccess = (data: any) => {
		console.log("dATA", data);
		const { setBrandTabletAction, tid } = this.props;
		this.setState({
			loading: false,
			refresh: false,
			message: Constants.emptyMessages.noRecord,
		});
		setBrandTabletAction(tid, data);
	};

	onFetchFailure = () => {
		this.setState({
			loading: false,
			refresh: false,
			message: Constants.errorMessages.general,
		});
		this.fetchArticles();
	};

	onFetchError = (error: any) => {
		let message = Constants.errorMessages.general;
		if (error.toString().includes(Constants.errorMessages.checkNetwork)) {
			message = Constants.errorMessages.network;
		}
		this.setState({ loading: false, refresh: false, message });
	};

	onSuccess = (response: any, selectedBrands: string) => {
		const { setUserBrandAction } = this.props;
		setUserBrandAction(selectedBrands);
	};

	onFailure = (response: any) => {
		console.log("OnFailure of Preference Brands: ", response);
	};

	onError = (error: any) => {
		console.log("OnError of Preference Brands: ", error);
	};

	onManageBookmark = (nId: string, siteKey: string, isBookMark: boolean) => {
		const { user, data, tid, updateBrandTabletAction } = this.props;
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
			updateBrandTabletAction(tid, newData);
			ManageBoookmarkApi(user.id, nId, siteKey, isBookMark);
		} catch (error) {
			console.log("add bookamrk ", error);
		}
	};

	onEndReached = () => {
		const { pageNumber } = this.state;
		if (this.state.loading === false) {
			//	if (!this.state.flag) {
			const updated = pageNumber + 1;
			this.setState({ pageNumber: updated, loading: true });
			BrandTabletPageApi(
				this.props.navigation.getParam("brand") || "ahl_en",
				updated,
				this.onFetchUpdateSuccess,
				this.onFetchFailure,
				this.onFetchError,
			);
			//}
		}
	};

	onFetchUpdateSuccess = (data: any) => {
		const { setPaginationBrandTabletAction, tid } = this.props;
		this.setState({
			loading: false,
			refresh: false,
			message: Constants.emptyMessages.noRecord,
		});
		// if (data.length === 0) {
		// 	this.setState({ flag: true });
		// } else {
		setPaginationBrandTabletAction(tid, data, this.state.type);
		//}
	};

	onFollow = (isFollow, brand: string) => {
		const { user } = this.props;
		const alreadySelected = new Set(user["brands"].split("|"));
		if (!isFollow && alreadySelected.has(brand)) {
			alreadySelected.delete(brand);
		}
		if (isFollow && !alreadySelected.has(brand)) {
			alreadySelected.add(brand);
		}
		BrandsPreferenceAPI(
			user.id,
			Array.from(alreadySelected).join("|"),
			this.onSuccess,
			this.onFailure,
			this.onError,
		);
	};

	onItemPress = (nid: number, site: string, item: any) => {
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
					  })
					: navigation.navigate("ArticleDisplayHomeScreen", {
							nid: item.nid,
							site: item.site,
							refreshKey: Math.random(),
					  })
				: navigation.push("ArticleDisplayHomeScreen", {
						video: item.video,
						nid: item.nid,
						site: item.site,
				  });
		} else if (item.content_type === "gallery") {
			navigation.push("GalleryHomeScreen", { nid, site });
		} else {
			navigation.push("ArticleDisplayHomeScreen", { nid, site });
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

	onPressMoreStories = (title: any) => {
		const { screenProps } = this.props;
		console.log("title more stories", screenProps);
		this.props.navigation.push("MoreStories", { contentType: title });
	};

	renderHeader = () => {
		const { navigation } = this.props;
		const brandLogo = navigation.getParam("brandLogo");
		return (
			<ProfileHeader
				onAction={() => {
					navigation.navigate("ProfileDrawerScreen");
				}}
				onBack={() => {
					navigation.goBack();
				}}
				// logoUrl={
				// 	brandLogo ||
				// 	"http://trove-drupal.itp.com/sites/default/files/logo/2019-02/Esquire%20ME.png"
				// }
				// brandIcon={Images.ABlogo}
			/>
		);
	};

	render() {
		const { loading, message, refresh, showModal, clampedScroll } = this.state;
		const { data, tid, flag, navigation } = this.props;
		const headerHeight = Metrics.HEADER_HEIGHT;
		const navbarTranslate = clampedScroll.interpolate({
			inputRange: [0, headerHeight],
			outputRange: [0, -headerHeight],
			extrapolate: "clamp",
		});
		const navHeaderTranslate = clampedScroll.interpolate({
			inputRange: [0, headerHeight],
			outputRange: [0, -(headerHeight - 24)],
			extrapolate: "clamp",
		});
		return (
			<View style={styles.container}>
				<Animated.View
					style={[
						styles.navbar,
						{
							height: ScalePerctFullHeight(100) + 50,
							transform: [{ translateY: navHeaderTranslate }],
						},
						{ paddingTop: Metrics.HEADER_HEIGHT },
						{ paddingBottom: !showModal && flag ? ScalePerctFullHeight(6) : 0 },
					]}
				>
					<ArticleListTabletUI
						loading={loading}
						message={message}
						refresh={refresh}
						{...this.props}
						tid={0}
						onItemPress={this.onItemPress}
						data={data[tid] ? data[tid] : []}
						onRefresh={this.onRefresh}
						onManageBookmark={this.onManageBookmark}
						onPodcastPress={this.onPodcastPress}
						onFollow={this.onFollow}
						onPressBrand={() => {}}
						onEndReached={this.onEndReached}
						onPressMoreStories={this.onPressMoreStories}
						onMomentumScrollBegin={this.onMomentumScrollBegin}
						onMomentumScrollEnd={this.onMomentumScrollEnd}
						onScrollEndDrag={this.onScrollEndDrag}
						scrollAnim={this.state.scrollAnim}
						type="brand"
					/>
				</Animated.View>

				<Animated.View
					style={[
						styles.navbar,
						{
							height: headerHeight,
							transform: [{ translateY: navbarTranslate }],
						},
					]}
				>
					{this.renderHeader()}
				</Animated.View>
				{!showModal
					? flag && (
							<PodcastPlayView
								style={styles.podcastView}
								onPress={this.handlePlay}
							/>
					  )
					: null}
				{showModal && <TabModal showModal={showModal} handlePlay={this.handlePlay} />}
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {
		data: state.brandTablet,
		user: state.user,
		flag: state.podcastPlayControl ? state.podcastPlayControl.flag : false,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(BrandContainer);

const styles = StyleSheet.create({
	container: { height: ScalePerctFullHeight(100), flex: 1, paddingTop: 24 },
	navbar: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: "white",
	},
	podcastView: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
	},
});
