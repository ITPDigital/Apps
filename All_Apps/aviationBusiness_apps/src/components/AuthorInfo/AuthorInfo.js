import React from "react";
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, Image } from "react-native";
import { Colors, ScalePerctFullWidth, ScalePerctFullHeight, Metrics } from "../../asset";

type Props = {
	authorName: string,
	followers: number,
	storyCount: number,
};

export default function AuthorInfo(props: Props) {
	const { authorName, followers, storyCount } = props;

	return (
		<View style={{ flex: 1 }}>
			<Text style={styles.authorName}>{authorName}</Text>
			<View style={styles.storyContainer}>
				<View style={styles.textContainer}>
					<Text style={styles.story}>{storyCount} </Text>
					<Text style={styles.statisField}> Stories</Text>
				</View>
				<View style={styles.textContainer}>
					<Text style={styles.followers}>{followers} </Text>
					<Text style={styles.statisField}> Followers</Text>
				</View>
			</View>
		</View>
	);
}

AuthorInfo.defaultProps = {
	authorName: "Odovacar Golzar",
	followers: 120,
	storyCount: 40,
};

const tabStyles = StyleSheet.create({
	textContainer: {
		flexDirection: "row",
	},
	authorName: {
		fontSize: 20,
		//flex: 0.4,
		width: ScalePerctFullWidth(50),
		//marginLeft: ScalePerctFullWidth(7),
		//marginTop: ScalePerctFullHeight(4),
		//marginBottom: ScalePerctFullWidth(1),
		fontWeight: "bold",
		color: Colors.bgPrimaryBlack,
		textAlign: "center",
	},
	storyContainer: {
		flexDirection: "row",
		paddingTop: ScalePerctFullHeight(1),
		alignSelf: "center",
		width: ScalePerctFullWidth(40),
	},
	story: {
		marginLeft: ScalePerctFullWidth(7.5),
		textAlign: "center",
		//marginTop: ScalePerctFullHeight(2),
		fontWeight: "bold",
		color: Colors.bgPrimaryBlack,
	},
	followers: {
		fontWeight: "bold",
		textAlign: "right",
		marginLeft: ScalePerctFullWidth(3),
		//marginTop: ScalePerctFullHeight(2),
		color: Colors.bgPrimaryBlack,
	},
	statisField: {
		//marginTop: ScalePerctFullHeight(2),
		color: Colors.bgPrimaryBlack,
	},
});

const mobileStyles = StyleSheet.create({
	textContainer: {
		flexDirection: "row",
	},
	authorName: {
		fontSize: 20,
		width: ScalePerctFullWidth(54),
		marginLeft: ScalePerctFullWidth(7),
		marginTop: ScalePerctFullHeight(4),
		fontWeight: "bold",
		color: Colors.bgPrimaryBlack,
	},
	storyContainer: {
		flexDirection: "row",
	},
	story: {
		marginLeft: ScalePerctFullWidth(7),
		marginTop: ScalePerctFullHeight(2),
		fontWeight: "bold",
		color: Colors.bgPrimaryBlack,
	},
	followers: {
		fontWeight: "bold",
		marginLeft: ScalePerctFullWidth(3),
		marginTop: ScalePerctFullHeight(2),
		color: Colors.bgPrimaryBlack,
	},
	statisField: {
		marginTop: ScalePerctFullHeight(2),
		color: Colors.bgPrimaryBlack,
	},
});

const styles = Metrics.isTablet ? tabStyles : mobileStyles;
