import React, { Component } from "react";
import { TouchableWithoutFeedback, StyleSheet, StatusBar, View, Text, Modal } from "react-native";
import { ScalePerctFullHeight, ScalePerctFullWidth, Images, Metrics } from "../../asset";
import ImageLoad from "react-native-image-placeholder";
import { ImageViewer } from "../../lib/ImageView";

export default class ImageZoom extends Component {
	state = {
		isModalVisible: false,
	};

	toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

	render() {
		const { showModal, handlePlay, deviceHeight, containerStyle, onPress, image } = this.props;
		const images = [
			{ url: "http://aboutreact.com/wp-content/uploads/2018/07/sample_img.png" },
		];

		return (
			<Modal visible={true} transparent={true}>
				<ImageViewer imageUrls={images} />
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		// backgroundColor: "rgba(0,0,0,0.1)",
	},
	image: {
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullWidth(100),
		// borderRadius: ScalePerctFullWidth(40),
	},
});
