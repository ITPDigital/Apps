import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet, ImageBackground } from "react-native";
import ImageLoad from "react-native-image-placeholder";
import { ScalePerctFullWidth, ScalePerctFullHeight } from "../../asset";
import { Colors, Metrics, Images } from "../../asset";

export default class BuildFeedButton extends Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		const { onPress, title, style, disabled, ...props } = this.props;
		return (
			<TouchableOpacity
				onPress={onPress}
				style={[styles.container, style]}
				activeOpacity={0.4}
				disabled={disabled}
			>
				{/* <ImageLoad
					resizeMode={"cover"}
					style={[styles.container, style]}
					placeholderStyle={[styles.container, style]}
					isShowActivity={false}
					source={
						Images.subscribeButton ? Images.subscribeButton : Images.subscribeButton
					}
					placeholderSource={Images.subscribeButton}
					borderRadius={ScalePerctFullWidth(23)}
				/>
				<Text style={styles.text}>{title ? title : "Build My Feed"}</Text> */}
				<ImageBackground
					source={require("../../asset/Images/subscribe.png")}
					resizeMode={"stretch"}
					style={[styles.container, style]}
				>
					<Text style={styles.text}>{title ? title : "Build My Feed"}</Text>
				</ImageBackground>
			</TouchableOpacity>
		);
	}
}

const tabStyles = StyleSheet.create({
	container: {
		height: ScalePerctFullHeight(6),
		width: ScalePerctFullWidth(25),
		justifyContent: "center",
		alignItems: "center",
		borderRadius: ScalePerctFullWidth(23),
	},
	text: {
		color: "#fff",
		fontSize: 12,
		fontWeight: "bold",
		alignSelf: "center",
		justifyContent: "center",
	},
	linearGradient: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 5,
	},
});

const normalStyles = StyleSheet.create({
	container: {
		//position: "absolute",
		height: ScalePerctFullHeight(8),
		width: ScalePerctFullWidth(46),
		justifyContent: "center",
		alignItems: "center",
		borderRadius: ScalePerctFullWidth(23),
	},
	text: {
		position: "absolute",
		color: Colors.bgPrimaryLight,
		fontSize: 12,
		fontWeight: "bold",
		width: "100%",
		textAlign: "center",
	},
	linearGradient: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 6,
	},
});

const styles = Metrics.isTablet ? tabStyles : normalStyles;
