import React from "react";
import { View, StyleSheet } from "react-native";
import { ScalePerctFullHeight, Metrics, Colors, Strings } from "../../asset";

const FloatingLabel = require("../../lib/FloatingLabel");

type Props = {
	label: string,
};

export default function TextInputField(props: Props) {
	const { label, commentsStyle } = props;
	return (
		<View style={styles.formContainer}>
			<FloatingLabel
				{...props}
				labelStyle={styles.labelInput}
				inputStyle={styles.input}
				style={commentsStyle ? commentsStyle : styles.formInput}
			>
				{label}
			</FloatingLabel>
		</View>
	);
}

const mobileStyles = StyleSheet.create({
	labelInput: {
		color: "#0f4660",
		fontFamily: "BentonSans Regular",
		marginBottom: ScalePerctFullHeight(1),
		letterSpacing: 0,
	},
	formContainer: {
		alignSelf: "stretch",
	},
	formInput: {
		borderBottomWidth: (StyleSheet.hairlineWidth = 0.5),
		alignSelf: "stretch",
		borderColor: Colors.linePrimaryOpacity,
		marginBottom: ScalePerctFullHeight(2),
	},
	input: {
		borderWidth: 0,
		color: Colors.bgPrimaryLight,
		fontSize: Metrics.MEDIUM_TEXT_SIZE,
		letterSpacing: 0,
	},
});

const tabStyles = StyleSheet.create({
	labelInput: {
		color: Colors.bgPrimaryLight,
		fontFamily: "BentonSans Regular",
		marginBottom: ScalePerctFullHeight(0.73),
		letterSpacing: 0,
	},
	formContainer: {
		alignSelf: "stretch",
	},
	formInput: {
		borderBottomWidth: (StyleSheet.hairlineWidth = 0.5),
		alignSelf: "stretch",
		borderColor: Colors.linePrimaryOpacity,
		marginBottom: ScalePerctFullHeight(2.1),
	},
	input: {
		borderWidth: 0,
		color: Colors.bgPrimaryLight,
		fontSize: Metrics.MEDIUM_TEXT_SIZE,
		letterSpacing: 0,
	},
});

const styles = Metrics.isTablet ? tabStyles : mobileStyles;
