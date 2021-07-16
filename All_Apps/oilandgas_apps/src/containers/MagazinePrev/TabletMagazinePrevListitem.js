import React, { useRef, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet, 
	Image,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Animated
} from "react-native";
import ImageLoad from "react-native-image-placeholder";
import { ScalePerctFullHeight, ScalePerctFullWidth, Metrics, Colors, Images } from "../../asset";

type Props = {
	onPress: Function,
	margin: number,
	index: number,
	data: Object,
};

export default function TabletMagazinePrevListItem(props: Props) {
	const { onPress, index, data } = props;
	const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

	React.useEffect(() => {
		Animated.timing(
		  fadeAnim,
		  {
			toValue: 1,
			duration: 3000, 
		  }
		).start();
	  }, [fadeAnim])

	// console.log("tab data for mag", data);
	// console.log("data[0].nid", data && data[0] && data[0].nid);
	return (
		<View activeOpacity={1.0} style={[style.container]}>
			<Animated.View style={[style.imageContainer,{opacity: fadeAnim,     transform: [{
			translateY: fadeAnim.interpolate({
				inputRange: [0, 1],
				outputRange: [150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
			}),
			}],}]}>
				<TouchableOpacity
					onPress={() => onPress(data && data[0])}
					style={style.imageLeftCont}
				>
					{/* <Image source={{ uri: data[0].image }} style={style.imageLeft} /> */}
					<ImageLoad
						resizeMode={"cover"}
						style={style.imageLeft}
						placeholderStyle={style.imageLeft}
						isShowActivity={false}
						loadingStyle={{ size: "large", color: "grey" }}
						source={{ uri: data && data[0] && data[0].field_image }}
						placeholderSource={Images.protrait}
						borderRadius={4}
					/>
				</TouchableOpacity>
				{data && data[1] && (
					<TouchableOpacity
						onPress={() => onPress(data && data[1])}
						style={style.imageRightCont}
					>
						{/* <Image source={{ uri: data[1].image }} style={style.imageRight} /> */}
						<ImageLoad
							resizeMode={"cover"}
							style={style.imageRight}
							placeholderStyle={style.imageRight}
							isShowActivity={false}
							loadingStyle={{ size: "large", color: "grey" }}
							source={{ uri: data && data[1] && data[1].field_image }}
							placeholderSource={Images.protrait}
							borderRadius={4}
						/>
					</TouchableOpacity>
				)}
				{data && data[2] && (
					<TouchableOpacity
						onPress={() => onPress(data && data[2])}
						style={style.imageRightCont}
					>
						{/* <Image source={{ uri: data[1].image }} style={style.imageRight} /> */}
						<ImageLoad
							resizeMode={"cover"}
							style={style.imageRight}
							placeholderStyle={style.imageRight}
							isShowActivity={false}
							loadingStyle={{ size: "large", color: "grey" }}
							source={{ uri: data && data[2] && data[2].field_image }}
							placeholderSource={Images.protrait}
							borderRadius={4}
						/>
					</TouchableOpacity>
				)}
				{data && data[3] && (
					<TouchableOpacity
						onPress={() => onPress(data && data[1])}
						style={style.imageRightCont}
					>
						{/* <Image source={{ uri: data[1].image }} style={style.imageRight} /> */}
						<ImageLoad
							resizeMode={"cover"}
							style={style.imageRight}
							placeholderStyle={style.imageRight}
							isShowActivity={false}
							loadingStyle={{ size: "large", color: "grey" }}
							source={{ uri: data && data[3] && data[3].field_image }}
							placeholderSource={Images.protrait}
							borderRadius={4}
						/>
					</TouchableOpacity>
				)}
			</Animated.View>
			{/* <Image source={Images.shelf} style={style.imageShelf} /> */}
			<View style={style.titleContainer}>
				<TouchableOpacity onPress={() => onPress(data && data[0])}>
					<Text style={style.titleLeft} numberOfLines={2}>
						{data && data[0] && data[0].title}
					</Text>
				</TouchableOpacity>
				{data && data[1] && (
					<TouchableOpacity onPress={() => onPress(data && data[1])}>
						<Text style={style.titleRight} numberOfLines={2}>
							{data && data[1] && data[1].title}
						</Text>
					</TouchableOpacity>
				)}
				{data && data[2] && (
					<TouchableOpacity onPress={() => onPress(data && data[2])}>
						<Text style={style.titleRight} numberOfLines={2}>
							{data && data[2] && data[2].title}
						</Text>
					</TouchableOpacity>
				)}
				{data && data[3] && (
					<TouchableOpacity onPress={() => onPress(data && data[3])}>
						<Text style={style.titleRight} numberOfLines={2}>
							{data && data[3] && data[3].title}
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
		paddingBottom: ScalePerctFullHeight(2),
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
		height: 25,
	},
	imageView: { height: 131, width: 131, borderRadius: 4, backgroundColor: Colors.linePrimary },
	imageTablet: {
		height: 454,
		width: 257,
		backgroundColor: Colors.linePrimary,
	},
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
		paddingTop: ScalePerctFullHeight(1),
	},
	imageContainer: {
		flexDirection: "row",
	},
});
