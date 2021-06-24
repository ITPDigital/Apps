import React, { PureComponent } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { getImageHeight } from "../../utilities";
import { Colors, Metrics, ScalePerctFullWidth, ScalePerctFullHeight, Images } from "../../asset";

export default class ArticleDisplayLogo extends PureComponent<Props> {
	renderLogo = logo => {
		const { dynamicColor, font, articleDisplay, data, onPressBrand } = this.props;
		return (
			<TouchableOpacity onPress={onPressBrand}>
				<Image
					source={{ uri: logo }}
					// source={Images.ABlogo}
					resizeMode="stretch"
					style={StyleSheet.flatten([styles.imageOne])}
				/>
			</TouchableOpacity>
		);
	};

	render() {
		const { dynamicColor, articleDisplay, data } = this.props;

		console.log("dynamicColor", dynamicColor.bgColor);

		const abLogo =
			dynamicColor.bgColor === "rgb(255, 255, 255)" ||
			dynamicColor.bgColor === "rgb(248,242,229)"
				? data.brand_logo
				: data.brand_logo_dark;
		console.log("abLogo", abLogo);

		const logo = abLogo;
		return (
			<View
				style={[
					styles.container,
					{
						//backgroundColor: "red",
						backgroundColor: dynamicColor.bgColor,
					},
					{
						color: dynamicColor.fontColor,
					},
				]}
			>
				{this.renderLogo(logo)}
			</View>
		);
	}
}
const mobileStyles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		flex: 1,
		//paddingVertical: Metrics.DEFAULT_LIST_PADDING,
		padding: Metrics.DEFAULT_LIST_PADDING,
		// marginBottom: 10,
	},
	imageOne: {
		height: 15,
		width: 150,
		//backgroundColor: "transparent",
	},
});

const tabStyles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		flex: 1,
		paddingHorizontal: Metrics.DEFAULT_LIST_PADDING,
		paddingBottom: ScalePerctFullHeight(2),
		paddingTop: Metrics.DEFAULT_LIST_PADDING,
		// marginBottom: 10,
	},
	imageOne: {
		height: 15,
		width: 150,
		// backgroundColor: Colors.bgSecondaryLight,
	},
});

const styles = Metrics.isTablet ? tabStyles : mobileStyles;
