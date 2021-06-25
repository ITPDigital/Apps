import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Metrics, ScalePerctFullWidth } from "../../asset";

type Props = {
	description?: string,
	isCenter?: boolean,
};

export default function ArticleListDescription(props: Props) {
	const { description, isCenter, articleDescriptionstyle } = props;
	if (description && description.length > 0) {
		return (
			<View style={[styles.container, articleDescriptionstyle || null]}>
				<Text
					numberOfLines={3}
					style={[styles.descriptionText, isCenter ? { textAlign: "center" } : {}]}
				>
					{description}
				</Text>
			</View>
		);
	}
	return null;
}

ArticleListDescription.defaultProps = {
	description: "",
	isCenter: false,
};

const styles = StyleSheet.create({
	container: {
		width: ScalePerctFullWidth(100),
		flexDirection: "row",
		padding: 20,
		paddingTop: 15,
		paddingBottom: 0,
	},
	descriptionText: {
		color: Colors.textHeading,
		fontSize: Metrics.MEDIUM_TEXT_SIZE,
		flex: 1,
		fontFamily: "BentonSans Regular",
		lineHeight: 23,
	},
});
