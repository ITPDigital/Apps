import React, { Component } from "react";
import SvgUri from "react-native-svg-uri";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { Images, ScalePerctFullHeight, ScalePerctFullWidth, Colors, Metrics } from "../../asset";
import Icon from "../../asset/fonts/icons";

export default class BottomBar extends Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {

		const { onPress, title, style, disabled, navigation, ...props } = this.props;
		return (
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.tabBarButton}
					onPress={() => navigation.navigate("HomeTabScreen")}
				>
					{/* <Icon name={Images.home} size={20} color={"black"} /> */}
					<Image
						resizeMode="contain"
						source={Images.homeRed}
						style={{
							width: ScalePerctFullWidth(20),
							height: Metrics.isTablet
								? ScalePerctFullHeight(2)
								: ScalePerctFullHeight(3),
						}}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.tabBarButton}
					onPress={() => navigation.navigate("VideoTabScreen")}
				>
					{/* <Icon name={Images.play} size={20} color={"black"} /> */}
					<Image
						resizeMode="contain"
						source={Images.videoRed}
						style={{
							width: ScalePerctFullWidth(20),
							height: Metrics.isTablet
								? ScalePerctFullHeight(2)
								: ScalePerctFullHeight(3),
						}}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.tabBarButton} 
					onPress={() => navigation.navigate("PodcastTabScreen")}
				>
					<Image
						resizeMode="contain"
						source={Images.podcastRed}
						style={{
							width: ScalePerctFullWidth(20),
							height: Metrics.isTablet
								? ScalePerctFullHeight(2)
								: ScalePerctFullHeight(3),
						}}
					/>
					{/* <Icon name={Images.podcast} size={20} color={"black"} /> */}
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.tabBarButton}
					onPress={() => navigation.navigate("MagazineTabScreen")}
				>
					{/* <Icon name={Images.book} size={20} color={"black"} /> */}
					<Image
						resizeMode="contain"
						source={Images.bookRed}
						style={{
							width: ScalePerctFullWidth(20),
							height: Metrics.isTablet
								? ScalePerctFullHeight(2)
								: ScalePerctFullHeight(3),
						}}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						navigation.openDrawer();
					}}
					style={styles.tabBarButton}
					key="berguer"
				>
					<Image
						resizeMode="contain"
						source={Images.bergurRed}
						style={{
							width: ScalePerctFullWidth(20),
							height: Metrics.isTablet
								? ScalePerctFullHeight(2)
								: ScalePerctFullHeight(3),
						}}
					/>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({ 
	container: {
		height: 52,
		backgroundColor: '#fff',  
		flexDirection: "row",
		alignItems: "stretch",
		justifyContent: "space-evenly", 
		borderTopWidth: Metrics.LINE_WIDTH,
		borderColor: Colors.linePrimary,
		paddingBottom: Metrics.isTablet ? null : ScalePerctFullWidth(2),
		// backgroundColor: "red",
		// paddingTop: 10,
	},
	tabBarButton: {
		justifyContent: "center",
		flex: 1,
		alignItems: "center",
	},
});
