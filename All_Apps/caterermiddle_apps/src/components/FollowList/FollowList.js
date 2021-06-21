import React, { PureComponent } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity, ActivityIndicator} from "react-native";
import { TopicsCard } from "../common";
import {
	Colors,
	ScalePerctFullHeight,
	Metrics,
	ScalePerctFullWidth,
	Constants,
	ListLoading,
} from "../../asset";
import { BuildFeedButton, PagerHeader } from "../../components";

type Props = {
	data: array,
	selectedList:array,
	isTopic: boolean,
	onSelected: function,

};

class FollowList extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			showLoader: props.loading,
			refreshKey:1,
			isAllSelected:false,
			followBrandTrack: props.selectedBrandsList,
			followTrack: props.selectedTopicList,
			selectedTopicList: props.selectedTopicList,
			selectedBrandsList: props.selectedBrandsList,
		};
		this.lastItems = [];
		
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		let newState = {};
		let changed = false;
		if (prevState.selectedTopicList !== nextProps.selectedTopicList) {
			newState.followTrack = nextProps.selectedTopicList;
			newState.selectedTopicList = nextProps.selectedTopicList;
			changed = true;
		}
		if (prevState.selectedBrandsList !== nextProps.selectedBrandsList) {
			newState.followBrandTrack = nextProps.selectedBrandsList;
			newState.selectedBrandsList = nextProps.selectedBrandsList;
			changed = true;
		}
		return changed ? newState : null;
	}

	onFollowTopics = (topic: object) => {
		const newFollowTrack = [];
		let isChanged = false;
		this.state.followTrack.forEach((item: object) => {
			if (item.tid !== topic.tid) {
				newFollowTrack.push(item);
			} else {
				isChanged = true;
			}
		});
		if (!isChanged) {
			newFollowTrack.push(topic);
		}
		this.setState({ followTrack: newFollowTrack });
	};

	onFollowBrand = (topic: object) => {
		const newFollowTrack = [];
		let isChanged = false;
		this.state.followBrandTrack.forEach((item: object) => {
			if (item.nid !== topic.nid) {
				newFollowTrack.push(item);
			} else {
				isChanged = true;
			}
		});
		if (!isChanged) {
			newFollowTrack.push(topic);
		}
		this.setState({ followBrandTrack: newFollowTrack });
	};

	checkFollowStatusTopics = (topicId: number) => {
		const { followTrack } = this.state;
		let found = false;
		followTrack.forEach((item: object) => {
			if (item.tid === topicId) {
				found = true;
			}
		});
		return found;
	};

	checkFollowStatusBrands = (topicId: number) => {
		const { followBrandTrack } = this.state;
		let found = false;
		followBrandTrack.forEach((item: object) => {
			if (item.nid === topicId) {
				found = true;
			}
		});
		return found;
	};

	renderBrandHeaderForTab = () => {
		const { navigation } = this.props;
		return (
			<TouchableOpacity onPress={() => navigation.navigate("HomeDrawerScreen")}>
				<Text style={style.skip}>Skip</Text>
			</TouchableOpacity>
		)
	}

	topicsHeaderForTab = () => {
		const { isTopic } = this.props;
		return (
			<View style={style.textContainer}>
				<Text style={[style.askQuestion, Metrics.isTablet && !isTopic && style.brand]}>
					Which {isTopic ? "News" : "brand"} you want to read?
				</Text>
				{isTopic ? (<Text style={style.pickInfo}>
					Pick atleast 3 topics that interest you. You can add more anytime
				</Text>) :
				null}
				{/* {isTopic ? (
<Text style={style.pickInfo}>
					Pick the topics that interest you. add more at anytime.
				</Text>
				): (
<Text style={style.pickInfo}>
					Pick the topics that interest you. add more at anytime.
				</Text>
				)} */}
				
			</View>
		);
	}

	manageSelect = () => {
		const { isAllSelected } = this.state;
		const { data } = this.props;
		const newRefreshKey = Math.random();
		const updatingFlag = !isAllSelected;
		const updated = isAllSelected ? [] : data;
		this.setState({ followBrandTrack: updated, refreshKey: newRefreshKey, isAllSelected: updatingFlag });
	}

	normalHeadersForTopsAndBrands = (isTopic) => {
		const {navigation, isBack, selectedBrandsList, selectedTopicList } = this.props;
		return (
			isTopic ? (
				<PagerHeader onBack={ isBack ? () => {
					this.setState({ followBrandTrack:selectedBrandsList,
						followTrack: selectedTopicList });
					navigation.navigate("HomeDrawerScreen")} : null } 
					style={style.pageHeader} page={"1"} />
			) : (
				<PagerHeader
					style={style.pageHeader}
					actionLabel={"Skip"}
					onAction={() => {
						this.setState({followBrandTrack: selectedBrandsList,
							followTrack: selectedTopicList });
						navigation.navigate("HomeDrawerScreen");
					}}
					onBack={() => {
						this.setState({followBrandTrack: selectedBrandsList,
							followTrack: selectedTopicList });
						navigation.goBack();
					}}
					page={"2"}
				/>
			)
		)
	}

	topicsList = (data:any) => {
		console.log("followData",data)
		const noOfColumn = Metrics.isTablet ? 4 : 2;
		const { followTrack } = this.state;
		//const loading = data ? false :true;
		return (
			<FlatList
				contentContainerStyle={style.contentContainer}
				numColumns={noOfColumn}
				data={data}
				extraData={[followTrack]}
				keyExtractor={(x, i) => i.toString()}
				horizontal={false}
				onEndReachedThreshold={0.5}
				ListHeaderComponent={() => this.topicsHeaderForTab()}
				ListFooterComponent={() => <View style={style.footer}/>}
				renderItem={({ item }) => (
					<TopicsCard
						isTopic={true}
						containerStyle={style.items}
						isFollowed={this.checkFollowStatusTopics(item.tid)}
						onPress={() => this.onFollowTopics(item)}
						name={item.name}
						field_image={item.field_image}
					/>
				)}
			/>
		);
	}

	brandsList = ( data:any ) => {
		const noOfColumn = Metrics.isTablet ? 4 : 2;
		const { refreshKey } = this.state;
		//const loading = data ? false :true;
		return ( 
			<FlatList
				contentContainerStyle={style.contentContainer}
				numColumns={noOfColumn}
				data={data}
				extraData={[this.state.followBrandTrack, refreshKey]}
				keyExtractor={(x, i) => i.toString()}
				horizontal={false}
				onEndReachedThreshold={0.5}
				ListHeaderComponent={() => this.topicsHeaderForTab()}
				ListFooterComponent={() => <View style={style.footer}/>}
				renderItem={({ item }) => (
					<TopicsCard
						isTopic={false}
						containerStyle={style.items}
						isFollowed={this.checkFollowStatusBrands(item.nid)}
						onPress={() => this.onFollowBrand(item)}
						name={item.title}
						field_image={item.field_square_logo}
					/>
				)}
			/>
		);
	}

	render() {
		const { data, isTopic, onSelected, preferenceLoading } = this.props;
		const { followTrack, followBrandTrack, isAllSelected } = this.state;
		return (
			<View style={style.container}>
				<View style={style.hederInfoContainer}>
					{this.normalHeadersForTopsAndBrands(isTopic)}
				</View>
				<View >
					{isTopic ? this.topicsList(data) : this.brandsList(data) }
					{preferenceLoading ? (
						<View style={style.indicator}>
							<ActivityIndicator size="large" color="white" />
						</View>
					) : null}
				</View>
				{ isTopic ? (this.state.followTrack.length >= Constants.topics.minimumTopics
					&& (
						<View style={style.BuildFeedButton}>
							<BuildFeedButton 
								style={style.button}
								onPress={() => {
									this.setState({ showLoader: true });
									onSelected(followTrack);
								}}
							/>
						</View>
					)) : (
					<View style={style.BuildFeedButton} >
						<BuildFeedButton 
							style={style.button}

							onPress={() => {
								this.setState({ showLoader: true});
								onSelected(followBrandTrack);

							}}
						/>
							{
								Metrics.isTablet ? 
							<Text style={style.selectAllStyle}
								onPress={() => this.manageSelect()}
							>{isAllSelected ? "Deselect All" : "Select All"}</Text>
							:
							null
							}
						
					</View>
				)}

			</View>
		);
	}
}



const tabStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.bgLightBlack,
		alignItems: "center",
	},
	skip: {
		color: Colors.bodySecondaryVarient,
		marginTop: ScalePerctFullHeight(4),
		marginLeft: ScalePerctFullWidth(90),
	},
	pageHeader: {
		backgroundColor: Colors.bgLightBlack,
	},
	askQuestion: {
		marginTop: ScalePerctFullHeight(8),
		fontSize: 36,
		color: Colors.bgPrimaryLight,
		fontFamily: "BentonSans Regular",
		lineHeight:36,
		alignSelf:"center"
	},
	pickInfo: {
		marginTop: ScalePerctFullHeight(1),
		marginBottom: ScalePerctFullHeight(4),
		fontSize: 12,
		color: Colors.bgPrimaryLight,
		alignSelf: "center",
		fontFamily: "BentonSans Regular",

	},
	brand: {
		marginTop: ScalePerctFullHeight(4),
	},
	BuildFeedButton: {
		position: "absolute",
		bottom: ScalePerctFullHeight(6),
	},
	item: {
		margin: 5,
	},
	header: {
		marginTop: 20,
	},
	footer: {
		marginBottom: ScalePerctFullHeight(25),
		backgroundColor: "#00000000",
	},
	indicator: {
		position: "absolute",
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#00000080",
	},
	hederInfoContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	textContainer: {
		//width: ScalePerctFullWidth(100),
		alignItems: "center",
		//alignItems: "flex-start",
		//marginBottom: 50,
	},
	contentContainer: {
		paddingHorizontal: ScalePerctFullWidth(15),
	},
	selectAllStyle:{
		color: "white",
		fontFamily: "BentonSans Bold",
		fontSize: 14,
		alignSelf:"center",
		marginTop: ScalePerctFullHeight(2.2),
	},
	button:{
		width: ScalePerctFullWidth(17),
		height: ScalePerctFullHeight(4),
	},

});

const normalStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.bgLightBlack,
		alignItems: "center",
	},
	textContainer: {
		// width: ScalePerctFullWidth(100),
		alignItems:"center",
		//alignItems: "flex-start",
		marginBottom: 50,
		// marginRight: ScalePerctFullWidth(10),
	},
	pageHeader: {
		backgroundColor: Colors.bgLightBlack,
	},
	askQuestion: {
		marginTop: ScalePerctFullHeight(4),
		fontSize: 22,
		color: Colors.bgPrimaryLight,
		fontFamily: "BentonSans Regular",
	},
	hederInfoContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	pickInfo: {
		marginTop: ScalePerctFullHeight(1),
		fontSize: 12,
		fontFamily: "BentonSans Regular",
		color: Colors.bgPrimaryLight,
		textAlign:"center"
		//alignSelf: "center",
	},
	BuildFeedButton: {
		position: "absolute",
		bottom: ScalePerctFullHeight(6),
	},
	contentContainer: {
		alignItems: "flex-start",
		paddingHorizontal: ScalePerctFullWidth(10),
	},
	item: {
		margin: 5,
	},
	header: {
		marginTop: 20,
	},
	footer: {
		padding: ScalePerctFullHeight(13),
		backgroundColor: "#00000000",
	},
	indicator: {
		position: "absolute",
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#00000080",
	},
	selectAllStyle: {
		color: "white",
		fontFamily: "BentonSans Bold",
		fontSize: 14,
		alignSelf: "center",
		marginTop: ScalePerctFullHeight(2.2),
	},
});

const style = Metrics.isTablet ? tabStyles : normalStyles;

export default FollowList;
