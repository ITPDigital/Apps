import React, { PureComponent } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	ActivityIndicator,
	Image,
	NativeModules,
	Platform,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { ProfileHeader, Article, ListLoading, PodcastPlayView, BottomBar } from "../../components";
import {
	Colors,
	ScalePerctFullWidth,
	ScalePerctFullHeight,
	TemplateConfig,
	Images,
	Metrics,
} from "../../asset";
import { Actions } from "../../redux";
import { SearchApi, ManageBoookmarkApi } from "../../service";
import { getCurrentUserToken } from "../../storage";
import ArticletabletSmall from "../../components/articleListItems/ArticleTabletSmall";

class Search extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			result: [],
			loading: true,
			pageNumber: 0,
			refresh: false,
			refreshKey: 1,
			searchKey: "",
			finishTyping: false,
			onEndLoader: false,
			sortByFlag: false,
			tempSearchKey: "",
		};
	}

	renderLoading = () => {
		return (
			<View style={style.indicator}>
				<ActivityIndicator size="large" color="black" />
			</View>
		);
	};

	onSuccess = (searchResult: array) => {
		const { result } = this.state;
		const updated = [...result, ...searchResult];
		this.setState({ result: updated, loading: false, onEndLoader: false });
	};

	onFailure = (message: string) => {
		console.log(message);
	};

	onError = (error: any) => {
		console.log("Error occured in BookmarkShow Api ", error);
	};

	onEndReached = () => {
		const { pageNumber, searchKey, onEndLoader } = this.state;
		const { user } = this.props;
		const updated = pageNumber + 1;
		this.setState({ pageNumber: updated, onEndLoader: true });
		SearchApi(
			searchKey,
			updated,
			user.id,
			this.onSuccess,
			this.onFailure,
			this.onError,
			"PUB_DATE",
		);
	};

	renderCloseButton = () => {
		const { result, finishTyping } = this.state;
		const condition = result.length > 0 && !finishTyping;
		return condition ? (
			<TouchableOpacity
				// style={style.closeButtonContainer}
				onPress={() => this.setState({ finishTyping: true })}
			>
				<Image style={style.closeButton} source={Images.closeButton} />
			</TouchableOpacity>
		) : null;
	};

	onManageBookmark = (nId: string, siteKey: string, isBookmarked: boolean, index: number) => {
		const { user } = this.props;
		const { result } = this.state;
		const changes = !result[index].bookmark;
		const refresh = Math.random();
		const updated = [...result];
		updated[index].bookmark = changes;
		this.setState({
			result: updated,
			refreshKey: refresh,
		});
		ManageBoookmarkApi(user.id, nId, siteKey, isBookmarked);
	};

	beforeSearch = () => {
		const { navigation, user } = this.props;
		const { searchKey } = this.state;
		const inputAccessoryViewID = "inputAccessoryView1";
		return (
			<View>
				<ProfileHeader
					onBack={() => navigation.goBack()}
					onAction={() => {
						navigation.navigate("ProfileDrawerScreen");
					}}
				/>

				<View style={style.textContainer}>
					<TextInput
						style={style.text}
						autoFocus={true}
						placeholder={"Search "}
						inputAccessoryViewID={inputAccessoryViewID}
						placeholderTextColor={Colors.bgPrimaryDark}
						onChangeText={(text: String) => {
							this.setState({ searchKey: text });
						}}
						onSubmitEditing={() => {
							this.setState({
								finishTyping: true,
								loading: true,
								result: [],
								tempSearchKey: searchKey,
							});
							SearchApi(
								searchKey,
								0,
								user.id,
								this.onSuccess,
								this.onFailure,
								this.onError,
								"PUB_DATE",
							);
						}}
					/>
					<View style={{ flex: 0.25, alignItems: "center", justifyContent: "center" }}>
						{this.renderCloseButton()}
					</View>
				</View>
			</View>
		);
	};

	emptyResult = () => {
		return (
			<View style={style.emptycontainer}>
				<Text style={style.emptyResult}> No results found !</Text>
			</View>
		);
	};

	searchHeader = (searchKey: string) => {
		return (
			<TouchableOpacity
				style={style.touchable}
				activeOpacity={0.5}
				onPress={() => this.setState({ finishTyping: false })}
			>
				<View style={style.searchHeader}>
					<Icon
						name="search"
						size={20}
						style={style.searchIcon}
						color={Colors.searchIcon}
					/>
					<Text numberOfLines={1} style={style.searchKey}>
						{searchKey}
					</Text>
				</View>
			</TouchableOpacity>
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

	onPressBrand = (site, brandLogo) => {
		const { navigation } = this.props;
		navigation.push("BrandsPage", {
			brand: site,
			brandLogo,
		});
	};

	sortBy = () => {
		const { searchKey, sortByFlag } = this.state;
		const { user } = this.props;

		this.setState({ sortByFlag: !sortByFlag, loading: true });
		const sort = !sortByFlag ? "score" : "PUB_DATE";
		SearchApi(searchKey, 0, user.id, this.onSuccess, this.onFailure, this.onError, sort);
	};

	searchResult = (data: Array) => {
		const { loading, refreshKey, onEndLoader, sortByFlag } = this.state;
		console.log("onend", onEndLoader);
		return (
			<View style={{ flex: 1 }}>
				<Text style={style.sortText}>Did not find what you are looking for?</Text>
				<TouchableOpacity onPress={this.sortBy}>
					{!sortByFlag ? (
						<Text style={style.sortBy}>Sort the results by relevance.</Text>
					) : (
						<Text style={style.sortBy}>Sort the result by date.</Text>
					)}
				</TouchableOpacity>
				<FlatList
					data={data}
					style={style.ListItems}
					numColumns={Metrics.isTablet ? 2 : 1}
					keyExtractor={(x, i) => i.toString()}
					onEndReachedThreshold={1}
					onEndReached={() => this.onEndReached()}
					ListFooterComponent={() => <ListLoading loading={onEndLoader} />}
					renderItem={
						Metrics.isTablet ? this.renderTabletSearchList : this.renderSearchList
					}
				/>
			</View>
		);
	};

	afterSearch = (searchKey: string) => {
		const { result, loading } = this.state;
		return (
			<View style={style.ListItems}>
				{this.searchHeader(searchKey)}
				{loading
					? this.renderLoading()
					: result.length > 0
					? this.searchResult(result)
					: this.emptyResult()}
			</View>
		);
	};

	handlePlay = () => {
		const { navigation } = this.props;
		navigation.navigate("PlayScreen");
	};

	renderSearchList = ({ item, index }) => {
		return (
			<Article
				onPress={() => this.onItemPress(item.nid, item.site, item)}
				onPressBookmark={() =>
					this.onManageBookmark(item.nid, item.site, item.bookmark, index)
				}
				key={index.toString()}
				order={TemplateConfig.articleTemplates[item.template ? item.template : 18]}
				settings={
					TemplateConfig.articleTemplateSettings[item.template ? item.template : 12]
				}
				data={item}
				refreshKey={this.state.refreshKey}
				onPressBrand={this.onPressBrand}
				bookmarkRequired
				isFromHomePage={true}
			/>
		);
	};

	renderTabletSearchList = ({ item, index }) => {
		return (
			<ArticletabletSmall
				onPress={() => this.onItemPress(item.nid, item.site, item)}
				onPressBookmark={() =>
					this.onManageBookmark(item.nid, item.site, item.bookmark, index)
				}
				key={index.toString()}
				data={item}
				refreshKey={this.state.refreshKey}
				onPressBrand={this.onPressBrand}
				bookmarkRequired
				isImage
				tabContainerStyle={{
					marginHorizontal: ScalePerctFullWidth(5),
				}}
			/>
		);
	};

	render() {
		const { searchKey, finishTyping } = this.state;
		const { control, navigation } = this.props;
		console.log("search key in render:", searchKey);
		return (
			<View style={style.container}>
				{finishTyping ? this.afterSearch(searchKey) : this.beforeSearch()}
				{/* {this.renderCloseButton()} */}
				<View style={style.podcastStrip}>
					{control.flag && <PodcastPlayView onPress={this.handlePlay} />}
					<BottomBar navigation={navigation} />
				</View>
			</View>
		);
	}
}

const style = StyleSheet.create({
	sortText: {
		color: "grey",
		paddingTop: ScalePerctFullHeight(3),
		paddingBottom: ScalePerctFullHeight(1),
		paddingHorizontal: ScalePerctFullWidth(5),
	},
	sortBy: {
		color: "#EC0018",
		paddingBottom: ScalePerctFullHeight(1),
		paddingHorizontal: ScalePerctFullWidth(5),
	},
	container: {
		flex: 1,
	},
	podcastStrip: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
	},
	emptycontainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
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
	searchHeader: {
		flexDirection: "row",
		backgroundColor: Colors.searchHeader,
		borderRadius: 20,
		height: ScalePerctFullHeight(4),
		width: ScalePerctFullWidth(95),
		alignSelf: "center",
		marginTop: 40,
		marginHorizontal: ScalePerctFullWidth(2.5),
	},
	searchIcon: {
		color: Colors.searchIcon,
		alignSelf: "center",
		//marginVertical: ScalePerctFullHeight(0.75),
		marginLeft: 10,
	},
	searchKey: {
		width: ScalePerctFullWidth(70),
		alignSelf: "center",
		//marginVertical: ScalePerctFullHeight(0.75),
		color: Colors.searchIcon,
		fontFamily: "BentonSans Bold",
		fontSize: 14,
		marginLeft: 15,
	},
	emptyResult: {
		color: Colors.bgPrimaryDark,
		fontFamily: "BentonSans Bold",
		fontSize: 18,
		marginLeft: 15,
	},
	textContainer: {
		marginTop: 38,
		marginLeft: 21,
		flexDirection: "row",
	},
	touchable: {
		flexDirection: "row",
	},
	text: {
		fontFamily: "BentonSans Regular",
		color: Colors.bgPrimaryDark,
		fontSize: 32,
		flex: 1,
	},
	ListItems: {
		flex: 1,
		marginBottom: 20,
	},
	closeButtonContainer: {
		position: "absolute",
		top: ScalePerctFullHeight(15),
		left: ScalePerctFullWidth(90),
	},
	closeButton: {
		height: 25,
		width: 25,
	},
});

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
)(Search);
