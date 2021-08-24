import React from "react";
import { View, Image, Text, StyleSheet, Platform } from "react-native";
import ImageLoad from "react-native-image-placeholder";
import { Colors, Metrics, ScalePerctFullWidth, Images, ScalePerctFullHeight } from "../../asset";

type Props = {
	title?: string,
	imageUrl?: string,
	isCenter?: boolean,
	isTitleImage?: boolean,
};

const renderImage = (image: string, imageStyle: any, imagePlaceHolderStyle: any) => {
	// return <Image source={{ uri: image }} style={StyleSheet.flatten([styles.imageOne])} />;
	return (
		<ImageLoad
			resizeMode={"stretch"}
			style={[styles.imageOne, imageStyle || null]}
			placeholderStyle={[styles.imageOnePlaceHolder, imagePlaceHolderStyle || null]}
			isShowActivity={false}
			loadingStyle={{ size: "large", color: "grey" }}
			source={image != ""?{ uri: image}:Images.landscape}  
			placeholderSource={Images.landscape}
			borderRadius={Metrics.SMALL_RADIUS}
		/>
	);
};

export default function ArticleListTitleImageOther(props: Props) {
	const {
		title,
		imageUrl,
		isTitleImage,
		isCenter,
		tabContainerStyle,
		numberOfLines,
		imageStyle,
		imagePlaceHolderStyle,
		textStyle,
		isFromHomePage
	} = props;

	const url = !imageUrl || imageUrl.includes("public://") ? null : imageUrl;
	if(isFromHomePage){
		return (
			<View style={[styles.container, tabContainerStyle || null]}>
				<Text
					style={[styles.titleText, isCenter ? { textAlign: "center"} : {}, textStyle,{color: Colors.textHeading, fontSize: 14,fontFamily:"BentonSans Bold"}]}
					numberOfLines={numberOfLines}
				>
					{title}
				</Text>
				{isTitleImage && renderImage(url, imageStyle, imagePlaceHolderStyle)}
			</View>
		);
	}
	else{
		return (
			<View style={[styles.container, tabContainerStyle || null]}>
				<Text
					style={[styles.titleText, isCenter ? { textAlign: "center"} : {}, textStyle]}
					numberOfLines={numberOfLines}
				>
					{title}
				</Text>
				{isTitleImage && renderImage(url, imageStyle, imagePlaceHolderStyle)}
			</View>
		);
	}
	
}

ArticleListTitleImageOther.defaultProps = {
	title: "Fashion Designer Alexis Mabille’s Paris Villa",
	imageUrl: undefined,
	isCenter: false,
	isTitleImage: false,
};

const styles = StyleSheet.create({
	container: {
		width: ScalePerctFullWidth(100),
		flexDirection: "row",
		paddingHorizontal: 12,
		paddingTop: 10,
		paddingBottom: 0,
	},
	titleText: {
		//paddingTop: ScalePerctFullHeight(1),
		color: Colors.textHeading,
		fontSize: Metrics.LARGE_TEXT_SIZE,
		fontFamily: "BentonSans Bold",
		flex: 1,
		marginTop: Platform.OS === "android" ? 1 : 4,
		lineHeight: 20,
	},
	imageOne: {
		width: ScalePerctFullWidth(25),
		height: ScalePerctFullWidth(15),
		borderRadius: Metrics.SMALL_RADIUS,
		marginLeft: Metrics.DEFAULT_LIST_PADDING,
		marginTop: 5,
	},
	imageOnePlaceHolder: {
		width: ScalePerctFullWidth(25),
		height: ScalePerctFullWidth(15),
		//borderRadius: Metrics.SMALL_RADIUS,
	},
});
