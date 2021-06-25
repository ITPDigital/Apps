import React, { PureComponent } from "react";
import { View } from "react-native";
import { Analytics } from "../../Analytics";
import { Constants, Metrics, Strings } from "../../asset";
import { AlertComp, AnimatedHeaderList, ListLoading } from "../../components";
import HomeHeaderContainer from "../../navigators/HomeHeaderContainer";
import { PodcastListApi } from "../../service";
import ListPodcastScreen from "./ListPodcastScreen";

type Props = {
	navigation: Function,
};

export default class TopListPodcastScreen extends PureComponent<Props> {
	_viewabilityConfig = {
		itemVisiblePercentThreshold: 50,
	};

	constructor(props) {
		super(props);
		this.state = {
			showLoader: true,
			flag: false,
			page: 0,
			loadMoreInProgress: false,
			refreshing: false,
			showModal: false,
			podcastList: {},
		};
	}

	componentDidMount() {
		Analytics.setCurrentScreen("PODCAST_HOME");
		PodcastListApi(0, this.onSuccess, this.onFailure, this.onError);
	}

	onSuccess = (response: Object) => {
		const { podcastList } = this.state;
		this.setState({ showLoader: false, loadMoreInProgress: false });
		const list = { ...podcastList, ...response.data };
		if (this.state.refreshing) {
			this.setState({ podcastList: list, refreshing: false });
		} else if (this.state.page !== 0) {
			if (response.length === 0) {
				this.setState({ flag: true });
				return;
			}
			this.setState({ podcastList: list });
		} else {
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
				return { loadMoreInProgress: true, page: prevState.page + 1 };
			});

			PodcastListApi(this.state.page, this.onSuccess, this.onFailure, this.onError);
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

	onRefresh = () => {
		this.setState({ showLoader: true, podcastList: {} });

		PodcastListApi(0, this.onSuccess, this.onFailure, this.onError);
	};

	render() {
		const { navigation } = this.props;
		const { refreshing, podcastList, showLoader } = this.state;

		let list = null;

		if (podcastList) {
			list = Object.keys(podcastList).map((item: any) => {
				return podcastList[item];
			});
		}

		console.log("listing", list);

		return (
			<View style={{ flex: 1 }}>
				<View style={{ flexDirection: "column", flex: 1 }}>
					<AnimatedHeaderList
						header={() => <HomeHeaderContainer navigation={navigation} />}
						flatListProps={{
							data: list,
							renderItem: ({ item, index }) => (
								<ListPodcastScreen
									data={item}
									navigation={navigation}
									index={index}
								/>
							),
							keyExtractor: (item, index) => index.toString(),
							// onEndReachedThreshold={0.5}
							// onEndReached={this.onEndReached}
							// ListFooterComponent={() => (
							// 	<Footer loadMoreInProgress={this.state.loadMoreInProgress} />
							// )}
							onRefresh: this.onRefresh,
							ListFooterComponent: () => (
								<ListLoading loading={showLoader || !podcastList} />
							),
							contentContainerStyle: { justifyContent: "center", flexGrow: 1 },
							refreshing,
							style: { flex: 1 },
						}}
						headerHeight={Metrics.HEADER_HEIGHT}
					/>
				</View>
			</View>
		);
	}
}
