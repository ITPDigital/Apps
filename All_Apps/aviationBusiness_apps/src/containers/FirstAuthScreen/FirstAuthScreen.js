import React, { PureComponent } from "react";
import { Platform, View, Text, TextInput, TouchableOpacity, StyleSheet,	Linking} from "react-native";
import { connect } from "react-redux";
import SplashScreen from "react-native-splash-screen";
import { bindActionCreators } from "redux";
import OneSignal from "react-native-onesignal";
import { Actions } from "../../redux";
import FirstAuthScreenUI from "./FirstAuthUI";
import { SocialLogin, setGlobalHeader, InitialWebService, MenuTopics } from "../../service";
import {
	setCurrentUserIdStorage,
	setCurrentUserToken,
	setCurrentUserEmailStorage, 
	setMenuTopics,
} from "../../storage";
import { AlertComp } from "../../components";
import { Strings, Constants, Colors, Images } from "../../asset";
import { Analytics, Screen, Events } from "../../Analytics";
import { setUserActionInAsync } from '../../storage/AsyncStore';


//const gs = Platform.OS === "android" && require("react-native-google-signin");
// const { GoogleSignin } = Platform.OS === "android" ? require("react-native-google-signin") : null;

//const GoogleSignin = gs ? gs.GoogleSignin : null;

type Props = {
	navigation: any,
};

class FirstAuthScreen extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = {
			userId: "",
			mediatype: "",
			email: "",
			name: "",
			loading: false,
			emailAuth: false,
		};
	}

	componentDidMount() {
		MenuTopics("100", this.onMenuSuccess, this.onMenuFailure, this.onMenuError);
		SplashScreen.hide();
		console.log("screen", Analytics);
		Analytics.setCurrentScreen("LANDING");
		if (!this.props.isSplashScreenHide) {
			this.props.setStartUpAction(true);
		}
		// if (Platform.OS === "android") {
		// 	console.log("reached google sign in");

		// 	try {
		// 		GoogleSignin.configure({
		// 			scopes: ["https://www.googleapis.com/auth/drive.readonly"],
		// 			androidClientId: 'AIzaSyA52YCUBRAWbelpwqL_CQTYOtrBO85jD2A',
		// 		   // scopes: [
		// 		   // 	"https://www.googleapis.com/auth/userinfo.email",
		// 		   // 	"https://www.googleapis.com/auth/userinfo.profile",
		// 		   // ],
		// 		   webClientId:
		// 			   "239361211085-nj06cbklpb8ivpdd27iabtrj113hfe27.apps.googleusercontent.com",
		// 			   //"239361211085-nj06cbklpb8ivpdd27iabtrj113hfe27.apps.googleusercontent.com",
		// 	   });
		// 	   await GoogleSignin.hasPlayServices();
		// 	   const UserInfo = await GoogleSignin.signIn()
		// 	   console.log(UserInfo);
			   
		// 	}catch(e) {
		// 			console.log(e.code)
		
		// 	}
			
		// }
	}

	setAllSections = (HomeScreenData) => {
		const { setMyTroveAction } = this.props;
		console.log("data inside the settings:", HomeScreenData);
		for (const key in HomeScreenData) {
			const SectionKey = key === "home" ? "0" : key;
			setMyTroveAction(SectionKey, HomeScreenData[key], "topic");
		}
	};

	onFetchSuccess = (response) => {
		const { setInitialWebServiceData } = this.props;
		console.log("Onfetch Success data(From Initial WebService):", response);
		setInitialWebServiceData(response);
		this.setAllSections(response);
	};

	onMenuSuccess = (response: any) => { 
		const { menuTopics } = this.state;
		console.log("Menutopics API Success");
		console.log("response in menu", response);
		this.setState({ menuTopics: [...response] });
		setMenuTopics({ menuTopics: response });
		InitialWebService("moblie", this.onFetchSuccess, this.onFetchFailure, this.onError);
	};

	onMenuFailure = (response: any) => {
		console.log("On Failure of menuTopicsApi", response);
	};

	onFetchFailure = () => {
		console.log("Failure to fetch initial web service data");
	};

	onFetchError = () => {
		console.log("Error in fetch initial web service data");
	};

	onMenuError = () => {
		console.log("error");
	};

	handleLoginEvent = () => {
		console.log("---- login");
		OneSignal.configure();
		const { navigation } = this.props;
		navigation.navigate("LoginAuthScreen");
	};

	handleSignUp = () => {
		// const { navigation } = this.props;
		// navigation.navigate("SignUpAuthScreen");
		Linking.openURL(Images.subscription_link); 
	};

	onSuccess = (data: Object) => {
		console.log("SOCIALLOGINDATA"+JSON.stringify(data));
		const { setUserAction, navigation } = this.props;

		setUserAction(data.data[0]);
		setUserActionInAsync(data.data[0]);
		setCurrentUserIdStorage(data.data[0].id);
		setCurrentUserToken(data.data[0].jwt);
		setGlobalHeader(data.data[0].jwt);
		setCurrentUserEmailStorage(this.state.email);
		//setUserName(data.data[0].name);

		this.setState({ loading: false });
		// if (data.topics === "") {
		// 	navigation.navigate("TopicsAuthScreen");
		// } else {
		console.log("onsucessdata", data);
		console.log("onsucessdata", data.email);
		navigation.navigate("HomeNavigation");
		// }
	};

	onFailure = (response: Object, userId: Number, mediatype: String) => {
		const { navigation } = this.props;
		if (response.error_code === "103") {
			navigation.navigate("MessageAuthScreen", {
				message: response.message,
			});
		} else if (response.error_code === "101") {
			navigation.navigate("MessageAuthScreen", {
				message: response.message,
				resend: true,
				id: response.id,
			});
		} else if (response.error_code === "102") {
			navigation.navigate("MessageAuthScreen", {
				message: response.message,
			});
		} else if (response.error_code === "105") {
			this.setState({ emailAuth: true, loading: false, userId, mediatype });
		} 
	};

	reTry = () => {
		const { name, email, userId, mediatype } = this.state;
		console.log("retry function called with parameters:", name);
		this.setState({ loading: true, emailAuth: false });

		SocialLogin(userId, mediatype, name, email, this.onSuccess, this.onFailure, this.onError);
	};

	renderDialog = () => {
		console.log("fillEmail called");
		return (
			<View style={styles.dialogBox}>
				<Text style={styles.dialogHeader}>Email required</Text>
				<TextInput
					style={styles.textInput}
					onChangeText={(text: String) => this.setState({ email: text })}
					placeholder="Email - Id"
				/>
				<TextInput
					style={styles.textInput}
					onChangeText={(text: String) => this.setState({ name: text })}
					placeholder="Name"
				/>
				<TouchableOpacity style={styles.submitButton} onPress={() => this.reTry()}>
					<Text style={styles.buttonTitile}>Submit</Text>
				</TouchableOpacity>
			</View>
		);
	};

	onError = (error: any) => {
		let message = Constants.errorMessages.general;
		if (error.toString().includes(Constants.errorMessages.checkNetwork)) {
			message = Constants.errorMessages.network;
		}
		console.log("error:", error);
		AlertComp(Strings.authentication.ALERT, message);
	};

	handleSocialLogin = (loginId, mediaType, email, userName) => {
		let event = Events.auth.googleLogin;
		if (mediaType == "TWITTER") {
			event = Events.auth.twitterLogin;
		} else if (mediaType == "FACEBOOK") {
			event = Events.auth.facebookLogin;
		}
		Analytics.logEvent(event);
		this.setState({ loading: true, email, name: userName });
		console.log("username n mail", email, userName);
		SocialLogin(
			loginId,
			mediaType,
			userName,
			email,
			this.onSuccess,
			this.onFailure,
			this.onError,
		);
	};

	render() {
		const { loading, emailAuth } = this.state;
		return (
			<FirstAuthScreenUI
				handleLoginEvent={this.handleLoginEvent}
				handleSignUp={this.handleSignUp}
				handleSocialLogin={this.handleSocialLogin}
				isLoading={loading}
				isEmailRequired={emailAuth}
				renderDialog={this.renderDialog}
			/>
		);
	}
}

const styles = StyleSheet.create({
	dialogBox: {
		position: "absolute",
		left: 30,
		right: 20,
		top: 250,
		bottom: 10,
		height: "40%",
		width: "85%",
		backgroundColor: Colors.bgPrimaryLight,
	},
	dialogHeader: {
		alignSelf: "center",
		color: Colors.bgSecondaryDark,
		fontSize: 20,
		fontWeight: "bold",
		marginTop: 10,
	},
	submitButton: {
		alignSelf: "center",
		marginTop: 40,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "red",
		height: "10%",
		width: "40%",
		borderRadius: 5,
	},
	buttonTitile: {
		fontFamily: "BentonSans Bold",
	},
	textInput: {
		borderBottomColor: Colors.bgTertiaryDark,
		margin: 10,
		borderBottomWidth: 2,
	},
});

function mapStateToProps(state: any) {
	// state
	return {
		isSplashScreenHide: state.isSplashScreenHide,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(FirstAuthScreen);
