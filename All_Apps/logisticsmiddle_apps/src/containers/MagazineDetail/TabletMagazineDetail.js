import React,  { useRef, useEffect }  from "react";
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
import { ProfileHeader, BuildFeedButton } from "../../components";
import { Metrics, Colors, ScalePerctFullWidth, Images, ScalePerctFullHeight } from "../../asset";

type Props = {
	data: any,
};

const renderbanner = () => { 
	return (
		<ImageBackground source={Images.banner} resizeMode={"stretch"} style={[styles.banner]}>
			<Text style={styles.saveText}>{"Save Up to 70%"}</Text>
			<Text style={styles.subscribeText}>{"Subscribe all the magazine today!"}</Text>
		</ImageBackground>
	);
};

export default function TabletMagazinedetail(props: Props) {
	const { data, navigation, onItemPress, isBrandId, onDownloadPress } = props;
	const fadeAnim = useRef(new Animated.Value(0)).current ;
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
				bgColor={Colors.bgPink}
				contentColor={Colors.bgPrimaryDark}
			/>
			{/* {renderbanner()} */}
			{data && (
				<Animated.ScrollView style={[styles.dataView,{opacity: fadeAnim,     transform: [{
					scale: fadeAnim.interpolate({ 
					  inputRange: [0, 1], 
					  outputRange: [0, 1]  // 0 : 150, 0.5 : 75, 1 : 0
					}),
				  }],}]}>
					<TouchableOpacity onPress={onDownloadPress} style={styles.imageView}>
						<ImageLoad
							resizeMode={"stretch"}
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

					{/* <View style={{ flex: 1, marginTop: 30 }} /> */}
				</Animated.ScrollView>
			)}

			{!data && (
				<View style={styles.loadingView}>
					<ActivityIndicator size="large" color={Colors.bodyPrimaryLight} />
				</View>
			)}
			{data && ( 
				<View
					style={{
						position: "absolute",
						bottom: ScalePerctFullHeight(5),
						right: 0,
						left: 0,
						height: ScalePerctFullHeight(5),
						zIndex: 2,
					}}
				>
					<BuildFeedButton
						title="Read More"
						onPress={onDownloadPress}
						style={{
							alignSelf: "center",
							height: ScalePerctFullHeight(3.7),
							width: ScalePerctFullWidth(17),
						}}
					/>
				</View>
			)}
		</View>
	);
}

const imgWidth = ScalePerctFullWidth(100);
const imgHeight = imgWidth * 1.37;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//backgroundColor: Colors.bgPink,
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
		//margin: 20,
		width: ScalePerctFullWidth(100),
		//padding: 20,
		height: imgHeight,
		//backgroundColor: Colors.bgPrimaryLight,
		backgroundColor: "yellow",
		borderRadius: 10,
		//marginBottom: 57,
	},
	imageOne: {
		width: ScalePerctFullWidth(100),
		height: imgHeight,
	},
	imageTwo: {
		width: 200,
		height: 180,
	},
	btnText: {
		fontFamily: "BentonSans Bold",
		fontSize: 10,
		color: Colors.bodyPrimaryDark,
		textAlign: "center",
		alignSelf: "stretch",
	},
	clickHereView: {
		//marginTop: 10,
		//marginBottom: 33,
		//height: ScalePerctFullHeight(8),
		height: ScalePerctFullHeight(2),
		alignSelf: "stretch",
		//paddingVertical: ScalePerctFullHeight(3),
		paddingHorizontal: 10,
		zIndex: 2,
		backgroundColor: "white",
	},
	text: {
		fontFamily: "BentonSans Regular",
		fontSize: 12,
		color: Colors.bodyPrimaryDark,
		textAlign: "center",
		alignSelf: "stretch",
		paddingTop: ScalePerctFullHeight(3.2),
	},
	clickHere: {
		fontFamily: "BentonSans Bold",
		fontSize: 12,
		color: Colors.bodyPrimaryDark,
		textDecorationLine: "underline",
		// backgroundColor: "orange",
	},
	banner: {
		width: ScalePerctFullWidth(100),
		height: 50,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
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
		marginLeft: ScalePerctFullWidth(35),
		marginRight: 15,
		color: Colors.bodyPrimaryLight,
		fontFamily: "BentonSans Bold",
		fontSize: 12,
		lineHeight: 18,
	},
	subscribeText: {
		marginLeft: 15,
		marginRight: ScalePerctFullWidth(35),
		color: Colors.bodyPrimaryLight,
		fontFamily: "BentonSans Bold",
		flexWrap: "wrap",
		textAlign: "right",
		flex: 1,
		fontSize: 12,
		lineHeight: 18,
	},
});
