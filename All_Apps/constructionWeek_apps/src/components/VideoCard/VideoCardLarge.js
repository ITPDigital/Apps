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

export default function VideoCardLarge(props: Props) {
	const { onPress, margin, index, data, tabContainerStyle, tabImageStyle } = props;
	const time = getTimeAgo(data.pubDate);
	return (
		<TouchableOpacity onPress={onPress} style={style.container}>
			<ImageLoad
				resizeMode="cover"
				style={style.image}
				placeholderStyle={style.image}
				isShowActivity={false}
				loadingStyle={{ size: "large", color: "grey" }}
				source={
					data.image_crop_landscape ? { uri: data.image_crop_landscape } : Images.square
				}
				placeholderSource={Images.square}
			/>

			<Text style={style.title} numberOfLines={2}>
				{data.title}
			</Text>
			<Text style={style.description}>{time}</Text>
		</TouchableOpacity>
	);
}

const style = StyleSheet.create({
	container: {
		width: (ScalePerctFullWidth(100) - ScalePerctFullWidth(12)) / 3,
		marginRight: ScalePerctFullWidth(1.7),
		marginBottom: ScalePerctFullHeight(3),
	},
	image: {
		height: 168,
		width: (ScalePerctFullWidth(100) - ScalePerctFullWidth(12)) / 3,

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
		color: Colors.bodyTime,
		fontSize: Metrics.VV_SMALL_TEXT_SIZE,
		fontFamily: "BentonSans Regular",
		marginBottom: ScalePerctFullHeight(1),
	},
});
