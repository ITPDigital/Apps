import React, { PureComponent } from "react";
import { TouchableWithoutFeedback, StyleSheet, StatusBar, Dimensions } from "react-native";
import Modal from "react-native-modal";
import TabletPlayScreen from "./TabletPlayScreen";
import { ScalePerctFullWidth, ScalePerctFullHeight } from "../../asset";

type Props = {
	handlePlay: Function,
};

export default class TabModal extends PureComponent<Props> {
	render() {
		const { handlePlay } = this.props;
		const { height, width } = Dimensions.get("window");
		console.log("height and width", height, width);
		return (
			<Modal
				style={styles.container}
				isVisible
				onBackdropPress={handlePlay}
				deviceHeight={ScalePerctFullHeight(100)}
				deviceWidth={ScalePerctFullWidth(100)}
				onBackButtonPress={handlePlay}
			>
				<StatusBar barStyle="light-content" backgroundColor="#555555" translucent />

				<TouchableWithoutFeedback onPress={handlePlay}>
					<TabletPlayScreen />
				</TouchableWithoutFeedback>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: ScalePerctFullWidth(96),
		height: ScalePerctFullHeight(100),
		//	backgroundColor: "rgba(0,0,0,0.1)",
	},
});
