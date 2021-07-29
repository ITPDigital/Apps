import React, { Component } from "react";

import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import SvgUri from "react-native-svg-uri";
import { Colors, ScalePerctFullHeight, ScalePerctFullWidth, Metrics, Images } from "../../asset";

const reverse = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="21px" height="15px" viewBox="0 0 21 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="reverse-button" transform="translate(11.000000, 8.000000) scale(-1, 1) translate(-11.000000, -8.000000) " fill="#85888B">
            <polygon id="Shape-sp-2406-0" points="1.499406 0.683888172 11.4891875 7.75229398 1.499406 14.8201388"></polygon>
            <polygon id="Shape-sp-2406-0" points="11.4994645 0.683888172 21.489246 7.75229398 11.4994645 14.8201388"></polygon>
        </g>
    </g>
</svg>`;

const forward = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="21px" height="15px" viewBox="0 0 21 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Forward-button" transform="translate(-1.000000, 0.000000)" fill="#85888B">
            <polygon id="Shape-sp-2406-0" points="1.499406 0.683888172 11.4891875 7.75229398 1.499406 14.8201388"></polygon>
            <polygon id="Shape-sp-2406-0" points="11.4994645 0.683888172 21.489246 7.75229398 11.4994645 14.8201388"></polygon>
        </g>
    </g>
</svg>`;

const Controls = ({
	paused,
	shuffleOn,
	repeatOn,
	onPressPlay,
	onPressPause,
	onBack,
	onForward,
	onPressShuffle,
	onPressRepeat,
	forwardDisabled,
	loading,
}) => (
	<View style={styles.container}>
		{/* <TouchableOpacity activeOpacity={0.0} onPress={onPressShuffle}>
			<Image
				style={[styles.secondaryControl, shuffleOn ? [] : styles.off]}
				source={require("../img/ic_shuffle_white.png")}
			/>
		</TouchableOpacity> */}

		<TouchableOpacity onPress={onBack}>
			<Icon name="backward" size={23} color={Colors.commentText} />
			{/* <SvgUri
				width={ScalePerctFullWidth(6.3)}
				height={ScalePerctFullHeight(3.6)}
				svgXmlData={reverse}
			/> */}
		</TouchableOpacity>
		{Metrics.isTablet ? <View style={{ width: ScalePerctFullWidth(3) }} /> : null}

		{loading ? (
			<View style={styles.playButton}>
				<ActivityIndicator size="large" color="red" />
			</View>
		) : !paused ? (
			<TouchableOpacity onPress={onPressPause}>
				<View style={styles.playButton}>
					<Image
						source={Images.pause}
						style={{
							height: 52,
							width: 52,
						}}
					/>
					{/* <Icon name="pause-circle" size={52} color={Colors.bgPrimaryDark} /> */}
				</View>
			</TouchableOpacity>
		) : (
			<TouchableOpacity onPress={onPressPlay}>
				<View style={styles.playButton}>
					<Image
						source={Images.playPodcast}
						style={{
							height: 52,
							width: 52,
						}}
					/>
					{/* <Icon name="play-circle" size={52} color={Colors.bgPrimaryDark} /> */}
				</View>
			</TouchableOpacity>
		)}
		{Metrics.isTablet ? <View style={{ width: ScalePerctFullWidth(3) }} /> : null}

		<TouchableOpacity onPress={onForward} disabled={forwardDisabled}>
			<Icon name="forward" size={23} color={Colors.commentText} />
			{/* <SvgUri
				width={ScalePerctFullWidth(6.3)}
				height={ScalePerctFullHeight(3.6)}
				svgXmlData={forward}
			/> */}
		</TouchableOpacity>

		{/* <Icon name="backward" size={23} color={Colors.bgPrimaryVarient} />
			<TouchableOpacity style={{ marginHorizontal: ScalePerctFullWidth(6) }}>
				<Icon name="play-circle" size={52} color={Colors.bgPrimaryVarient} />
			</TouchableOpacity>
			<Icon name="forward" size={23} color={Colors.bgPrimaryVarient} /> */}

		{/* <View style={{ width: 20 }} />
		<TouchableOpacity onPress={onForward} disabled={forwardDisabled}>
			<Image
				style={[forwardDisabled && { opacity: 0.3 }]}
				source={require("../img/ic_skip_next_white_36pt.png")}
			/>
		</TouchableOpacity>
		<View style={{ width: 40 }} />
		<TouchableOpacity activeOpacity={0.0} onPress={onPressRepeat}>
			<Image
				style={[styles.secondaryControl, repeatOn ? [] : styles.off]}
				source={require("../img/ic_repeat_white.png")}
			/>
		</TouchableOpacity> */}
	</View>
);

export default Controls;

const mobileStyles = StyleSheet.create({
	container: {
		flexDirection: "row",
		paddingBottom: ScalePerctFullHeight(6),
		paddingTop: ScalePerctFullHeight(5.4),
		justifyContent: "space-around",
		marginBottom: 30,
		alignItems: "center",
		flex: 0.5,
	},
	playButton: {
		height: 72,
		width: 72,
		borderWidth: 1,
		borderColor: "white",
		borderRadius: 72 / 2,
		alignItems: "center",
		justifyContent: "center",
	},
	secondaryControl: {
		height: 18,
		width: 18,
	},
	off: {
		opacity: 0.3,
	},
});

const tabStyles = StyleSheet.create({
	container: {
		flexDirection: "row",
		//marginBottom: 30,
		justifyContent: "center",
		alignItems: "center",
		flex: 0.4,
		//backgroundColor: "purple",
	},
	playButton: {
		height: 72,
		width: 72,
		borderWidth: 1,
		borderColor: "white",
		borderRadius: 72 / 2,
		alignItems: "center",
		justifyContent: "center",
	},
	secondaryControl: {
		height: 18,
		width: 18,
	},
	off: {
		opacity: 0.3,
	},
});
const styles = Metrics.isTablet ? tabStyles : mobileStyles;
