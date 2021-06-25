import React, { PureComponent } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Metrics, Colors, ScalePerctFullHeight, ScalePerctFullWidth, Images } from "../../asset";
import SvgUri from "react-native-svg-uri";

const play = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="8px" height="15px" viewBox="0 0 8 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="pause" fill="#FFFFFF" fill-rule="nonzero">
            <rect id="Rectangle-5" x="0" y="0.677419355" width="3" height="13.6451613" rx="1.5"></rect>
            <rect id="Rectangle-5" x="5" y="0.677419355" width="3" height="13.6451613" rx="1.5"></rect>
        </g>
    </g>
</svg>`;

type Props = {
	onPress: Function,
	data: Object,
};

export default class PodcastChaptorCard extends PureComponent<Props> {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		const { onPress, data } = this.props;

		return (
			<TouchableOpacity
				style={{ flexDirection: "column" }}
				activeOpacity={1.0}
				onPress={onPress}
			>
				<View style={styles.container}>
					<View style={styles.iconStyle}>
						<Image
							source={Images.playPodcast}
							style={{
								height: 28,
								width: 28,
							}}
						/>
						{/* <Icon name="play-circle" size={23} color={Colors.bgPrimaryDark} /> */}
						{/* <SvgUri
						width={ScalePerctFullWidth(6.3)}
						height={ScalePerctFullHeight(3.6)}
						svgXmlData={play}
					/> */}
					</View>

					<View style={{ flex: 1 }}>
						<View
							style={
								Metrics.isTablet
									? { width: ScalePerctFullWidth(23) }
									: { width: ScalePerctFullWidth(58) }
							}
						>
							<Text style={styles.listTitle} numberOfLines={1}>
								{data.podcast_title.replace(/&#039;/g, "'")}
							</Text>
						</View>
						<View style={styles.innerListView}>
							<Text style={styles.date}>{data.podcast_by}</Text>
							<Text style={styles.time}>{data.podcast_duration}</Text>
						</View>
					</View>
				</View>
				<View style={{ height: 2, backgroundColor: Colors.linePrimary }} />
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		paddingBottom: Metrics.DEFAULT_PADDING,
		paddingTop: ScalePerctFullHeight(2),
		//backgroundColor: "red",
	},
	iconStyle: { flex: 0.13, justifyContent: "center" },
	listTitle: {
		fontFamily: "BentonSans Bold",
		fontSize: Metrics.EXTRA_MEDIUM_TEXT_SIZE,
		letterSpacing: 0,
		color: Colors.bgPrimaryDark,
	},
	date: {
		fontFamily: "BentonSans Regular",
		fontSize: Metrics.MEDIUM_TEXT_SIZE,
		color: Colors.textHeading,
	},
	time: {
		fontFamily: "BentonSans Regular",
		fontSize: Metrics.MEDIUM_TEXT_SIZE,
		color: Colors.bgPrimaryDark,
	},
	innerListView: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: ScalePerctFullHeight(1.7),
	},
});
