import React from "react";
import {
	StyleSheet,
	View,
	ActivityIndicator,
	FlatList,
	Text,
	ImageBackground,
	TouchableOpacity,
	I18nManager,
} from "react-native";
import ImageLoad from "react-native-image-placeholder";
import { ListLoading, ProfileHeader, AnimatedHeaderList } from "../../components";
import {
	TemplateConfig,  
	Metrics,
	Constants,
	Colors,
	ScalePerctFullWidth,
	Images,
	ScalePerctFullHeight,
} from "../../asset";
import MagazineListItem from "./MagazinePrevListItem";
import TabletMagazinePrevListItem from "./TabletMagazinePrevListitem";
import HomeHeaderContainer from "../../navigators/HomeHeaderContainer";

type Props = {
	data: any,
	loading: boolean,
	refresh: boolean,
};

// const renderbanner = (passedItem: any, navigation: any) => {
// 	return (
// 		<TouchableOpacity
// 			onPress={() => {
// 				const item = navigation.getParam("item");
// 				const data = navigation.getParam("data");
// 				navigation.navigate("MagazineSubscriptionHomeScreen", { data, item });
// 			}}
// 		>
// 			<View style={[styles.banner]}>
// 				<View style={[styles.imageView]}>
// 					<ImageLoad
// 						resizeMode={"contain"}
// 						style={styles.imageLeft}
// 						placeholderStyle={styles.imageLeft}
// 						isShowActivity={false}
// 						loadingStyle={{ size: "large", color: "grey" }}
// 						//source={{ uri: passedItem.image }}
// 						placeholderSource={Images.protrait}
// 					/>
// 				</View>
// 				<Text style={styles.subscribeText}>
// 					<Text style={styles.textBold}>{"Subscribe "}</Text>
// 					{/* {`your ${passedItem.title} Issue`} */}
// 				</Text>
// 				{/* <Text style={styles.clickHereText}>{"Click here"}</Text> */}
// 			</View>
// 		</TouchableOpacity>
// 	);
// };

const renderbanner = () => {
	return (
		<ImageBackground source={Images.banner} resizeMode={"stretch"} style={[styles.banner]}>
			{/* <Text style={styles.saveText}>{"Save Up to 70%"}</Text> */}
			<Text style={styles.subscribeText}>{"Subscribe all the magazine today!"}</Text>
		</ImageBackground>
	);
};
export default function MagazineListUI(props: Props) {
	var magazinetitle = I18nManager.isRTL ? "المجلات" : "Magazines"

	const {
		data,
		onItemPress,
		loading,
		refresh,
		onRefresh,
		onEndReached,
		navigation,
		passedItem,
		title,
		isBanner,
	} = props;
	return (
		<AnimatedHeaderList
			header={() => (
				<HomeHeaderContainer navigation={navigation} 
				// color={Colors.bgPrimaryLight}
				title={magazinetitle}
				isCollapsed = {true}
				 />
			)}
			// header={() => (
			// 	<View>
			// 		{/* <ProfileHeader
			// 			navigation={navigation}
			// 			onBack={() => navigation.goBack()}
			// 			title={"Arabian Business"}
			// 			isBottomBorder
			// 		/> */}
			// 		<HomeHeaderContainer navigation={navigation} />

			// 		{/* {isBanner && renderbanner(passedItem, navigation)} */}
			// 	</View>
			// )}
			flatListProps={{
				data: data,
				keyExtractor: (x, i) => i.toString(),
				onEndReachedThreshold: 0.5,
				onEndReached: () => onEndReached(),
				onRefresh: () => onRefresh(),
				style: { paddingTop: ScalePerctFullHeight(1) },
				refreshing: refresh,
				ListFooterComponent: () => <ListLoading loading={loading} refresh={refresh} />,
				renderItem: ({ item, index }) => {
					return Metrics.isTablet ? (
						<TabletMagazinePrevListItem
							data={item}
							index={index}
							onPress={onItemPress}
						/>
					) : (
						<MagazineListItem data={item} index={index} onPress={onItemPress} />
					);
				},
			}}
			headerHeight={Metrics.HEADER_HEIGHT}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	banner: {
		width: ScalePerctFullWidth(100),
		height: 50,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
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
		marginLeft: ScalePerctFullWidth(5),
		marginRight: ScalePerctFullWidth(5),
		color: Colors.bodyPrimaryLight,
		fontFamily: "BentonSans Bold",
	},
	subscribeText: {
		// marginLeft: ScalePerctFullWidth(5),
		// marginRight: ScalePerctFullWidth(5),
		color: Colors.bodyPrimaryLight,
		fontFamily: "BentonSans Bold",
		flexWrap: "wrap",
		textAlign: "center",
	},
	textBold: {
		fontFamily: "BentonSans Bold",
	},
	clickHereText: {
		marginLeft: 5,
		paddingRight: 30,
		color: Colors.bodyPrimaryLight,
		fontFamily: "BentonSans Regular",
		flexWrap: "wrap",
		textAlign: "right",
		fontSize: 10,
		textDecorationLine: "underline",
	},
	imageView: {
		position: "absolute",
		padding: 2,
		width: 39,
		height: 52,
		left: 33,
		top: 7,
		backgroundColor: Colors.bgPrimaryLight,
	},
	imageLeft: {
		width: 35,
		height: 48,
	},
});
