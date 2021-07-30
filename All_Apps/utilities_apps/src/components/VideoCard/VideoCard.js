import React, { useRef, useEffect } from "react";
import { Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import ImageLoad from "react-native-image-placeholder";
import { ScalePerctFullHeight, ScalePerctFullWidth, Metrics, Colors, Images } from "../../asset";
import { getTimeAgo } from "../../utilities";

type Props = {
	onPress: Function,
	margin: number,
	index: number,
	data: Object,
};

export default function VideoCard(props: Props) {
	const { onPress, margin, index, data, tabContainerStyle, tabImageStyle } = props;
	const time = getTimeAgo(data.pubDate);
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

	console.log("data video card", data);
	return (
		<TouchableOpacity
			activeOpacity={1.0}
			style={[
				index === 0 && Metrics.isTablet
					? style.containerIndex
					: [style.container, tabContainerStyle || null],
				margin && { margin, marginRight: null, width: ScalePerctFullWidth(34.9) },
			]}
			onPress={onPress}
		>
			<Animated.View style={[style.container, {
				opacity: fadeAnim, transform: [{
					translateY: fadeAnim.interpolate({
						inputRange: [0, 1],
						outputRange: [1, 0]  // 0 : 150, 0.5 : 75, 1 : 0
					}),
				}],
			}]}>
				{margin ? (
					<ImageLoad
						resizeMode="cover"
						style={Metrics.isTablet && index === 0 ? style.imageIndex : style.viewAll}
						placeholderStyle={
							Metrics.isTablet && index === 0 ? style.imageIndex : style.viewAll
						}
						isShowActivity={false}
						loadingStyle={{ size: "large", color: "grey" }}
						source={data.image ? { uri: data.image } : Images.square}
						placeholderSource={Images.square}
					/>
				) : (
						<ImageLoad
							resizeMode="cover"
							style={
								Metrics.isTablet && index === 0
									? style.imageIndex
									: [style.image, tabImageStyle || null]
							}
							placeholderStyle={
								Metrics.isTablet && index === 0
									? style.imageIndex
									: [style.image, tabImageStyle || null]
							}
							isShowActivity={false}
							loadingStyle={{ size: "large", color: "grey" }}
							source={data.image ? { uri: data.image } : Images.square}
							placeholderSource={Images.square}
						/>
					)}

				<Text style={style.title} numberOfLines={2}>
					{data.title}
				</Text>
				<Text style={style.description}>{time}</Text>
			</Animated.View>
		</TouchableOpacity>
	);
}

const style = StyleSheet.create({
	container: {
		width: 297,
		marginRight: ScalePerctFullWidth(1.7),
	},
	containerIndex: {
		width: 454,
		marginRight: ScalePerctFullWidth(1.7),
	},
	image: {
		height: 168,
		width: 297,
		backgroundColor: "red",
	},
	imageIndex: {
		height: 257,
		width: 454,
		backgroundColor: "red",
	},
	title: {
		fontSize: Metrics.MEDIUM_TEXT_SIZE,
		marginTop: ScalePerctFullHeight(1.7),
		color: Colors.bgPrimaryDark,
		lineHeight: 18,
		letterSpacing: 0,
		fontFamily: "BentonSans Bold",
	},
	description: {
		marginTop: ScalePerctFullHeight(1.4),
		letterSpacing: 0,
		color: Colors.bodyTertiaryDark,
		fontSize: Metrics.VV_SMALL_TEXT_SIZE,
		fontFamily: "BentonSans Regular",
	},
});
