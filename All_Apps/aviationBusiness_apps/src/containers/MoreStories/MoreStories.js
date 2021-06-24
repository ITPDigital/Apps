import React, { PureComponent } from "react";
import { View } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Constants, ScalePerctFullHeight } from "../../asset";
import { ProfileHeader } from "../../components";
import { Actions } from "../../redux";
import { BrandsPreferenceAPI, EditorailHighlightsApi, ManageBoookmarkApi } from "../../service";
import { TopStoriesApi } from "../../service/TopStories";
import { ArticleTabletSectionList } from "../ArticleList";

type Props = {
	screenProps: any,
	navigation: any,
};

class MoreStories extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			refresh: false,
			pageNumber: 0,
			message: Constants.emptyMessages.noRecord,
			type: this.props.navigation.getParam("contentType"),
			flag: false,
		};
	}

	componentDidMount() {
		SplashScreen.hide();
		this.fetchArticles();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.user != this.props.user && this.props.tid == 0) {
			this.fetchArticles();
		}
	}

	fetchArticles = () => {
		console.log("fetcharticle");
		const { tid, clearMoreStoriesAction } = this.props;
		clearMoreStoriesAction(tid);
		if (this.state.type == "Top Stories") {
			TopStoriesApi(0, this.onFetchSuccess, this.onFetchFailure, this.onFetchError);
		} else if (this.state.type == "Editorial Highlights") {
			EditorailHighlightsApi(0, this.onFetchSuccess, this.onFetchFailure, this.onFetchError);
		}
		this.setState({
			pageNumber: 0,
			loading: true,
		});
	};

	onPressBrand = (site, brandLogo) => {
		const { screenProps } = this.props;
		this.props.navigation.navigate("BrandsPage", {
			brand: site,
			brandLogo,
		});
	};

	onFetchSuccess = (data: any) => {
		const { setMoreStoriesAction, tid } = this.props;
		this.setState({
			loading: false,
			refresh: false,
			message: Constants.emptyMessages.noRecord,
		});
		setMoreStoriesAction(tid, data, this.state.type);
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

	onPressMoreStories = (site, brandLogo) => {
		const { screenProps } = this.props;
	};

	onManageBookmark = (nId: string, siteKey: string, isBookMark: boolean) => {
		const { user, data, tid, updateMoreStoriesAction } = this.props;
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
			updateMoreStoriesAction(tid, newData);
			ManageBoookmarkApi(user.id, nId, siteKey, isBookMark);
		} catch (error) {
			console.log("add bookamrk ", error);
		}
	};

	onEndReached = () => {
		const { pageNumber } = this.state;
		if (!this.state.flag) {
			const updated = pageNumber + 1;
			this.setState({ pageNumber: updated, loading: true });
			if (this.state.type == "Top Stories") {
				TopStoriesApi(
					updated,
					this.onFetchUpdateSuccess,
					this.onFetchFailure,
					this.onFetchError,
				);
			} else if (this.state.type == "Editorial Highlights") {
				EditorailHighlightsApi(
					updated,
					this.onFetchUpdateSuccess,
					this.onFetchFailure,
					this.onFetchError,
				);
			}
		}
	};

	onFetchUpdateSuccess = (data: any) => {
		const { setPaginationMorestoriesAction, tid } = this.props;
		this.setState({
			loading: false,
			refresh: false,
			message: Constants.emptyMessages.noRecord,
		});
		if (data.length === 0) {
			this.setState({ flag: true });
		} else {
			setPaginationMorestoriesAction(tid, data, this.state.type);
		}
	};

	onFetchUpdateFailure = () => {
		this.setState({
			loading: false,
			refresh: false,
			message: Constants.errorMessages.general,
		});
	};

	onItemPress = (nid: number, site: string, item: any) => {
		const { screenProps } = this.props;
		const nextScreen = item.video ? "VideoDetail" : "ArticleDisplayHomeScreen";

		if (item.content_type === "video") {
			this.props.navigation.navigate(nextScreen, {
				video: item.video,
				nid: item.nid,
				site: item.site,
			});
		} else if (item.content_type === "gallery") {
			this.props.navigation.navigate("GalleryHomeScreen", { nid, site });
		} else {
			this.props.navigation.navigate("ArticleDisplayHomeScreen", { nid, site });
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

	onFetchUpdateError = (error: any) => {
		let message = Constants.errorMessages.general;
		if (error.toString().includes(Constants.errorMessages.checkNetwork)) {
			message = Constants.errorMessages.network;
		}
		this.setState({ loading: false, refresh: false, message });
	};

	render() {
		const { loading, message, refresh } = this.state;
		const { data, tid, navigation } = this.props;

		return (
			<View style={{ paddingBottom: ScalePerctFullHeight(4) }}>
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
				<ArticleTabletSectionList
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
				/>
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {
		data: state.MoreStories,
		user: state.user,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(MoreStories);
