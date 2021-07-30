import React, { PureComponent } from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Text,
	ImageBackground,
	StatusBar,
	TouchableWithoutFeedback,
	Keyboard,
	KeyboardAvoidingView,
} from "react-native";
import SvgUri from "react-native-svg-uri";
import Svg, { Circle, Rect } from "react-native-svg";
import Icon from "../../asset/fonts/icons";
// import Share, { ShareSheet, Button } from "react-native-share";
import { Actions } from "../../redux";
import {
	Colors,
	ScalePerctFullWidth,
	ScalePerctFullHeight,
	Strings,
	Metrics,
	Images,
} from "../../asset";
import { shareArticle } from "../common";
// import { Button, TextInput } from "../../components";

const unBookMark = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="14px" height="17px" viewBox="0 0 14 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12.5920397,15.6848738 L6.79601985,11.6057422 L1,15.6848738 L1,2.63165265 C1,1.73051577 1.74141899,1 2.65600567,1 L10.936034,1 C11.8506207,1 12.5920397,1.73051577 12.5920397,2.63165265 L12.5920397,15.6848738 Z" id="Bookmark" stroke="#000000" stroke-width="1.5"></path>
    </g>
</svg>`;

const share = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="14px" height="17px" viewBox="0 0 14 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
       <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="UI-KIT" transform="translate(-1040.000000, -4889.000000)" stroke="#000000" stroke-width="1.35">
            <g id="Share" transform="translate(1041.000000, 4890.000000)">
                <g id="share">
                    <path d="M0,7.5 L0,13.5 C0,14.3284271 0.681596351,15 1.52238806,15 L10.6567164,15 C11.4975081,15 12.1791045,14.3284271 12.1791045,13.5 L12.1791045,7.5" id="Shape"></path>
                    <polyline id="Shape" points="9.13432836 3 6.08955224 0 3.04477612 3"></polyline>
                    <path d="M6.08955224,0 L6.08955224,9.75" id="Shape"></path>
                </g>
            </g>
        </g>
    </g>
</svg>`;

type Props = {
	navigation: any,
};

export default class GalleryFooter extends PureComponent<Props> {
	render() {
		const { isBookmark, onBookMarkToggle, data } = this.props;
		const image =
			data &&
			data.field_picture_ref &&
			data.field_picture_ref.und[0] &&
			data.field_picture_ref.und[0].image_path
				? data &&
				  data.field_picture_ref &&
				  data.field_picture_ref.und[0] &&
				  data.field_picture_ref.und[0].image_path
				: null;
		const title = data && data.title ? data.title : null;
		const nid = data && data.nid ? data.nid : null;
		const link = data && data.path_alias;
		console.log("Gallerydata", data);
		return (
			<View style={StyleSheet.flatten([styles.container])}>
				<TouchableOpacity
					onPress={() => {
						if (data) {
							console.log("shareArticle", title, image);
							shareArticle(title, image, nid, "gallery", link, 104, data);
						}
					}}
					style={styles.icons}
				>
					<SvgUri width={16} height={16} svgXmlData={share} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => onBookMarkToggle()} style={styles.icons}>
					{isBookmark ? (
						<Icon
							name={Images.selectedBookmark}
							size={16}
							color={Colors.bodyPrimaryDark}
						/>
					) : (
						<SvgUri width={16} height={16} svgXmlData={unBookMark} />
					)}
				</TouchableOpacity>
			</View>
		);
	}
}

GalleryFooter.defaultProps = {
	isBookMarked: false,
	onShare: () => {},
	onBookMarkToggle: () => {},
};

const styles = StyleSheet.create({
	container: {
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullHeight(7),
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
		// position: "absolute",
		// borderColor: "black",
		// borderWidth: 1,
	},
	icons: {
		padding: 10,
		paddingHorizontal: Metrics.DEFAULT_PADDING * 2,
	},
});
