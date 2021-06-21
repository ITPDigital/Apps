import React, { PureComponent } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import ImageLoad from "react-native-image-placeholder";
import { ScalePerctFullHeight, ScalePerctFullWidth, Images } from "../../asset";
import { BigImageFooter } from "../../components";

type Props = {
	title: string,
	onPress: Function,
	item: any,
	innerIndex: number,
};

export default class GalleryImage extends PureComponent<Props> {
	constructor() {
		super();
		this.state = {
			ImageWidth: null,
			ImageHeight: null,
		};
	}

	componentDidMount = () => {
		const { item } = this.props;
		Image.getSize(
			item.image_path,
			(Width, Height) => {
				this.setState({ ImageWidth: Width, ImageHeight: Height });
			},
			(errorMs: anyg) => {
				console.log("Error");
			},
		);
	};

	render() {
		const { item, innerIndex } = this.props;
		const { ImageHeight, ImageWidth } = this.state;
		let height = ScalePerctFullHeight(80);

		if (ImageHeight) {
			height = ScalePerctFullWidth((ImageHeight * 100) / ImageWidth);
		}

		return (
			<View
				style={[
					{
						backgroundColor: "black",
						flex: 1,
						justifyContent: "flex-start",
					},
				]}
				key={innerIndex.toString()}
			>
				<ImageLoad
					resizeMode="contain"
					style={{
						width: Dimensions.get("window").width,
						height,
					}}
					placeholderStyle={{
						width: Dimensions.get("window").width,
						height,
					}}
					isShowActivity={false}
					loadingStyle={{ size: "large", color: "grey" }}
					source={
						item.image_path
							? {
									uri: item.image_path,
							  }
							: Images.landscape
					}
					placeholderSource={Images.landscape}
				/>
				<BigImageFooter caption={item.image_caption} author={""} />
			</View>
		);
	}
}
