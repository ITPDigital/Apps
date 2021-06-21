import React, { PureComponent } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import ImageLoad from "react-native-image-placeholder";
import { Colors, Metrics, ScalePerctFullWidth, Images } from "../../asset";

export default class GalleryDisplayOne extends PureComponent {
	render() {
		const { navigation, onImagePress, images, gallery } = this.props;
		const length = images ? images.length : 3;
		// console.log("3", images);
		return (
			<View style={styles.container}>
				<View style={styles.subContainer}>
					{length > 0 && (
						<TouchableOpacity
							onPress={() => onImagePress(images[0].target_id)}
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
								style={styles.imgOne}
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
													: images[1].image_crop_landscape,
										  }
										: Images.landscape
								}
								placeholderSource={Images.landscape}
							/>
							{/* <Image
								source={
									images
										? { uri: images[1].image_crop_landscape }
										: Images.landscape
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

const styles = StyleSheet.create({
	container: {
		height: ScalePerctFullWidth(67),
		width: ScalePerctFullWidth(100),
		flexDirection: "row",
		// justifyContent: "center",
		// alignItems: "center",
	},
	subContainer: {
		flex: 1,
		// justifyContent: "center",
	},
	imageContainerOne: {
		flex: 1,
		borderWidth: 1,
		borderColor: Colors.bgPrimaryLight,
		borderLeftWidth: 0,
		height: ScalePerctFullWidth(67) / 2,
		width: ScalePerctFullWidth(50),
	},
	imageContainerTwo: {
		flex: 1,
		borderWidth: 1,
		borderColor: Colors.bgPrimaryLight,
		borderRightWidth: 0,
		height: ScalePerctFullWidth(67),
		width: ScalePerctFullWidth(50),
	},
	imgOne: {
		height: ScalePerctFullWidth(67) / 2,
		width: ScalePerctFullWidth(50),
	},
	imgTwo: {
		height: ScalePerctFullWidth(67),
		width: ScalePerctFullWidth(50),
	},
});
