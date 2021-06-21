import React, { Component } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text, I18nManager, Dimensions } from "react-native";
import SvgUri from "react-native-svg-uri";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ImagePicker from "react-native-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import ProfilePageHeader from "./ProfilePageHeader";
import { ProfilePicUpload, ChangePasswordAPI, updatenameAPI } from "../../service";
import InputTextField from "./InputTextField";
import NormalTextField from "./normalTextField";
import { Line, AlertComp } from "../../components"; 
import { Analytics, Screen, Events } from "../../Analytics";

import { Actions } from "../../redux"; 
import {
	ScalePerctFullWidth,
	ScalePerctFullHeight,
	Colors,
	passwordValidator,
	Metrics,
	Images,
} from "../../asset";
import { getCurrentUserEmailStorage, getUserNameStorage } from "../../storage";
import { PodcastPlayView } from "../../components"; 
import { TabModal } from "../ChaptorPodcastScreen";
import ModalView from "../../components/podcastChaptorCard/ModalView";
import { Button } from "react-native-share";
import { setCurrentUserIdStorage } from "../../storage"; 
const widths = Dimensions.get('window').width;     

const userPic = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="16px" height="18px" viewBox="0 0 16 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="Home-page" transform="translate(-333.000000, -33.000000)" stroke="#000000" stroke-width="1.8">
            <g id="Group-25" transform="translate(0.000000, 1.000000)">
                <g id="Group-17" transform="translate(0.000000, 19.000000)">
                    <g id="user" transform="translate(334.000000, 14.000000)">
                        <path d="M14,16 L14,14.2222222 C14,12.2585431 12.4329966,10.6666667 10.5,10.6666667 L3.5,10.6666667 C1.56700338,10.6666667 0,12.2585431 0,14.2222222 L0,16" id="Shape"></path>
                        <ellipse id="Oval" cx="7" cy="3.55555556" rx="3.5" ry="3.55555556"></ellipse>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg>`;

let profilePic = ""; 

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pickedImage: props.user.profile_picture
				? { uri: props.user.profile_picture }
				: Images.defaultProfilePic,
			profileName: props.user.name,
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
			isChanged: false,
			email: "",
			username:"",
			showModal: false,
			showImageModal: false,
			
		};
	}

	componentDidMount() {  
		Analytics.setCurrentScreen("PROFILE");
		getCurrentUserEmailStorage().then(mailId => this.setState({ email: mailId }));
		getUserNameStorage().then(username => this.setState({ username: username }));
	}

	pickImageHandler = () => {
		const { setProfilePic, user } = this.props;
		ImagePicker.showImagePicker(
			{ title: "Pick an Image", maxWidth: 800, maxHeight: 600 },
			(res: any) => {
				if (res.didCancel) {
					console.log("User cancelled!");
				} else if (res.error) {
					alert("Error occured in Profile pic upload. Please try again later.");
				} else {
					console.log("res.uri", res.uri);
					console.log("res.path", res.path);

					ProfilePicUpload(user.id, res.uri, res.fileName, res.type, res.path);
					setProfilePic(res.uri);
					this.setState({
						pickedImage: { uri: res.uri },
					});
					profilePic = this.state.pickedImage;
				}
			},
		);
	};
   
	renderDefaultImage = () => {
		return (
			// <SvgUri
			// 	height={ScalePerctFullWidth(16)}
			// 	width={ScalePerctFullWidth(16)}
			// 	svgXmlData={userPic}
			// />
			<Image
				source={Images.defaultProfilePic}
				style={{ width: ScalePerctFullWidth(16), height: ScalePerctFullWidth(16) }}
			/>
		);
	};

	onSave = () => {
		const { profileName, currentPassword, newPassword, confirmPassword } = this.state;
		const { setProfileName, user } = this.props;
		if (!currentPassword && !newPassword && !confirmPassword && profileName) {
			updatenameAPI(user.id, profileName);
			setProfileName(profileName);
			this.setState({ isChanged: false });
		} else if (!currentPassword || !newPassword || !confirmPassword) {
			alert("Please fill all the required fields.");
		} else if (newPassword !== confirmPassword) {
			alert("New password and confirm password should be same.");
		} else if (!passwordValidator(newPassword)) {
			alert("Enter a valid password with minimum 6 characters");
		} else {
			ChangePasswordAPI(user.id, currentPassword, newPassword, profileName);
			setProfileName(profileName);
			this.setState({ isChanged: false, newPassword: "", confirmPassword: "" });
		}
	};

	renderTabPlayScreen = () => {
		console.log("playtab enter");
		this.setState({ showModal: !this.state.showModal });
	};

	handlePlay = () => {
		const { navigation } = this.props;
		//navigation.navigate("PlayScreen");
		return Metrics.isTablet ? this.renderTabPlayScreen() : navigation.navigate("PlayScreen");
	};

	toggleModal = () =>
		this.setState({
			showImageModal: !this.state.showImageModal,
		});


		gotoLogout = () =>{
			const { navigation } = this.props;
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
		}
      
	render() {
		var emaillabel = I18nManager.isRTL ? "البريد الإلكتروني" : "Email";
		var namelabel = I18nManager.isRTL ? "اسم" : "Name";
		var pagetitle = I18nManager.isRTL ? "تفاصيل الملف الشخصي" : "Profile Details";
		const {
			imageUrl,
			isChanged,
			profileName,
			newPassword,
			confirmPassword,
			currentPassword,
			showModal,
		} = this.state;
		const { navigation, user, control } = this.props;
		console.log("USERDETAILS", user);
		return (
			<View style={styles.container}>
				<ProfilePageHeader
					title = {pagetitle}
					isChanged={isChanged}
					onBack={() => {
						navigation.goBack();
					}}
					onSave={this.onSave}
				/>
				<KeyboardAwareScrollView>
					{/* <View style={styles.image}>{this.renderDefaultImage()}</View> */}
					<TouchableOpacity onPress={this.toggleModal}>
						<Image
							style={styles.image}
							source={
								this.state.pickedImage || profilePic || Images.defaultProfilePic
							}
						/>
					</TouchableOpacity>
					{/* <Image style={styles.image} source={this.state.pickedImage} /> */}
					<TouchableOpacity style={styles.uploadIcon} onPress={this.pickImageHandler}>
						<Icon name="camera" size={25} color={Colors.bgPrimaryDark} />
					</TouchableOpacity>

					<View style={styles.inputTextContainer}>
						{/* <NormalTextField label="Email" value={this.state.email} /> */}
						<InputTextField
							isProfile
							key={"1"}
							label= {emaillabel}
							values={this.state.email}
							editable={false}
							disabled={true}
							// onChange={profileName =>
							// 	this.setState({ profileName, isChanged: true })
							// }
						/>
						<View style={styles.separator} />
						<InputTextField
							isProfile
							// key={"1"}
							label={namelabel} 
							values={this.state.username}
							editable={false}
							disabled={true}
							// onChange={profileName =>
							// 	this.setState({ profileName, isChanged: true })
							// }
						/>
						<View style={styles.separator} />
						{/* <TouchableOpacity
								//onPress={onDownloadPress}
								
								style={{height: 50, backgroundColor:'black', margin: 20, alignItems:'center', justifyContent:'center', borderRadius: 20}}
							>
								<Text style={styles.btnText}>{"Manage Profile"}</Text>
						</TouchableOpacity> */}
						{/* <InputTextField
							key={"2"}
							label="Password"
							values={currentPassword}
							placeholder={"Enter the current password"}
							onChange={currentPassword =>
								this.setState({ currentPassword, isChanged: true })
							}
						/>
						<View style={styles.separator} />
						<InputTextField
							key={"3"}
							label="New Password"
							values={newPassword}
							placeholder={"Enter the new password"}
							onChange={newPassword =>
								this.setState({ newPassword, isChanged: true })
							}
						/>
						<View style={styles.separator} />
						<InputTextField
							key={"4"}
							label="Confirm Password"
							values={confirmPassword}
							placeholder={"Re-enter the new password"}
							onChange={confirmPassword =>
								this.setState({ confirmPassword, isChanged: true })
							}
						/> */}
					</View>

					<View style={{justifyContent:'center', alignItems:'center', marginTop:25}}>
						<TouchableOpacity onPress={()=>this.gotoLogout()}>
						<View style={{backgroundColor:'#000', color:'#000', paddingHorizontal:widths*0.25, paddingVertical:10, borderRadius:25}}> 
						<Text style={{color:'#fff', fontWeight:'bold'}}>Logout</Text>
						</View>
						</TouchableOpacity>
					</View>

				</KeyboardAwareScrollView>
				{!showModal ? control.flag && <PodcastPlayView onPress={this.handlePlay} /> : null}
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
						deviceHeight="100%"
						//style={{ flex: 1 }}
					/>
				)}

				{this.state.showImageModal &&
				(this.state.pickedImage || profilePic || Images.defaultProfilePic) ? (
					<ModalView
						onPress={this.toggleModal}
						image={
							this.state.pickedImage.uri || profilePic || Images.defaultProfilePic
						}
						isVisible={this.state.showImageModal}
					/>
				) : null}
			</View>
		);
	}
}



const mobileStyles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		justifyContent: "center",
		alignItems: "center",
		marginLeft: ScalePerctFullWidth(35),
		height: ScalePerctFullWidth(30),
		width: ScalePerctFullWidth(30),
		borderRadius: ScalePerctFullWidth(15),
		marginTop: ScalePerctFullHeight(4),
		//borderWidth: 3,
		//borderColor: "white",
	},
	uploadIcon: {
		position: "absolute",
		left: ScalePerctFullWidth(54),
		top: ScalePerctFullHeight(15),
		height: ScalePerctFullWidth(12),
		width: ScalePerctFullWidth(12),
		justifyContent: "center",
		alignItems: "center",
		borderRadius: ScalePerctFullWidth(6),
		borderWidth: 0.5,
		borderColor: Colors.bgTertiaryLight,
		backgroundColor: "white",
	},
	separator: {
		color: Colors.bgPrimaryDark,
		width: ScalePerctFullWidth(90),
		marginLeft: ScalePerctFullWidth(5),
		borderBottomWidth: 2,
		borderBottomColor: Colors.borderSeparator,
	},
	downloadView: {
		marginTop: 5,
		paddingVertical: 10,
		paddingHorizontal: 10,
		justifyContent:'center',
		alignItems:'center',
	},
	btnText: {
		fontFamily: "BentonSans Bold",
		fontSize: 14,
		color: Colors.bodyPrimaryLight,
		textAlign: "center",
		alignSelf: "center",
	},
});

const tabStyles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: "center",
		justifyContent: "center",
	},
	image: {
		justifyContent: "center",
		alignItems: "center",
		marginLeft: ScalePerctFullWidth(35),
		height: ScalePerctFullWidth(30),
		width: ScalePerctFullWidth(30),
		borderRadius: ScalePerctFullWidth(15),
		marginTop: ScalePerctFullHeight(8),
		//borderWidth: 3,
		//borderColor: Colors.bodySecondaryVarient,
	},
	uploadIcon: {
		position: "absolute",
		left: ScalePerctFullWidth(56),
		top: ScalePerctFullHeight(22),
		height: ScalePerctFullWidth(12),
		width: ScalePerctFullWidth(12),
		justifyContent: "center",
		alignItems: "center",
		borderRadius: ScalePerctFullWidth(6),
		borderWidth: 0.5,
		borderColor: Colors.bgTertiaryLight,
		backgroundColor: "white",
	},
	separator: {
		color: Colors.bgPrimaryDark,
		width: ScalePerctFullWidth(68),
		marginHorizontal: ScalePerctFullWidth(5),
		borderBottomWidth: 2,
		borderBottomColor: Colors.borderSeparator,
	},
	inputTextContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: ScalePerctFullWidth(15),
	},
	downloadView: {
		marginTop: 44,
		paddingVertical: 10,
		paddingHorizontal: 10,
		justifyContent:'center',
		alignItems:'center',
	},
	btnText: {
		fontFamily: "BentonSans Bold",
		fontSize: 14,
		color: Colors.bodyPrimaryLight,
		textAlign: "center",
		alignSelf: "center",
	},
});

const styles = Metrics.isTablet ? tabStyles : mobileStyles;

const mapStateToProps = state => ({
	user: state.user,
	control: state.podcastPlayControl,
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Profile);
