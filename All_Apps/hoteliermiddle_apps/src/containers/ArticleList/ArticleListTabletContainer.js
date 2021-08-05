import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { NativeModules, Platform } from "react-native";
import { bindActionCreators } from "redux";
import SplashScreen from "react-native-splash-screen";
import { Actions } from "../../redux";
import ArticleListTabletUI from "./ArticleListTabletUI";
import {
	MyTroveApi,
	TopicsArticleApi,
	ManageBoookmarkApi,
	BrandsPreferenceAPI,
	BrandTabletPageApi,
} from "../../service";
import { Constants } from "../../asset";
import { Analytics, Screen } from "../../Analytics";
import { getCurrentUserToken } from "../../storage";

type Props = {
	screenProps: any,
	navigation: any,
};

class ArticleListTabletContainer extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			refresh: false,
			pageNumber: 0,
			message: Constants.emptyMessages.noRecord,
		};
	}

	componentDidMount() {
		let screenName = "Trove";
		Analytics.setCurrentScreen(screenName);

		SplashScreen.hide();
		this.fetchArticles();
	}

	// componentDidUpdate(prevProps) {
	// 	if (prevProps.user != this.props.user && this.props.tid == 0) {
	// 		this.fetchArticles();
	// 	}
	// }

	fetchArticles = () => {
		const { tid, user, clearMyTroveTabletAction, type, brandKey } = this.props;
		console.log("type", type);
		//	clearMyTroveTabletAction(tid);

		if (tid == 0) {
			if (user) {
				MyTroveApi(
					user["topics"],
					user["brands"],
					user.id,
					0,
					"tablet",
					this.onFetchSuccess,
					this.onFetchFailure,
					this.onFetchError,
				);
			}
		} else if (type === "topic") {
			TopicsArticleApi(
				tid,
				user.id,
				0,
				"tablet",
				this.onFetchSuccess,
				this.onFetchFailure,
				this.onFetchError,
			);
		} else if (type === "brand") {
			BrandTabletPageApi(
				brandKey || "ahl_en",
				0,
				this.onFetchSuccess,
				this.onFetchFailure,
				this.onFetchError,
			);
		}
		this.setState({
			pageNumber: 0,
			loading: true,
		});
	};

	onFetchSuccess = (data: any) => {
		const { setMyTroveTabletAction, tid, type } = this.props;
		this.setState({
			loading: false,
			refresh: false,
			message: Constants.emptyMessages.noRecord,
		});
		setMyTroveTabletAction(tid, data, type);
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

	onItemPress = (nid: number, site: string, item: any) => {
		const { screenProps, user } = this.props;
		let userId = user.id;
		const nextScreen = item.video ? "ArticleDisplayHomeScreen" : "ArticleDisplayHomeScreen";
		console.log("user", user.id);
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
						  })
					  })
					: screenProps.navigation.navigate("ArticleDisplayHomeScreen", {
							nid: item.nid,
							site: item.site,
							refreshKey: Math.random(),
					  })
				: screenProps.navigation.navigate("ArticleDisplayHomeScreen", {
						video: item.video,
						nid: item.nid,
						site: item.site,
				  });
		} else if (item.content_type === "gallery") {
			screenProps.navigation.navigate("GalleryHomeScreen", { nid, site });
		} else {
			screenProps.navigation.navigate("ArticleDisplayHomeScreen", { nid, site });
		}
	};

	onPodcastPress = (item: any) => {
		const { screenProps } = this.props;
		screenProps.navigation.navigate("ChaptorPodcastScreen", {
			id: item.nid,
			brand: item.site,
			brand_key: item.site,
			logo: "",
			item,
		});
	};

	onRefresh = () => {
		this.setState({
			refresh: true,
		});
		this.fetchArticles();
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
		const { user, data, tid, updateMyTroveTabletAction } = this.props;
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
			updateMyTroveTabletAction(tid, newData);
			ManageBoookmarkApi(user.id, nId, siteKey, isBookMark);
		} catch (error) {
			console.log("add bookamrk ", error);
		}
	};

	onPressBrand = (site, brandLogo) => {
		const { screenProps } = this.props;
		screenProps.navigation.navigate("BrandsPage", {
			brand: site,
			brandLogo,
		});
	};

	onPressMoreStories = (title: any) => {
		const { screenProps } = this.props;
		console.log("title more stories", title);
		screenProps.navigation.push("MoreStories", { contentType: title });
	};

	onEndReached = () => {
		const { tid, user, type, brandKey } = this.props;
		console.log("brandKey", brandKey);
		const { pageNumber } = this.state;
		// let updated = null;
		if (this.state.loading === false) {
			const updated = pageNumber + 1;
			if (user) {
				this.setState({ pageNumber: updated, loading: true });
				if (type === "brand") {
					BrandTabletPageApi(
						brandKey || "ahl_en",
						updated,
						this.onFetchUpdateSuccess,
						this.onFetchUpdateFailure,
						this.onFetchUpdateError,
					);
				} else if (tid != 0) {
					TopicsArticleApi(
						tid,
						user.id,
						updated,
						"tablet",
						this.onFetchUpdateSuccess,
						this.onFetchUpdateFailure,
						this.onFetchUpdateError,
					);
				} else {
					MyTroveApi(
						user["topics"],
						user["brands"],
						user.id,
						updated,
						"tablet",
						this.onFetchUpdateSuccess,
						this.onFetchUpdateFailure,
						this.onFetchUpdateError,
					);
				}
			}
			console.log("page_no", updated);
		}
	};

	onFetchUpdateSuccess = (data: any) => {
		const { setPaginationMyTroveTabletAction, tid, type } = this.props;
		this.setState({
			loading: false,
			refresh: false,
			message: Constants.emptyMessages.noRecord,
		});
		console.log("page on sucess in tab", tid);
		console.log("data_tid", data);
		setPaginationMyTroveTabletAction(tid, data, type);
	};

	onFetchUpdateFailure = () => {
		this.setState({
			loading: false,
			refresh: false,
			message: Constants.errorMessages.general,
		});
	};

	onFetchUpdateError = (error: any) => {
		let message = Constants.errorMessages.general;
		if (error.toString().includes(Constants.errorMessages.checkNetwork)) {
			message = Constants.errorMessages.network;
		}
		this.setState({ loading: false, refresh: false, message });
	};

	render() {
		const { loading, message, refresh } = this.state;
		const { data, tid, screenProps, type, user } = this.props;
		const {
			onMomentumScrollBegin,
			onMomentumScrollEnd,
			onScrollEndDrag,
			scrollAnim,
		} = screenProps;
		console.log("tab d-----", data);
		return (
			<ArticleListTabletUI
				loading={loading}
				message={message}
				refresh={refresh}
				{...this.props}
				onItemPress={this.onItemPress}
				data={data[tid] ? data[tid] : []}
				onRefresh={this.onRefresh}
				onManageBookmark={this.onManageBookmark}
				onPodcastPress={this.onPodcastPress}
				onFollow={this.onFollow}
				onPressBrand={this.onPressBrand}
				onEndReached={this.onEndReached}
				onPressMoreStories={this.onPressMoreStories}
				tid={tid}
				onMomentumScrollBegin={onMomentumScrollBegin}
				onMomentumScrollEnd={onMomentumScrollEnd}
				onScrollEndDrag={onScrollEndDrag}
				scrollAnim={scrollAnim}
				type={type}
				bookmarkRequired
				user={user}
			/>
		);
	}
}

function mapStateToProps(state) {
	return {
		data: state.myTroveTablet,
		user: state.user,
		isSplashScreenHide: state.isSplashScreenHide,
		menuTopics: state.menuTopics,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ArticleListTabletContainer);
