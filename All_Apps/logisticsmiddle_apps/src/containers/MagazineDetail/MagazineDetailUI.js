import React, { useRef, useEffect } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ImageBackground,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator,
	Animated
} from "react-native";
import ImageLoad from "react-native-image-placeholder";
import { ProfileHeader } from "../../components";
import { Metrics, Colors, ScalePerctFullWidth, Images } from "../../asset";

type Props = {
	data: any,
};

export default function MagazineListUI(props: Props) {
	const { data, navigation, onItemPress, isBrandId, onDownloadPress } = props;
	console.log("MAGAZINESDATA"+data);
	const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

	React.useEffect(() => {
		Animated.timing(
		  fadeAnim,
		  {
			toValue: 1,
			duration: 3000,  
		  }
		).start();
	  }, [fadeAnim])

	return (
		<View style={styles.container}> 
			<ProfileHeader
				navigation={navigation}
				onBack={() => navigation.goBack()}
				title=""
				isBottomBorder={false}
				bgColor={Colors.bgPrimaryLight} 
				contentColor='#fff'
				style={{ backgroundColor: '#fff'}}
			/>
			{data && (
				<Animated.ScrollView style={[styles.dataView,{opacity: fadeAnim,     transform: [{
					translateY: fadeAnim.interpolate({
					  inputRange: [0, 1], 
					  outputRange: [150, 0.5]  // 0 : 150, 0.5 : 75, 1 : 0
					}),
				  }],}]}>
					{/* <View style={styles.imageView}> */}
					<TouchableOpacity onPress={onDownloadPress} style={styles.imageView}>
						<ImageLoad
							resizeMode={"contain"}
							style={styles.imageOne}
							placeholderStyle={styles.imageOne}
							isShowActivity={false}
							loadingStyle={{ size: "large", color: "grey" }}
							source={{
								uri: data.field_image,
							}}
							placeholderSource={Images.protrait}
							borderRadius={4}
						/>
					</TouchableOpacity>
					{/* </View> */}
					<View style={styles.btnView}>
						<ImageBackground
							resizeMode={"contain"}
							style={styles.imageTwo}
							placeholderStyle={styles.imageTwo}
							isShowActivity={false}
							loadingStyle={{ size: "large", color: "grey" }}
							// source={Images.downloadButton}
							// placeholderSource={Images.downloadButton}
							borderRadius={4} 
						> 
							<TouchableOpacity 
								onPress={onDownloadPress}
								style={styles.downloadView}
							>
								<Text style={styles.btnText}>{"Read More"}</Text>
							</TouchableOpacity>
						</ImageBackground>
					</View>
					{/* <View style={{ flex: 1, marginTop: 30 }} /> */}
					{/* {isBrandId && (
						<TouchableOpacity onPress={onItemPress} style={styles.clickHereView}>
							<Text style={styles.text} onPress={onItemPress}>
								<Text style={styles.clickHere} onPress={onItemPress}>
									{"Click here"}
								</Text>
								{" for previous issues"}
							</Text>
						</TouchableOpacity>
					)} */}
				</Animated.ScrollView>
			)}
			{!data && (
				<View style={styles.loadingView}>
					<ActivityIndicator size="large" color={Colors.bodyPrimaryLight} />
				</View>
			)}
		</View>
	);
}

const imgWidth = ScalePerctFullWidth(100) - 80;
const imgHeight = imgWidth * 1.37;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	dataView: {
		flex: 1,
	},
	loadingView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	imageView: {
		margin: 20,
		width: ScalePerctFullWidth(100) - 40,
		padding: 20,
		height: imgHeight + 70,
		backgroundColor: 'brown', 
		borderRadius: 10,
		marginBottom: 57,
	},
	imageOne: {
		width: ScalePerctFullWidth(100) - 80,
		height: imgHeight,
	},
	imageTwo: {
		width: 200,
		// height: 80,
		backgroundColor:'#f27c00',    
		borderRadius:50  
	},
	btnView: {
		position: "absolute",
		zIndex: 1,
		top: imgHeight + 50, 
		right: 0,
		left: 0,
		width: ScalePerctFullWidth(100),
		height: 50,
		alignItems: "center",
		flexDirection: "column",
		
	},
	downloadView: {
		marginTop: 18,
		paddingVertical: 10,
		paddingHorizontal: 10,
		justifyContent:'center',
		alignItems:'center',
	},
	btnText: {
		fontFamily: "BentonSans Bold",
		fontSize: 14,
		color: '#fff',
		textAlign: "center",
		alignSelf: "center",
	},
	clickHereView: {
		marginTop: 10,
		marginBottom: 33,
		alignSelf: "stretch",
		paddingVertical: 10,
		paddingHorizontal: 10,
		zIndex: 2,
	},
	text: {
		fontFamily: "BentonSans Regular",
		fontSize: 12,
		color: Colors.bodyPrimaryLight,
		textAlign: "center",
		alignSelf: "stretch",
	},
	clickHere: {
		fontFamily: "BentonSans Bold",
		fontSize: 12,
		color: Colors.bodyPrimaryLight,
		textDecorationLine: "underline",
	},
	banner: {
		width: ScalePerctFullWidth(100),
		height: 50,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	sectionHeader: {
		paddingTop: 30,
		marginHorizontal: 20,
		paddingBottom: 0,
		fontFamily: "BentonSans Bold",
		color: Colors.bgSecondaryVarient,
		fontSize: Metrics.SMALL_TEXT_SIZE,
	},
	saveText: {
		marginLeft: 30,
		marginRight: 15,
		color: Colors.bodyPrimaryLight,
		fontFamily: "BentonSans Bold",
	},
	subscribeText: {
		marginLeft: 15,
		marginRight: 30,
		color: Colors.bodyPrimaryLight,
		fontFamily: "BentonSans Bold",
		flexWrap: "wrap",
		textAlign: "right",
		flex: 1,
	},
});
