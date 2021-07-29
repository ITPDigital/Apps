import React, { PureComponent } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Metrics, ScalePerctFullHeight } from "../../asset";

export default class GalleryLeadText extends PureComponent {
	renderLeadText = (leadText: string) => {
		return <Text style={styles.leadText}>{leadText}</Text>;
	};

	render() {
		const { data } = this.props;
		const leadText = data.lead_text ? data.lead_text : null;

		return <View style={styles.container}>{this.renderLeadText(leadText)}</View>;
	}
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		alignItems: "flex-start",
		flex: 1,
		marginBottom: 0,
		paddingHorizontal: Metrics.DEFAULT_PADDING,
		paddingTop: ScalePerctFullHeight(1.2),
		paddingBottom: ScalePerctFullHeight(2),
	},
	leadText: {
		fontSize: Metrics.SMALL_TEXT_SIZE,
		// padding: Metrics.DEFAULT_PADDING,
		lineHeight: 32,
		fontFamily: "BentonSans Bold",
		color: Colors.bodyTertiaryLight,
	},
});
