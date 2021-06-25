import React, { PureComponent } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import SvgUri from "react-native-svg-uri";
import { Colors, Images, Metrics, ScalePerctFullHeight, ScalePerctFullWidth } from "../../asset";
import Icon from "../../asset/fonts/icons";
import { shareArticle } from "../../components";

const unBookMark = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="14px" height="17px" viewBox="0 0 14 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12.5920397,15.6848738 L6.79601985,11.6057422 L1,15.6848738 L1,2.63165265 C1,1.73051577 1.74141899,1 2.65600567,1 L10.936034,1 C11.8506207,1 12.5920397,1.73051577 12.5920397,2.63165265 L12.5920397,15.6848738 Z" id="Bookmark" stroke="#000000" stroke-width="1.5"></path>
    </g>
</svg>`;
const unBookMarkWhite = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="14px" height="17px" viewBox="0 0 14 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12.5920397,15.6848738 L6.79601985,11.6057422 L1,15.6848738 L1,2.63165265 C1,1.73051577 1.74141899,1 2.65600567,1 L10.936034,1 C11.8506207,1 12.5920397,1.73051577 12.5920397,2.63165265 L12.5920397,15.6848738 Z" id="Bookmark" stroke="#FFFFFF" stroke-width="1.5"></path>
    </g>
</svg>`;

const unBookMarkWhiteYellow = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="14px" height="17px" viewBox="0 0 14 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12.5920397,15.6848738 L6.79601985,11.6057422 L1,15.6848738 L1,2.63165265 C1,1.73051577 1.74141899,1 2.65600567,1 L10.936034,1 C11.8506207,1 12.5920397,1.73051577 12.5920397,2.63165265 L12.5920397,15.6848738 Z" id="Bookmark" stroke="#F8F2E5" stroke-width="1.5"></path>
    </g>
</svg>`;

const shareBlack = `<?xml version="1.0" encoding="UTF-8"?>
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

const shareWhite = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="14px" height="17px" viewBox="0 0 14 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
       <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="UI-KIT" transform="translate(-1040.000000, -4889.000000)" stroke="#FFFFFF" stroke-width="1.35">
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

export default class ArticleFooter extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
		};
	}

	// onCancel() {

	// 	this.setState({ visible: false });
	// }

	// onShare() {

	// 	this.setState({ visible: true });
	// }

	renderAlphaContainer = (color: string) => {
		const { selectFont, isOpen, dynamicColor, themeId, user } = this.props;
		// const color = "black";
		console.log("dynamicColor", this.props.dynamicColor.fontColor);
		return (
			<View style={StyleSheet.flatten([styles.expandAlphaView])}>
				<TouchableOpacity
					onPress={() => selectFont("NORMAL")}
					style={[styles.icons, { flex: 0.5, alignItems: "center" }]}
				>
					<Icon name={Images.aA} size={12} color={color} />
				</TouchableOpacity>
				<View
					style={{
						alignSelf: "stretch",
						borderRightWidth: 0.5,
						borderColor: Colors.bodyTertiaryDark,
					}}
				/>

				<TouchableOpacity
					style={[styles.icons, { flex: 0.5, alignItems: "center" }]}
					onPress={() => selectFont("LARGE")}
				>
					<Icon name={Images.aA} size={20} color={color} />
				</TouchableOpacity>
			</View>
		);
	};

	renderThemeColor = (themeId, color, selectId) => {
		const { selectTheme } = this.props;

		return (
			<TouchableOpacity onPress={() => selectTheme(themeId)} key={themeId.toString()}>
				<View
					style={StyleSheet.flatten([
						styles.colorPanel,
						{ backgroundColor: color },
						themeId === selectId ? styles.focusedTheme : {},
					])}
				/>
			</TouchableOpacity>
		);
	};

	renderThemeColors = (list, selectId) => {
		console.log("list", list);
		return list.map((item: any) => {
			return this.renderThemeColor(item.themeId, item.color, selectId);
		});
	};

	renderThemeContainer = (selectId: any) => {
		const list = [
			{
				themeId: "FFFFFF",
				color: Colors.bgPrimaryLight,
			},
			{
				themeId: "F8F2E5",
				color: Colors.bgSecondaryLight,
			},
			{
				themeId: "000000",
				color: Colors.bgPrimaryDark,
			},
			{
				themeId: "5A5A5C",
				color: Colors.bgTertiaryDark,
			},
			{
				themeId: "333333",
				color: Colors.bgSecondaryDark,
			},
		];
		return (
			<View style={StyleSheet.flatten([styles.expandThameView])}>
				{this.renderThemeColors(list, selectId)}
			</View>
		);
	};

	render() {
		const {
			isOpen,
			themeId,
			selectTheme,
			toggleFooter,
			dynamicColor,
			selectFont,
			isBookmark,
			onBookMarkToggle,
			data,
			user,
		} = this.props;
		console.log("foterData", data);
		const image =
			data &&
			data.field_picture_ref &&
			data.field_picture_ref.und &&
			data.field_picture_ref.und[0] &&
			data.field_picture_ref.und[0].image_path
				? data &&
				  data.field_picture_ref &&
				  data.field_picture_ref.und &&
				  data.field_picture_ref.und[0] &&
				  data.field_picture_ref.und[0].image_path
				: null;
		const title = data && data.title ? data.title : null;
		const nid = data && data.nid ? data.nid : null;
		const contentType = data && data.content_type ? data.content_type : null;
		console.log("data Article footer:", data);
		const color = isOpen
			? themeId == "FFFFFF" || themeId == "F8F2E5"
				? Colors.bgSecondaryLight
				: "black"
			: dynamicColor.fontColor;
		return (
			<View
				style={StyleSheet.flatten([
					styles.footerContainer,
					dynamicStyles(isOpen).footerContainer,
					{
						backgroundColor: isOpen
							? themeId == "000000" || themeId == "5A5A5C" || themeId == "333333"
								? Colors.bgSecondaryLight
								: Colors.bgTertiaryDark
							: dynamicColor.bgColor,
					},
				])}
			>
				<View style={StyleSheet.flatten([styles.collapseView])}>
					<TouchableOpacity
						onPress={() => {
							if (data) {
								shareArticle(
									title,
									image,
									nid,
									"article_listing",
									data.path_alias,
									this.props.user,
									data,
								);
							}
						}}
						style={styles.icons}
					>
						{!isOpen ? (
							themeId == "FFFFFF" || themeId == "F8F2E5" ? (
								<SvgUri width={16} height={16} svgXmlData={shareBlack} />
							) : (
								<SvgUri width={16} height={16} svgXmlData={shareWhite} />
							)
						) : themeId == "FFFFFF" || themeId == "F8F2E5" ? (
							<SvgUri width={16} height={16} svgXmlData={shareWhite} />
						) : (
							<SvgUri width={16} height={16} svgXmlData={shareBlack} />
						)}
					</TouchableOpacity>

					<TouchableOpacity onPress={() => onBookMarkToggle()} style={styles.icon}>
						{isBookmark ? (
							<Icon name={Images.selectedBookmark} size={16} color={color} />
						) : isOpen ? (
							themeId == "FFFFFF" || themeId == "F8F2E5" ? (
								<SvgUri
									width={16}
									height={16}
									svgXmlData={unBookMarkWhiteYellow}
								/>
							) : (
								<SvgUri width={16} height={16} svgXmlData={unBookMark} />
							)
						) : themeId == "FFFFFF" || themeId == "F8F2E5" ? (
							<SvgUri width={16} height={16} svgXmlData={unBookMark} />
						) : (
							<SvgUri width={16} height={16} svgXmlData={unBookMarkWhite} />
						)}
					</TouchableOpacity>

					{/* <TouchableOpacity
						// onPress={() => ()}
						style={styles.icons}
					>
						<Icon name={Images.selectedBookmark} size={14} color={color} />
					</TouchableOpacity> */}
					<TouchableOpacity onPress={() => toggleFooter()} style={styles.icons}>
						<Icon name={Images.aA} size={14} color={color} />
					</TouchableOpacity>
				</View>
				{this.renderAlphaContainer(color)}
				{this.renderThemeContainer(themeId)}
			</View>
		);
	}
}

const dynamicStyles = (isOpen: any) => {
	return isOpen
		? StyleSheet.create({
				footerContainer: {
					bottom: 0,
					backgroundColor: "black",
					borderTopRightRadius: 10,
					borderTopLeftRadius: 10,
					borderTopWidth: 0,
				},
		  })
		: StyleSheet.create({ 
				footerContainer: {
					bottom: ScalePerctFullHeight(30) * -1,
				},
		  });
};

const phoneStyles = StyleSheet.create({
	footerContainer: {
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullHeight(37),
		backgroundColor: "#f27c00", 
		alignItems: "stretch",
		flexDirection: "column",
		left: 0,
		right: 0,
		position: "absolute",
		justifyContent: "flex-end",
		borderTopWidth: 1,
		borderColor: Colors.linePrimary,
	},
	collapseView: {
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullHeight(7),
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
	},
	expandAlphaView: {
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullHeight(15),
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-around",
		alignContent: "stretch",
		borderTopWidth: 0.5,
	},
	expandThameView: {
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullHeight(15),
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "stretch",
		borderTopWidth: 0.5,
		paddingTop: 20,
	},
	colorPanel: {
		width: ScalePerctFullWidth(100) / 8,
		height: ScalePerctFullWidth(100) / 8,
		borderRadius: 50,
		borderColor: Colors.borderlight,
		borderWidth: 0.5,
	},
	icons: {
		padding: 10,
		paddingHorizontal: Metrics.DEFAULT_PADDING * 2,
	},
	focusedTheme: {
		borderColor: Colors.bgPrimaryVarient,
		borderWidth: 3,
		borderRadius: 50,
	},
	icon: { paddingHorizontal: Metrics.DEFAULT_LIST_PADDING },
});
const tabStyles = StyleSheet.create({
	footerContainer: {
		width: ScalePerctFullWidth(50),
		height: ScalePerctFullHeight(37),
		backgroundColor: "#f27c00", 
		alignSelf: "center",
		flexDirection: "column",
		//left: 0,
		//right: 0,
		position: "absolute",
		justifyContent: "flex-end",
		borderTopWidth: 1,
		borderColor: Colors.linePrimary,
	},
	collapseView: {
		width: ScalePerctFullWidth(50),
		height: ScalePerctFullHeight(7),
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
	},
	expandAlphaView: {
		width: ScalePerctFullWidth(50),
		height: ScalePerctFullHeight(15),
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-around",
		alignContent: "center",
		borderTopWidth: 0.5,
	},
	expandThameView: {
		width: ScalePerctFullWidth(50),
		height: ScalePerctFullHeight(15),
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		borderTopWidth: 0.5,
		paddingTop: 20,
	},
	colorPanel: {
		width: ScalePerctFullWidth(50) / 8,
		height: ScalePerctFullWidth(50) / 8,
		borderRadius: 50,
		borderColor: Colors.borderlight,
		borderWidth: 0.5,
	},
	icons: {
		padding: 10,
		paddingHorizontal: Metrics.DEFAULT_PADDING * 2,
	},
	focusedTheme: {
		borderColor: Colors.bgPrimaryVarient,
		borderWidth: 3,
		borderRadius: 50,
	},
});
const styles = Metrics.isTablet ? tabStyles : phoneStyles;
