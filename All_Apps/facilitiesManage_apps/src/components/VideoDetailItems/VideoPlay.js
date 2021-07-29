import React, { PureComponent } from "react";
import { ActivityIndicator, Platform, StyleSheet, View, WebView } from "react-native";
import YouTube from "react-native-youtube";
import { Colors, ScalePerctFullWidth } from "../../asset";

export default class VideoPlay extends PureComponent {
	state = {
		height: ScalePerctFullWidth(59),
	};

	handleStateChange = ({ state }) => {
		if (state === "started") {
			setTimeout(() => this.setState({ height: ScalePerctFullWidth(60) }), 200);
		}
	};

	render() {
		const { navigation, data, videoData, loading } = this.props;
		const urlarray = videoData.split("/");
		const urlarraylength = videoData.split("/").length;
		const id = urlarray[urlarraylength - 1].replace("watch?v=", "");
		const videoId = id;
		console.log("video details", videoId);
		if (!Platform.isPad) {
			return (
				<YouTube
					apiKey="AIzaSyBewBa6kxgVwxpEjfxlpjnqsb0k9xBhDak"
					videoId={videoId} // The YouTube video ID
					play // control playback of video with true/false
					fullscreen={false} // control whether the video should play in fullscreen or inline
					loop={false} // control whether the video should loop when ended
					showinfo
					showFullscreenButton
					controls={1}
					onReady={(e: any) => {
						console.log("onReady", e);
						this.setState({ height: ScalePerctFullWidth(57) })
					}}
					onChangeState={(e: any) => {
						console.log("onChangeState", e);
						 //this.handleStateChange(e);
					}}
					onChangeQuality={(e: any) => console.log("onChangeQuality", e)}
					onError={(e: any) => console.log("onError", e)}
					style={styles.video}
				/>
			);
		}
		return loading ? (
			<View style={styles.indicator}>
				<ActivityIndicator size="large" color="white" />
			</View>
		) : (
			<WebView
				apiKey="AIzaSyBewBa6kxgVwxpEjfxlpjnqsb0k9xBhDak"
				style={styles.container}
				allowsInlineMediaPlayback
				useWebKit={true}
				source={{
					uri: `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&modestbranding=1&autoplay={true}&showinfo=0&controls=1`,
				}}
			/>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullWidth(59),
		backgroundColor: "black",
		// alignSelf: "stretch",
	},
	video: {
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullWidth(58),
		backgroundColor: "black",
	},
	indicator: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#00000080",
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullWidth(59),
		// backgroundColor: "red",
	},
});
