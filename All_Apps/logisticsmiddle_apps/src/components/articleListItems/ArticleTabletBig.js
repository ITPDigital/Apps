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
import { withNavigation } from "react-navigation";
import { Colors, Metrics, ScalePerctFullWidth, Images } from "../../asset";
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

class ArticleTabletBig extends PureComponent<Props> {
	onItemPress = (nid: number, site: string, item: any) => {
		console.log("itemPress", nid, site, item);
		const nextScreen = item.video ? "VideoDetail" : "ArticleDisplayHomeScreen";
		const { screenProps } = this.props;

		if (item.content_type === "video") {
			this.props.navigation.navigate(nextScreen, {
				video: item.video,
				nid: item.nid,
				site: item.site,
			});
		} else if (item.content_type === "gallery") {
			console.log("articleDetailgale");
			this.props.navigation.navigate("GalleryHomeScreen", {
				nid,
				site,
			});
		} else {
			console.log("articleDetail");
			screenProps.navigation.navigate("ArticleDisplayHomeScreen", { nid, site });
		}
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
			isLogo,
			onPressSubArticle,
		} = this.props;
		const imageUrl =
			data.brand_logo && data.brand_logo.length > 0 ? data.brand_logo : undefined;
		return (
			<View style={[styles.container]}>
				{/* {isLogo && (
					<TouchableOpacity
						onPress={() => onPressBrand(data.site, imageUrl)}
						style={styles.imageContainer}
					>
						<Image
							//source={Images.ABlogo}
							source={{ uri: imageUrl }}
							resizeMode="stretch"
							style={StyleSheet.flatten([styles.imageOne])}
						/>
					</TouchableOpacity>
				)} */}
				<TouchableOpacity onPress={onPress}>
					<View style={[styles.subContainer, isLogo ? {} : { paddingTop: 32 }]}>
						<Touchable
							style={[styles.leftContainer]}
							onPress={() => onPress()}
							underlayColor={"#00000010"}
						>
							<View style={[styles.leftContainer]}>
								<Text style={styles.title}>{data.title}</Text>
								{!!data.lead_text && (
									<Text key={"desc"} style={styles.desc}>
										{data.lead_text}
									</Text>
								)}
							</View>
						</Touchable>

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
									loadingStyle={{
										size: "large",
										color: "grey",
									}}
									source={{
										uri: data.image_crop_landscape,
									}}
									placeholderSource={Images.landscape}
									borderRadius={Metrics.SMOOTH_CORNER}
								/>
							</Touchable>
						</View>
					</View>
					{/* {Array.isArray(data.story_rel) &&
						data.story_rel.slice(0, 3).map((li: any) => {
							return (
								<TouchableOpacity
									key={li.name}
									style={styles.subListContainer}
									onPress={() => {
										onPressSubArticle(li.id, data.site, data);
									}}
								>
									<View style={styles.dot} />
									<Text style={styles.subListText}>{li.name}</Text>
								</TouchableOpacity>
							);
						})} */}
				</TouchableOpacity>

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
					{/* <TouchableOpacity
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
					</TouchableOpacity> */}
				</View>
			</View>
		);
	}
}

ArticleTabletBig.defaultProps = {};

const imageWidth = ScalePerctFullWidth(38);
const imageHeight = imageWidth * 0.56;

const styles = StyleSheet.create({
	container: {
		// borderBottomColor: Colors.bgPrimaryLight,
		// borderBottomWidth: 1,
		marginHorizontal: 50,
		borderBottomWidth: 2,
		borderColor: Colors.borderLine,
	},
	subContainer: {
		flexDirection: "row",
		paddingTop: 24,
	},
	leftContainer: {
		flex: 1,
		justifyContent: "flex-start",
	},
	rightContainerTouch: {
		marginLeft: 24,
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
	lineSeperator: {
		width: ScalePerctFullWidth(89),
		alignSelf: "center",
		borderBottomWidth: 1,
		borderColor: Colors.linePrimaryFull,
	},
	lineSeperator2: {
		width: ScalePerctFullWidth(89),
		alignSelf: "center",
		borderBottomWidth: 1,
		borderColor: Colors.linePrimaryFull,
		marginTop: 10,
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
		paddingTop: 34,
		//	marginHorizontal: ScalePerctFullWidth(-8.5),
	},
	imageOne: {
		height: 18,
		width: 180,
	},
	title: {
		color: Colors.textHeading,
		fontSize: 29,
		fontFamily: "BentonSans Bold",
		lineHeight: 43,
	},
	desc: {
		color: Colors.bodyTertiaryLight,
		fontSize: 22,
		flex: 1,
		fontFamily: "BentonSans Regular",
		marginTop: 8,
		lineHeight: 30,
	},
});

export default withNavigation(ArticleTabletBig);
