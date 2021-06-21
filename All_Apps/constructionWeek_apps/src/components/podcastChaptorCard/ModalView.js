import React, { PureComponent } from "react";
import { StatusBar, TouchableOpacity, View, Text, SafeAreaView } from "react-native";
import Modal from "react-native-modal";
import { ImageViewer } from "../../lib/ImageView";
import { ScalePerctFullWidth, ScalePerctFullHeight } from "../../asset";
import Icon from "react-native-vector-icons/AntDesign";
// import SafeAreaView from "react-native-safe-area-view";

type Props = {
	onPress: Function,
	image: any,
};

export default class ModalView extends PureComponent<Props> {
	render() {
		const { onPress, image } = this.props;
		const images = [{ url: `${image}` }];
		console.log("here");
		return (
			<Modal
				style={{
					flex: 1,
					backgroundColor: "black",
					width: ScalePerctFullWidth(100),
					marginHorizontal: ScalePerctFullWidth(0),
					//marginBottom: ScalePerctFullHeight(-10),
					marginVertical: ScalePerctFullHeight(-0.1),
				}}
				isVisible
				transparent={true}
				onRequestClose={onPress}
				deviceHeight={ScalePerctFullHeight(100)}
				deviceWidth={ScalePerctFullWidth(100)}
				// backdropOpacity={0.9}
				backdropColor={"black"}
				animationType="fade"
			>
				<StatusBar backgroundColor="black" translucent barStyle="light-content" />
				<View style={{ flex: 1 }}>
					<ImageViewer
						imageUrls={images}
						renderIndicator={() => {}}
						// handleClose={onPress}
						renderHeader={() => (
							<TouchableOpacity
								activeOpacity={1.0}
								onPress={onPress}
								style={{
									position: "absolute",
									top: 10,
									zIndex: 2,
									right: 3,
									justifyContent: "flex-end",

									marginTop: ScalePerctFullHeight(2),
									paddingRight: ScalePerctFullWidth(5),
								}}
							>
								<Icon name="close" size={20} color="white" />
							</TouchableOpacity>
							// </View>
						)}
					/>
				</View>
			</Modal>
		);
	}
}
