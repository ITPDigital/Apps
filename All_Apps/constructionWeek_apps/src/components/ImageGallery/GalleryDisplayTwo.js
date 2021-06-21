import React, { PureComponent } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { withNavigation } from "react-navigation";
import ImageLoad from "react-native-image-placeholder";
import { Colors, Metrics, ScalePerctFullWidth, Images } from "../../asset";

class GalleryDisplayOne extends PureComponent {
	render() {
		const { navigation, onImagePress, images, gallery } = this.props;
		const length = images ? images.length : 4;
		// console.log("4", images);

		return (
			<View style={styles.container}>
				<View style={styles.subContainer}>
					{length > 0 && (
						<TouchableOpacity
							onPress={() => onImagePress(images[0].target_id)}
							style={styles.imageContainerTwo}
						>
							<ImageLoad
								resizeMode={"cover"}
								style={styles.imgTwo}
								placeholderStyle={styles.imgTwo}
								isShowActivity={false}
								loadingStyle={{ size: "large", color: "grey" }}
								source={
									images
										? {
												uri: gallery
													? images[0].image_path
													: images[0].image_crop_landscape,
										  }
										: Images.landscape
								}
								placeholderSource={Images.landscape}
							/>
							{/* <Image
								source={
									images
										? { uri: images[0].image_crop_landscape }
										: Images.landscape
								}
								style={styles.imgTwo}
								resizeMode="cover"
							/> */}
						</TouchableOpacity>
					)}
					{length > 1 && (
						<TouchableOpacity
							onPress={() => onImagePress(images[1].target_id)}
							style={styles.imageContainerOne}
						>
							<ImageLoad
								resizeMode={"cover"}
								style={styles.imgOne}
								placeholderStyle={styles.imgOne}
								isShowActivity={false}
								loadingStyle={{ size: "large", color: "grey" }}
								source={
									images
										? {
												uri: gallery
													? images[1].image_path
													: images[1].image_crop_portrait,
										  }
										: Images.protrait
								}
								placeholderSource={Images.protrait}
							/>
							{/* <Image
								source={
									images
										? { uri: images[1].image_crop_portrait }
										: Images.protrait
								}
								style={styles.imgOne}
								resizeMode="cover"
							/> */}
						</TouchableOpacity>
					)}
				</View>
				<View style={styles.subContainer}>
					{length > 2 && (
						<TouchableOpacity
							onPress={() => onImagePress(images[2].target_id)}
							style={styles.imageContainerThree}
						>
							<ImageLoad
								resizeMode={"cover"}
								style={styles.imgOne}
								placeholderStyle={styles.imgOne}
								isShowActivity={false}
								loadingStyle={{ size: "large", color: "grey" }}
								source={
									images
										? {
												uri: gallery
													? images[2].image_path
													: images[2].image_crop_portrait,
										  }
										: Images.protrait
								}
								placeholderSource={Images.protrait}
							/>
							{/* <Image
								source={
									images
										? { uri: images[2].image_crop_portrait }
										: Images.protrait
								}
								style={styles.imgOne}
								resizeMode="cover"
							/> */}
						</TouchableOpacity>
					)}
					{length > 3 && (
						<TouchableOpacity
							onPress={() => onImagePress(images[3].target_id)}
							style={styles.imageContainerFour}
						>
							<ImageLoad
								resizeMode={"cover"}
								style={styles.imgTwo}
								placeholderStyle={styles.imgTwo}
								isShowActivity={false}
								loadingStyle={{ size: "large", color: "grey" }}
								source={
									images
										? {
												uri: gallery
													? images[3].image_path
													: images[3].image_crop_landscape,
										  }
										: Images.landscape
								}
								placeholderSource={Images.landscape}
							/>
							{/* <Image
								source={
									images
										? { uri: images[3].image_crop_landscape }
										: Images.landscape
								}
								style={styles.imgTwo}
								resizeMode="cover"
							/> */}
						</TouchableOpacity>
					)}
				</View>
			</View>
		);
	}
}

export default withNavigation(GalleryDisplayOne);

const styles = StyleSheet.create({
	container: {
		 height: ScalePerctFullWidth(90),
		 width: ScalePerctFullWidth(100),
		// marginHorizontal:16,
		// aspectRatio:16/9,
		//flex:1,
	},
	subContainer: {
		flex: 1,
		flexDirection: "row",
		// justifyContent: "center",
	},
	imageContainerOne: {
		height: ScalePerctFullWidth(90) / 2,
		width: ScalePerctFullWidth(100) / 3,
		borderWidth: 1,
		borderColor: Colors.bgPrimaryLight,
		borderRightWidth: 0,
	},
	imageContainerTwo: {
		height: ScalePerctFullWidth(90) / 2,
		width: (ScalePerctFullWidth(100) / 3) * 2,
		borderWidth: 1,
		borderColor: Colors.bgPrimaryLight,
		borderLeftWidth: 0,
	},
	imageContainerThree: {
		height: ScalePerctFullWidth(90) / 2,
		width: ScalePerctFullWidth(100) / 3,
		borderWidth: 1,
		borderColor: Colors.bgPrimaryLight,
		borderLeftWidth: 0,
	},
	imageContainerFour: {
		height: ScalePerctFullWidth(90) / 2,
		width: (ScalePerctFullWidth(100) / 3) * 2,
		borderWidth: 1,
		borderColor: Colors.bgPrimaryLight,
		borderRightWidth: 0,
	},
	imgTwo: {
		height: ScalePerctFullWidth(90) / 2,
		width: (ScalePerctFullWidth(100) / 3) * 2,
	},
	imgOne: {
		height: ScalePerctFullWidth(90) / 2,
		width: ScalePerctFullWidth(100) / 3,
	},
});
