import React, { PureComponent } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Linking } from "react-native";
import SvgUri from "react-native-svg-uri";
import HTML from "react-native-render-html";
import { Colors, Metrics, ScalePerctFullWidth, Images, ScalePerctFullHeight } from "../../asset";
import Icon from "../../asset/fonts/icons";
import { shareArticle } from "../common";

const unBookMark = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="14px" height="17px" viewBox="0 0 14 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12.5920397,15.6848738 L6.79601985,11.6057422 L1,15.6848738 L1,2.63165265 C1,1.73051577 1.74141899,1 2.65600567,1 L10.936034,1 C11.8506207,1 12.5920397,1.73051577 12.5920397,2.63165265 L12.5920397,15.6848738 Z" id="Bookmark" stroke="#FFFFFF" stroke-width="1.5"></path>
    </g>
</svg>`;

const comments = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="Comments-icon" transform="translate(9.000000, 9.000000) scale(-1, 1) translate(-9.000000, -9.000000) translate(1.000000, 1.000000)" stroke="#FFFFFF" stroke-width="1.5">
            <path d="M16,7.55555556 C16.0030589,8.72877139 15.7289501,9.88611963 15.2,10.9333333 C13.9208526,13.4927358 11.3056956,15.1100039 8.44444444,15.1111111 C7.27122861,15.11417 6.11388037,14.8400612 5.06666667,14.3111111 L0,16 L1.68888889,10.9333333 C1.15993879,9.88611963 0.885829998,8.72877139 0.888888889,7.55555556 C0.889996052,4.69430444 2.50726419,2.07914744 5.06666667,0.8 C6.11388037,0.271049902 7.27122861,-0.00305889085 8.44444444,3.55272046e-15 L8.88888889,3.55272046e-15 C12.7251639,0.21164417 15.7883558,3.27483607 16,7.11111111 L16,7.55555556 L16,7.55555556 Z" id="Shape"></path>
        </g>
    </g>
</svg>`;

const share = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="14px" height="17px" viewBox="0 0 14 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
       <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="UI-KIT" transform="translate(-1040.000000, -5249.000000)" stroke="#FFFFFF" stroke-width="1.35">
            <g id="Share" transform="translate(1041.000000, 5250.000000)">
                <g id="share">
                    <path d="M0,7.5 L0,13.5 C0,14.3284271 0.681596351,15 1.52238806,15 L10.6567164,15 C11.4975081,15 12.1791045,14.3284271 12.1791045,13.5 L12.1791045,7.5" id="Shape"></path>
                    <polyline id="Shape" points="9.13432836 3 6.08955224 0 3.04477612 3"></polyline>
                    <path d="M6.08955224,0 L6.08955224,9.75" id="Shape"></path>
                </g>
            </g>
        </g>
    </g>
</svg>`;

export default class VideoComments extends PureComponent {
	renderComments = () => {
		const { commentsData, onBookMarkToggle, isBookmark } = this.props;
		// const image = !data.field_picture_ref
		// 	? AlertComp(Strings.authentication.ALERT, "No data found", () =>
		// 		this.props.navigation.goBack(),
		// 	)
		// 	: data &&
		// 	data.field_picture_ref &&
		// 	data.field_picture_ref.und[0] &&
		// 	data.field_picture_ref.und[0].image_path;
		const image =
			commentsData && Array.isArray(commentsData.field_picture_ref)
				? null
				: commentsData &&
				  commentsData.field_picture_ref &&
				  commentsData.field_picture_ref.und[0] &&
				  commentsData.field_picture_ref.und[0].image_path;

		const title =
			commentsData && commentsData.title ? commentsData && commentsData.title : null;
		const nid = commentsData && commentsData.nid ? commentsData.nid : null;
		console.log("commentsData", commentsData);
		return (
			<View style={styles.subcontainer}>
				{/* <View style={styles.subContainerOne}>
					<SvgUri width={16} height={18} svgXmlData={comments} />
					<View style={styles.commentTextView}>
						<Text style={styles.comment}>{comment}</Text>
					</View>
				</View> */}
				<View style={styles.subContainerTwo}>
					<TouchableOpacity
						style={styles.icons}
						onPress={() => {
							if (commentsData) {
								shareArticle(
									title,
									image,
									nid,
									"video",
									commentsData.path_alias,
									104,
									commentsData,
								);
							}
						}}
					>
						{/* <Icon
							style={styles.icon}
							name={Images.share}
							size={16}
							color={Colors.bgPrimaryLight}
						/> */}
						<SvgUri width={16} height={16} svgXmlData={share} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => onBookMarkToggle()} style={styles.icons}>
						{isBookmark ? (
							<Icon
								name={Images.selectedBookmark}
								size={16}
								color={Colors.bgPrimaryLight}
							/>
						) : (
							<SvgUri width={16} height={16} svgXmlData={unBookMark} />
						)}
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	renderText = () => {
		const { commentsData } = this.props;
		let leadText = commentsData && commentsData.lead_text;
		leadText = "<body style='color:white'>" + leadText + "</body>";
		return (
			<View style={styles.textView}>
				<HTML
					html={leadText}
					tagsStyles={{ a: { color: "#EC0018" } }}
					onLinkPress={(evt, href) => {
						Linking.openURL(href);
						console.log("evt", evt, "href", href);
					}}
				/>
			</View>
		);
	};

	renderTitle = () => {
		const { commentsData } = this.props;
		const title = commentsData && commentsData.title;
		return (
			<View>
				<Text
					style={{
						fontSize: Metrics.EXTRA_MEDIUM,
						lineHeight: Metrics.LARGE_LINE_HEIGHT,
						fontFamily: "BentonSans Regular",
						color: Colors.bgPrimaryLight,
						paddingHorizontal: ScalePerctFullWidth(4),
						paddingTop: ScalePerctFullWidth(4),
					}}
				>
					{title}
				</Text>
			</View>
		);
	};

	render() {
		return (
			<View style={styles.container}>
				{this.renderTitle()}
				{this.renderComments()}
				{this.renderText()}
			</View>
		);
	}
}

VideoComments.defaultProps = {
	comment: "12 comments",
	text: "Henry Golding, Leading Man and Lover of Expensive Timepieces",
	isCenter: false,
	isBookMarked: false,
	isBookMarkNeeded: true,
	onShare: () => {},
	onBookMarkToggle: () => {},
};

const styles = StyleSheet.create({
	container: {
		width: ScalePerctFullWidth(100),
		backgroundColor: Colors.bgPrimaryDark,
		flexDirection: "column",
	},
	icons: {
		paddingHorizontal: Metrics.DEFAULT_PADDING,
	},
	subcontainer: {
		flexDirection: "row",
		paddingHorizontal: ScalePerctFullWidth(5.3),
		paddingTop: ScalePerctFullHeight(4),
		width: ScalePerctFullWidth(100),
		backgroundColor: Colors.bgPrimaryDark,
		// flex: 1,
	},
	subContainerOne: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "flex-start",
	},
	subContainerTwo: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "flex-end",
	},
	comment: {
		fontSize: Metrics.SMALL_TEXT_SIZE,
		fontFamily: "BentonSans Bold",
		lineHeight: Metrics.VERY_SMALL_LINE_HEIGHT,
		color: Colors.commentText,
	},
	commentTextView: {
		paddingLeft: Metrics.DEFAULT_LIST_PADDING,
		alignSelf: "center",
		justifyContent: "center",
	},
	icon: { paddingRight: Metrics.DEFAULT_LIST_PADDING },
	text: {
		fontSize: Metrics.SMALL_TEXT_SIZE,
		lineHeight: Metrics.SMALL_LINE_HEIGHT,
		color: "red",
		fontFamily: "BentonSans Bold",
	},
	textView: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		padding: ScalePerctFullWidth(4),
	},
	// });
});
