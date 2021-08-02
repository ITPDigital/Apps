import React, { PureComponent } from "react";
import {
	ActivityIndicator,
	FlatList,
	Image,
	NativeModules,
	StyleSheet,
	TouchableOpacity,
	View,
	Platform,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Colors, Metrics, ScalePerctFullWidth } from "../../asset";
import { Line, AnimatedHeaderList, ListLoading } from "../../components";
import { VideoCardLarge, VideoCardSmall } from "../../components/VideoCard";
import HomeHeaderContainer from "../../navigators/HomeHeaderContainer";
import { Actions } from "../../redux";
import { TabletVideoHomeAPI } from "../../service";
import { getCurrentUserToken } from "../../storage";
import { brandId } from "../../service/Constant";

class ListVideoScreen extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = {
			video: [],
			pageNumber: 0,
			loading: false,
			showLoader: true,
			refreshing: false,
			showModal: false,
			refreshKey: 1,
			imageUrl: "https://facebook.github.io/react-native/docs/assets/favicon.png",
		};
		TabletVideoHomeAPI(
			brandId,
			this.state.pageNumber,
			this.onSuccess,
			this.onFailure,
			this.onError,
		);
	}

	onSuccess = (videoDetails: Object) => {
		const { video } = this.state;
		const updated = [...video, ...videoDetails.items];
		this.setState({ video: updated });
		this.setState({ showLoader: false });
	};

	onRefresh = async () => {
		const { user } = this.props;
		this.setState({ refreshing: true, loading: true, video: [] });
		TabletVideoHomeAPI(user.id, 0, this.onSuccess, this.onFailure, this.onError);
		this.setState({ refreshing: false });
	};

	onFailure = (message: string) => {
		console.log(message);
	};

	onError = (error: any) => {
		alert("No Data found");
	};

	onEndReached = () => {
		const { user } = this.props;
		const { pageNumber } = this.state;
		// if (this.state.loading === false) {
		const updated = pageNumber + 1;
		this.setState({ pageNumber: updated, loading: true });
		TabletVideoHomeAPI(user.id, updated, this.onSuccess, this.onFailure, this.onError);
		// }
	};

	renderHeader = (logo, id, site) => {
		const { navigation } = this.props;
		return (
			<View style={style.header}>
				<TouchableOpacity
					style={{ padding: ScalePerctFullWidth(1) }}
					onPress={() => navigation.navigate("BrandsPage", {
							brand: site,
							brandLogo: logo,
						})
					}
				>
					<Image
						source={{ uri: logo }}
						style={style.logo}
						resizeMode="stretch"
						onError={this.onError}
					/>
				</TouchableOpacity>
			</View>
		);
	};

	// renderList = (listData: Array, logo) => {
	// 	console.log("video list data", listData);
	// 	const list = listData && listData.slice(0, 2);
	// 	const newlist = listData && listData.slice(2);
	// 	console.log("video list newarr", newlist);
	// 	const { index, user } = this.props;
	// 	return (
	// 		<FlatList
	// 			showsHorizontalScrollIndicator={false}
	// 			numColumns={3}
	// 			data={newlist}
	// 			ListHeaderComponent={() => {
	// 				return (
	// 					<FlatList
	// 						showsHorizontalScrollIndicator={false}
	// 						numColumns={2}
	// 						data={list}
	// 						renderItem={this.renderSmallCard}
	// 						listKey={(item, index) => `D${index.toString()}`}
	// 					/>
	// 				);
	// 			}}
	// 			renderItem={this.renderLargeCard}
	// 			listKey={(item, index) => `D${index.toString()}`}
	// 			onRefresh={this.onRefresh}
	// 			refreshing={this.state.refreshing}
	// 			onEndReachedThreshold={0.5}
	// 			onEndReached={() => this.onEndReached()}
	// 		/>
	// 	);
	// };

	renderLargeCard = ({ item, index }) => {
		const { user, navigation } = this.props;

		const nid = item && item.nid && item.nid.toString();
		const uid = user && user.id && user.id.toString();
		const link = item && item.link;

		return (
			<VideoCardLarge
				data={item}
				onPress={() => {
					item.video
						? Platform.OS === "android"
							? getCurrentUserToken().then((token: string) => {
								NativeModules.BlueConic.setBlueconic(
									nid,
									item.site,
									uid,
									token,
									link,
								);
							  })
							: this.props.navigation.navigate("ArticleDisplayHomeScreen", {
								video: item.video,
								nid: item.nid,
								site: item.site,
								refreshKey: Math.random(),
							  })
						: navigation.navigate("ArticleDisplayHomeScreen", {
							nid: item.nid,
							site: item.site,
						  });
				}}
				index={index}
			/>
		);
	};

	renderSmallCard = ({ item, index }) => {
		const nextScreen = item.video ? "ArticleDisplayHomeScreen" : "ArticleDisplayHomeScreen";
		const { user, navigation } = this.props;

		const nid = item && item.nid && item.nid.toString();
		const uid = user && user.id && user.id.toString();
		const link = item && item.link;

		return (
			<VideoCardSmall
				data={item}
				onPress={() => {
					item.video
						? Platform.OS === "android"
							? getCurrentUserToken().then((token: string) => {
								NativeModules.BlueConic.setBlueconic(
									nid,
									item.site,
									uid,
									token,
									link,
								);
							  })
							: navigation.navigate("ArticleDisplayHomeScreen", {
								video: item.video,
								nid: item.nid,
								site: item.site,
								refreshKey: Math.random(),
							  })
						: navigation.navigate("ArticleDisplayHomeScreen", {
							nid: item.nid,
							site: item.site,
						  });
				}}
				index={index}
			/>
		);
	};

	render() {
		const { video } = this.state;
		const list1 = video && video.slice(0, 2);
		const newlist = video && video.slice(2);

		return this.state.showLoader ? (
			<View style={style.loaderstyle}>
				<ActivityIndicator size="large" color="red" />
			</View>
		) : (
			<View style={style.container}>
				<AnimatedHeaderList
				
					header={() => (
						<HomeHeaderContainer
							navigation={this.props.navigation}
							color={Colors.bgPrimaryLight}
							title="Videos"
						/>
					)}
					flatListProps={{
						style: {
							marginTop: Metrics.DEFAULT_PADDING,
							marginLeft: Metrics.DEFAULT_PADDING,
						},
						data: newlist,
						onRefresh: () => this.onRefresh(),
						refreshing: this.state.refreshing,
						showsHorizontalScrollIndicator: false,
						numColumns: 3,
						keyExtractor: (x, i) => i.toString(),
						onEndReachedThreshold: 0.5,
						onEndReached: () => this.onEndReached(),
						renderItem: this.renderLargeCard,
						ListHeaderComponent: () => {
							return (
								// <View></View> 
								<FlatList
									showsHorizontalScrollIndicator={false}
									numColumns={2}
									data={list1}
									renderItem={this.renderSmallCard}
									listKey={(item, index) => `D${index.toString()}`}
								/>
							);
						},
						// ListFooterComponent: () => <ListLoading loading={this.state.loading} />,
					}}
					headerHeight={Metrics.HEADER_HEIGHT}
				/>
			</View>
		);
	}
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		// paddingTop: Metrics.DEFAULT_PADDING,
		// paddingLeft: Metrics.DEFAULT_PADDING,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginRight: Metrics.DEFAULT_PADDING,
		marginBottom: Metrics.DEFAULT_PADDING,
	},
	viewButton: {
		fontSize: Metrics.SMALL_TEXT_SIZE,
		color: Colors.bgPrimaryVarient,
		fontFamily: "BentonSans Regular",
	},
	touchableStyle: {
		justifyContent: "center",
	},
	logo: {
		height: 20,
		width: 180,
	},
	separator: {
		marginTop: Metrics.DEFAULT_PADDING,
		marginRight: Metrics.DEFAULT_PADDING,
	},
	loaderstyle: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
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
)(ListVideoScreen);
