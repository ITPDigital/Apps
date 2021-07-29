import React, { PureComponent } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Metrics, ScalePerctFullHeight, ScalePerctFullWidth } from "../../asset";
import VideoComments from "./VideoComments";

type props = {
	data: string,
};

export default class RelatedVideos extends PureComponent {
	keyExtractor = (item, index) => item.id;

	renderVideoItem = ({ item }) => {
		const { data, videoHandler } = this.props;

		// const { imageURL, title, videoLength } = this.props;
		const itemId = item.nid;

		const site = item.site;

		const video = item.video;

		return (
			<TouchableOpacity
				style={styles.container}
				onPress={() => videoHandler(itemId, site, video)}
			>
				{/* onPress={() => handler()} */}
				<Image
					style={styles.image}
					source={{
						uri: item.image,
					}}
				/>
				<View style={styles.subContainer}>
					<Text numberOfLines={3} style={styles.videoName}>
						{item.title}
					</Text>

					<Text style={styles.videoLength}>{item.videoLength}</Text>
				</View>
				{/* <Icon
					style={styles.menuIcon}
					name={Images.share}
					size={16}
					color={Colors.bgPrimaryLight}
				/> */}
			</TouchableOpacity>
		);
	};

	renderHeader = () => {
		const { data, onBookMarkToggle, isBookmark } = this.props;
		return (
			<View style={{ flex: 1, backgroundColor: Colors.bgPrimaryDark, width: "100%" }}>
				<VideoComments
					commentsData={data}
					onBookMarkToggle={onBookMarkToggle}
					isBookmark={isBookmark}
				/>
				<View style={styles.textView}>
					<Text style={styles.text}>Related videos</Text>
				</View>
			</View>
		);
	};

	render() {
		const { data } = this.props;

		const VideoDetails = data && data.video_relation && data.video_relation.und;

		return (
			<FlatList
				data={VideoDetails}
				keyExtractor={this.keyExtractor}
				renderItem={this.renderVideoItem}
				ListHeaderComponent={this.renderHeader()}
				style={{ flex: 1 }}
			/>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullWidth(25),
		flexDirection: "row",
		// backgroundColor: "red",
		marginBottom: ScalePerctFullHeight(3.2),
		flex: 1,
		paddingLeft: ScalePerctFullWidth(4.8),
		paddingRight: ScalePerctFullWidth(4),
	},
	subContainer: {
		marginLeft: 22.5,
		width: ScalePerctFullWidth(43.3),
		height: ScalePerctFullWidth(33),
	},
	image: {
		height: ScalePerctFullWidth(20),
		width: ScalePerctFullWidth(34.1),
		resizeMode: "cover",
		backgroundColor: Colors.bgSecondaryLight,
	},

	videoName: {
		// paddingBottom: 12,
		color: Colors.bgPrimaryLight,
		fontSize: Metrics.SMALL_TEXT_SIZE,
		fontFamily: "BentonSans Bold",
		lineHeight: Metrics.SMALL_LINE_HEIGHT,
	},
	videoLength: {
		color: Colors.bgPrimaryLight,
		fontSize: Metrics.VV_SMALL_TEXT_SIZE,
		paddingTop: ScalePerctFullHeight(0.8),
	},
	menuIcon: {
		paddingTop: ScalePerctFullHeight(1),
		paddingLeft: ScalePerctFullWidth(3),
	},
	textView: {
		paddingLeft: ScalePerctFullWidth(5),
		backgroundColor: Colors.bgDrawer,
		paddingBottom: ScalePerctFullHeight(4.8),
	},
	text: {
		fontSize: Metrics.VERY_SMALL_LINE_HEIGHT,
		paddingBottom: Metrics.DEFAULT_PADDING,
		paddingTop: 20,
		fontFamily: "BentonSans Bold",
		color: Colors.bgPrimaryLight,
	},
});
