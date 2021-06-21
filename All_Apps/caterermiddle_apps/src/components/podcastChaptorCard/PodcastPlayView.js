import React, { PureComponent } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import ImageLoad from "react-native-image-placeholder";
import SvgUri from "react-native-svg-uri";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/AntDesign";
import { bindActionCreators } from "redux";
import { Actions } from "../../redux";
import { Metrics, Colors, ScalePerctFullHeight, ScalePerctFullWidth, Images } from "../../asset";
import ModalView from "./ModalView";

type Props = {
	onPress: Function,
	style: Object,
	isPaused: boolean,
	control: Object,
	setFlag: Function,
	loading: boolean,
};

const pause = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="8px" height="15px" viewBox="0 0 8 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="pause" fill="#FFFFFF" fill-rule="nonzero">
            <rect id="Rectangle-5" x="0" y="0.677419355" width="3" height="13.6451613" rx="1.5"></rect>
            <rect id="Rectangle-5" x="5" y="0.677419355" width="3" height="13.6451613" rx="1.5"></rect>
        </g>
    </g>
</svg>`;

const play = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="10px" height="15px" viewBox="0 0 10 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <polygon id="play" fill="#FFFFFF" points="0 0 9.9897815 7.0688 0 14.1362506"></polygon>
    </g>
</svg>`;

class PodcastPlayView extends PureComponent<Props> {
	state = {
		isModalVisible: false,
	};

	toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

	onClose = () => {
		const { isPaused, setFlag } = this.props;
		setFlag(false);
		isPaused(true);
	};

	render() {
		const { onPress, style, isPaused, control, loading } = this.props;
		const { isModalVisible } = this.state;

		const playControl = control.paused ? (
			<TouchableOpacity style={styles.buttonContainer} onPress={() => isPaused(false)}>
				<SvgUri
					width={ScalePerctFullWidth(6.3)}
					height={Metrics.isTablet ? ScalePerctFullHeight(2) : ScalePerctFullHeight(3)}
					svgXmlData={play}
				/>
			</TouchableOpacity>
		) : (
			<TouchableOpacity style={styles.buttonContainer} onPress={() => isPaused(true)}>
				<SvgUri
					width={ScalePerctFullWidth(6.3)}
					height={Metrics.isTablet ? ScalePerctFullHeight(2) : ScalePerctFullHeight(3)}
					svgXmlData={pause}
				/>
			</TouchableOpacity>
		);

		return (
			<TouchableOpacity style={[styles.container, style]} onPress={onPress}>
				{isModalVisible && control.tracks.field_image ? (
					<ModalView
						onPress={this.toggleModal}
						image={control.tracks.field_image}
						isVisible={this.state.isModalVisible}
					/>
				) : null}
				<Image
					source={Images.podcastStrip}
					style={styles.backgroundImage}
					resizeMode="stretch"
				/>
				<View style={styles.imageContainer}>
					<TouchableOpacity onPress={this.toggleModal}>
						<ImageLoad
							resizeMode={"cover"}
							style={styles.image}
							placeholderStyle={styles.image}
							isShowActivity={false}
							loadingStyle={{ size: "large", color: "grey" }}
							source={
								control.tracks.field_image_square
									? { uri: control.tracks.field_image_square }
									: Images.square
							}
							placeholderSource={Images.square}
							borderRadius={
								Metrics.isTablet ? ScalePerctFullWidth(3) : ScalePerctFullWidth(6)
							}
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.textContainer}>
					<Text style={styles.text}>
						{control.tracks.field_podcast_details[
							control.selectedTrack
						].podcast_title.replace(/&#039;/g, "'")}
					</Text>
				</View>
				{loading ? (
					<View style={styles.buttonContainer}>
						<ActivityIndicator size="large" color="white" />
					</View>
				) : (
					playControl
				)}
				<TouchableOpacity style={styles.buttonContainer} onPress={this.onClose}>
					<Icon name="close" size={20} color="white" />
				</TouchableOpacity>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "flex-end",
		width: ScalePerctFullWidth(100),
		height: Metrics.isTablet ? ScalePerctFullHeight(6) : ScalePerctFullHeight(10),
		//backgroundColor: "#ff744e",
		// zIndex: 1,
	},
	backgroundImage: {
		position: "absolute",
		width: ScalePerctFullWidth(100),
		height: Metrics.isTablet ? ScalePerctFullHeight(6) : ScalePerctFullHeight(10),
	},
	image: {
		width: Metrics.isTablet ? ScalePerctFullWidth(6) : ScalePerctFullWidth(12.5),
		height: Metrics.isTablet ? ScalePerctFullWidth(6) : ScalePerctFullWidth(12.5),
		borderRadius: Metrics.isTablet ? ScalePerctFullWidth(3) : ScalePerctFullWidth(6),
	},
	text: {
		fontFamily: "BentonSans Bold",
		fontSize: Metrics.SMALL_TEXT_SIZE,
		lineHeight: 18,
		letterSpacing: 0,
		color: Colors.bgPrimaryLight,
	},
	imageContainer: {
		flex: 0.2,
		justifyContent: "center",
		alignItems: "center",
	},
	textContainer: {
		flex: 0.6,
		justifyContent: "center",
	},
	buttonContainer: {
		flex: 0.1,
		justifyContent: "center",
		alignItems: "center",
	},
	closeIcon: {
		position: "absolute",
		bottom: 16,
		right: -3,
		height: ScalePerctFullHeight(10),
		// paddingLeft: ScalePerctFullWidth(1),
	},
	closeIconTablet: {
		position: "absolute",
		bottom: 14,
		right: -3,
		height: ScalePerctFullHeight(6),
	},
});

function mapStateToProps(state) {
	// state
	return {
		podcastTracks:
			state.podcastChaptor &&
			state.podcastChaptor[0] &&
			state.podcastChaptor[0].field_podcast_details,
		control: state.podcastPlayControl,
		loading: state.isLoading,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PodcastPlayView);
