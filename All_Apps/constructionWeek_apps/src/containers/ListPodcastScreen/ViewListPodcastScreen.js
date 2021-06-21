import React, { PureComponent } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Analytics } from "../../Analytics";
import { Constants, Metrics, ScalePerctFullWidth, Strings, Images, Colors } from "../../asset";
import {
	AlertComp,
	AnimatedHeaderList,
	Line,
	ListLoading,
	PodcastListCard,
	PodcastPlayView,
	ProfileHeader,
} from "../../components";
import { Actions } from "../../redux";
import { PodcastViewListApi } from "../../service";
import { TabModal } from "../ChaptorPodcastScreen";
import HomeHeaderContainer from "../../navigators/HomeHeaderContainer";
import { brandId } from "../../service/Constant";

type Props = {
	navigation: any,
	flag: boolean,
};

const Footer = ({ loadMoreInProgress }) => {
	return (
		loadMoreInProgress && (
			<View
				style={{
					height: 50,
					width: ScalePerctFullWidth(90),
					alignItems: "center",
					paddingRight: ScalePerctFullWidth(9.6),
				}}
			>
				<ActivityIndicator size="large" color="green" />
			</View>
		)
	);
};

class ViewListPodcastScreen extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = {
			showLoader: true,
			flag: false,
			page: 0,
			loadMoreInProgress: true,
			refreshing: false,
			showModal: false,
			podcastList: {},
			refresh: false,
		};
	}

	componentDidMount() {
		Analytics.setCurrentScreen("PODCAST_LIST");
		const { navigation } = this.props;
		// const id = navigation.getParam("id");
		PodcastViewListApi(brandId, 0, this.onSuccess, this.onFailure, this.onError);
	}

	onSuccess = (response: Object) => {
		const { podcastList } = this.state;
		let list = {};
		this.setState({ showLoader: false, loadMoreInProgress: false });
		if (this.state.refresh) {
			list = { ...podcastList, ...response.data };
			this.setState({ podcastList: list, refresh: false, flag: false });
		} else if (this.state.page !== 0) {
			if (response.data.podcasts.length === 0) {
				this.setState({ flag: true });
				return;
			}
			list = {
				...podcastList,
				podcasts: [...podcastList.podcasts, ...response.data.podcasts],
			};
			this.setState({ podcastList: list });
		} else {
			list = { ...podcastList, ...response.data };
			this.setState({ podcastList: list });
			this.setState((prevState, props) => {
				return { page: prevState.page + 1 };
			});
		}
	};

	onFailure = () => {
		this.setState({ showLoader: false });
		const message = Constants.errorMessages.general;
		AlertComp(Strings.authentication.ALERT, message);
	};

	onError = (error: any) => {
		this.setState({ showLoader: false });
		let message = Constants.errorMessages.general;
		if (error.toString().includes(Constants.errorMessages.checkNetwork)) {
			message = Constants.errorMessages.network;
		}
		AlertComp(Strings.authentication.ALERT, message);
	};

	onEndReached = () => {
		if (!this.state.flag) {
			this.setState((prevState, props) => {
				return { showLoader: true, page: prevState.page + 1 };
			});

			const { navigation } = this.props;
			const id = navigation.getParam("id");
			PodcastViewListApi(
				brandId,
				this.state.page,
				this.onSuccess,
				this.onFailure,
				this.onError,
			);
		}
	};

	renderSeperator = () => {
		return (
			<Line
				style={{
					borderBottomWidth: 1,
					alignSelf: "stretch",
					marginRight: Metrics.isTablet
						? ScalePerctFullWidth(3)
						: ScalePerctFullWidth(9.6),

					marginBottom: Metrics.isTablet ? 25 : 0,
				}}
			/>
		);
	};

	onRefresh = () => {
		this.setState({
			podcastList: {},
			showLoader: true,
			refresh: true,
			loadMoreInProgress: true,
		});

		const { navigation } = this.props;
		// const id = navigation.getParam("id");
		PodcastViewListApi(brandId, 0, this.onSuccess, this.onFailure, this.onError);
	};

	renderTabPlayScreen = () => {
		const { showModal } = this.state;
		this.setState({ showModal: !showModal });
	};

	handlePlay = () => {
		const { navigation } = this.props;
		return Metrics.isTablet ? this.renderTabPlayScreen() : navigation.navigate("PlayScreen");
	};

	render() {
		const { navigation, flag } = this.props;
		const { refreshing, podcastList, showModal, showLoader, loadMoreInProgress } = this.state;

		const logo = navigation.getParam("logo");
		console.log("podacstData", podcastList.podcasts);
		return (
			<View style={{ flex: 1 }}>
				<AnimatedHeaderList
					header={() => (
						<HomeHeaderContainer
							navigation={navigation}
							// color={Colors.bgPrimaryLight}
							title={"Podcast"}
							isCollapsed = {true}
						/>

						// <ProfileHeader
						// 	navigation={navigation}
						// 	onSearch={() => navigation.navigate("SearchDrawerScreen")}
						// 	color={Colors.bgPrimaryLight}
						// />
					)}
					flatListProps={{
						data: podcastList.podcasts,
						renderItem: ({ item }) => (
							<PodcastListCard
								data={item}
								onPress={() => navigation.navigate("ChaptorPodcastScreen", {
										id: item.nid,
										brand: podcastList.brand_key,
										logo: podcastList.logo,
										item,
									})
								}
								margin={Metrics.isTablet ? 0 : ScalePerctFullWidth(2.6)}
								tabContainerStyle={
									Metrics.isTablet
										? {
											width: ScalePerctFullWidth(22),
										  }
										: null
								}
								tabImageStyle={
									Metrics.isTablet
										? {
											height: 168,
											width: ScalePerctFullWidth(22),
											backgroundColor: "red",
										  }
										: null
								}
								flag={Metrics.isTablet === true}
							/>
						),
						numColumns: Metrics.isTablet ? 4 : 2,
						keyExtractor: (item, index) => item.nid,
						onEndReachedThreshold: 0.5,
						onEndReached: this.onEndReached,
						ListFooterComponent: () => {
							return loadMoreInProgress ? (
								<ListLoading loading={showLoader || !podcastList} />
							) : (
								<Footer loadMoreInProgress={showLoader} />
							);
						},
						contentContainerStyle: loadMoreInProgress
							? styles.loader
							: styles.contentContainerStyle,
						ItemSeparatorComponent: this.renderSeperator,
						onRefresh: this.onRefresh,
						refreshing,
					}}
					headerHeight={Metrics.HEADER_HEIGHT}
				/>
				{/* )} */}
				{/* {!showModal ? flag && <PodcastPlayView onPress={this.handlePlay} /> : null}
				{showModal && <TabModal showModal={showModal} handlePlay={this.handlePlay} />} */}
			</View>
		);
	}
}

function mapStateToProps(state) {
	// state
	return {
		flag: state.podcastPlayControl ? state.podcastPlayControl.flag : false,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ViewListPodcastScreen);

const styles = StyleSheet.create({
	contentContainerStyle: {
		paddingTop: Metrics.isTablet ? ScalePerctFullWidth(3) : 0,
		marginHorizontal: Metrics.isTablet
			? (ScalePerctFullWidth(100) - ScalePerctFullWidth(90)) / 2
			: ScalePerctFullWidth(3),
		// marginLeft: Metrics.isTablet ? null : ScalePerctFullWidth(9.6),
	},
	loader: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
});
