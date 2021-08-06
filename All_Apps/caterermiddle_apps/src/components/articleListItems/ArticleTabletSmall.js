import React, { PureComponent } from "react";
import {
	View,
	FlatList,
	Image,
	Text,
	Platform,
	TouchableNativeFeedback,
	TouchableHighlight,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import SvgUri from "react-native-svg-uri";
import ImageLoad from "react-native-image-placeholder";
import { Colors, Metrics, ScalePerctFullWidth, Images, ScalePerctFullHeight } from "../../asset";
import {
	ArticleListTitleImage,
	ArticleListLogo,
	ArticleListFooter,
	ArticleListBigImage,
	ArticleListDescription,
} from "../articleListSubItems";
import { getImageDisplayHeight, getTimeAgo } from "../../utilities";
import { GalleryDisplayOne, GalleryDisplayTwo } from "../ImageGallery";
import Icon from "../../asset/fonts/icons";
import { shareArticle } from "../common";

const unBookMark = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="14px" height="17px" viewBox="0 0 14 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12.5920397,15.6848738 L6.79601985,11.6057422 L1,15.6848738 L1,2.63165265 C1,1.73051577 1.74141899,1 2.65600567,1 L10.936034,1 C11.8506207,1 12.5920397,1.73051577 12.5920397,2.63165265 L12.5920397,15.6848738 Z" id="Bookmark" stroke="#000000" stroke-width="1.5"></path>
    </g>
</svg>`;

type Props = {
	order?: object,
};

const share = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="17px" height="21px" viewBox="0 0 17 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
     <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="UI-KIT" transform="translate(-1886.000000, -4864.000000)" stroke="#85888B" stroke-width="1.6335">
            <g id="Share" transform="translate(1886.972222, 4865.304498)">
                <g id="share">
                    <path d="M0,9.08304498 L0,16.349481 C0,17.3527664 0.824542252,18.16609 1.84166667,18.16609 L12.8916667,18.16609 C13.9087911,18.16609 14.7333333,17.3527664 14.7333333,16.349481 L14.7333333,9.08304498" id="Shape"></path>
                    <polyline id="Shape" points="11.05 3.63321799 7.36666667 0 3.68333333 3.63321799"></polyline>
                    <path d="M7.36666667,0 L7.36666667,11.8079585" id="Shape"></path>
                </g>
            </g>
        </g>
    </g>
</svg>`;

const Touchable = Platform.OS === "android" ? TouchableNativeFeedback : TouchableHighlight;

// else if (type == "titleImage") {
// 	return <ArticleListTitleImage imageUrl={""} />;
// }
// else if (type == "bigImagePadded") {
// 	return <ArticleListBigImage padded={true} />;
// }
// else if (type == "titleCenter") {
// 	return <ArticleListTitleImage isCenter={true} />;
// } else if (type == "descriptionCenter") {
// 	return <ArticleListDescription isCenter={true} />;
// } else if (type == "footerCenter") {
// 	return <ArticleListFooter isCenter={true} />;
// }
// else if (type == "followLogo") {
// 	return <ArticleListLogo isFollow={true} />;
// }

export default class ArticletabletSmall extends PureComponent<Props> {
	render() {
		const {
			order,
			data,
			user,
			settings,
			onPress,
			tabContainerStyle,
			numberOfLines,
			onFollow,
			onPressBrand,
			seperator,
			onPressBookmark,
			textStyle,
			iconStyle,
			isImage,
			bookmarkRequired,
			routeFlag,
		} = this.props;
		const imageUrl =
			data.brand_logo && data.brand_logo.length > 0 ? data.brand_logo : undefined;
		return (
			<View style={[styles.container, tabContainerStyle || null]}>
				<View style={[styles.subContainer]}>
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
						<Text onPress={onPress} style={styles.title}>
							{data.title}
						</Text>
					</View>
					<TouchableOpacity onPress={onPress}>
						{isImage && (
							<View style={[styles.rightContainerTouch]}>
								<Touchable
									style={[styles.rightContainer]}
									onPress={() => onPress()}
									underlayColor={"#00000010"} 
								>
										<ImageLoad
										resizeMode={"stretch"}
										style={styles.imageStyle}
										placeholderStyle={styles.imageStyle}
										isShowActivity={false}
										loadingStyle={{ size: "large", color: "grey" }}
										source={data.image_crop_landscape != ""?{ uri: data.image_crop_landscape }:Images.landscape}
										placeholderSource={Images.landscape}
										borderRadius={Metrics.SMOOTH_CORNER}
									/>   
								</Touchable>     
							</View>
						)}
					</TouchableOpacity>
				</View>
				<Text key={"desc"} style={styles.desc} onPress={onPress}>
					{data.lead_text}
				</Text>

				<View style={[styles.footerContainer]}>
					<Text style={styles.hours}>{getTimeAgo(data.pubDate)}</Text>
					<TouchableOpacity
						style={styles.icon}
						onPress={() => {
							if (data) {
								shareArticle(
									data.title,
									data.image,
									data.nid,
									data.content_type,
									data.link,
									"104",
									data,
									routeFlag,
								);
							}
						}}
					>
						{/* <Icon
							style={styles.icon}
							name={Images.share}
							size={16}
							color={Colors.bodySecondaryLight}
						/> */}
						<SvgUri width={16} height={16} svgXmlData={share} />
					</TouchableOpacity>
					{!bookmarkRequired ? (
						<TouchableOpacity
							onPress={() => onPressBookmark(data.nid, data.site, data.bookmark)}
							style={styles.iconBookmark}
						>
							{data.bookmark ? (
								<Icon
									name={Images.selectedBookmark}
									size={16}
									color={Colors.bodyPrimaryDark}
								/>
							) : (
								<SvgUri width={16} height={16} svgXmlData={unBookMark} />
							)}
						</TouchableOpacity>
					) : null}
				</View>
			</View>
		);
	}
}
// <Touchable onPress={() => onPress()} underlayColor={"#00000030"}></Touchable> */

ArticletabletSmall.defaultProps = {};

const imageWidth = ScalePerctFullWidth(15);
const imageHeight = imageWidth * 0.76;

const styles = StyleSheet.create({
	container: {
		// borderBottomColor: Colors.bgPrimaryLight,
		// borderBottomWidth: 1,
		flex: 1,
		borderBottomWidth: 2,
		borderColor: Colors.borderLine,
	},
	subContainer: {
		flexDirection: "row",
	},
	leftContainer: {
		flex: 1,
		//paddingTop: ScalePerctFullHeight(3),
	},
	rightContainerTouch: {
		marginLeft: 12,
		marginTop: 22,
		width: imageWidth,
		height: imageHeight,
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
	iconBookmark: {
		padding: 15,
		paddingRight: 0,
	},
	imageStyle: {
		width: imageWidth,
		height: imageHeight,
	},
	imageContainer: {
		marginTop: 24,
		paddingBottom: 12,
		//marginHorizontal: ScalePerctFullWidth(-7),
	},
	imageOne: {
		height: 15,
		width: 150,
	},
	title: {
		color: Colors.textHeading,
		fontSize: 20,
		fontFamily: "BentonSans Bold",
		flex: 1,
		lineHeight: 26,
		marginTop: 19.5,
	},
	desc: {
		color: Colors.bodyTertiaryLight,
		fontSize: 14,
		flex: 1,
		fontFamily: "BentonSans Regular",
		marginTop: 18,
		lineHeight: 22,
	},
});
