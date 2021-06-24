import React, { PureComponent } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { NavigationRoute } from "react-navigation";
import SvgUri from "react-native-svg-uri";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../redux";
import Icon from "../asset/fonts/icons";
import {
	Metrics,
	Colors,
	NavigationIconMap,
	Images,
	ScalePerctFullWidth,
	ScalePerctFullHeight,
} from "../asset";
import { PodcastPlayView } from "../components";
import { TabModal } from "../containers/ChaptorPodcastScreen";

type Props = {
	activeTintColor: string,
	inactiveTintColor: string,
	navigation: any,
	flag: boolean,
	style: Object,
};

class TabBarNavigator extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
		};
	}

	onTabPress = (currentIndex, idx, navigation, route) => {
		if (currentIndex !== idx) {
			navigation.navigate(route.routeName);
		}
	};

	handlePlay = () => {
		const { navigation } = this.props;
		Metrics.isTablet ? this.renderTabPlayScreen() : navigation.navigate("PlayScreen");
	};

	renderTabPlayScreen = () => {
		this.setState({ showModal: !this.state.showModal });
	};

	renderTabBarButton(route: NavigationRoute, idx: any) {
		const { activeTintColor, inactiveTintColor, navigation } = this.props;
		const currentIndex = navigation.state.index;
		const color = currentIndex === idx ? activeTintColor : inactiveTintColor;
		const iconMap = NavigationIconMap.get(route.routeName);
		console.log("iconMap", iconMap);
		return (
			<TouchableOpacity
				onPress={() => this.onTabPress(currentIndex, idx, navigation, route)}
				style={styles.tabBarButton}
				key={route.routeName}
			>
				{/* {idx === 0 ? (
					<Icon name={"home"} size={20} color={currentIndex === idx ? "red" : "black"} />
				) : (
					<SvgUri
						width={ScalePerctFullWidth(20)}
						height={ScalePerctFullHeight(3)}
						svgXmlData={
							currentIndex === idx ? activeIcon[iconMap.id] : logo[iconMap.id]
						}
					/>
				)} */}
				{currentIndex === idx ? (
					<Image
						resizeMode="contain"
						source={iconMap.icon}
						style={{
							width: ScalePerctFullWidth(20),
							height: Metrics.isTablet
								? ScalePerctFullHeight(2)
								: ScalePerctFullHeight(3),
						}}
					/>
				) : (
					<Image
						resizeMode="contain"
						source={iconMap.activeIcon}
						style={{
							width: ScalePerctFullWidth(20),
							height: Metrics.isTablet
								? ScalePerctFullHeight(2)
								: ScalePerctFullHeight(3),
						}}
					/>
				)}
			</TouchableOpacity>
		);
	}

	render() {
		const { inactiveTintColor, navigation, style, flag } = this.props;
		const { showModal } = this.state;
		const currentIndex = navigation.state.index;

		const tabBarButtons = navigation.state.routes.map(this.renderTabBarButton.bind(this));
		return (
			<View>
				{!showModal ? flag && <PodcastPlayView onPress={this.handlePlay} /> : null}
				{showModal && (
					<TabModal
						showModal={showModal}
						handlePlay={this.handlePlay}
						styles={{
							width: "100%",
							alignSelf: "center",
							height: "80%",
							justifyContent: "flex-start",
						}}
						containerStyle={{ flex: 0.95, backgroundColor: "rgba(0,0,0,0.1)" }}
						deviceHeight="95%"
						//style={{ flex: 1 }}
					/>
				)}
				<View style={[styles.container, style]}>
					{tabBarButtons}
					<TouchableOpacity
						onPress={() => { 
							navigation.openDrawer();
						}}
						style={styles.tabBarButton}
						key="berguer"
					>
						<Image
							resizeMode="contain"
							source={Images.menuwhite}
							style={{
								width: ScalePerctFullWidth(20),
								height: Metrics.isTablet
									? ScalePerctFullHeight(2)
									: ScalePerctFullHeight(3),
							}}
						/>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: 52, 
		backgroundColor: '#0f4660', 
		flexDirection: "row",
		alignItems: "stretch",
		justifyContent: "space-evenly",
		borderTopWidth: Metrics.LINE_WIDTH,
		borderColor: Colors.linePrimary,
	},
	tabBarButton: {
		justifyContent: "center",
		flex: 1,
		alignItems: "center",
		paddingBottom: Metrics.isTablet ? null : ScalePerctFullWidth(2),
	},
});

function mapStateToProps(state) {
	// state
	return {
		flag: state.podcastPlayControl ? state.podcastPlayControl.flag : false,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(TabBarNavigator);
