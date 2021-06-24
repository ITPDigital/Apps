import React from "react";
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, Image, I18nManager } from "react-native";
import SvgUri from "react-native-svg-uri";
import Icon from "../../asset/fonts/icons";
// import Icon from "react-native-vector-icons/FontAwesome";
import { Colors, ScalePerctFullWidth, ScalePerctFullHeight, Metrics, Images } from "../../asset";

type Props = {
	onBack?: Function,
	onShare?: Function,
	title?: string, 
	style?: number | Object | Array<number>, 
};

export default function VideoDetailHeader(props: Props) {
	const { style, onShare, onBack, title, navigation } = props;
	return (
		<View style={StyleSheet.flatten([styles.container, style])}>
			<TouchableOpacity onPress={onBack} style={styles.buttonContainer}>
			{ I18nManager.isRTL ? <Image source = {require('../../asset/Images/arrowRight.png')} style={{height:16, width: 16}} color='#000'/> :
			<Icon name={Images.back} size={14} color={Colors.bgPrimaryDark} />
			}
			</TouchableOpacity>
		</View>
	);
}

VideoDetailHeader.defaultProps = {
	style: undefined,
	onBack: undefined,
	onShare: undefined,
	title: "",
};

const styles = StyleSheet.create({
	container: {
		width: ScalePerctFullWidth(100),
		height: 45,
		alignItems: "stretch",
		// flexDirection: "column",
		justifyContent: "center",
		// backgroundColor: "black",  
		top: 0,
		// Colors.bgTransparent
	},
	buttonContainer: {
		justifyContent: "flex-start",
		alignItems: "flex-start",
		marginTop: 10,
		// alignContent: "center",
		paddingHorizontal: Metrics.DEFAULT_PADDING,
		paddingVertical: 8,
	},
});
