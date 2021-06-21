import React, { PureComponent } from "react";
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, Image, I18nManager } from "react-native";
import SvgUri from "react-native-svg-uri";
import Icon from "../../asset/fonts/icons";
import { Colors, ScalePerctFullWidth, ScalePerctFullHeight, Metrics, Images } from "../../asset";
import { shareArticle } from "../common";

type Props = {
	onBack?: Function,
	onShare?: Function,
	title?: string,
	style?: number | Object | Array<number>,
};

const share = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="14px" height="17px" viewBox="0 0 14 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
       <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="UI-KIT" transform="translate(-1040.000000, -4889.000000)" stroke="#85888B" stroke-width="1.35">
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

export default class BigImageHeader extends PureComponent<props> {
	renderBackbtn = (onBack: any) => {
		return onBack ? (
			<TouchableOpacity onPress={onBack} style={styles.buttonContainer}>
				{ I18nManager.isRTL ? <Image source = {require('../../asset/Images/arrowRight.png')} style={{height:16, width: 16}} color='#000'/> :
			<Icon
			name={Images.back}
			size={14}
			color={Colors.bgPrimaryLight}
			style={styles.icon}
		/>
			}
				
			</TouchableOpacity>
		) : (
			<View style={styles.emptyView} />
		);
	};

	renderActionbtn = (title: string, image: any, nid: Number) => {
		const { data, linkdata, content } = this.props;
		console.log("link", linkdata);
		return (
			<TouchableOpacity
				onPress={() => {
					if (data) {
						shareArticle(
							content.title,
							image,
							content.nid,
							"gallery",
							linkdata,
							104,
							data,
						);
					}
				}}
				style={styles.shareContainer}
			>
				<SvgUri width={16} height={16} svgXmlData={share} />

				{/* <Icon name={Images.share} size={14} color={Colors.bgPrimaryLight} /> */}
			</TouchableOpacity>
		);
	};

	renderTitle = (title: string) => {
		return (
			<View style={styles.titleContainer}>
				<Text style={styles.title}>{title}</Text>
			</View>
		);
	};

	render() {
		const { style, data, onBack, navigation, linkdata, content } = this.props;
		// let link1 = this.props.navigation.getParam("linkdata");
		// console.log("link1", link1);

		const title = data && data.title ? data.title : null;
		const image =
			data && Array.isArray(data.field_picture_ref)
				? null
				: data &&
				  data.field_picture_ref &&
				  data.field_picture_ref.und[0] &&
				  data.field_picture_ref.und[0].image_path;
		const nid = data && data.nid ? data.nid : null;
		return (
			<View style={StyleSheet.flatten([styles.container, style])}>
				<StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
				{/* <View style={[styles.headerContainer]}> */}
				<View
					style={{
						width: ScalePerctFullWidth(10),
						flex: 1,
						backgroundColor: "pink",
						zIndex: 1,
					}}
				>
					{this.renderBackbtn(onBack)}
				</View>
				{/* {this.renderTitle(title)} */}
				<View />
				{/* <View style={{ width: ScalePerctFullWidth(10), backgroundColor: "red", }}> */}
				<TouchableOpacity
					onPress={() => {
						if (data) {
							shareArticle(
								content.title,
								image,
								content.nid,
								"gallery",
								linkdata,
								104,
								data,
							);
						}
					}}
					style={{
						backgroundColor: "black",
					}}
				>
					<SvgUri width={16} height={16} svgXmlData={share} />
				</TouchableOpacity>
				{/* </View> */}

				{/* {this.renderActionbtn(title, image, nid)} */}
				{/* </View> */}
			</View>
		);
	}
}

BigImageHeader.defaultProps = {
	style: undefined,
	onBack: undefined,
	onShare: undefined,
	title: "",
};

const styles = StyleSheet.create({
	container: {
		// flexDirection: "column",
		// justifyContent: "center",
		// alignItems: "center",
		// alignContent: "center",
		marginTop: ScalePerctFullHeight(2),
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullHeight(10),
		borderBottomWidth: Metrics.LINE_WIDTH,
		borderColor: Colors.linePrimary,
		backgroundColor: "orange",
		// flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: Metrics.DEFAULT_PADDING,
		paddingVertical: 8,
		//	backgroundColor: Colors.bgPrimaryLight,
	},
	headerContainer: {
		// flex: 1,
		alignSelf: "stretch",
		marginTop: Metrics.STATUS_BAR_HEIGHT,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "blue",
	},
	buttonContainer: {
		// flex: 1,
		// flexDirection: "column",
		// justifyContent: "center",
		// alignItems: "center",
		// alignContent: "center",
		// marginHorizontal: Metrics.DEFAULT_PADDING,
		// paddingVertical: 8,
		// tintColor: "white",
		width: ScalePerctFullWidth(20),
		backgroundColor: "black",
	},
	shareContainer: {
		// flex: 1,

		// justifyContent: "center",
		// alignItems: "center",
		// alignContent: "center",
		// paddingHorizontal: Metrics.DEFAULT_PADDING,
		// paddingVertical: 8,

		backgroundColor: "red",
	},
	actionPicContainer: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		paddingHorizontal: Metrics.DEFAULT_PADDING,
		paddingVertical: 8,
	},
	actionPic: {
		borderRadius: 10,
		backgroundColor: Colors.bgPrimaryBlack,
		width: 20,
		height: 20,
	},
	emptyView: { padding: 18 },
	titleContainer: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		padding: 8,
	},
	pageText: {
		color: Colors.bodyPrimaryLight,
		fontSize: Metrics.SMALL_TEXT_SIZE,
	},
	title: {
		color: Colors.bodyPrimaryDark,
		fontSize: Metrics.MEDIUM_TEXT_SIZE,
		fontWeight: "bold",
	},
	icon: {
		tintColor: "white",
	},
});
