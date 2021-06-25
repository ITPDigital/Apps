import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import ImageLoad from "react-native-image-placeholder";
import { ScalePerctFullHeight, ScalePerctFullWidth, Metrics, Colors, Images } from "../../asset";
import { getTimeAgo } from "../../utilities";

type Props = {
	onPress: Function,
	margin: number,
	index: number,
	data: Object,
};

export default function PodcastListCard(props: Props) {
	const { onPress, margin, index, data, tabContainerStyle, tabImageStyle, flag } = props;
	console.log("data", flag);
	const image = Metrics.isTablet
		? data.field_image_landscape
			? { uri: data.field_image_landscape }
			: Images.landscape
		: data.field_image_square
		? { uri: data.field_image_square }
		: Images.square;
	return (
		<TouchableOpacity
			activeOpacity={1.0}
			style={[
				index === 0 && Metrics.isTablet
					? style.containerIndex
					: [style.container, tabContainerStyle || null],
				margin && { margin, marginRight: null, width: ScalePerctFullWidth(41) },
			]}
			onPress={onPress}
		>
			{margin ? (
				<ImageLoad
					resizeMode={"contain"}
					style={Metrics.isTablet && index === 0 ? style.imageIndex : style.viewAll}
					placeholderStyle={
						Metrics.isTablet && index === 0 ? style.imageIndex : style.viewAll
					}
					isShowActivity={false}
					loadingStyle={{ size: "large", color: "grey" }}
					source={
						data.field_image_square ? { uri: data.field_image_square } : Images.square
					}
					placeholderSource={Images.square}
					borderRadius={Metrics.isTablet ? 0 : 4}
				/>
			) : (
				<ImageLoad
					resizeMode={"stretch"}
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
					source={
						flag
							? data.field_image_square
								? { uri: data.field_image_square }
								: Images.square
							: image
					}
					placeholderSource={Images.square}
					borderRadius={Metrics.isTablet ? 0 : 4}
				/>
			)}

			<Text style={style.title} numberOfLines={2}>
				{data.title}
			</Text>
			<Text style={style.description}>{getTimeAgo(data.created)}</Text>
		</TouchableOpacity>
	);
}

const mobileStyle = StyleSheet.create({
	container: {
		width: 141,
		//marginRight: ScalePerctFullWidth(4.9),
	},
	// containerViewAll: {
	// 	width: ScalePerctFullWidth(34.9),
	// 	marginRight: ScalePerctFullWidth(2.9),
	// },
	image: {
		height: 141,
		width: 141,
		borderRadius: 4,
	},
	viewAll: {
		height: ScalePerctFullWidth(41),
		width: ScalePerctFullWidth(41),
		borderRadius: ScalePerctFullWidth(1),
	},
	imageView: { height: 141, width: 141, borderRadius: 4, backgroundColor: Colors.linePrimary },
	imageTablet: {
		height: 454,
		width: 257,
		backgroundColor: Colors.linePrimary,
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
		color: Colors.bodyTime,
		fontSize: Metrics.VV_SMALL_TEXT_SIZE,
		fontFamily: "BentonSans Regular",
	},
});

const tabletStyle = StyleSheet.create({
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
	},
	imageIndex: {
		height: 257,
		width: 454,
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
		color: Colors.bodyTime,
		fontSize: Metrics.VV_SMALL_TEXT_SIZE,
		fontFamily: "BentonSans Regular",
	},
});

const style = Metrics.isTablet ? tabletStyle : mobileStyle;
