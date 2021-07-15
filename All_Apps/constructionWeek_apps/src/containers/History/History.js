import React, { Component, PureComponent } from "react";
import {
	View,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Text,
	NativeModules,
	Platform,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../redux";
import {
	ProfileHeader,
	Article,
	ListLoading,
	PodcastPlayView,
	AlertComp,
	AnimatedHeaderList,
	BottomBar,
} from "../../components";
import {
	ScalePerctFullWidth,
	ScalePerctFullHeight,
	Colors,
	TemplateConfig,
	Metrics,
	Strings,
} from "../../asset";
import { ShowHistoryApi, ManageBoookmarkApi } from "../../service";
import {TopicsArticleApi} from '../../service/Articles'
import { TabModal } from "../ChaptorPodcastScreen"; 
import { Analytics } from "../../Analytics";
import { getCurrentUserToken,getTagIdStorage, getTopicNameStorage } from "../../storage";
var self = this;
type Props = {
	navigation: any,
};

class History extends PureComponent<Props>  {
	constructor(props) {
		super(props);
		this.state = {
			history: [],
			loading: true,
			refreshKey:  Math.random(), 
			pageNumber: 5,
			manageHistoryLoad: false,
			imageUrl: "https://facebook.github.io/react-native/docs/assets/favicon.png",
			showModal: false,
			flag: false,
			tagid:0,
			topicname:'',
			//item: props.navigation.getParam('item'),
		};
		

		

		//TopicArticleApi(props.user.id, 0, this.onSuccess, this.onFailure, this.onError);

	}

	componentWillMount(){ 
		this._subscribe = this.props.navigation.addListener('didFocus', () => {
			getTagIdStorage().then((tagids)=>{
				console.log("TAGIDIS", tagids);  
				this.setState({ tagid : tagids }) 
				if(this.state.tagid == 0){
					// console.log("TAGIDIS1", tagid);
					// const { user, history, setArticleHistory } = this.props;
	
					// if (history && !prevProps.history) {
						ShowHistoryApi(1, 0, this.onSuccess, this.onFailure, this.onError);
						setArticleHistory(false);
					// } else if (history) {
					// 	setArticleHistory(false); 
					// }
				}else{
					console.log("TAGIDIS2", this.state.tagid);
					TopicsArticleApi(this.state.tagid, this.props.user.id, 0, 'mobile', this.onArticleListSuccess, this.onFailure, this.onError);
				}
	
			});
	
			getTopicNameStorage().then((topicnames)=>{
				// alert('dip');
				this.setState({ topicname: topicnames }) 
			});
		 //Put your Data loading function here instead of my this.LoadData()
		});}

		
	componentDidMount(){ 

		this.getRequiredData();  
		
				// alert('done'+Math.random());  
				getTagIdStorage().then((tagids)=>{
					console.log("TAGIDIS", tagids);  
					this.setState({ tagid : tagids }) 
					if(this.state.tagid == 0){
						// console.log("TAGIDIS1", tagid);
						// const { user, history, setArticleHistory } = this.props;
		
						// if (history && !prevProps.history) {
							ShowHistoryApi(1, 0, this.onSuccess, this.onFailure, this.onError);
							setArticleHistory(false);
						// } else if (history) {
						// 	setArticleHistory(false); 
						// }
					}else{
						console.log("TAGIDIS2", this.state.tagid);
						TopicsArticleApi(this.state.tagid, this.props.user.id, 0, 'mobile', this.onArticleListSuccess, this.onFailure, this.onError);
					}
		
				}); 
		
				getTopicNameStorage().then((topicnames)=>{
					// alert('dip');
					this.setState({ topicname: topicnames }) 
				});

		this.listener = this.props.navigation.addListener("didFocus", this.getRequiredData  );


	}

	getRequiredData(){
  

	}
	
	// shouldComponentUpdate(){

	// 	this.onRefresh();

	// }


	componentWillUpdate(previousProps, previousState) { 

	
		// alert('dip'+previousState.tagid); 

		getTagIdStorage().then((tagids)=>{
			console.log("TAGIDIS", tagids);
			this.setState({ tagid : tagids })   
	

		});    

		getTopicNameStorage().then((topicnames)=>{
			// alert('dip');
			this.setState({ topicname: topicnames })    
		});

 
		this.executeTimeout();
		 
		clearTimeout(firstCall);
		if (previousState.tagid !== this.state.tagid) {
		
			// 
		}
		// Analytics.setCurrentScreen("HISTORY");

		// TopicsArticleApi(this.state.tagid, this.props.user.id, 0, 'mobile', this.onArticleListSuccess, this.onFailure, this.onError);
		// this.onRefresh();
//  alert('dip');
		// const { user, history, setArticleHistory } = this.props;
		// if (history && !prevProps.history) {
		// 	ShowHistoryApi(user.id, 0, this.onSuccess, this.onFailure, this.onError);
		// 	setArticleHistory(false);
		// } else if (history) {  
		// 	setArticleHistory(false);
		// }
	}


	executeTimeout(){  

	 firstCall = setTimeout(() => { 
			alert('test');
			this.onRefresh();    
		}, 1000);
		
	}

	onSuccess = (historyResponse: any) => {
		//alert("alert1");
		console.log("HTMLRESPONSEIS", historyResponse);
		const { flag } = this.state;
		const { setArticleHistory } = this.props;
		if (historyResponse.length === 0) {
			this.setState({ flag: true });
		}
		let updated = [];
		const { history, pageNumber } = this.state;
		const FirstUpdate = [...historyResponse];
		if (pageNumber === 0) {
			updated = [...FirstUpdate];
		} else {
			updated = [...history, ...historyResponse];
		}
		this.setState({
			history: updated,
			loading: false,
			manageHistoryLoad: false,
			// refreshKey: Math.random(),
		});
		setArticleHistory(true);
	};

	onArticleListSuccess = (historyResponse: any) => {
		//alert("alert1");
		console.log("HTMLRESPONSEIS", historyResponse);
		// const { flag } = this.state;
		// const { setArticleHistory } = this.props;
		// if (historyResponse.length === 0) {
		// 	this.setState({ flag: true });
		// }
		// let updated = [];
		// const { history, pageNumber } = this.state;
		// const FirstUpdate = [...historyResponse];
		// if (pageNumber === 0) {
		// 	updated = [...FirstUpdate];
		// } else {
		// 	updated = [...history, ...historyResponse];
		// }
		this.setState({
			history: historyResponse,
			loading: false,
			manageHistoryLoad: false,
			refreshKey: Math.random(),
			tagid:null,
		});
		//setArticleHistory(false);
	};

	renderBottomStrip = () => {
		return (
			<TouchableOpacity
				style={{
					position: "absolute",
					backgroundColor: "red",
					bottom: 0,
					zIndex: 1,
				}}
				onPress={() => this.props.navigation.navigate("PodcastTabScreen")}
			>
				<Text>click here</Text>
			</TouchableOpacity>
		);
	};

	renderBottomStrip2 = () => {
		return (
			<TouchableOpacity
				style={{
					position: "absolute",
					backgroundColor: "red",
					bottom: 50,
					zIndex: 1,
				}}
				onPress={() => this.props.navigation.navigate("VideoTabScreen")}
			>
				<Text>click here</Text>
			</TouchableOpacity>
		);
	};

	renderBottomStrip1 = () => {
		return (
			<TouchableOpacity
				style={{
					position: "absolute",
					backgroundColor: "red",
					bottom: 20,
					zIndex: 1,
				}}
				onPress={() => {
					this.props.navigation.openDrawer();
				}}
			>
				<Text>click here1</Text>
			</TouchableOpacity>
		);
	};

	onManageBookmark = (nId: string, siteKey: string, isBookmarked: boolean, index: number) => {
		const { user, setArticleHistory } = this.props;
		const { history } = this.state;
		const changes = !history[index].bookmark;
		const refresh = Math.random();
		const updated = [...history];
		updated[index].bookmark = changes;
		this.setState({
			history: updated,
			refreshKey: refresh,
		});
		console.log("MANAGE BOOKMARK--> In HISTORY", user.id, nId, siteKey, isBookmarked);
		ManageBoookmarkApi(user.id, nId, siteKey, isBookmarked);
	};

	onFailure = (message: string) => {
		const { navigation } = this.props;
		AlertComp(Strings.authentication.ALERT, "No data found", () => navigation.goBack());
	};

	onError = (error: any) => {
		this.setState({ loading: false });
		const { navigation } = this.props;
		AlertComp(
			Strings.authentication.ALERT,
			"Something went wrong please try again later",
			() => navigation.goBack(),
		);
	};

	onRefresh = () => {
		const { user } = this.props;
		console.log("on Refresh called in history"+this.state.tagid);
		this.setState({ pageNumber: 0, loading: true, history: [] });
		//ShowHistoryApi(user.id, 0, this.onSuccess, this.onFailure, this.onError);
		// this.setState({ manageHistoryLoad: false, refreshKey: Math.random() });
		if(this.state.tagid == 0){
			// alert('1');
			ShowHistoryApi(1, 0, this.onSuccess, this.onFailure, this.onError);			
		}else{
			// alert('2');
			TopicsArticleApi(this.state.tagid, this.props.user.id, 0, 'mobile', this.onArticleListSuccess, this.onFailure, this.onError);
		}
	};

	onItemPress = (nid: number, site: string, item: any) => {
		console.log("itemHistory", item);
		//	const nextScreen = item.video ? "VideoDetail" : "ArticleDisplayHomeScreen";

		const { navigation, user } = this.props;

		const userId = user.id;
		if (item.content_type === "video") {
			item.video
				? Platform.OS === "android"
					? getCurrentUserToken().then((token: string) => {
							NativeModules.BlueConic.setBlueconic(
								item.nid.toString(),
								item.site,
								userId.toString(),
								token,
								item.link,
							);
					  })
					: navigation.navigate("ArticleDisplayHomeScreen", {
							video: item.video,
							nid: item.nid,
							site: item.site,
							refreshKey: Math.random(),
					  })
				: navigation.navigate("ArticleDisplayHomeScreen", {
						video: item.video,
						nid: item.nid,
						site: item.site,
				  });
		} else if (item.content_type === "gallery") {
			navigation.navigate("GalleryHomeScreen", { nid, site });
		} else {
			navigation.navigate("ArticleDisplayHomeScreen", { nid, site });
		}
	};

	isEmpty = () => {
		const { loading, history } = this.state;
		const flag = history.length === 0;
		return flag && !loading ? (
			<View style={styles.emptyContainer}>
				<Text style={styles.emptymessageText}> There is no item to show in history</Text>
			</View>
		) : null;
	};

	renderTabPlayScreen = () => {
		const { showModal } = this.state;
		this.setState({ showModal: !showModal });
	};

	handlePlay = () => {
		const { navigation } = this.props;
		return Metrics.isTablet ? this.renderTabPlayScreen() : navigation.navigate("PlayScreen");
	};

	onPressBrand = (site, brandLogo) => {
		const { navigation } = this.props;
		navigation.navigate("BrandsPage", {
			brand: site,
			brandLogo,
		});
	};

	onEndReached = () => {
		const { user } = this.props;
		const { pageNumber, flag } = this.state;

		const updated = pageNumber + 1;
		this.setState({ pageNumber: updated, loading: true });

		//if (!flag) {
			
			//ShowHistoryApi(user.id, updated, this.onSuccess, this.onFailure, this.onError);
			if(this.state.tagid == 0){
				ShowHistoryApi(1, updated, this.onSuccess, this.onFailure, this.onError);			
			}else{
				TopicsArticleApi(this.state.tagid, this.props.user.id, updated, 'mobile', this.onArticleListSuccess, this.onFailure, this.onError);
			}
	};


	render() {
		const { history, loading, manageHistoryLoad, refreshKey, showModal } = this.state;
		const { navigation, flag } = this.props;
		const noOfColumn = Metrics.isTablet ? 2 : 1;
		const numberOfLines = Metrics.isTablet ? 3 : null;
		console.log("History", history);
		return (
			<View style={styles.container}>
				<AnimatedHeaderList
				key={Math.random()}
					header={() => (
						<ProfileHeader
							onAction={() => {
								navigation.navigate("ProfileDrawerScreen");
							}}
							onBack={() => {
								// navigation.navigate("HomeDrawerScreen");
								navigation.goBack(null);
								
							
							}}
							title={this.state.topicname.split('&amp;').join('&')}
						/>
					)}
					flatListProps={{
						key:Math.random(),
						data: history,
						style: styles.ListItems,
						onRefresh: () => this.onRefresh(),
						refreshing: manageHistoryLoad,
						onEndReachedThreshold: 0.5,
						//onEndReached: () => this.onEndReached(),
						//onEndReached: {},
						keyExtractor: (x, i) => i.toString(),
						contentContainerStyle: styles.contentContainerStyles,
						numColumns: noOfColumn,
						ListFooterComponent: () => <ListLoading loading={loading} key={Math.random()} />,
						renderItem: ({ item, index }) => (

							<Article
								onPress={() => {
									this.onItemPress(item.nid, item.site, item, item.bookmark);
								}}
								onPressBookmark={() =>
									this.onManageBookmark( 
										item.nid,
										item.site,
										item.bookmark,
										index,
									)
								}
								key={Math.random()}
								order={
									TemplateConfig.articleTemplates[
										// Metrics.isTablet ? 15 : item.template 
										index == 0 ? 1:2
									]
								}
								settings={
									TemplateConfig.articleTemplateSettings[
										// Metrics.isTablet ? 14 : item.template
										index == 0 ? 1:2
									]
								}
								data={item} 
								// refreshKey={refreshKey}
								tabContainerStyle={styles.tabContainerStyle}
								numberOfLines={numberOfLines}
								articleContainerStyle={styles.articleContainerStyle}
								imageStyle={styles.imageStyle}
								imagePlaceHolderStyle={styles.imagePlaceHolderStyle}
								articleDescriptionstyle={styles.articleDescriptionstyle}
								onPressBrand={this.onPressBrand}
							//	seperator={styles.lineSeperator}
								bookmarkRequired
								routeFlag={1}
								isFromHomePage={true}
								isIndustryTemplete={true}    
							/>
						),
					}}
					headerHeight={Metrics.HEADER_HEIGHT}
				/>
				{this.isEmpty()}
				{!showModal ? flag && <PodcastPlayView key={Math.random()} onPress={this.handlePlay} /> : null}
				{showModal && <TabModal key={Math.random()} showModal={showModal} handlePlay={this.handlePlay} />}
				{/* <BottomBar navigation={navigation} /> */}
			</View>
		);
	}
}

const mobileStyles = StyleSheet.create({
	container: {
		height: ScalePerctFullHeight(100),
		width: ScalePerctFullWidth(100),
		// backgroundColor:"red"
	},
	authorDetails: {
		flexDirection: "row",
		width: ScalePerctFullWidth(100),
	},
	footer: {
		marginBottom: ScalePerctFullHeight(20),
	},
	ListItems: {
		flex: 1,
	},
	contentContainerStyle: {
		flexGrow: 1,
		justifyContent: "center",
	},
	emptyContainer: {
		height: ScalePerctFullHeight(40),
		width: ScalePerctFullWidth(100),
		justifyContent: "flex-end",
		alignItems: "center",
		alignSelf: "center",
		marginBottom: 300,
	},
	emptymessageText: {
		fontFamily: "BentonSans Regular",
		color: Colors.bgPrimaryDark,
		fontSize: 14,
	},
	image: {
		height: ScalePerctFullWidth(32),
		width: ScalePerctFullWidth(32),
		marginLeft: ScalePerctFullWidth(6),
		// marginTop: ScalePerctFullHeight(4),
		borderRadius: ScalePerctFullWidth(15),
	},
	textInfo: {
		backgroundColor: Colors.bgPrimaryLight,
		width: ScalePerctFullWidth(100),
	},
	followButton: {
		height: ScalePerctFullHeight(6),
		width: ScalePerctFullWidth(44),
		marginLeft: ScalePerctFullWidth(7),
		marginTop: ScalePerctFullHeight(4),
	},
});

const tabStyles = StyleSheet.create({
	container: {
		height: ScalePerctFullHeight(100),
		width: ScalePerctFullWidth(100),
	},
	authorDetails: {
		flexDirection: "row",
		width: ScalePerctFullWidth(100),
	},
	footer: {
		marginBottom: ScalePerctFullHeight(20),
	},
	ListItems: {
		flex: 1,
	},
	contentContainerStyle: {
		flexGrow: 1,
		justifyContent: "center",
	},
	image: {
		height: ScalePerctFullWidth(32),
		width: ScalePerctFullWidth(32),
		marginLeft: ScalePerctFullWidth(6),
		marginTop: ScalePerctFullHeight(4),
		borderRadius: ScalePerctFullWidth(15),
	},
	textInfo: {
		backgroundColor: Colors.bgPrimaryLight,
		width: ScalePerctFullWidth(100),
	},
	followButton: {
		height: ScalePerctFullHeight(6),
		width: ScalePerctFullWidth(44),
		marginLeft: ScalePerctFullWidth(7),
		marginTop: ScalePerctFullHeight(4),
	},
	tabContainerStyle: {
		width: ScalePerctFullWidth(46),
		alignSelf: "flex-start",
		paddingRight: 8,
	},
	articleContainerStyle: {
		width: ScalePerctFullWidth(46),
		//flex: 1,
		//height: ScalePerctFullHeight(32),
	},
	articleDescriptionstyle: {
		height: 80,
		width: ScalePerctFullWidth(46),
	},
	imageStyle: {
		width: ScalePerctFullWidth(14.6),
		height: ScalePerctFullHeight(8.4),
		borderRadius: Metrics.SMALL_RADIUS,
		marginLeft: Metrics.DEFAULT_LIST_PADDING,
		marginTop: 4,
	},
	imagePlaceHolderStyle: {
		width: ScalePerctFullWidth(14.6),
		height: ScalePerctFullHeight(8.4),
		borderRadius: Metrics.SMALL_RADIUS,
	},
	lineSeperator: {
		width: ScalePerctFullWidth(42),
		alignSelf: "flex-start",
		borderBottomWidth: 5,
		borderColor: Colors.linePrimary,
		//marginBottom: 5,
		marginLeft: ScalePerctFullWidth(3),
		// marginRight: ScalePerctFullWidth(10),
	},
	contentContainerStyles: {
		justifyContent: "space-between",
		marginHorizontal: (ScalePerctFullWidth(100) - ScalePerctFullWidth(93)) / 2,
		//alignItems: "flex-start",
	},
});

const styles = Metrics.isTablet ? tabStyles : mobileStyles;  

const mapStateToProps = state => ({ 
	currentRoute: state.currentRoute,
	user: state.user,
	history: state.history,
	flag: state.podcastPlayControl ? state.podcastPlayControl.flag : false,
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps, 
	mapDispatchToProps,
)(History);
// export default History;

History.defaultProps = {};
