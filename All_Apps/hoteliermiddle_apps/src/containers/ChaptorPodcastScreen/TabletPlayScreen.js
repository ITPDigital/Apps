import React, { PureComponent } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import ImageLoad from "react-native-image-placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Colors, Images, Metrics, ScalePerctFullHeight, ScalePerctFullWidth } from "../../asset";
import { Audio, PodcastChaptorCard, SeekBar } from "../../components";
import { Controls } from "../../components/podcastPlayControl";
import { Actions } from "../../redux";
import { compare } from "../../utilities";
import { Analytics } from "../../Analytics";
import ModalView from "../../components/podcastChaptorCard/ModalView";

type Props = {
	title: string,
	onPress: Function,
	buttonStyle: Object,
	showLoader: boolean,
	top: number,
	imageStyle: Object,
	isPaused: Function,
	setTotalLength: Function,
	setCurrentPosition: Function,
	setSelectedTrack: Function,
	isRepeatOn: Function,
	control: Object,
	podcastTracks: Array,
	navigation: Array,
};

class TabletPlayScreen extends PureComponent<Props> {
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
			<SeekBar
				onSeek={new Audio().seek}
				trackLength={control.totalLength}
				onSlidingStart={() => isPaused(true)}
				currentPosition={control.totalLength === 0 ? 0 : new Audio().getCurrentTime()}
			/>
			// </View>
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

	handleTrackPlay = (index: number) => {
		const {
			setSelectedTrack,
			isPaused,
			setFlag,
			setTrack,
			podcastTracks,
			control,
			setTotalLength,
		} = this.props;
		if (!control.tracks || !compare(control.tracks, podcastTracks[0])) {
			setTrack(podcastTracks[0]);
		}
		const status =
			control.tracks &&
			control.tracks.field_podcast_details[index].podcast_url ===
				podcastTracks[0].field_podcast_details[index].podcast_url;
		if (!status) {
			setTotalLength(0);
		}
		setSelectedTrack(index);
		isPaused(false);
		setFlag(true);
	};

	renderList = (list: Array) => {
		// { handleTrackPlay } = this.props;
		return (
			<FlatList
				data={list}
				renderItem={({ item, index }) => (
					<PodcastChaptorCard onPress={() => this.handleTrackPlay(index)} data={item} />
				)}
				style={styles.listStyle}
				ListHeaderComponent={() => <Text style={styles.listHeader}>Related Episodes</Text>}
				keyExtractor={(item, index) => index.toString()}
			/>
		);
	};

	toggleModal = () =>
		this.setState({
			showImageModal: !this.state.showImageModal,
		});

	render() {
		const {
			control,
			podcastTracks,
			navigation,
			isPaused,
			setTotalLength,
			setCurrentPosition,
			setSelectedTrack,
			showModal,
		} = this.props;

		return (
			<View
				style={{
					flex: 1,
					marginLeft: "58%",
					height: "100%",
					marginVertical: ScalePerctFullHeight(-8),
					paddingTop: ScalePerctFullHeight(2),
				}}
			>
				<View style={styles.container}>
					<View style={styles.textView}>
						<Text style={styles.title}>
							{
								control.tracks.field_podcast_details[control.selectedTrack]
									.podcast_title
							}
						</Text>
						<Text style={styles.chapter} numberOfLines={3}>
							{control.tracks.field_lead_text}
						</Text>
					</View>
					{/* <View style={styles.imageContainer}> */}
					<TouchableOpacity onPress={this.toggleModal} style={styles.imageContainer}>
						<ImageLoad
							resizeMode="cover"
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
							borderRadius={
								Metrics.isTablet
									? ScalePerctFullWidth(12.5)
									: ScalePerctFullWidth(30)
							}
						/>
					</TouchableOpacity>
					{/* </View> */}

					{this.renderProgress()}
					{this.renderPlayField()}
					<View style={styles.lineSeperator} />
					<ScrollView>
						{this.renderList(this.props.podcastTracks[0].field_podcast_details)}
					</ScrollView>
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
		//	position: "absolute",
		//width: ScalePerctFullWidth(100),
		height: "100%",
		backgroundColor: "white",
		//	marginLeft: "65%",
		//justifyContent: "flex-end",
		//alignItems: "flex-end",
		paddingTop: ScalePerctFullHeight(3.9),
		zIndex: 1,
	},
	imageContainer: {
		alignSelf: "center",
		backgroundColor: "white",
		//marginBottom: 10,
		//paddingVertical: 16,
	},
	image: {
		width: ScalePerctFullWidth(25),
		height: ScalePerctFullWidth(25),
		borderRadius: ScalePerctFullWidth(12.5),
	},
	title: {
		fontFamily: "BentonSans Bold",
		fontSize: 20,
		lineHeight: 25,
		letterSpacing: 0,
		color: Colors.bgPrimaryDark,
		textAlign: "center",
		marginBottom: ScalePerctFullHeight(1.2),
	},
	chapter: {
		fontFamily: "BentonSans Regular",
		fontSize: Metrics.VV_SMALL_TEXT_SIZE,
		lineHeight: 10,
		letterSpacing: 0,
		color: Colors.bodySecondaryDark,
		paddingVertical: 3,
		textAlign: "center",
		marginBottom: 8,
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
		flex: 0.5,
		//backgroundColor: "green",
		//width: ScalePerctFullWidth(32.14),
		//height: ScalePerctFullHeight(18),
		alignSelf: "center",
		paddingHorizontal: ScalePerctFullWidth(4),
		marginBottom: 10,
	},
	audioElement: {
		height: 0,
		width: 0,
	},
	listStyle: {
		paddingHorizontal: Metrics.DEFAULT_PADDING,
		flex: 1,
	},
	listHeader: {
		paddingHorizontal: 4,
		fontSize: Metrics.SMALL_TEXT_SIZE,
		color: Colors.bodySecondaryDark,
		paddingTop: 15,
		marginBottom: ScalePerctFullHeight(2),
		fontFamily: "BentonSans Bold",
	},
	lineSeperator: {
		width: ScalePerctFullWidth(40),
		alignSelf: "center",
		borderBottomWidth: 1,
		borderColor: Colors.linePrimaryFull,
		marginBottom: 6,
	},
});

function mapStateToProps(state) {
	// state
	return {
		podcastTracks: state.podcastChaptor,
		control: state.podcastPlayControl,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}
// export default TabletPlayScreen;
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(TabletPlayScreen);
