import React, { PureComponent } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
	Colors,
	Metrics,
	Constants,
	ScalePerctFullHeight,
	ScalePerctFullWidth,
} from "../../asset";
import { Line } from "../common";

export default class GalleryTitle extends PureComponent {
	renderTitle = (title: string) => {
		return <Text style={styles.titleText}>{title}</Text>;
	};

	// renderDate = (author: string) => {
	// 	// const { dynamicColor, font } = this.props;
	// 	return <Text style={[styles.authorText]}>{author}</Text>;
	// };

	renderDate = (author: string, date) => {
		return (
			<View style={styles.outerContainer}>
				<Text style={[styles.authorText]}>{author}</Text>
				{Metrics.isTablet ? (
					<View style={styles.innerContainer}>
						<Text style={styles.dot}>{Constants.articleDisplay.blackCircle}</Text>
						<Text>{date}</Text>
					</View>
				) : null}
			</View>
		);
	};

	render() {
		const { data } = this.props;
		const title = data.title ? data.title : null;
		const date = data.published_date ? data.published_date : data.created_date;
		const author = !data.author
			? null
			: data.author.und[0].name
			? data.author.und[0].name
			: data.byline;
		return (
			<View style={styles.container}>
				{this.renderTitle(title)}
				{/* {this.renderAuthor(author)} */}
				{this.renderDate(author, date)}
				<Line style={styles.lineSeperator} />
			</View>
		);
	}
}
const tabStyles = StyleSheet.create({
	outerContainer: { flexDirection: "row" },
	innerContainer: {
		flexDirection: "row",
		//flex: 1,
		//backgroundColor: "orange",
		alignSelf: "center",
	},
	container: {
		width: "100%",
		//height: "100%",
		alignItems: "flex-start",
		//	flex: 1,
		marginBottom: 0,
		paddingHorizontal: Metrics.DEFAULT_PADDING,
		//backgroundColor: "purple",
	},
	authorText: {
		fontSize: Metrics.SMALL_TEXT_SIZE,
		letterSpacing: 0.3,
		// paddingTop: Metrics.DEFAULT_PADDING,
		paddingVertical: ScalePerctFullHeight(2),
		paddingRight: 4,
		textAlign: "left",
		alignSelf: "stretch",
		flexWrap: "wrap",
		alignItems: "flex-start",
		flexDirection: "row",
		justifyContent: "space-between",
		lineHeight: Metrics.LARGE_LINE_HEIGHT,
		fontFamily: "BentonSans Regular",
		//backgroundColor: "blue",
		// flex: 1,
	},
	titleText: {
		fontSize: Metrics.EXTRA_LARGE_TEXT_SIZE,
		padding: Metrics.DEFAULT_PADDING,
		lineHeight: Metrics.EXTRA_LARGE_LINE_HEIGHT,
		fontFamily: "BentonSans Bold",
		color: '#e4013a', 
		//backgroundColor: "yellow",
		// paddingLeft: 5,
		// flex: 1,
	},
	dot: {
		paddingHorizontal: 6,
	},
	lineSeperator: {
		width: ScalePerctFullWidth(90),
		height: ScalePerctFullHeight(2),
		paddingBottom: 2,
		//paddingBottom: Metrics.DEFAULT_PADDING,
		//paddingTop: 0,
		borderBottomWidth: 2,
		borderColor: Colors.linePrimaryFull,
		paddingHorizontal: Metrics.DEFAULT_PADDING,
	},
});

const mobileStyles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		alignItems: "flex-start",
		flex: 1,
		marginBottom: 0,
		paddingHorizontal: Metrics.DEFAULT_PADDING,
	},
	authorText: {
		fontSize: Metrics.SMALL_TEXT_SIZE,
		letterSpacing: 0.3,
		// paddingTop: Metrics.DEFAULT_PADDING,
		paddingVertical: Metrics.DEFAULT_PADDING,
		textAlign: "left",
		alignSelf: "stretch",
		flexWrap: "wrap",
		alignItems: "flex-start",
		flexDirection: "row",
		justifyContent: "space-between",
		lineHeight: Metrics.LARGE_LINE_HEIGHT,
		fontFamily: "BentonSans Regular",
		// flex: 1,
	},
	titleText: {
		fontSize: Metrics.EXTRA_LARGE_TEXT_SIZE,
		// padding: Metrics.DEFAULT_PADDING,
		lineHeight: Metrics.EXTRA_LARGE_LINE_HEIGHT,
		fontFamily: "BentonSans Bold",
		color: Colors.bgPrimaryDark,
		// paddingLeft: 5,
		// flex: 1,
	},
});

const styles = Metrics.isTablet ? tabStyles : mobileStyles;
