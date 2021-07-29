import React, { PureComponent } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { getImageHeight } from "../../utilities";
import { Colors, Metrics, ScalePerctFullWidth, ScalePerctFullHeight, Images } from "../../asset";

export default class GalleryLogo extends PureComponent<Props> {
	renderLogo = (logo: any) => {
		const { onPressBrand } = this.props;
		return (
			<TouchableOpacity onPress={onPressBrand}>
				<Image
					source={{ uri: logo }}
					//source={Images.ABlogo}
					resizeMode="stretch"
					style={StyleSheet.flatten([styles.imageOne])}
				/>
			</TouchableOpacity>
		);
	};

	render() {
		const { data } = this.props;
		const logo = data.brand_logo;
		return <View style={styles.container}>{this.renderLogo(logo)}</View>;
	}
}

const tabStyles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		flex: 1,
		paddingVertical: ScalePerctFullHeight(2),
		paddingHorizontal: Metrics.DEFAULT_LIST_PADDING,
		//marginHorizontal: ScalePerctFullWidth(-10),
	},
	imageOne: {
		height: 15,
		width: 150,
		// backgroundColor: Colors.bgSecondaryLight,
	},
});

const mobileStyles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		flex: 1,
		padding: Metrics.DEFAULT_LIST_PADDING,
		//marginHorizontal: ScalePerctFullWidth(-10),
	},
	imageOne: {
		height: 15,
		width: 150,
		// backgroundColor: Colors.bgSecondaryLight,
	},
});

const styles = Metrics.isTablet ? tabStyles : mobileStyles;
