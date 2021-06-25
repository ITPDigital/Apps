import React, { PureComponent } from "react";
import {
	FlatList,
	Image,
	StyleSheet,
	TouchableOpacity,
	View,
	ScrollView,
	ActivityIndicator,
	Platform,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNavigation } from "react-navigation";
import { NativeModules } from 'react-native';
import { Colors, Metrics, ScalePerctFullWidth, ScalePerctFullHeight } from '../../asset';
import { Line } from '../../components';
import { VideoCard, VideoCardLarge, VideoCardSmall } from '../../components/VideoCard';
import { TabletVideoHomeAPI } from '../../service';
import { Actions } from '../../redux';
import HomeHeaderContainer from '../../navigators/HomeHeaderContainer';
import { getCurrentUserToken } from '../../storage';
import { brandId } from "../../service/Constant";

class ListVideoScreen extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = {
			video: {},
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
		const updated = { ...video, ...videoDetails };
		console.log("tablet video response", videoDetails);
		console.log("updated", updated);
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
		const updated = pageNumber + 1;
		this.setState({ pageNumber: updated, loading: true });
		TabletVideoHomeAPI(user.id, updated, this.onSuccess, this.onFailure, this.onError);
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

	renderList = (listData: Array, logo) => {
		console.log("video list data", listData);
		const list = listData && listData.slice(0, 2);
		const newlist = listData && listData.slice(2);
		console.log("video list newarr", newlist);
		const { index, userId } = this.props; 

		return (
			<ScrollView style={{ marginBottom: ScalePerctFullHeight(7) }}>
				<FlatList
					showsHorizontalScrollIndicator={false}
					numColumns={2}
					data={list}
					renderItem={({ item, index }) => {
						const nextScreen = item.video ? "ArticleDisplayHomeScreen" : "ArticleDisplayHomeScreen";
						console.log("nid", item.content_type);
						return (
							<VideoCardSmall
								data={item}
								onPress={() => {
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
										: navigation.navigate("ArticleDisplayHomeScreen", {
											nid: item.nid,
											site: item.site,
										  });
								}}
								index={index}
							/>
						);
					}}
					listKey={(item, index) => `D${index.toString()}`}
				/>
				<FlatList
					showsHorizontalScrollIndicator={false}
					numColumns={3}
					data={listData}
					renderItem={({ item, index }) => {
						const nextScreen = item.video ? "VideoDetail" : "ArticleDisplayHomeScreen";
						console.log("itemvideo", item);
						return (
							// <VideoCard
							// 	data={item}
							// 	onPress={() => {
							// 		this.props.navigation.navigate(nextScreen, {
							// 			nid: item.nid,
							// 			site: item.site,
							// 		});
							// 	}}
							// 	index={index}
							// />
							!(this.state.pageNumber === 0 && index >= 1) ? (
								<VideoCardLarge
									data={item}
									onPress={() => {
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
											: navigation.navigate("ArticleDisplayHomeScreen", {
												nid: item.nid,
												site: item.site,
											  });
									}}
									index={index}
								/>
							) : (
								<VideoCardSmall
									data={item}
									onPress={() => {
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
											: navigation.navigate("ArticleDisplayHomeScreen", {
												nid: item.nid,
												site: item.site,
											  });
									}}
									index={index}
								/>
							)
						);
					}}
					listKey={(item, index) => `D${index.toString()}`}
					onRefresh={this.onRefresh}
					refreshing={this.state.refreshing}
					onEndReachedThreshold={0.5}
					onEndReached={() => this.onEndReached()}
				/>
			</ScrollView>
		);
	};

	render() {
		// const { data } = this.props;
		const { video } = this.state;
		console.log("video data", video);
		const list = (
			<View>
				{this.renderList(video.items)}

				<Line style={style.separator} />
			</View>
		);

		return this.state.showLoader ? (
			<View style={style.loaderstyle}>
				<ActivityIndicator size="large" color="red" />
			</View>
		) : (
			<View style={{ flex: 1 }}>
				<HomeHeaderContainer navigation={this.props.navigation} />

				<View style={style.container}>{list}</View>
			</View>
		);
	}
}

const style = StyleSheet.create({
	container: {
		paddingTop: Metrics.DEFAULT_PADDING,
		paddingLeft: Metrics.DEFAULT_PADDING,
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
