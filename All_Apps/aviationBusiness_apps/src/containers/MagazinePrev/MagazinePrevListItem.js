import React, { useRef, useEffect }  from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	TouchableWithoutFeedback,
	I18nManager,
	Animated,  
	Easing
} from "react-native";
import ImageLoad from "react-native-image-placeholder";
import { ScalePerctFullHeight, ScalePerctFullWidth, Metrics, Colors, Images } from "../../asset";

type Props = { 
	onPress: Function, 
	margin: number,
	index: number,
	data: Object,
};

export default function MagazineListItem(props: Props) {
	const { onPress, index, data } = props;
	const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

	React.useEffect(() => {
		Animated.spring(
		  fadeAnim,
		  {
			toValue: 1,
			friction: 1
			// easing:  Easing.bezier(0, 2, 1, -1) 
		  }
		).start();
	  }, [fadeAnim]);

	console.log(data); 
	return (
		<View activeOpacity={1.0} style={[style.container]}>
			<Animated.View style={[style.imageContainer,{opacity: fadeAnim,     transform: [{
			translateY: fadeAnim.interpolate({
				inputRange: [0, 5],
				outputRange: [0, -50] // 0 : 150, 0.5 : 75, 1 : 0
			}),
			}],}]}> 
				<TouchableOpacity onPress={() => onPress(data[0])} style={style.imageLeftCont}>
					{/* <Image source={{ uri: data[0].image }} style={style.imageLeft} /> */}
					<ImageLoad
						resizeMode={"contain"}
						style={style.imageLeft}
						placeholderStyle={style.imageLeft}
						isShowActivity={false}
						loadingStyle={{ size: "large", color: "grey" }} 
						source={data[0].field_image != ""?{ uri: data[0].field_image }:Images.protrait}
						placeholderSource={Images.protrait}
						borderRadius={4}
					/>
				</TouchableOpacity>
				{data[1] && (
					<TouchableOpacity
						onPress={() => onPress(data[1])}
						style={style.imageRightCont}
					>
						{/* <Image source={{ uri: data[1].image }} style={style.imageRight} /> */}
						<ImageLoad
							resizeMode={"contain"}
							style={style.imageRight}
							placeholderStyle={style.imageRight}
							isShowActivity={false}
							loadingStyle={{ size: "large", color: "grey" }} 
							source={data[1].field_image != ""?{ uri: data[1].field_image }:Images.protrait}
							placeholderSource={Images.protrait}
							borderRadius={4}
						/>
					</TouchableOpacity>
				)}
			</Animated.View>
			{/* <Image source={Images.shelf} style={style.imageShelf} /> */}
			<View style={style.titleContainer}>
				<TouchableOpacity onPress={() => onPress(data[0])}>
					<Text style={style.titleLeft} numberOfLines={2} lineHeight={0.01}>
						{data[0].title}
					</Text>
				</TouchableOpacity>
				{data[1] && (
					<TouchableOpacity onPress={() => onPress(data[1])}>
						<Text style={style.titleRight} numberOfLines={2} lineHeight={5}>
							{data[1].title}
						</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
}

const imageWidth = (ScalePerctFullWidth(100) - 120) / 2;
const imageHeight = imageWidth * 1.375;
const style = StyleSheet.create({
	container: {
		flexDirection: "column",
		paddingTop: 2,
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
		marginLeft: 45,
		marginRight: 15,
	},
	imageRightCont: {
		height: imageHeight,
		width: imageWidth,
		borderRadius: 4,
		marginLeft: 15,
		marginRight: 45,
	},
	imageShelf: {
		width: ScalePerctFullWidth(100),
		height: 25,
	},
	imageView: { height: 131, width: 131, borderRadius: 4, backgroundColor: Colors.linePrimary },
	imageTablet: {
		height: 454,
		width: 257,
		backgroundColor: Colors.linePrimary,
	},
	titleLeft: {
		marginLeft: 45,
		marginRight: 15,
		width: imageWidth,
		fontSize: Metrics.MEDIUM_TEXT_SIZE,
		color: Colors.bgPrimaryDark,
		lineHeight: 18,
		letterSpacing: 0,
		fontFamily: "BentonSans Regular",
		// backgroundColor: "red",
		// borderWidth: 1,
		// borderColor: Colors.bgPrimaryDark,
		textAlign: I18nManager.isRTL? "left":"center",
	},
	titleRight: {
		marginLeft: 15,
		marginRight: 45,
		width: imageWidth,
		fontSize: Metrics.MEDIUM_TEXT_SIZE,
		color: Colors.bgPrimaryDark,
		lineHeight: 18,
		letterSpacing: 0,
		fontFamily: "BentonSans Regular",
		// backgroundColor: "red",
		// borderWidth: 1,
		// borderColor: Colors.bgPrimaryDark,
		textAlign: I18nManager.isRTL? "left":"center",
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
