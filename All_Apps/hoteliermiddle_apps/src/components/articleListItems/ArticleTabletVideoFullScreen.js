import React, { PureComponent } from "react";
import {
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableNativeFeedback,
	TouchableOpacity,
	View,
} from "react-native";
import ImageLoad from "react-native-image-placeholder";
import PlayIcon from "react-native-vector-icons/FontAwesome";
import { Colors, Images, Metrics, ScalePerctFullHeight, ScalePerctFullWidth } from "../../asset";

const unBookMark = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="14px" height="17px" viewBox="0 0 14 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12.5920397,15.6848738 L6.79601985,11.6057422 L1,15.6848738 L1,2.63165265 C1,1.73051577 1.74141899,1 2.65600567,1 L10.936034,1 C11.8506207,1 12.5920397,1.73051577 12.5920397,2.63165265 L12.5920397,15.6848738 Z" id="Bookmark" stroke="#000000" stroke-width="1.5"></path>
    </g>
</svg>`;

type Props = {
	order?: object,
};

const Touchable = Platform.OS === "android" ? TouchableNativeFeedback : TouchableHighlight;

export default class ArticleTabletVideoFullScreen extends PureComponent<Props> {
	renderTitleheader = (data, onPress) => {
		return (
			<View style={styles.titleHeader}>
				<TouchableOpacity onPress={onPress} style={styles.innerTitleContainer}>
					<View>
						<PlayIcon
							style={styles.playicon}
							name="play-circle"
							size={52}
							color="white"
						/>
					</View>
					<Text style={styles.title}>{data.title}</Text>
				</TouchableOpacity>
			</View>
		);
	};

	render() {
		const {
			order,
			data,
			user,
			settings,
			onPress,
			tabContainerStyle,
			numberOfLines,
			imageStyle,
			articleContainerStyle,
			imagePlaceHolderStyle,
			articleDescriptionstyle,
			onFollow,
			onPressBrand,
			seperator,
			onPressBookmark,
			textStyle,
			iconStyle,
			isImage,
		} = this.props;
		const imageUrl =
			data.brand_logo && data.brand_logo.length > 0 ? data.brand_logo : undefined;

		return (
			<View style={[styles.container]}>
				<View>
					<View style={[styles.leftContainer]}>
						{/* <TouchableOpacity
							onPress={() => onPressBrand(data.site, imageUrl)}
							style={styles.imageContainer}
						>
							<Image
								source={{ uri: imageUrl }}
								//source={Images.ABlogo}
								resizeMode="stretch"
								style={StyleSheet.flatten([styles.imageOne])}
							/>
						</TouchableOpacity> */}
						<TouchableOpacity onPress={onPress}>
							{isImage && (
								<View style={[styles.rightContainerTouch]}>
									<Touchable
										style={[styles.rightContainer]}
										onPress={onPress}
										underlayColor={"#00000010"}
									>
										<ImageLoad
											resizeMode={"cover"}
											style={styles.imageStyle}
											placeholderStyle={styles.imageStyle}
											isShowActivity={false}
											loadingStyle={{
												size: "large",
												color: "grey",
											}}
											source={data.image_crop_landscape != ""?{
												uri: data.image_crop_landscape,
											}:Images.landscape}
											placeholderSource={Images.landscape}
										/>
									</Touchable>
									{this.renderTitleheader(data, onPress)}
								</View>
							)}
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}
// <Touchable onPress={() => onPress()} underlayColor={"#00000030"}></Touchable> */

ArticleTabletVideoFullScreen.defaultProps = {};

const imageWidth = ScalePerctFullWidth(90);
const imageHeight = imageWidth * 0.55;

const styles = StyleSheet.create({
	innerTitleContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	titleHeader: {
		flex: 1,
		flexDirection: "row",
		position: "absolute",
		top: ScalePerctFullHeight(32),
	},
	container: {
		flex: 1,
		borderBottomWidth: 2,
		borderColor: Colors.borderLine,
		paddingRight: ScalePerctFullWidth(5),
		paddingLeft: ScalePerctFullWidth(5),
	},
	subContainer: {
		//flexDirection: "row",
		//backgroundColor: "red",
	},
	leftContainer: {
		flex: 1,
		//backgroundColor: "pink",
	},
	rightContainerTouch: {
		marginTop: ScalePerctFullHeight(2),
		width: imageWidth,
		height: imageHeight,
		marginBottom: ScalePerctFullHeight(1.5),
	},
	rightContainer: {
		width: imageWidth,
		height: imageHeight,
	},
	subListContainer: {
		flexDirection: "row",
		paddingTop: 14,
		paddingBottom: 3,
		alignItems: "center",
	},
	dot: {
		width: 6,
		height: 6,
		borderRadius: 3,
		backgroundColor: Colors.bgPink,
	},
	subListText: {
		color: Colors.textHeading,
		fontSize: 14,
		fontFamily: "BentonSans Bold",
		flex: 1,
		lineHeight: 15,
		marginLeft: 14,
	},
	footerContainer: {
		alignSelf: "stretch",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 12,
		paddingBottom: 10,
		// borderBottomColor: Colors.bgPrimaryLight,
		// borderBottomWidth: 1,
	},
	hours: {
		fontSize: 12,
		letterSpacing: 0.3,
		textAlign: "left",
		flexWrap: "wrap",
		alignItems: "flex-start",
		lineHeight: Metrics.LARGE_LINE_HEIGHT,
		flex: 1,
		color: "#8895a9",
	},
	icon: { padding: 15 },
	playicon: {
		//backgroundColor: "black",
		//borderColor: "white",
		paddingHorizontal: 15,
	},
	iconBookmark: {
		padding: 15,
		paddingRight: 0,
	},
	imageStyle: {
		width: imageWidth,
		height: imageHeight,
	},
	imageContainer: {
		marginTop: ScalePerctFullHeight(2),
		//marginHorizontal: ScalePerctFullWidth(-7),
		//paddingBottom: ScalePerctFullHeight(2),
	},
	imageOne: {
		height: 15,
		width: 150,
	},
	title: {
		color: Colors.bgPrimaryLight,
		fontSize: 20,
		fontFamily: "BentonSans Bold",
		lineHeight: 20,
		paddingRight: 10,
		width: ScalePerctFullWidth(78),
		alignSelf: "center",
		backgroundColor: "rgba(0,0,0,0.2)",
	},
	desc: {
		color: Colors.bodyTertiaryLight,
		fontSize: 14,
		flex: 1,
		fontFamily: "BentonSans Regular",
		marginTop: 18,
		lineHeight: 22,
	},
	timeContainer: {
		height: 30,
		borderRadius: 15,
		width: 30,
		//paddingLeft: 2,
		//position: "absolute",
		//bottom: 20,
		//right: 20,
		backgroundColor: Colors.bodySecondaryDark,
		//flexDirection: "row",
		//justifyContent: "center",
		//alignItems: "center",
	},
});
