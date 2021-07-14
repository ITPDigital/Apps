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
	I18nManager,
} from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';

// import ToggleSwitch from "toggle-switch-react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../redux";
import { Colors, Constants, ScalePerctFullHeight } from "../asset";
import { Line, AlertComp } from "../components";
import { setCurrentUserIdStorage } from "../storage";
import { Analytics, Screen, Events } from "../Analytics";
import { getMenuTopics } from '../storage';

import {
	setTopicId,
	setTopicName,
} from '../storage/AsyncStore';

type Props = {
	navigation: any,
	style: any,
	clearUserAction: Function,
	menuTopics: any,
};

let newarr = [
	{
		"name": "History",
		"id": 0,
		"sub": [

		],
		"type": "topic",
		"isExapnded": false
	},
	  {
		"name": "Bookmarks",
		"id": 0,
		"sub": [

		],
		"type": "topic",
		"isExapnded": false
	  },
	  {
		"name": "Terms & Conditions",
		"id": 0,
		"sub": [

		],
		"type": "topic",
		"isExapnded": false
	  },
	{
		"name": "Logout",
		"id": 0,
		"sub": [

		],
		"type": "topic",
		"isExapnded": false
	}
];
let previousExpandedIndex;
class DrawerNavigator extends PureComponent<Props> {
	constructor(props) {
		super(props);
		if (Platform.OS === 'android') {
			UIManager.setLayoutAnimationEnabledExperimental(true);
		}
		this.state = {
			notification: false,
			newMenuTopics: [],
			listDataSource: [],

		};
		console.log("withnavigation drwer:" + JSON.stringify( this.props.navigation.state))

	}

	componentDidMount = () => {
		console.log("incomponentdidmount");
		const { menuTopics } = this.state;

		console.log('async func', getMenuTopics());
		getMenuTopics()
			.then((items) => {
				console.log('incomponentdidmount', items);
				const item = JSON.parse(items);
				console.log('incomponentdidmount', item.menuTopics);
				this.setState({
					newMenuTopics: [...item.menuTopics]
				}, () => {
					this.state.newMenuTopics.push(...newarr);
					console.log("incomponentdidmount2", this.state.newMenuTopics);
				})

				// this.setState({menuTopics: item.menuTopics}, function () {
				//   if (this.state.menuTopics.length === 0) {
				// 	console.log('Menu API is calling from navigator');
				// 	MenuTopics('100', this.onSuccess, this.onFailure, this.onError);
				//   }
				// });
			})
			.catch((error) => console.log('error in asyc', error));


	};



	

	renderSeperator = () => {
		return <Line style={styles.seperator} />;
	};

	updateLayout = (index, item) => {
		//console.log("notexpanded", item.sub)
		const { navigation, screenProps,setArticleHistory, setArticleBookmark, clearUserAction } = this.props;


		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		const array = [...this.state.newMenuTopics];
		// array.map((value, placeindex) =>
		// 	placeindex === index
		// 		? (array[placeindex]['isExapnded'] = !array[placeindex]['isExapnded'])
		// 		: (array[placeindex]['isExapnded'] = false)
		// );

		// if(previousExpandedIndex && previousExpandedIndex != index){
		// array[previousExpandedIndex]['isExapnded'] = !array[previousExpandedIndex]['isExapnded'];
		// }

		previousExpandedIndex = index;
		array[previousExpandedIndex]['isExapnded'] = !array[previousExpandedIndex]['isExapnded'];
		

		if (item.sub.length == 0) {
			console.log("notexpandeditem:" + item.name)
			//alert("NAME" +item.name)

			if (item.name == 'Logout') {
				Analytics.logEvent(Events.auth.logout);
				AlertComp(
					"Confirmation",
					"Are you sure you want to log out?",
					() => {
						// clearUserAction();
						setCurrentUserIdStorage(null);
						//navigation.navigate("AuthNavigation");		
						navigation.navigate("LoginAuthScreen");


					},
					true,
					"Logout",
				);
			} else if (item.name == "Bookmarks") {
				setArticleBookmark(true);
				navigation.navigate('BookmarkDrawerScreen')
			}else if(item.name == "Terms & Conditions"){
				Linking.openURL("https://www.itp.com/terms");
			}else {
				// setArticleHistory(true);
				navigation.navigate('HistoryDrawerScreen');
				setTopicId(item.id);
				setTopicName(item.name);

				// setArticleHistory(true);
				// navigation.navigate('HistoryDrawerScreen');
			}



		} else {
			console.log("expanded", item.sub)
		}

		this.setState(() => {
			return {
				newMenuTopics: array
			};
		});
	};



	render() {
		const { style, menuTopics } = this.props;
		return (
			<ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
				style={styles.container}
			>

				{this.state.newMenuTopics.map((item, key) => (
					<ExpandableItemComponent
						key={item.id}
						onClickFunction={this.updateLayout.bind(this, key, item)}
						//onSubItemClick={this.subItemClickFunction()}
						item={item}
						{...this.props}
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
		console.log("nextProps.item.isExapnded: "+ nextProps.item.isExapnded)

		if ( nextProps.item.isExapnded) {
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
		// if (nextProps.item.isExapnded) {
		// 	this.setState(() => {
		// 		return {
		// 			layoutHeight: null,
		// 		};
		// 	});
		// } else {
		// 	this.setState(() => {
		// 		return {
		// 			layoutHeight: 0,
		// 		};
		// 	});
		// }
	}
	shouldComponentUpdate(nextProps, nextState) {
		
		if (this.state.layoutHeight !== nextState.layoutHeight) {
			return true;
		}
		return false;
	}

	subItemClickFunction = (id, name) => {
		setTopicId(id);
		setTopicName(name); 

		const { navigation, screenProps, setArticleHistory } = this.props; 
		// setArticleHistory(true);
		setTimeout(()=>{
			// alert('check here');  
			navigation.navigate('HistoryDrawerScreen');
			// navigation.navigate('HistoryDrawerScreen');   

		},500)
	  


	}

	render() { 
		return (
			<View>
				{/*Header of the Expandable List Item*/}
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={this.props.onClickFunction}
					style={styles.header}> 
					<Text style={styles.headerText}>{this.props.item.name} 	{this.props.item.sub.length > 0?<Icon name="chevron-down" size={14} />:''} </Text>
					<View style={{borderBottomWidth:1, borderColor:'#ccc', paddingBottom:10,}}></View>     
				</TouchableOpacity> 
				<View
					style={{
						height: this.state.layoutHeight, 
						overflow: 'hidden',
					}}>
					{/*Content under the header of the Expandable List Item*/}
					{this.props.item.sub.map((item, key) => (
						<TouchableOpacity
							key={Math.random()}  
							style={styles.content}
							// onPress={() => alert('Id: ' + item.tid + ' val: ' + item.name)}>
							onPress={() => this.subItemClickFunction(item.tid, item.name)}>
							<Text style={{ fontSize: 18, color: '#606070', paddingLeft: 20, paddingVertical: 5, writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' }}>
								{item.name.split('&amp;').join('&')}
							</Text>
							<View style={styles.separator} />
						</TouchableOpacity>
					))}
				</View> 
			
			</View>    
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
)(DrawerNavigator);

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFF',
		flex: 1,
		flexDirection: "column",
		width: 300,
		//backgroundColor: 'red',
		paddingTop: 30,
		paddingBottom: 30
	},

	header: {
		backgroundColor: '#FFF',
		padding: 16,
	},
	headerText: {
		fontSize: 16,
		fontWeight: '500',
		writingDirection:I18nManager.isRTL ? 'rtl' : 'ltr'
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