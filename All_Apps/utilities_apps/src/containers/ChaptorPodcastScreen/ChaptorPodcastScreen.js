import React, { PureComponent } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import Video from "react-native-video";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../redux";
import ChaptorPodcastScreenUI from "./ChaptorPodcastScreenUI";
import { PodcastChaptorApi, Subscribe } from "../../service";
import { Constants, Strings, Metrics, Images } from "../../asset";
import { AlertComp, ProfileHeader } from "../../components";
import { Analytics, Events } from "../../Analytics";

const small = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="18px" height="14px" viewBox="0 0 18 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="UI-KIT" transform="translate(-1526.000000, -5181.000000)" stroke="#FFFFFF" stroke-width="1.5">
            <g id="arrow-left" transform="translate(1527.000000, 5182.000000)">
                <path d="M16,6 L0,6" id="Shape"></path>
                <polyline id="Shape" points="6 12 0 6 6 0"></polyline>
            </g>
        </g>
    </g>
</svg>`;

type Props = {
	navigation: Function,
	podcastChaptor: any,
	userId: any,
	podcasts: any,
	setUserSubscription: Function,
	setTotalLength: Function,
	setCurrentPosition: Function,
	isPaused: Function,
	setSelectedTrack: Function,
	setFlag: Function,
	control: Object,
	setTrack: Function,
	setPodcastChaptor: Function,
};

class ChaptorPodcastScreen extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = {
			play: false,
			showLoader: true,
			loading: false,
			showModal: false,
		};
	}

	componentDidMount() {
		Analytics.setCurrentScreen("PODCAST_CHAPTOR");
		const { navigation } = this.props;
		const id = navigation.getParam("id");
		console.log("id", id);
		PodcastChaptorApi(id, this.onSuccess, this.onFailure, this.onError);
	}

	onSuccess = (response: Object) => {
		const { setPodcastChaptor } = this.props;
		setPodcastChaptor(response);
		this.setState({ showLoader: false });
	};

	onFailure = () => {
		this.setState({ showLoader: false });
		const message = Constants.errorMessages.general;
		AlertComp(Strings.authentication.ALERT, message);
	};

	handleSubscribe = () => {
		this.setState({ loading: true });
		const { podcasts, navigation, userId } = this.props;
		const brand = navigation.getParam("brand");
		const flag = podcasts.indexOf(brand) > -1 ? "U" : "F";
		if (flag === "U") {
			Analytics.logEvent(Events.podcast.unSubscribe);
		} else {
			Analytics.logEvent(Events.podcast.subscribe);
		}

		Subscribe(userId, brand, flag, this.onSuccessSubscribe, this.onError);
	};

	onError = (error: any) => {
		this.setState({ showLoader: false, loading: false });
		let message = Constants.errorMessages.general;
		if (error.toString().includes(Constants.errorMessages.checkNetwork)) {
			message = Constants.errorMessages.network;
		}
		AlertComp(Strings.authentication.ALERT, message);
	};

	onSuccessSubscribe = () => {
		const { navigation } = this.props;
		this.setState({ loading: false });
		const brand = navigation.getParam("brand");
		this.props.setUserSubscription(brand);
	};

	renderTabPlayScreen = () => {
		this.setState({ showModal: !this.state.showModal });
	};

	handlePlay = () => {
		const { navigation } = this.props;
		return Metrics.isTablet ? this.renderTabPlayScreen() : navigation.navigate("PlayScreen");
	};

	render() {
		console.log("image");
		const { showLoader, loading } = this.state;
		const {
			podcastChaptor,
			navigation,
			podcasts,

			isPaused,
			setTotalLength,
			setCurrentPosition,
			setSelectedTrack,
			setFlag,
			control,
			setTrack,
		} = this.props;
		const brand = navigation.getParam("brand");

		const logo =
			!showLoader && podcastChaptor && podcastChaptor[0]
				? podcastChaptor[0].brand_logo
				: null;
		const item = navigation.getParam("item");
		console.log("item in podacst screen", item);

		return (
			<View style={{ flex: 1 }}>
				<ProfileHeader
					onAction={() => {
						navigation.navigate("ProfileDrawerScreen");
					}}
					onBack={() => {
						navigation.goBack();
					}}
					logoUrl={logo}
					brandIcon={Images.ABlogo}
				/>

				<ChaptorPodcastScreenUI
					loading={loading}
					handlePlay={this.handlePlay}
					play={this.state.play}
					showLoader={this.state.showLoader}
					data={podcastChaptor}
					flag={podcasts.indexOf(brand) > -1 ? "U" : "F"}
					onSubscribe={this.handleSubscribe}
					navigation={navigation}
					control={control}
					isPaused={isPaused}
					setFlag={setFlag}
					setTotalLength={setTotalLength}
					setCurrentPosition={setCurrentPosition}
					setSelectedTrack={setSelectedTrack}
					setTrack={setTrack}
					item={item}
					showModal={this.state.showModal}
				/>
			</View>
		);
	}
}

function mapStateToProps(state) {
	// state
	return {
		podcastChaptor: state.podcastChaptor,
		control: state.podcastPlayControl ? state.podcastPlayControl : false,
		podcasts: state.user && state.user.podcasts,
		userId: state.user && state.user.id,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ChaptorPodcastScreen);
