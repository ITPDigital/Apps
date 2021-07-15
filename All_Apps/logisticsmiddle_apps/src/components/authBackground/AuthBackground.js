import React from "react";
import {
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
	View,
	StatusBar,
	Image,
	Linking,
} from "react-native";
import Video from "react-native-video"; 
import {Metrics, ScalePerctFullHeight, Images, ScalePerctFullWidth } from "../../asset";
import { Button } from "react-native-share";

type Props = {
	children: any, 
};

export default function AuthBackground(props: Props) {
	const { children } = props;

	handleSignUp = () => {
		// const {navigation} = this.props;
		// navigation.navigate('SignUpAuthScreen');
	
		Linking.openURL("https://www.arabianbusiness.com/subscriptions/index.html");
	
	  };

	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
			{children}
			{/* <Video
				source={require("../../asset/Videos/login.mp4")} // Can be a URL or a local file.
				ref={ref => {
					this.player = ref;
				}} // Store reference
				onBuffer={() => {}} // Callback when remote video is buffering
				onError={() => {}} // Callback when video cannot be loaded
				style={styles.backgroundVideo}
				repeat
				muted
				resizeMode="cover"
			/> */}
			<TouchableWithoutFeedback 
				onPress={() => this.handleSignup()}
			>
			<Image
				source={Images.loginScreen}
				resizeMode="contain"
				style={{
					// width: ScalePerctFullWidth(65),
					// height: Metrics.isTablet ? ScalePerctFullHeight(100):ScalePerctFullHeight(100),
					zIndex: -2,
					position: "absolute",
					// alignSelf: 'flex-start',
					top: Metrics.isTablet ? ScalePerctFullHeight(25):ScalePerctFullHeight(25),
					// left: 0,
					// bottom: 150, 
					// right: 0,
				}}
			/>
			</TouchableWithoutFeedback>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { 
		width: "100%",
		height: ScalePerctFullHeight(100),
		alignItems: "center",
		flex: 1,
		backgroundColor: "#fff",
	},
	backgroundVideo: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		zIndex: -1,
		height: ScalePerctFullHeight(100),
	},
});
