import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import {
	ScalePerctFullWidth,
	ScalePerctFullHeight,
	Colors,
	Icon,
	Images,
	Metrics,
} from "../../asset";

export default function InputTextField(props: any) {
	const { label, values, onChange, placeholder, isProfile } = props;
	return (
		<View style={styles.textContainer}>
			<Text style={styles.name}>{label} :</Text>
		
			{isProfile ? (
				<TextInput style={styles.textInput} onChangeText={onChange} value={values} />
			) : (
				<TextInput
					style={styles.textInput}
					onChangeText={onChange}
					placeholder={placeholder}
					value={values}
					secureTextEntry
				/>
			)}
		</View>
	);
}

InputTextField.defaultProps = {};

const mobileStyles = StyleSheet.create({
	textContainer: {
		height: ScalePerctFullWidth(12),

		justifyContent:'space-between',
		// alignItems:'flex-start',
		// alignSelf:'flex-start',
		width: '100%',
		flex: 2,
		marginTop: ScalePerctFullWidth(5),
		// marginLeft: ScalePerctFullWidth(5),
		flexDirection: "row",
		paddingHorizontal: 20,
		// backgroundColor:'red',
	},
	textInput: {
		fontSize: 14,
		fontWeight: "bold",
		writingDirection:'rtl',
		flex:1,
		height: ScalePerctFullWidth(12),
		//width: ScalePerctFullWidth(40),
		//backgroundColor:'green',
		//alignSelf:'flex-end',
		//marginHorizontal:100
		//justifyContent: "flex-end",

	},
	name: {
		color: Colors.bgPrimaryDark,
		fontSize: 12,
		fontWeight: "bold",
		// writingDirection:'rtl',
		height: ScalePerctFullWidth(12),
		marginTop: ScalePerctFullWidth(3),
		//alignSelf:'flex-end',

		//width: ScalePerctFullWidth(50),
		flex:1,
		//backgroundColor:'yellow',

	},
	separator: {
		color: Colors.bgPrimaryDark,
		width: ScalePerctFullWidth(70),
		borderBottomWidth: 2,
		borderBottomColor: Colors.borderSeparator,
	},
});

const tabStyles = StyleSheet.create({
	textContainer: {
		height: ScalePerctFullWidth(6),
		width: ScalePerctFullWidth(75),
		marginTop: ScalePerctFullWidth(3),
		marginHorizontal: ScalePerctFullWidth(15),
		justifyContent: "flex-start",
		flexDirection: "row",
		alignItems: "center",
	},
	textInput: {
		fontSize: 16,
		fontWeight: "bold",
		height: ScalePerctFullWidth(6),
		width: ScalePerctFullWidth(50),
		marginLeft: ScalePerctFullWidth(4),
		paddingLeft: ScalePerctFullWidth(5),
	},
	name: {
		color: Colors.bgPrimaryDark,
		fontSize: 14,
		//alignSelf: "center",
		//marginTop: ScalePerctFullHeight(2),
		fontWeight: "bold",
		flex: 1,
		//height: ScalePerctFullWidth(12),
		//width: ScalePerctFullWidth(35),
		marginLeft: 35,
		textAlign: "left",
	},
	separator: {
		color: Colors.bgPrimaryDark,
		width: ScalePerctFullWidth(70),
		borderBottomWidth: 2,
		borderBottomColor: Colors.borderSeparator,
	},
});

const styles = Metrics.isTablet ? tabStyles : mobileStyles;
