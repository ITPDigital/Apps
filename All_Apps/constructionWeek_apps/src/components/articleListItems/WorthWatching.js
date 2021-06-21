import React, { PureComponent } from "react";
import { View, Image, StyleSheet, ActivityIndicator, Text, FlatList } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Colors, Metrics, ScalePerctFullWidth, Images, ScalePerctFullHeight } from "../../asset";
import { Actions } from "../../redux";
import { TopicsCard } from "../common";
import { TopicsPreferenceAPI } from "../../service";

type Props = {};

class WorthWatching extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = {
			index: 0,
			loading: false,
			followTrack: this.props.selectedTopics,
			alreadySelected: new Set(this.props.user["topics"] && this.props.user["topics"].split("|")),
			selectedTopicsArray: this.props.topics,
		};
	}

	checkFollowStatusTopics = (topicId: number) => {
		const { followTrack } = this.state;
		console.log("checkFollowStatusTopics", followTrack);

		let found = false;
		followTrack.forEach((item: object) => {
			if (item.tid === topicId) {
				found = true;
			}
		});
		return found;
	};

	onSelected = (followTrack: array) => {
		console.log("followTrackselected", followTrack);

		const { user } = this.props;
		const alreadySelected = new Set(this.props.user["topics"].split("|"));

		if (!alreadySelected.has(followTrack.tid)) {
			alreadySelected.add(followTrack.tid);
			this.setState({ alreadySelected: alreadySelected, loading: true });
			console.log("setstate", this.state.alreadySelected);
		}
		TopicsPreferenceAPI(
			user.id,
			Array.from(alreadySelected).join("|"),
			this.onSuccess,
			this.onFailure,
			this.onError,
		);
	};

	onSuccess = (response: any, selectedTopics: string) => {
		const { setUserTopicAction } = this.props;
		this.setState({ loading: false });
		setUserTopicAction(selectedTopics);
	};

	onFailure = (response: any) => {
		alert("Filed to save your preferences.");
	};

	onError = (error: any) => {
		alert("Please check your internet connection. ");
	};

	render() {
		//	const { data, onPress } = this.props;
		console.log("topicsworth", this.props.selectedTopics);
		console.log("worthTpics", this.props.topics);
		const { index, followTrack1 } = this.state;
		const arr = this.state.selectedTopicsArray.filter(
			item => !this.state.alreadySelected.has(item.tid),
		);
		console.log("newData--11", arr);
		const followTrack = this.props.selectedTopics;
		console.log("this.setstate", this.state.alreadySelected);
		if (arr.length > 0) {
			return (
				<View style={styles.container}>
					<Text
						style={{
							fontFamily: "BentonSans Bold",
							fontSize: 12,
							color: "black",
							marginHorizontal: ScalePerctFullWidth(1),
						}}
					>
						Worth Following
					</Text>
					{this.state.loading ? (
						<View>
							<ActivityIndicator size="large" color={Colors.bodyTitleVarient} />
						</View>
					) : null}
					<FlatList
						contentContainerStyle={styles.contentContainer}
						data={arr}
						//extraData={[followTrack]}
						keyExtractor={(x, i) => i.toString()}
						horizontal
						onEndReachedThreshold={0.5}
						showsHorizontalScrollIndicator={false}
						// ListHeaderComponent={() => {
						// 	return this.state.loading ? (
						// 		<View>
						// 			<ActivityIndicator
						// 				size="small"
						// 				color={Colors.bodyTitleVarient}
						// 			/>
						// 		</View>
						// 	) : null;
						// }}
						renderItem={
							({ item, index }) => {
								return (
									// !this.state.alreadySelected.has(item.tid) ? (

									<TopicsCard
										isTopic={true}
										containerStyle={styles.items}
										isFollowed={this.checkFollowStatusTopics(item.tid)}
										onPress={() => this.onSelected(item)}
										name={item.name}
										field_image={item.field_image}
									/>
								);
							}
							// ) : null
						}
					/>

					<View style={styles.lineSeperator} />
				</View>
				// </TouchableOpacity>
			);
		} else return null;
	}
}

WorthWatching.defaultProps = {
	order: ["logo", "bigImage", "title", "footer"],
};

const styles = StyleSheet.create({
	container: {
		marginTop: 17,
		marginHorizontal: ScalePerctFullWidth(5),
	},
	lineSeperator: {
		marginTop: 10,
		width: ScalePerctFullWidth(100) - 40,
		alignSelf: "center",
		borderBottomWidth: 1,
		borderColor: Colors.linePrimaryFull,
	},
	image: {
		width: ScalePerctFullWidth(31),
		height: ScalePerctFullWidth(30),
		//borderRadius: 10,
	},
	symbolContainer: {
		height: 30,
		borderRadius: 15,
		width: 30,
		position: "absolute",
		bottom: 20,
		right: 25,
		backgroundColor: Colors.bodySecondaryDark,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	imageEditorialContainer: {
		width: ScalePerctFullWidth(32),
		height: ScalePerctFullWidth(30),
		paddingHorizontal: 8,
		//alignItems: "center",
		//justifyContent: "center",
	},
	titleText: {
		color: Colors.textHeading,
		fontSize: Metrics.LARGE_TEXT_SIZE,
		fontFamily: "BentonSans Bold",
		paddingTop: 18,
		paddingHorizontal: 2,
		marginHorizontal: 8,
		width: ScalePerctFullWidth(32),
		height: ScalePerctFullHeight(8),
	},
	footerContainer: {
		//alignSelf: "center",
		flexDirection: "row",
		//justifyContent: "center",
		//alignItems: "center",
		paddingTop: 12,
		paddingBottom: 20,
		paddingHorizontal: 2,
		marginHorizontal: 8,
		width: ScalePerctFullWidth(32),
		// borderBottomColor: Colors.bgPrimaryLight,
		// borderBottomWidth: 1,
	},
	hours: {
		fontSize: Metrics.MEDIUM_TEXT_SIZE,
		letterSpacing: 0.3,
		textAlign: "left",
		flexWrap: "wrap",
		alignItems: "flex-start",
		lineHeight: Metrics.LARGE_LINE_HEIGHT,
		flex: 1,
		paddingLeft: 2,
		color: "#8895a9",
	},
	icon: { paddingHorizontal: Metrics.DEFAULT_LIST_PADDING },
});

const mapStateToProps = state => ({
	topics: state.allTopics,
	selectedTopics: state.menuTopics,
	user: state.user,
	//isSplashScreenHide: state.isSplashScreenHide,
});
function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(WorthWatching);
