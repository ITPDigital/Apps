
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import SvgUri from "react-native-svg-uri";
import { Colors, Metrics, ScalePerctFullWidth, Images, ScalePerctFullHeight } from "../../asset";
import Icon from "../../asset/fonts/icons";
import { shareArticle } from "../common"; 

const bookmark = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="14px" height="17px" viewBox="0 0 14 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="#a3a3a3" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12.5920397,15.6848738 L6.79601985,11.6057422 L1,15.6848738 L1,2.63165265 C1,1.73051577 1.74141899,1 2.65600567,1 L10.936034,1 C11.8506207,1 12.5920397,1.73051577 12.5920397,2.63165265 L12.5920397,15.6848738 Z" id="Bookmark" stroke="#85888B" stroke-width="1.5"></path>
    </g>
</svg>`;

const unBookMark = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="14px" height="17px" viewBox="0 0 14 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12.5920397,15.6848738 L6.79601985,11.6057422 L1,15.6848738 L1,2.63165265 C1,1.73051577 1.74141899,1 2.65600567,1 L10.936034,1 C11.8506207,1 12.5920397,1.73051577 12.5920397,2.63165265 L12.5920397,15.6848738 Z" id="Bookmark" stroke="#85888B" stroke-width="1.5"></path>
    </g>
</svg>`;

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

type Props = {
	time?: string,
	isCenter?: boolean,
	isBookMarked?: boolean,
	isBookMarkNeeded?: boolean,
	onShare?: Function,
	onBookMarkToggle?: Function,
};

// const shareOptions = {
// 	title: "React Native",
// 	message: "Hola mundo",
// 	url: "http://facebook.github.io/react-native/",
// 	subject: "Share Link", //  for email
// };

export default function ArticleListFooterOther(props: Props) {
	const {
		time,
		isCenter,
		isBookMarked,
		isBookMarkNeeded,
		onShare,
		onBookMarkToggle,
		tabContainerStyle,
		item,
		textStyle,
		iconStyle,
		bookmarkRequired,
		user,
		routeFlag,
	} = props;
	const contentType = item.content_type;
	const userId = user && user.id;
	console.log("item in list footer", userId);
	return (
		<View style={[styles.container, tabContainerStyle || null]}>
			{!isCenter && <Text style={[styles.hours, textStyle]}>{time}</Text>}
			<TouchableOpacity
				onPress={() => {
					if (item) {
						shareArticle(
							item.title,
							item.image,
							item.nid,
							contentType,
							item.link,
							userId,
							item,
							routeFlag,
						);
					}
				}}
				style={[styles.icon, iconStyle]}
			>
				{/* <Icon
					style={styles.icon}
					name={Images.share}
					size={16}
					color={Colors.bodySecondaryLight}
				/> */}
				<SvgUri width={16} height={16} svgXmlData={share} />
			</TouchableOpacity>
			{bookmarkRequired && isBookMarkNeeded && (
				<TouchableOpacity
					onPress={() => onBookMarkToggle()}
					style={[styles.icon, iconStyle]}
				>
					{isBookMarked ? (
						// <Icon
						// 	name={Images.selectedBookmark}
						// 	size={16}
						// 	color={Colors.bodySecondaryGrey}
						// />
						<SvgUri width={16} height={16} svgXmlData={bookmark} />
					) : (
						// <Image
						// 	resizeMode="contain"
						// 	source={Images.unbookmark}
						// 	// style={{
						// 	// 	width: ScalePerctFullWidth(3),
						// 	// 	height: ScalePerctFullHeight(2),
						// 	// }}
						// />
						<SvgUri width={16} height={16} svgXmlData={unBookMark} />
					)}
				</TouchableOpacity>
			)}
		</View>
	);
}

ArticleListFooterOther.defaultProps = {
	time: "",
	isCenter: false,
	isBookMarked: false,
	isBookMarkNeeded: true,
	onShare: () => {},
	onBookMarkToggle: () => {},
};

const styles = StyleSheet.create({
	container: {
		alignSelf: "center",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
		width: ScalePerctFullWidth(100),
		// borderBottomColor: Colors.bgPrimaryLight,
		// borderBottomWidth: 1,
	},
	hours: {
		paddingTop: 14,
		fontSize: Metrics.MEDIUM_TEXT_SIZE,
		letterSpacing: 0.3,
		textAlign: "left",
		alignSelf: "stretch",
		flexWrap: "wrap",
		alignItems: "center",
		lineHeight: Metrics.LARGE_LINE_HEIGHT,
		flex: 1,
		paddingBottom: 10,
		color: "#85888B",
	},
	icon: {
		paddingHorizontal: Metrics.isTablet
			? ScalePerctFullWidth(2)
			: Metrics.DEFAULT_LIST_PADDING,
		alignSelf: "center",
		paddingTop: 14,
		paddingBottom: 10,
	},
});
