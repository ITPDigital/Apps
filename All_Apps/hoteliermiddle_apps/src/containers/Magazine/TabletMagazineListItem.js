import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from "react-native";
import ImageLoad from "react-native-image-placeholder";
import { ScalePerctFullHeight, ScalePerctFullWidth, Metrics, Colors, Images } from "../../asset";

type Props = {
	onPress: Function,
	margin: number,
	index: number,
	data: Object,
};

export default function TabletMagazineListItem(props: Props) {
	const { onPress, index, data } = props;
	console.log("data[0].nid", data[0].nid);
	return (
		<View activeOpacity={1.0} style={[style.container]}>
			<View style={style.imageContainer}>
			<TouchableOpacity onPress={() => onPress(data[0])} style={style.imageLeftCont}>
					<ImageLoad
						resizeMode={"contain"}
						style={style.imageLeft}
						placeholderStyle={style.imageLeft}
						isShowActivity={false}
						loadingStyle={{ size: "large", color: "grey" }}
						source={data[0].image != ""?{ uri: data[0].image }:Images.protrait} 
						placeholderSource={Images.protrait}
						borderRadius={4}
					/>
				</TouchableOpacity>
				{data[1] && (
					<TouchableOpacity
						onPress={() => onPress(data[1])}
						style={style.imageRightCont}
					>
						<ImageLoad
							resizeMode={"contain"}
							style={style.imageRight}
							placeholderStyle={style.imageRight}
							isShowActivity={false}
							loadingStyle={{ size: "large", color: "grey" }}
							source={data[1].image != ""?{ uri: data[1].image }:Images.protrait} 
							placeholderSource={Images.protrait}
							borderRadius={4}
						/> 
					</TouchableOpacity>
				)}
				{data[2] && (
					<TouchableOpacity
						onPress={() => onPress(data[2])}
						style={style.imageRightCont}
					>
						<ImageLoad
							resizeMode={"contain"}
							style={style.imageRight}
							placeholderStyle={style.imageRight}
							isShowActivity={false}
							loadingStyle={{ size: "large", color: "grey" }}
							source={data[2].image != ""?{ uri: data[2].image }:Images.protrait}
							placeholderSource={Images.protrait}
							borderRadius={4}
						/>
					</TouchableOpacity>
				)}
				{data[3] && (
					<TouchableOpacity
						onPress={() => onPress(data[3])}
						style={style.imageRightCont}
					>
						<ImageLoad
							resizeMode={"contain"}
							style={style.imageRight}
							placeholderStyle={style.imageRight}
							isShowActivity={false}
							loadingStyle={{ size: "large", color: "grey" }}
							source={data[3].image != ""?{ uri: data[3].image }:Images.protrait}
							placeholderSource={Images.protrait}
							borderRadius={4}
						/>
					</TouchableOpacity>
				)}
			</View>
			<Image source={Images.shelf} style={style.imageShelf} />
			<View style={style.titleContainer}>
				<TouchableOpacity onPress={() => onPress(data[0])}>
					<Text style={style.titleLeft} numberOfLines={2}>
						{data[0].title}
					</Text>
				</TouchableOpacity>
				{data[1] && (
					<TouchableOpacity onPress={() => onPress(data[1])}>
						<Text style={style.titleRight} numberOfLines={2}>
							{data[1].title}
						</Text>
					</TouchableOpacity>
				)}
				{data[2] && (
					<TouchableOpacity onPress={() => onPress(data[2])}>
						<Text style={style.titleRight} numberOfLines={2}>
							{data[2].title}
						</Text>
					</TouchableOpacity>
				)}
				{data[3] && (
					<TouchableOpacity onPress={() => onPress(data[3])}>
						<Text style={style.titleRight} numberOfLines={2}>
							{data[3].title}
						</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
}

const imageWidth = (ScalePerctFullWidth(100) - 120) / 4;
const imageHeight = imageWidth * 1.375;
const style = StyleSheet.create({
	container: {
		flexDirection: "column",
		paddingTop: 25,
		paddingRight: (ScalePerctFullWidth(100) - imageWidth * 4) / 2,
		paddingLeft: (ScalePerctFullWidth(100) - imageWidth * 4) / 2 - 40,
		//backgroundColor: "yellow",
	},
	imageLeft: {
		height: imageHeight,
		width: imageWidth,
		borderRadius: 4,
	},
	imageRight: {
		height: imageHeight,
		width: imageWidth,
		borderRadius: 4,
	},
	imageLeftCont: {
		height: imageHeight,
		width: imageWidth,
		borderRadius: 4,
		marginLeft: 10,
		marginRight: 20,
	},
	imageRightCont: {
		height: imageHeight,
		width: imageWidth,
		borderRadius: 4,
		//marginLeft: 15 / 2 - 2,
		marginRight: 20,
	},
	imageShelf: {
		width: ScalePerctFullWidth(95),
		//height: 25,
	},
	//imageView: { height: 131, width: 131, borderRadius: 4, backgroundColor: "yellow" },
	// imageTablet: {
	// 	height: 454,
	// 	width: 257,
	// 	backgroundColor: "pink",
	// },
	titleLeft: {
		marginLeft: 10,
		marginRight: 20,
		width: imageWidth,
		fontSize: Metrics.MEDIUM_TEXT_SIZE,
		color: Colors.bgPrimaryDark,
		lineHeight: 18,
		letterSpacing: 0,
		fontFamily: "BentonSans Regular",
		// backgroundColor: "red",
		// borderWidth: 1,
		// borderColor: Colors.bgPrimaryDark,
		textAlign: "center",
	},
	titleRight: {
		//marginLeft: 15 / 2,
		marginRight: 20,
		width: imageWidth,
		fontSize: Metrics.MEDIUM_TEXT_SIZE,
		color: Colors.bgPrimaryDark,
		lineHeight: 18,
		letterSpacing: 0,
		fontFamily: "BentonSans Regular",
		// backgroundColor: "red",
		// borderWidth: 1,
		// borderColor: Colors.bgPrimaryDark,
		textAlign: "center",
	},
	description: {
		marginTop: ScalePerctFullHeight(1.4),
		letterSpacing: 0,
		color: Colors.bodyTertiaryDark,
		fontSize: Metrics.VV_SMALL_TEXT_SIZE,
		fontFamily: "BentonSans Regular",
	},
	titleContainer: {
		flexDirection: "row",
	},
	imageContainer: {
		flexDirection: "row",
	},
});
