import React, { PureComponent } from "react";
import { createMaterialTopTabNavigator } from "react-navigation";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../redux";
import { ArticleList } from "../containers";
import { Colors, ScalePerctFullWidth, Metrics, Constants, ScalePerctFullHeight } from "../asset";
import HomeHeaderContainer from "./HomeHeaderContainer";
import { AnimatedHeaderList } from "../components";

type Props = {
	menuTopics: any,
	navigation: any,
};

class HomeMenuNav extends PureComponent<Props> {
	tab = (category: any) => {
		// const screen = this.getTabForCategory(category);
		const screen = props => <ArticleList tid={category.tid} {...props} />;
		return {
			screen,
		};
	};

	tabs(categories) {
		const routes = {};
		categories.forEach((category: any) => {
			routes[category.name] = this.tab(category);
		});
		return routes;
	}

	render() {
		const { menuTopics, navigation } = this.props;
		console.log("Menu Topics", menuTopics);
		const topics = Constants.menuSections.defaultSection.concat(menuTopics);
		const HomeMenuNavigator = createMaterialTopTabNavigator(this.tabs(topics), {
			tabBarPosition: "top",
			lazy: true,
			swipeEnabled: true,
			tabBarOptions: {
				activeTintColor: Colors.bodyPrimaryVarient,
				inactiveTintColor: Colors.bodySecondaryDark,
				style: {
					backgroundColor: Colors.bgPrimaryLight,
					height: 50,
					width: ScalePerctFullWidth(100),
				},
				labelStyle: {
					fontSize: Metrics.MEDIUM_TEXT_SIZE,
					fontFamily: "BentonSans Regular",
				},
				scrollEnabled: true,
				upperCaseLabel: false,
				initialLayout: {
					height: 50,
					width: ScalePerctFullWidth(100),
				},
				indicatorStyle: {
					//backgroundColor: Colors.bodyPrimaryVarient,
					//width: ScalePerctFullWidth(20),
					//marginLeft: ScalePerctFullWidth(5),
					height: 1.5,
				},
				tabStyle: {
					//width: ScalePerctFullWidth(30),
				},
			},
		});

		return (
			// <View style={{ flex: 1 }}>
			// 	<HomeHeaderContainer navigation={navigation} />
			// 	<HomeMenuNavigator screenProps={{ navigation }} />
			// </View>
			<AnimatedHeaderList
				header={() => (
					<HomeHeaderContainer navigation={navigation} color={Colors.bgPrimaryLight} />
				)}
				flatListProps={{
					data: [{ key: 1 }],
					style: styles.ListItems,
					key: "animateFlatList",
					contentContainerStyle: styles.contentContainerStyle,
					keyExtractor: (x, i) => i.toString(),
					renderItem: ({ item, index }) => (
						<View
							style={{
								width: ScalePerctFullWidth(100),
							}}
							key={"tabMenuCont"}
						>
							<HomeMenuNavigator screenProps={{ navigation }} />
						</View>
					),
				}}
				headerHeight={Metrics.HEADER_HEIGHT}
			/>
		);
	}
}

function mapStateToProps(state: any) {
	return {
		menuTopics: state.menuTopics,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(HomeMenuNav);

const styles = StyleSheet.create({
	container: { flex: 1 },
	ListItems: {
		flex: 1,
	},
	contentContainerStyle: {
		flexGrow: 1,
	},
});

// getTabForCategory (category){
//     return () => (<ArticlesList category={category} />);
// }
