import React, { PureComponent } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import ImageLoad from "react-native-image-placeholder";
import { withNavigation } from "react-navigation";
import { AlertComp } from "../common";
import { Images, Strings, ScalePerctFullWidth } from "../../asset";

class ArticleDisplayImage extends PureComponent<> {
	constructor() {
		super();
		this.state = {
			ImageWidth: null,
			ImageHeight: null,
		};
	}

	renderImage = (image, height, onPress, disabled) => {
		// const { data } = this.props;
		const imageStyle = StyleSheet.flatten([
			styles.image,
			{
				height: height || ScalePerctFullWidth(68),
			},
		]);
		return (
			<TouchableOpacity onPress={onPress} disabled={disabled}>
				<ImageLoad
					resizeMode="contain"
					source={image ? { uri: image } : Images.square}
					style={imageStyle}
					placeholderStyle={styles.placeHolder}
					placeholderSource={Images.square}
					loadingStyle={{ size: "large", color: "grey" }}
				/>
			</TouchableOpacity>
		);
	};

	render() {
		const { dynamicColor, data, onPress, disabled } = this.props;
		console.log("Articledisplayimagedata", data);
		const image = !data.field_picture_ref
			? AlertComp(Strings.authentication.ALERT, "No data found", () => this.props.navigation.goBack(),)
			: data
			  && data.field_picture_ref
			  && data.field_picture_ref.und
			  && data.field_picture_ref.und[0]
			  && data.field_picture_ref.und[0].image_path;
		Image.getSize(
			image,
			(Width, Height) => {
				this.setState({
					ImageWidth: Width,
					ImageHeight: Height || ScalePerctFullWidth(68),
				});
			},
			(errorMsg: any) => {
				console.log(errorMsg);
			},
		);

		const height = ScalePerctFullWidth((this.state.ImageHeight * 100) / this.state.ImageWidth);

		return (
			<View
				style={[
					styles.container,
					{
						backgroundColor: dynamicColor.bgColor,
					},
					{
						color: dynamicColor.fontColor,
					},
					{
						height: height || ScalePerctFullWidth(68),
					},
				]}
			>
				{this.renderImage(image, height, onPress, disabled)}
				{/* {this.renderImage(image)} */}
			</View>
		);
	}
}

export default withNavigation(ArticleDisplayImage);

const styles = StyleSheet.create({
	container: {
		width: ScalePerctFullWidth(100),
		flex: 1,
	},
	image: {
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullWidth(68),
	},
	// imageOne: {
	// 	width: ScalePerctFullWidth(100),
	// 	position: "absolute",
	// 	top: 0,
	// 	right: 0,
	// 	left: 0,
	// 	backgroundColor: "red",
	// },
	placeHolder: {
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullWidth(68),
	},
});
