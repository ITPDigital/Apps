import React from "react";
import {
	StyleSheet,
	View,
	ActivityIndicator,
	FlatList,
	Text,
	ImageBackground,
	TouchableOpacity,
} from "react-native";
import { ListLoading, ProfileHeader, AnimatedHeaderList } from "../../components";
import {
	TemplateConfig,
	Metrics,
	Constants,
	Colors,
	ScalePerctFullWidth,
	Images,
} from "../../asset";
import MagazineListItem from "./MagazineListItem";
import TabletMagazineListItem from "./TabletMagazineListItem";

type Props = {
	data: any,
	loading: boolean,
	refresh: boolean,
};

const renderbanner = () => {
	return (
		<ImageBackground source={Images.banner} resizeMode={"stretch"} style={[styles.banner]}>
			<Text style={styles.saveText}>{"Save Up to 70%"}</Text>
			<Text style={styles.subscribeText}>{"Subscribe all the magazine today!"}</Text>
		</ImageBackground>
	);
};

export default function MagazineListUI(props: Props) {
	const { data, onItemPress, loading, refresh, onRefresh, onEndReached, navigation } = props;
	console.log("magazine data", data);
	return (
		// <View style={styles.container}>
		// 	<ProfileHeader
		// 		navigation={navigation}
		// 		onBack={() => navigation.goBack()}
		// 		title="Magazine"
		// 		isBottomBorder
		// 	/>
		// 	{renderbanner()}
		// 	<FlatList
		// 		data={data}
		// 		keyExtractor={(x, i) => i.toString()}
		// 		onEndReachedThreshold={50}
		// 		onEndReached={() => onEndReached()}
		// 		onRefresh={() => onRefresh()}
		// 		refreshing={refresh}
		// 		// ItemSeparatorComponent={() => <View />}
		// 		// ListHeaderComponent={() => <View style={styles.header} />}
		// 		ListFooterComponent={() => <ListLoading loading={loading} refresh={refresh} />}
		// 		renderItem={({ item, index }) => {
		// 			return Metrics.isTablet ? (
		// 				<TabletMagazineListItem data={item} index={index} onPress={onItemPress} />
		// 			) : (
		// 				<MagazineListItem data={item} index={index} onPress={onItemPress} />
		// 			);
		// 		}}
		// 	/>
		// </View>
		<AnimatedHeaderList
			header={() => (
				<View>
					<ProfileHeader
						navigation={navigation}
						onBack={() => navigation.goBack()}
						title="Magazine"
						isBottomBorder
						color="#fff"  
					/>
					{renderbanner()}
				</View>
			)}
			flatListProps={{
				data: data,
				keyExtractor: (x, i) => i.toString(),
				onEndReachedThreshold: 50,
				onEndReached: () => onEndReached(),
				onRefresh: () => onRefresh(),
				refreshing: refresh,
				ListFooterComponent: () => <ListLoading loading={loading} refresh={refresh} />,
				renderItem: ({ item, index }) => {
					return Metrics.isTablet ? (
						// <View></View>
						<TabletMagazineListItem data={item} index={index} onPress={onItemPress} />
					) : (
						// <View></View>    
						<MagazineListItem data={item} index={index} onPress={onItemPress} />
					);
				},
			}}
			headerHeight={Metrics.HEADER_HEIGHT + 50}
		/>
	);
}

const mobileStyles = StyleSheet.create({
	container: {
		flex: 1,
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
		marginLeft: 10,
		marginRight: 5,
		color: Colors.bodyPrimaryLight,
		fontFamily: "BentonSans Bold",
	},
	subscribeText: {
		marginLeft: 5,
		marginRight: 10,
		color: Colors.bodyPrimaryLight,
		fontFamily: "BentonSans Bold",
		flexWrap: "wrap",
		textAlign: "right",
	},
});

const tabStyles = StyleSheet.create({
	container: {
		flex: 1,
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
		marginRight: ScalePerctFullWidth(5),
		color: Colors.bodyPrimaryLight,
		fontFamily: "BentonSans Bold",
	},
	subscribeText: {
		marginLeft: ScalePerctFullWidth(5),
		marginRight: ScalePerctFullWidth(35),
		color: Colors.bodyPrimaryLight,
		fontFamily: "BentonSans Bold",
		flexWrap: "wrap",
		textAlign: "right",
	},
});

const styles = Metrics.isTablet ? tabStyles : mobileStyles;
