import React, { PureComponent } from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, Image, View } from "react-native";
import { connect } from "react-redux";
import ImageLoad from "react-native-image-placeholder";
import { bindActionCreators } from "redux";
import { Actions } from "../../redux";
import { ScalePerctFullHeight, ScalePerctFullWidth, Metrics, Colors, Images } from "../../asset";
import { SeekBar, ProfileHeader, Audio } from "../../components";
import { Controls } from "../../components/podcastPlayControl";
import { Analytics, Screen } from "../../Analytics";
import ModalView from "../../components/podcastChaptorCard/ModalView";
import HomeHeaderContainer from "../../navigators/HomeHeaderContainer";

type Props = {
	isPaused: Function,
	setCurrentPage: Function,
	control: Object,
	navigation: Array,
	loading: boolean,
};

class PlayScreen extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = {
			showImageModal: false,
		};
	}

	componentDidMount() {
		Analytics.setCurrentScreen("PODCAST_PLAY");
		this.props.setCurrentPage(true);
		this.resumeUiUpdate();
	}

	componentWillUnmount() {
		this.props.setCurrentPage(false);
		this.pauseUiUpdate();
	}

	resumeUiUpdate = () => {
		this.updateUI = setInterval(() => {
			this.setState((prevState: any) => {
				return { refresh: !prevState.refresh }; //To update UI every second when it is playing
			});
		}, 1000);
	};

	pauseUiUpdate = () => {
		clearInterval(this.updateUI);
	};

	renderProgress = () => {
		const { control, isPaused } = this.props;
		return (
			<View style={{ paddingTop: ScalePerctFullHeight(6) }}>
				<SeekBar
					onSeek={new Audio().seek}
					trackLength={control.totalLength}
					onSlidingStart={() => isPaused(true)}
					currentPosition={control.totalLength === 0 ? 0 : new Audio().getCurrentTime()}
				/>
			</View>
		);
	};

	renderPlayField = () => {
		const { isPaused, control, loading } = this.props;
		return (
			<Controls
				forwardDisabled={
					control.selectedTrack === control.tracks.field_podcast_details.length - 1
				}
				onBack={new Audio().onBack}
				onForward={new Audio().onForward}
				onPressPlay={() => {
					this.resumeUiUpdate();
					isPaused(false);
				}}
				onPressPause={() => {
					this.pauseUiUpdate();
					isPaused(true);
				}}
				paused={control.paused}
				loading={loading}
			/>
		);
	};

	toggleModal = () =>
		this.setState({
			showImageModal: !this.state.showImageModal,
		});

	render() {
		const { control, navigation } = this.props;

		return (
			<View style={{ flex: 1 }}>
				<ProfileHeader
					onAction={() => {
						navigation.navigate("ProfileDrawerScreen");
					}}
					onBack={() => {
						navigation.goBack();
					}}
					isLogo
					//brandIcon={Images.ABlogo}
				/>
				{/* <HomeHeaderContainer navigation={navigation} color={Colors.bgPrimaryLight} /> */}

				<View style={styles.container}>
					<View style={styles.textView}>
						<Text style={styles.title}>
							{control.tracks.field_podcast_details[
								control.selectedTrack
							].podcast_title.replace(/&#039;/g, "'")}
						</Text>
						{/* <Text style={styles.chapter} numberOfLines={3}>
							{control.tracks.field_lead_text}
						</Text> */}
					</View>
					<TouchableOpacity onPress={this.toggleModal}>
						<ImageLoad
							resizeMode={"cover"}
							style={styles.image}
							placeholderStyle={styles.image}
							isShowActivity={false}
							loadingStyle={{ size: "large", color: "grey" }}
							source={
								control.tracks.field_image
									? { uri: control.tracks.field_image }
									: Images.square
							}
							placeholderSource={Images.square}
							borderRadius={ScalePerctFullWidth(30)}
						/>
					</TouchableOpacity>
					{this.renderProgress()}
					{this.renderPlayField()}
				</View>
				{this.state.showImageModal && control.tracks.field_image ? (
					<ModalView
						onPress={this.toggleModal}
						image={control.tracks.field_image}
						isVisible={this.state.showImageModal}
					/>
				) : null}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		paddingTop: ScalePerctFullHeight(2),
	},
	image: {
		width: ScalePerctFullWidth(60),
		height: ScalePerctFullWidth(60),
		borderRadius: ScalePerctFullWidth(30),
	},
	title: {
		fontFamily: "BentonSans Bold",
		fontSize: Metrics.LARGE_TEXT_SIZE,
		lineHeight: 25,
		letterSpacing: 0,
		color: Colors.bgPrimaryDark,
		textAlign: "center",
		// marginBottom: ScalePerctFullHeight(3.9),
	},
	chapter: {
		fontFamily: "BentonSans Regular",
		fontSize: Metrics.VV_SMALL_TEXT_SIZE,
		lineHeight: 10,
		letterSpacing: 0,
		color: Colors.bodySecondaryDark,
	},
	playIcon: {
		flexDirection: "row",
		paddingBottom: ScalePerctFullHeight(6),
		paddingTop: ScalePerctFullHeight(5.4),
		justifyContent: "space-around",
		alignItems: "center",
		flex: 0.5,
	},
	textView: {
		flex: 1,
		alignItems: "center",
		paddingHorizontal: ScalePerctFullWidth(12),
	},
	audioElement: {
		height: 0,
		width: 0,
	},
});

function mapStateToProps(state) {
	// state
	return {
		podcastTracks: state.podcastChaptor[0].field_podcast_details,
		control: state.podcastPlayControl,
		podcastChaptor: state.podcastChaptor,
		loading: state.isLoading,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PlayScreen);
