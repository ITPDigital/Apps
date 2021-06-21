import Moment from "moment";
import React, { PureComponent } from "react";
import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Button,
	Platform,
	ScrollView,
	TouchableWithoutFeedback,
	SafeAreaView,
	Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { KeyboardAwareView } from "react-native-keyboard-aware-view";
import Like from "react-native-vector-icons/AntDesign";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
	Colors,
	Constants,
	Metrics,
	ScalePerctFullHeight,
	ScalePerctFullWidth,
	Strings,
	Images,
} from "../../asset";
import { AlertComp, ListLoading, ProfileHeader, TextButton } from "../../components";
import { Actions } from "../../redux";
import { GetComments, PostComments } from "../../service";
import ImageLoad from "react-native-image-placeholder";

type Props = {
	navigation: any,
	userName: string,
	userMailId: string,
	profilePicture: string,
};

class Comments extends PureComponent<Props> {
	constructor() {
		super();
		this.state = {
			comments: [],
			showLoader: true,
			posting: false,
			flag: false,
			page: 0,
			addComments: "",
			refresh: false,
		};
	}

	componentDidMount() {
		const { navigation } = this.props;
		const { page } = this.state;
		const data = navigation.getParam("data");
		const siteKey = navigation.getParam("sitekey");
		console.log("site key", `${data.nid}~${siteKey}`);
		GetComments(page, data.nid, siteKey, this.onSuccess, this.onError);
	}

	onSuccess = (response: Object) => {
		this.setState({ showLoader: false, refresh: false });
		if (this.state.page !== 0) {
			if (response.length === 0 || (response.length === 1 && !response[0].document)) {
				this.setState({ flag: true });
				return;
			}
			const list = [...this.state.comments, ...response];
			this.setState({ comments: list });
		} else {
			this.setState({ comments: response });
			this.setState((prevState, props) => {
				return { page: prevState.page + 10 };
			});
		}
	};

	onError = (error: any) => {
		this.setState({ showLoader: false });
		let message = Constants.errorMessages.general;
		if (error.toString().includes(Constants.errorMessages.checkNetwork)) {
			message = Constants.errorMessages.network;
		}
		AlertComp(Strings.authentication.ALERT, message);
	};

	handlePost = () => {
		const { userName, userMailId, profilePicture } = this.props;
		this.setState({ posting: true });
		const { navigation } = this.props;
		const { addComments } = this.state;
		const userId = navigation.getParam("userId");
		const data = navigation.getParam("data");
		const siteKey = navigation.getParam("sitekey");
		console.log("data", data.title, data.path_alias);
		PostComments(
			userName,
			userMailId,
			profilePicture,
			addComments,
			userId,
			data.nid,
			siteKey,
			"https://www.petmd.com/sites/default/files/Acute-Dog-Diarrhea-47066074.jpg",
			this.onPostSuccess,
			this.onPostError,
			data.title,
			data.path_alias,
		);
	};

	onPostSuccess = (response: any) => {
		// const comments = [...this.state.comments];
		// comments.unshift({ document: response });
		console.log("response", response);
		Keyboard.dismiss();
		this.setState({ posting: false, addComments: "" });
		Platform.OS === "ios"
			? setTimeout(
					() =>
						alert(
							"Thank you for posting your comment. It will appear online once it is approved.",
						),
					100,
			  )
			: alert(
					"Thank you for posting your comment. It will appear online once it is approved.",
			  );
	};

	onPostError = (error: any) => {
		this.setState({ showLoader: false });
		let message = Constants.errorMessages.general;
		if (error.toString().includes(Constants.errorMessages.checkNetwork)) {
			message = Constants.errorMessages.network;
		}
		Keyboard.dismiss();
		AlertComp(Strings.authentication.ALERT, message);
	};

	renderProfileImage = (image: any) => {
		return (
			<View style={[styles.profilepic, { overflow: "hidden", alignItems: "center" }]}>
				<ImageLoad
					resizeMode={"stretch"}
					style={styles.profilepic}
					placeholderStyle={styles.profilepic}
					isShowActivity={false}
					loadingStyle={{ size: "large", color: "grey" }}
					source={image ? { uri: image } : Images.defaultProfilePic}
					placeholderSource={Images.defaultProfilePic}
					borderRadius={7}
				/>
			</View>
		);
	};

	commentsDetails = (item: any) => {
		const date = Moment(
			item.document.fields.createTime.timestampValue,
			"YYYY-MM-DD hh:mm:ss",
		).format("YYYY-MM-DD hh:mm:ss");

		const currentDate = new Date();
		const currentDateUtc = Moment.utc(currentDate).format("YYYY, MM, DD");

		const postedDate = Moment(
			item.document.fields.createTime.timestampValue,
			"YYYY-MM-DD hh:mm:ss",
		).format("YYYY, MM, DD");

		let newDate = Moment(date)
			.add(4, "hours")
			.format();

		const dt1 = new Date(postedDate);
		const dt2 = new Date(currentDateUtc);
		let diff = (dt2.getTime() - dt1.getTime()) / 1000;
		diff /= 60 * 60;

		return (
			<View style={styles.detailContainer}>
				<View style={styles.profileTimeContainer}>
					<Text style={styles.profileName}>{item.document.fields.name.stringValue}</Text>
					{Math.abs(Math.round(diff)) >= 24 && (
						<Text style={styles.date}>
							{Moment(
								item.document.fields.createTime.timestampValue,
								"YYYY-MM-DD hh:mm:ss",
							).format("YYYY-MM-DD")}
						</Text>
					)}
					<Text style={styles.time}>
						{Moment(date)
							.add(4, "hours")
							.format("LT")}
					</Text>
				</View>
				<Text style={styles.commments}>{item.document.fields.comment.stringValue}</Text>
				<View style={styles.separator} />
				{/* <View style={styles.profileTimeContainer}>
					<View style={{ flex: 1 }}> */}
				{/* <Text style={[styles.profileName, styles.commments, { fontSize: 12 }]}>
							""
						</Text> */}
				{/* </View>
					<View style={{ flexDirection: "row" }}>
						<TouchableOpacity style={{ justifyContent: "center" }}> */}
				{/* <View style={styles.heartIcon} /> */}
				{/* <Like */}
				{/* style={styles.playicon} */}
				{/* name="heart"
								size={12}
								color="red"
							/>
						</TouchableOpacity>
						<Text style={styles.likesCount}>30</Text>
					</View>
				</View> */}
			</View>
		);
	};

	renderComments = (item: any) => {
		return (
			<View style={styles.commentContainer}>
				{this.renderProfileImage(item.document.fields.imageUrl.stringValue)}
				{this.commentsDetails(item)}
			</View>
		);
	};

	keyExtractor = (item, index) => index.toString();

	onEndReached = () => {
		if (!this.state.flag) {
			this.setState((prevState, props) => {
				return { showLoader: true, page: prevState.page + 10 };
			});

			const { navigation } = this.props;
			const data = navigation.getParam("data");
			const siteKey = navigation.getParam("sitekey");
			GetComments(this.state.page, data.nid, siteKey, this.onSuccess, this.onError);
		}
	};

	onRefresh = () => {
		const { navigation } = this.props;
		const data = navigation.getParam("data");
		const siteKey = navigation.getParam("sitekey");
		this.setState({
			refresh: true,
		});
		GetComments(0, data.nid, siteKey, this.onSuccess, this.onError);
	};

	render() {
		const { navigation } = this.props;
		const { showLoader, comments, posting, addComments } = this.state;
		const commentBanned = navigation.getParam("commentBanned");
		let numOfLinesCompany = 0;

		return (
			<View style={styles.container}>
				<ProfileHeader
					onAction={() => {
						navigation.navigate("ProfileDrawerScreen");
					}}
					onBack={() => {
						navigation.goBack();
					}}
					title="Comments"
				/>
				{Platform.OS === "ios" ? (
					<SafeAreaView style={{ flex: 1 }}>
						<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
							<KeyboardAwareView animated={true}>
								<FlatList
									data={comments}
									renderItem={({ item }) =>
										item.document && this.renderComments(item)
									}
									keyExtractor={this.keyExtractor}
									ref={(ref: any) => {
										this.ListView_Ref = ref;
									}}
									onRefresh={this.onRefresh}
									refreshing={this.state.refresh}
									onEndReachedThreshold={0.5}
									onEndReached={this.onEndReached}
									ListFooterComponent={() => (
										<View style={{ height: ScalePerctFullHeight(8) }}>
											<ListLoading loading={showLoader} />
										</View>
									)}
								/>
								{commentBanned === 0 ? (
									<View style={styles.searchSectionIOS}>
										<TextInput
											multiline={true}
											numberOfLines={numOfLinesCompany}
											onContentSizeChange={e => {
												numOfLinesCompany =
													e.nativeEvent.contentSize.height / 18;
											}}
											style={styles.inputIos}
											placeholder="Leave your comment here"
											onChangeText={addComments => {
												this.setState({ addComments });
											}}
											value={this.state.addComments}
											underlineColorAndroid="transparent"
											// onSubmitEditing={
											// 	!addComments || posting ? null : this.handlePost
											// }
										/>

										<TouchableOpacity
											onPress={this.handlePost}
											disabled={!/\S/.test(addComments) || posting}
											style={{
												height: ScalePerctFullHeight(3),
												width: ScalePerctFullWidth(15),
												borderWidth: 1,
												justifyContent: "center",
												alignItems: "center",
												marginRight: ScalePerctFullWidth(2),
												marginTop: ScalePerctFullWidth(2),
												marginBottom: ScalePerctFullWidth(2),
												borderRadius: ScalePerctFullWidth(2),
												borderColor: Colors.bodyPrimaryDark,
											}}
										>
											<Text
												style={
													!/\S/.test(addComments) || posting
														? { color: Colors.bgTertiaryLight }
														: { color: "#424242" }
												}
											>
												{posting ? "Posting" : "Post"}
											</Text>
										</TouchableOpacity>
									</View>
								) : null}
							</KeyboardAwareView>
						</TouchableWithoutFeedback>
					</SafeAreaView>
				) : (
					<View style={{ flex: 1 }}>
						<FlatList
							data={comments}
							renderItem={({ item }) => item.document && this.renderComments(item)}
							keyExtractor={this.keyExtractor}
							onRefresh={this.onRefresh}
							refreshing={this.state.refresh}
							ref={(ref: any) => {
								this.ListView_Ref = ref;
							}}
							onEndReachedThreshold={0.5}
							onEndReached={this.onEndReached}
							ListFooterComponent={() => <ListLoading loading={showLoader} />}
						/>
						<View
							style={{
								justifyContent: "flex-end",
							}}
						>
							{commentBanned === 0 ? (
								<KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
									<View style={styles.searchSection}>
										<TextInput
											multiline={true}
											numberOfLines={numOfLinesCompany}
											onContentSizeChange={e => {
												numOfLinesCompany =
													e.nativeEvent.contentSize.height / 18;
											}}
											style={styles.input}
											placeholder="Leave your comment here"
											onChangeText={addComments => {
												this.setState({ addComments });
											}}
											value={this.state.addComments}
											underlineColorAndroid="transparent"
											onSubmitEditing={
												!addComments || posting ? null : this.handlePost
											}
										/>

										<TouchableOpacity
											onPress={this.handlePost}
											disabled={!/\S/.test(addComments) || posting}
											style={{
												height: ScalePerctFullHeight(5),
												width: ScalePerctFullWidth(15),
												borderWidth: 1,
												justifyContent: "center",
												alignItems: "center",
												marginRight: ScalePerctFullWidth(2),
												borderRadius: ScalePerctFullWidth(2),
												borderColor: Colors.bodyPrimaryDark,
											}}
										>
											<Text
												style={
													!/\S/.test(addComments) || posting
														? { color: Colors.bgTertiaryLight }
														: { color: "#424242" }
												}
											>
												{posting ? "Posting" : "Post"}
											</Text>
										</TouchableOpacity>
									</View>
								</KeyboardAwareScrollView>
							) : null}
						</View>
					</View>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	commentContainer: {
		width: ScalePerctFullWidth(100),
		marginRight: ScalePerctFullWidth(6.4),
		marginLeft: ScalePerctFullWidth(5.6),
		marginTop: Metrics.isTablet ? ScalePerctFullHeight(2.1) : ScalePerctFullHeight(4.1),
		flexDirection: "row",
		alignItems: "center",
	},
	detailContainer: {
		marginLeft: ScalePerctFullWidth(5.1),
		width: ScalePerctFullWidth(70),
		flexDirection: "column",
	},

	profileTimeContainer: {
		flexDirection: "row",
	},
	profileName: {
		color: Colors.bgPrimaryDark,
		alignSelf: "flex-start",
		fontSize: Metrics.MEDIUM_TEXT_SIZE,
		flex: 1,
		fontFamily: "BentonSans Bold",
		marginBottom: ScalePerctFullHeight(0.7),
	},
	time: {
		color: Colors.bgPrimaryDark,
		marginRight: 0,
		fontSize: Metrics.SMALL_TEXT_SIZE,
		fontFamily: "BentonSans Regular",
	},
	date: {
		color: Colors.bgPrimaryDark,

		fontSize: Metrics.SMALL_TEXT_SIZE,
		fontFamily: "BentonSans Regular",
		marginRight: ScalePerctFullWidth(1),
	},
	commments: {
		color: Colors.textHeading,
		fontFamily: "BentonSans Regular",
		fontSize: Metrics.MEDIUM_TEXT_SIZE,
	},
	profilepic: {
		height: Metrics.isTablet ? ScalePerctFullWidth(7) : ScalePerctFullWidth(14),
		width: Metrics.isTablet ? ScalePerctFullWidth(7) : ScalePerctFullWidth(14),
		borderRadius: Metrics.isTablet ? ScalePerctFullWidth(3.5) : ScalePerctFullWidth(7),
		alignSelf: "center",
	},
	separator: {
		marginTop: ScalePerctFullHeight(2.2),
		borderBottomWidth: 1,
		width: ScalePerctFullWidth(70),
		borderColor: Colors.linePrimary,
	},
	heartIcon: {
		height: 12,
		// width: 12,
		// backgroundColor: "red",
	},
	likesCount: {
		color: Colors.textHeading,
		fontFamily: "BentonSans Regular",
		fontSize: Metrics.MEDIUM_TEXT_SIZE,
		marginLeft: ScalePerctFullWidth(3.1),
	},
	inputComment: {
		height: ScalePerctFullHeight(9),
		width: ScalePerctFullWidth(100),
		borderWidth: 1,
		borderColor: Colors.linePrimary,
		marginBottom: ScalePerctFullHeight(2),
	},
	reply: {
		color: Colors.textHeading,
		fontFamily: "BentonSans Regular",
		fontSize: Metrics.MEDIUM_TEXT_SIZE,
		flex: 1,
	},
	searchSectionIOS: {
		zIndex: 1,
		backgroundColor: "white",
		position: "absolute",
		bottom: 0,
		flex: 1,
		flexDirection: "row",
		width: ScalePerctFullWidth(100),
		alignItems: "center",
		borderColor: Colors.linePrimary,
		borderTopWidth: 1,
	},
	searchSection: {
		zIndex: 1,
		flex: 1,
		flexDirection: "row",
		width: ScalePerctFullWidth(100),
		alignItems: "center",
		borderColor: Colors.linePrimary,
		borderTopWidth: 1,
	},
	searchIcon: {
		// paddingTop: ScalePerctFullHeight(2),
		paddingRight: ScalePerctFullWidth(3),
		backgroundColor: "#fff",
		// height: ScalePerctFullHeight(7),
		alignItems: "center",
		justifyContent: "center",
		color: "#424242",
		borderColor: Colors.bgTertiaryLight,
	},
	input: {
		flex: 1,
		backgroundColor: "#fff",
		color: "#424242",
		margin: ScalePerctFullWidth(1),
		// height: ScalePerctFullHeight(7),
		borderColor: Colors.bgTertiaryLight,
	},
	inputIos: {
		flex: 1,
		backgroundColor: "#fff",
		color: "#424242",
		margin: ScalePerctFullWidth(1),
		// lineHeight: ScalePerctFullHeight(3),
		borderColor: Colors.bgTertiaryLight,
		fontSize: Metrics.MEDIUM_TEXT_SIZE,
	},
});

function mapStateToProps(state) {
	return {
		userName: state.user.name,
		userMailId: state.user.email,
		profilePicture: state.user.profile_picture,
		flag: state.podcastPlayControl ? state.podcastPlayControl.flag : false,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Comments);
