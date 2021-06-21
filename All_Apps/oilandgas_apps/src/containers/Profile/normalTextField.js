import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScalePerctFullWidth, ScalePerctFullHeight, Colors, Metrics } from "../../asset";

export default function NormalTextField(props: any) {
	const { label, value } = props;
	return (
		<View style={styles.textContainer}>
			<Text style={styles.name}>{label}</Text>
			<Text style={styles.textStatic}>{value}</Text>
		</View>
	);
}

NormalTextField.defaultProps = {};

const mobileStyles = StyleSheet.create({
	textContainer: {
		height: ScalePerctFullWidth(12),
		width: ScalePerctFullWidth(90),
		marginTop: ScalePerctFullWidth(5),
		//marginLeft: ScalePerctFullWidth(5),
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "flex-start",
	},
	name: {
		color: Colors.bgPrimaryDark,
		fontSize: 12,
		//alignSelf: "center",
		marginTop: ScalePerctFullHeight(2),
		fontWeight: "bold",
		height: ScalePerctFullWidth(12),
		width: ScalePerctFullWidth(35),
		marginLeft: 35,
	},
	textStatic: {
		fontWeight: "bold",
		fontSize: 14,
		color: Colors.bgPrimaryBlack,
		height: ScalePerctFullWidth(12),
		width: ScalePerctFullWidth(50),
		marginTop: ScalePerctFullHeight(2),
		marginLeft: ScalePerctFullWidth(5),
	},
});

const tabStyles = StyleSheet.create({
	textContainer: {
		height: ScalePerctFullWidth(6),
		width: ScalePerctFullWidth(75),
		marginTop: ScalePerctFullWidth(10),
		marginHorizontal: ScalePerctFullWidth(15),
		justifyContent: "flex-start",
		flexDirection: "row",
		alignItems: "center",
	},
	textStatic: {
		fontSize: 16,
		color: Colors.bgPrimaryBlack,
		fontWeight: "bold",
		marginLeft: ScalePerctFullWidth(3),
		flex: 1,
		paddingLeft: ScalePerctFullWidth(5),
	},
	name: {
		color: Colors.bgPrimaryDark,
		fontSize: 14,
		alignSelf: "center",
		marginTop: ScalePerctFullHeight(2.5),
		fontWeight: "bold",
		height: ScalePerctFullWidth(6),
		width: ScalePerctFullWidth(18),
		marginLeft: 35,
		textAlign: "left",
	},
});
const styles = Metrics.isTablet ? tabStyles : mobileStyles;
