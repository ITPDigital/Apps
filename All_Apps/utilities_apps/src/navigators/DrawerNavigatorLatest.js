import React, { PureComponent, Component } from "react";
import {
	ScrollView,
	FlatList,
	TouchableOpacity,
	Text,
	StyleSheet,
	View,
	Linking,
	LayoutAnimation,
	UIManager,
	Platform,
} from "react-native";
// import ToggleSwitch from "toggle-switch-react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../redux";
import { Colors, Constants, ScalePerctFullHeight, Images } from "../asset";
import { Line, AlertComp } from "../components";
import { setCurrentUserIdStorage } from "../storage";
import { Analytics, Screen, Events, } from "../Analytics";
import { Icon } from "react-native-vector-icons/Icon";

type Props = {
	navigation: any,
	style: any,
	clearUserAction: Function,
};

const CONTENT = [
	{
		isExpanded: false,
		category_name: 'GCC',
		subcategory: [{ id: 1, val: 'Baharain' }, { id: 2, val: 'Kuwait' }, { id: 3, val: 'Oman' }, { id: 4, val: 'Qutar' }, { id: 5, val: 'Saudi Arabia' }, { id: 6, val: 'UAE' }],
	},
	{
		isExpanded: false,
		category_name: 'INDUSTRIES',
		subcategory: [{ id: 1, val: 'Baharain' }, { id: 2, val: 'Kuwait' }, { id: 3, val: 'Oman' }, { id: 4, val: 'Qutar' }, { id: 5, val: 'Saudi Arabia' }, { id: 6, val: 'UAE' }],
	},
	{
		isExpanded: false,
		category_name: 'PROPERTY',
		subcategory: [{ id: 1, val: 'Baharain' }, { id: 2, val: 'Kuwait' }, { id: 3, val: 'Oman' }, { id: 4, val: 'Qutar' }, { id: 5, val: 'Saudi Arabia' }, { id: 6, val: 'UAE' }],
	},
	{
		isExpanded: false,
		category_name: 'OPINION',
		subcategory: [{ id: 1, val: 'Baharain' }, { id: 2, val: 'Kuwait' }, { id: 3, val: 'Oman' }, { id: 4, val: 'Qutar' }, { id: 5, val: 'Saudi Arabia' }, { id: 6, val: 'UAE' }],
	},
	{
		isExpanded: false,
		category_name: 'LIFESTYLE',
		subcategory: [{ id: 1, val: 'Baharain' }, { id: 2, val: 'Kuwait' }, { id: 3, val: 'Oman' }, { id: 4, val: 'Qutar' }, { id: 5, val: 'Saudi Arabia' }, { id: 6, val: 'UAE' }],
	},
	{
		isExpanded: false,
		category_name: 'LIST',
		subcategory: [{ id: 1, val: 'Baharain' }, { id: 2, val: 'Kuwait' }, { id: 3, val: 'Oman' }, { id: 4, val: 'Qutar' }, { id: 5, val: 'Saudi Arabia' }, { id: 6, val: 'UAE' }],
	},
	{
		isExpanded: false,
		category_name: 'MARKET',
		subcategory: [{ id: 1, val: 'Baharain' }, { id: 2, val: 'Kuwait' }, { id: 3, val: 'Oman' }, { id: 4, val: 'Qutar' }, { id: 5, val: 'Saudi Arabia' }, { id: 6, val: 'UAE' }],
	},
	{
		isExpanded: false,
		category_name: 'INETRVIEWS',
		subcategory: [{ id: 1, val: 'Baharain' }, { id: 2, val: 'Kuwait' }, { id: 3, val: 'Oman' }, { id: 4, val: 'Qutar' }, { id: 5, val: 'Saudi Arabia' }, { id: 6, val: 'UAE' }],
	},
	{
		isExpanded: false,
		category_name: 'MAGZINE',
		subcategory: [{ id: 1, val: 'Baharain' }, { id: 2, val: 'Kuwait' }, { id: 3, val: 'Oman' }, { id: 4, val: 'Qutar' }, { id: 5, val: 'Saudi Arabia' }, { id: 6, val: 'UAE' }],
	},
	{
		isExpanded: false,
		category_name: 'GALLERY',
		subcategory: [{ id: 1, val: 'Baharain' }, { id: 2, val: 'Kuwait' }, { id: 3, val: 'Oman' }, { id: 4, val: 'Qutar' }, { id: 5, val: 'Saudi Arabia' }, { id: 6, val: 'UAE' }],
	},
	{
		isExpanded: false,
		category_name: 'LATEST NEWS',
		subcategory: [{ id: 1, val: 'Baharain' }, { id: 2, val: 'Kuwait' }, { id: 3, val: 'Oman' }, { id: 4, val: 'Qutar' }, { id: 5, val: 'Saudi Arabia' }, { id: 6, val: 'UAE' }],
	},
	{
		isExpanded: false,
		category_name: 'HISTORY',
		subcategory: [],
	},
	{
		isExpanded: false,
		category_name: 'TERMS OF SERVICE',
		subcategory: [],
	},
	{
		isExpanded: false,
		category_name: 'LOGOUT',
		subcategory: [],
	},
];

class DrawerNavigatorLatest extends PureComponent<Props> {



	constructor(props) {
		super(props);
		if (Platform.OS === 'android') {
			UIManager.setLayoutAnimationEnabledExperimental(true);
		}
		this.state = {
			listDataSource: CONTENT,
			notification: false,
		};
	}

	// onTabPress = (currentIndex, idx, navigation, route) => {
	// 	if (currentIndex !== idx) {
	// 		navigation.navigate(route.routeName);
	// 	}
	// };

	// renderTabBarButton(route: NavigationRoute, idx: any) {
	// 	const { activeTintColor, inactiveTintColor, navigation } = this.props;
	// 	const currentIndex = navigation.state.index;
	// 	const color = currentIndex === idx ? activeTintColor : inactiveTintColor;
	// 	const iconMap = NavigationIconMap.get(route.routeName);
	// 	return (
	// 		<TouchableOpacity
	// 			onPress={() => this.onTabPress(currentIndex, idx, navigation, route)}
	// 			style={styles.tabBarButton}
	// 			key={route.routeName}
	// 		>
	// 			<Icon name={iconMap.icon} size={iconMap.size} color={color} />
	// 		</TouchableOpacity>
	// 	);
	// }

	onMenuPress = (routeName: string) => {
		const { clearUserAction, navigation, setArticleBookmark, setArticleHistory } = this.props;
		if (routeName === "Logout") {
			Analytics.logEvent(Events.auth.logout);
			AlertComp(
				"Confirmation",
				"Are you sure you want to log out?",
				() => {
					// clearUserAction();
					setCurrentUserIdStorage(null);
					navigation.navigate("AuthNavigation");
				},
				true,
				"Logout",
			);
		} else if (routeName === "BookmarkDrawerScreen") {
			setArticleBookmark(true);
			navigation.navigate(routeName);
		} else if (routeName === "TosDrawerScreen") {  
			Linking.openURL(Images.terms_link);
		} else if (routeName === "HelpDrawerScreen") {
			Linking.openURL(Images.contact_us_link);
		} else if (routeName === "SettingsDrawerScreen") {
			//setArticleBookmark(true);
			// navigation.navigate(routeName);
		} else if (routeName === "HistoryDrawerScreen") { 
			setArticleHistory(true);
			navigation.navigate(routeName);
		} else {
			navigation.navigate(routeName);
		}
	};

	renderItem = (item: any) => {
		// const { notification } = this.state;
		const commonRenderTitle = () => {
			// if (item.title === "Settings") {
			// 	return (
			// 		<TouchableOpacity
			// 			style={styles.drawerButton}
			// 			onPress={() => {
			// 				this.onPress(item.routeName);
			// 			}}
			// 			activeOpacity={1.0}
			// 		>
			// 			<Text style={styles.text}>Notification</Text>
			// 			<View style={styles.toggleButton}>
			// 				<ToggleSwitch
			// 					isOn={notification}
			// 					onColor={Colors.bodyPrimaryVarient}
			// 					offColor={Colors.bgTertiaryLight}
			// 					label=""
			// 					labelStyle={styles.text}
			// 					size="small"
			// 					onToggle={isOn => this.setState({ notification: isOn })}
			// 				/>
			// 			</View>
			// 		</TouchableOpacity>
			// 	);
			// }
			return (
				<TouchableOpacity
					style={styles.drawerButton}
					onPress={() => {
						this.onMenuPress(item.routeName);
					}}
				>
					<Text style={styles.text}>{item.title}</Text>
				</TouchableOpacity>
			);
		};
		return commonRenderTitle();
	};

	renderSeperator = () => {
		return <Line style={styles.seperator} />;
	};

	updateLayout = index => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		const array = [...this.state.listDataSource];
		array.map((value, placeindex) =>
			placeindex === index
				? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
				: (array[placeindex]['isExpanded'] = false)
		);
		this.setState(() => {
			return {
				listDataSource: array,
			};
		});
	};

	

	render() {
		const { style } = this.props;
		return (
			// <ScrollView
			// 	style={[styles.container, style]}
			// 	contentContainerStyle={styles.contentContainerStyle}
			// >
			// 	{/* <FlatList
			// 		style={StyleSheet.flatten([styles.listContainerTop, this.props.style])}
			// 		contentContainerStyle={styles.listContentContainerStyle}
			// 		renderItem={({ item }) => this.renderItem(item)}
			// 		data={Constants.drawerTopData}
			// 		keyExtractor={item => item.routeName}
			// 		ItemSeparatorComponent={this.renderSeperator}
			// 	/> */}
			// 	{this.renderItem(Constants.drawerHistoryData)}
			// 	{this.renderSeperator()}

			// 	{this.renderItem(Constants.drawerGCCData)}
			// 	{this.renderSeperator()}
			// 	{this.renderItem(Constants.drawerMarketsData)}
			// 	{this.renderSeperator()}

			// 	{this.renderItem(Constants.drawerOpinionData)}
			// 	{this.renderSeperator()}
			// 	{this.renderItem(Constants.drawerIndustriesData)}
			// 	{this.renderSeperator()}

			// 	{this.renderItem(Constants.drawerLifestyleData)}
			// 	{this.renderSeperator()}
			// 	{this.renderItem(Constants.drawerPropertyData)}
			// 	{this.renderSeperator()}



			// 	{this.renderItem(Constants.drawerBookmarkData)}
			// 	{this.renderSeperator()}
			// 	{/* {this.renderItem(Constants.drawerSettingsData)}
			// 	{this.renderSeperator()} */}
			// 	{this.renderItem(Constants.drawerHelpData)}
			// 	{this.renderSeperator()}
			// 	{this.renderItem(Constants.drawerTosData)}
			// 	{this.renderSeperator()}
			// 	{this.renderItem(Constants.drawerMiddleData)}
			// 	{this.renderSeperator()}
			// 	{this.renderItem(Constants.drawerLogoutData)}
			// 	{this.renderSeperator()}
			// 	{/* <FlatList
			// 		style={StyleSheet.flatten([styles.listContainer, this.props.style])}
			// 		contentContainerStyle={styles.listContentContainerStyle}
			// 		renderItem={({ item }) => this.renderItem(item)}
			// 		data={Constants.drawerBottomData}
			// 		keyExtractor={item => item.routeName}
			// 		ItemSeparatorComponent={this.renderSeperator}
			// 	/>*/}
			// </ScrollView>
			<ScrollView
			style={styles.container}
			>
				{this.state.listDataSource.map((item, key) => (
					<ExpandableItemComponent
						key={item.category_name}
						onClickFunction={this.updateLayout.bind(this, key)}
						item={item}
					/>

				))}

			</ScrollView>
		);
	}
}


class ExpandableItemComponent extends Component {
	//Custom Component for the Expandable List
	constructor() {
		super();
		this.state = {
			layoutHeight: 0,
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.item.isExpanded) {
			this.setState(() => {
				return {
					layoutHeight: null,
				};
			});
		} else {
			this.setState(() => {
				return {
					layoutHeight: 0,
				};
			});
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		if (this.state.layoutHeight !== nextState.layoutHeight) {
			return true;
		}
		return false;
	}

	
	

	render() {
		return (  
			<View>
				{/*Header of the Expandable List Item*/}  
				<TouchableOpacity
					activeOpacity={0.8} 
					 onPress={() => {
						this.onMenuPress('HistoryDrawerScreen');
					}}
					style={styles.header}>
					<Text style={styles.headerText}>{this.props.item.category_name}</Text>
					{/* <View style={styles.separator_header} /> */}

				</TouchableOpacity>
	
		
			</View>
		);
	}
}

function mapStateToProps() {
	return {};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(DrawerNavigator);

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#ddd', 
		flex: 1,
		flexDirection: "column",
		width: 300,
		//backgroundColor: 'red',
		paddingTop: 30,
	},

	header: {
		backgroundColor: '#ddd',
		padding: 16,
	},
	headerText: {
		fontSize: 16,
		fontWeight: '500',
	},
	separator: {
		height: 0.5,
		backgroundColor: '#808080',
		width: '95%',
		marginLeft: 16,
		marginRight: 16,
	},
	separator_header: {
		height: 0.5,
		backgroundColor: '#808080',
		width: '90%',
		marginLeft: 10,
		marginRight: 10,
		marginTop: 18,
	},
	text: {
		fontSize: 16,
		color: '#000',
		padding: 20,
	},
	content: {
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: '#fff',
	},
	contentContainerStyle: {
		flex: 1,
		alignItems: "flex-start",
		paddingTop: ScalePerctFullHeight(10),
		//justifyContent: "center",
	},
	listContainer: {
		flex: 1,
		alignSelf: "stretch",
		paddingVertical: 30,
	},
	listContainerTop: {
		flex: 1,
		alignSelf: "stretch",
		paddingVertical: 30,
	},
	listContentContainerStyle: {
		flex: 1,
		justifyContent: "center",
	},
	drawerButton: {
		flexDirection: "row",
		paddingVertical: 30,
		alignSelf: "stretch",
		marginLeft: 46,
	},
	toggleButton: {
		marginLeft: 100,
	},
	text: {
		color: Colors.bodyPrimaryLight,
		fontSize: 12,
		fontFamily: "BentonSans Bold",
	},
	tabBarButton: {
		justifyContent: "center",
		alignItems: "center",
	},
	// seperator: {
	// 	borderBottomWidth: 0.5,
	// 	alignSelf: "stretch",
	// 	marginLeft: 46,
	// },
});
