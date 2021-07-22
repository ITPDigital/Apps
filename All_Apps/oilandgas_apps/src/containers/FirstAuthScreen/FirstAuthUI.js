import React from 'react';
import {
	View,
	StyleSheet,
	ImageBackground,
	StatusBar,
	Text,
	TouchableOpacity,
	NativeModules,
	Alert,
	Platform,
	ActivityIndicator,
	TextInput,
	Image,
} from 'react-native';
import Video from 'react-native-video';
import SvgUri from 'react-native-svg-uri';
import OAuthManager from 'react-native-oauth';
import {
	Colors,
	ScalePerctFullWidth,
	ScalePerctFullHeight,
	Strings,
	Metrics,
	Images,
} from '../../asset';
import { Button, Separator, TextButton } from '../../components';
import Icon from '../../asset/fonts/icons';
import { SocialLogin } from '../../service';
import { GoogleSignin } from 'react-native-google-signin';
import { user } from '../../redux/Reducer/User';

const { RNTwitterSignIn } = NativeModules;

const Constants = {
	// Dev Parse keys
	TWITTER_COMSUMER_KEY: '2LKe6rD8geMkZXqCarb1UdJyh',
	TWITTER_CONSUMER_SECRET: 'r5mFFQJz1fMf8MKPbQN45vKwg7xWz5qkGnjIdmBdv7AnfLIP6S',
};

// const gs = Platform.OS === 'android' && require('react-native-google-signin');

// const statusCodes = gs ? gs.GoogleSignin : null;
// const GoogleSignin = gs ? gs.GoogleSignin : null;

const logo = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="100px" height="13px" viewBox="0 0 100 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="First-screen-(1)" transform="translate(-138.000000, -328.000000)" fill="#FFFFFF" fill-rule="nonzero">
            <g id="Group" transform="translate(138.000000, 328.000000)">
                <path d="M89,0 L99,0 C99.5522847,-1.01453063e-16 100,0.44771525 100,1 C100,1.55228475 99.5522847,2 99,2 L89,2 C88.4477153,2 88,1.55228475 88,1 C88,0.44771525 88.4477153,1.01453063e-16 89,0 Z M89,5 L99,5 C99.5522847,5 100,5.44771525 100,6 C100,6.55228475 99.5522847,7 99,7 L89,7 C88.4477153,7 88,6.55228475 88,6 C88,5.44771525 88.4477153,5 89,5 Z M89,10 L99,10 C99.5522847,10 100,10.4477153 100,11 C100,11.5522847 99.5522847,12 99,12 L89,12 C88.4477153,12 88,11.5522847 88,11 C88,10.4477153 88.4477153,10 89,10 Z M8.8275,0.45 C9.12450148,0.45 9.36649906,0.53799912 9.5535,0.714 C9.74050094,0.89000088 9.834,1.12099857 9.834,1.407 C9.834,1.69300143 9.74050094,1.92124915 9.5535,2.09175 C9.36649906,2.26225085 9.12450148,2.3475 8.8275,2.3475 L6.237,2.3475 L6.237,10.9935 C6.237,11.2795014 6.13250105,11.518749 5.9235,11.71125 C5.71449896,11.903751 5.45600154,12 5.148,12 C4.83999846,12 4.58700099,11.903751 4.389,11.71125 C4.19099901,11.518749 4.092,11.2795014 4.092,10.9935 L4.092,2.3475 L1.5015,2.3475 C1.20449852,2.3475 0.962500935,2.25950088 0.7755,2.0835 C0.588499065,1.90749912 0.495,1.67650143 0.495,1.3905 C0.495,1.11549862 0.591249038,0.89000088 0.78375,0.714 C0.976250962,0.53799912 1.21549857,0.45 1.5015,0.45 L8.8275,0.45 Z M54.3635,6.225 C54.3635,7.31400544 54.1215024,8.31224546 53.6375,9.21975 C53.1534976,10.1272545 52.4852543,10.8449974 51.63275,11.373 C50.7802457,11.9010026 49.8205053,12.165 48.7535,12.165 C47.6864947,12.165 46.7267543,11.9010026 45.87425,11.373 C45.0217457,10.8449974 44.3562524,10.1272545 43.87775,9.21975 C43.3992476,8.31224546 43.16,7.31400544 43.16,6.225 C43.16,5.13599455 43.3992476,4.13775454 43.87775,3.23025 C44.3562524,2.32274546 45.0217457,1.60500264 45.87425,1.077 C46.7267543,0.54899736 47.6864947,0.285 48.7535,0.285 C49.8205053,0.285 50.7802457,0.54899736 51.63275,1.077 C52.4852543,1.60500264 53.1534976,2.32274546 53.6375,3.23025 C54.1215024,4.13775454 54.3635,5.13599455 54.3635,6.225 Z M52.2185,6.225 C52.2185,5.48799632 52.0700015,4.819753 51.773,4.22025 C51.4759985,3.620747 51.0635026,3.14500176 50.5355,2.793 C50.0074974,2.44099824 49.4135033,2.265 48.7535,2.265 C48.0824966,2.265 47.4857526,2.43824827 46.96325,2.78475 C46.4407474,3.13125173 46.0337515,3.60699697 45.74225,4.212 C45.4507485,4.81700302 45.305,5.48799632 45.305,6.225 C45.305,6.96200369 45.4507485,7.63299698 45.74225,8.238 C46.0337515,8.84300302 46.4407474,9.31874827 46.96325,9.66525 C47.4857526,10.0117517 48.0824966,10.185 48.7535,10.185 C49.4135033,10.185 50.0074974,10.0090018 50.5355,9.657 C51.0635026,9.30499824 51.4759985,8.829253 51.773,8.22975 C52.0700015,7.630247 52.2185,6.96200369 52.2185,6.225 Z M31.046,10.383 C31.1890007,10.4710004 31.3017496,10.5864993 31.38425,10.7295 C31.4667504,10.8725007 31.508,11.0209992 31.508,11.175 C31.508,11.373001 31.4420007,11.5544992 31.31,11.7195 C31.1449992,11.917501 30.8920017,12.0165 30.551,12.0165 C30.2869987,12.0165 30.0450011,11.9560006 29.825,11.835 C29.032996,11.3839977 28.637,10.4655069 28.637,9.0795 C28.637,8.68349802 28.5077513,8.37000116 28.24925,8.139 C27.9907487,7.90799884 27.6195024,7.7925 27.1355,7.7925 L24.05,7.7925 L24.05,10.9935 C24.05,11.2905015 23.9702508,11.5324991 23.81075,11.7195 C23.6512492,11.9065009 23.4395013,12 23.1755,12 C22.8564984,12 22.5787512,11.903751 22.34225,11.71125 C22.1057488,11.518749 21.9875,11.2795014 21.9875,10.9935 L21.9875,1.4565 C21.9875,1.17049857 22.083749,0.931250962 22.27625,0.73875 C22.468751,0.546249037 22.7079986,0.45 22.994,0.45 L27.746,0.45 C28.3180029,0.45 28.8569975,0.60399846 29.363,0.912 C29.8690025,1.22000154 30.2732485,1.6434973 30.57575,2.1825 C30.8782515,2.72150269 31.0295,3.32649665 31.0295,3.9975 C31.0295,4.54750275 30.8810015,5.08374739 30.584,5.60625 C30.2869985,6.12875261 29.9020024,6.54399846 29.429,6.852 C30.1220035,7.33600242 30.5014997,7.98499593 30.5675,8.799 C30.6005002,8.97500088 30.617,9.14549917 30.617,9.3105 C30.6610002,9.6515017 30.7049998,9.89624926 30.749,10.04475 C30.7930002,10.1932507 30.8919992,10.3059996 31.046,10.383 Z M27.6635,6.093 C27.861501,6.093 28.0539991,5.99950094 28.241,5.8125 C28.4280009,5.62549906 28.5819994,5.37525157 28.703,5.06175 C28.8240006,4.74824843 28.8845,4.41000182 28.8845,4.047 C28.8845,3.73899846 28.8240006,3.45575129 28.703,3.19725 C28.5819994,2.93874871 28.4280009,2.73250077 28.241,2.5785 C28.0539991,2.42449923 27.861501,2.3475 27.6635,2.3475 L24.05,2.3475 L24.05,6.093 L27.6635,6.093 Z M75.419,0.417 C75.6940014,0.417 75.933249,0.510499065 76.13675,0.6975 C76.340251,0.884500935 76.442,1.10999868 76.442,1.374 C76.442,1.51700071 76.4090003,1.66549923 76.343,1.8195 L72.2675,11.3565 C72.1684995,11.565501 72.0310009,11.7249994 71.855,11.835 C71.6789991,11.9450005 71.492001,12 71.294,12 C71.1069991,11.9889999 70.9337508,11.9312505 70.77425,11.82675 C70.6147492,11.7222495 70.4910004,11.571001 70.403,11.373 L66.3275,1.803 C66.2724997,1.69299945 66.245,1.55550082 66.245,1.3905 C66.245,1.09349852 66.3549989,0.854250907 66.575,0.67275 C66.7950011,0.491249092 67.0204988,0.4005 67.2515,0.4005 C67.4385009,0.4005 67.6144992,0.45549945 67.7795,0.5655 C67.9445008,0.67550055 68.0709996,0.834998955 68.159,1.044 L71.4755,8.8485 L74.5115,1.044 C74.5995004,0.84599901 74.7259992,0.69200055 74.891,0.582 C75.0560008,0.47199945 75.2319991,0.417 75.419,0.417 Z" id="trove"></path>
            </g>
        </g>
    </g>
</svg>`;

const TWITTER_COMSUMER_KEY = '2LKe6rD8geMkZXqCarb1UdJyh';
const TWITTER_CONSUMER_SECRET = 'r5mFFQJz1fMf8MKPbQN45vKwg7xWz5qkGnjIdmBdv7AnfLIP6S';

// const GOOGLE_CALLBACK_URL =
// 	'com.googleusercontent.apps.467360730554-87bp5m5bf5ee9bag7c7t5e626l6fekaq:/oauth2redirect/google';
// const GOOGLE_CLIENT_ID =
// 	'239361211085-dtc76hia066ncunb40j68k90ims672r6.apps.googleusercontent.com';

const GOOGLE_CALLBACK_URL =
	'com.googleusercontent.apps.239361211085-2rugfv38hml5a8sh5ms5nc811i14116u:/oauth2redirect/google';


const GOOGLE_CLIENT_ID =
	'239361211085-2rugfv38hml5a8sh5ms5nc811i14116u.apps.googleusercontent.com';


// const GOOGLE_CLIENT_SECRET = 'Ek0bp-ICt8mjUEKWSYpj-OcN';
// const FB_CLIENT_ID = '264360454444930';
// const FB_CLIENT_SECRET = '2d883dc57200e3dca7ca972d6948aa1c';

// manager.deauthorize("google"); //TODO: to be removed later
// manager.deauthorize("twitter");
// manager.deauthorize("facebook");

const renderLoading = () => {
	return (
		<View style={styles.indicator}>
			<ActivityIndicator size='small' color='white' />
		</View>
	);
};

const renderButton = (handleLoginEvent: Function) => (
	<View>
		<Button
			title={Strings.authentication.LOGIN_WITH_YOUR_EMAIL_ID}
			buttonStyle={{
				// marginTop: ScalePerctFullHeight(61),
				marginBottom: ScalePerctFullHeight(5),
			}}
			onPress={() => handleLoginEvent()}
			button={Images.loginButton}
			imageStyle={{
				width: ScalePerctFullWidth(100),
				height: 100,
			}}
			top={11}
		/>
	</View>
);

const renderSeparator = () => (
	<View style={styles.separatorContainer}>
		<Separator />
		<Text style={styles.orText}>{Strings.authentication.OR}</Text>

		<Separator />
	</View>
);

const googleSignIn = async (handleSocialLogin: Function) => {
	if (Platform.OS === 'android') {


		GoogleSignin.configure({
			//scopes: ['https://www.googleapis.com/auth/drive.readonly'],
			//webClientId: '239361211085-61lpb7u0mqcllau6mj1dud8ig99nr5rd.apps.googleusercontent.com',
			// offlineAccess: true, 
			// hostedDomain: '', 
			// loginHint: '', 
			// forceConsentPrompt: true, 
			// accountName: '',
		});

		// await GoogleSignin.configure({
		// 	webClientId: "239361211085-0ut0vbkpfb7o179h8p1m6mcdi981a5e9.apps.googleusercontent.com",
		// 	offlineAccess: true
		// });

		try {

			await GoogleSignin.hasPlayServices();
			//await GoogleSignin.signIn();
			console.log("google sign in3");
			GoogleSignin.signIn().then(data => {
				console.log("google sign in22" + data);

				//console.log(data.user.email);
				handleSocialLogin(data.user.id, 'GOOGLE', data.user.email, data.user.name);

			});



		} catch (error) {
			console.log("ERROR33", error);
			// if (error.code === statusCodes.SIGN_IN_CANCELLED) {
			//   // user cancelled the login flow	
			// } else if (error.code === statusCodes.IN_PROGRESS) {
			//   // operation (f.e. sign in) is in progress already
			// } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
			//   // play services not available or outdated
			// } else {
			//   // some other error happened
			// }
		}
	} else {
		console.log('googlesigninentry');
		const manager = new OAuthManager('Tropy');
		manager.configure({
			google: {
				callback_url: GOOGLE_CALLBACK_URL,
				client_id: GOOGLE_CLIENT_ID, // client_secret: GOOGLE_CLIENT_SECRET,
			},
		});
		manager
			.authorize('google', {
				scopes: 'email',
			})
			.then((resp: Object) => {
				const userId =
					resp &&
					resp.response &&
					resp.response.credentials &&
					resp.response.credentials.accessToken;
				handleSocialLogin(userId, 'GOOGLE', null, null);

				console.log('Your users ID', resp, userId);
			})
			.catch((err: Object) => {
				console.log('There was an error', err);
			});
	}
};

const afterLoginComplete = async (token) => {
	const response = await fetch(
		`https://graph.facebook.com/me?fields=id,name,email,first_name,last_name,gender,picture,cover&access_token=${token}`);
	let result = await response.json();
	//console.log("InitUserData:", result)

	return result;

};

// const faceBookLogin = (handleSocialLogin: Function) => {
// 	const { LoginManager } = Platform.OS === 'android' && require('react-native-fbsdk');
// 	const { AccessToken } = Platform.OS === 'android' && require('react-native-fbsdk');
// 	if (LoginManager) {
// 		LoginManager.setLoginBehavior("web_only")
// 		LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
// 			result => {
// 				if (result.isCancelled) {
// 					console.log('Login cancelled');
// 				} else {
// 					AccessToken.getCurrentAccessToken().then(data => {
// 						//console.log('FBLOGINDATAVALUESARE : ', data);

// 						const { accessToken } = data;
// 						let myusernameval = ''
// 						let myemailid = ''
// 						// initUser(accessToken).then((val) => {
// 						// 	myusernameval = val
// 						// 	const facebookId = data.userID;
// 						// 	handleSocialLogin(accessToken, 'FACEBOOK', '', val);
// 						// })
// 						afterLoginComplete(accessToken).then((resultdata) => {
// 							handleSocialLogin(accessToken, 'FACEBOOK', resultdata.email, resultdata.name);
// 							console.log("GETFBDATA:", resultdata)

// 						});


// 					}); // console.log("result", result); // handleSocialLogin("userId", "FACEBOOK", null, null); // console.log( //  "Login success with permissions: " + result.grantedPermissions.toString(), // );
// 				}
// 			},
// 			error => {
// 				console.log('Login fail with error: ' + error);
// 			},
// 		);
// 	} else {
// 		const manager = new OAuthManager('Tropy');
// 		manager.configure({
// 			facebook: {
// 				client_id: FB_CLIENT_ID,
// 				client_secret: FB_CLIENT_SECRET,
// 			},
// 		});
// 		manager
// 			.authorize('facebook')
// 			.then(resp => {
// 				console.log('FACEBOOKResponse:', resp);
// 				const userId =
// 					resp &&
// 					resp.response &&
// 					resp.response.credentials &&
// 					resp.response.credentials.accessToken;
// 				afterLoginComplete(resp.response.credentials.accessToken).then((resultdata) => {
// 					handleSocialLogin(resp.response.credentials.accessToken, 'FACEBOOK', resultdata.email, resultdata.name);
// 					console.log("GETFBDATA:", resultdata)

// 				});
// 				//handleSocialLogin(userId, 'FACEBOOK', '', '');
// 				console.log('Your users ID', resp);
// 			})
// 			.catch(err => {
// 				console.log('There was an error', err.message);
// 			});

// 		manager.makeRequest('facebook', '/me', { scopes: 'email,profile' })
// 			.then(resp => {
// 				console.log('Data ->', resp.data);
// 				handleSocialLogin(resp.data.id, 'FACEBOOK', '', resp.data.name);
// 			});
// 	}
// };

const renderSocialLogin = handleSocialLogin => (
	<View>
		<Text style={styles.socialLoginText}>
			{Strings.authentication.LOGIN_WITH_SOME_SOCIAL_NETWORKS}
		</Text>

		<View style={styles.iconContainer}>
			<TouchableOpacity
				onPress={() => {
					twitterSignIn(handleSocialLogin);
				}}
			>
				<Icon
					style={styles.icon}
					name={Images.twitter}
					size={16}
					color={Colors.bodyPrimaryLight}
				/>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => {
					// faceBookLogin(handleSocialLogin);
				}}
			>
				<Icon
					style={styles.icon}
					name={Images.facebook}
					size={16}
					color={Colors.bodyPrimaryLight}
				/>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => {
					googleSignIn(handleSocialLogin);
				}}
			>
				<Icon
					style={styles.icon}
					name={Images.googlePlus}
					size={16}
					color={Colors.bodyPrimaryLight}
				/>
			</TouchableOpacity>
		</View>
	</View>
);

const twitterSignIn = (handleSocialLogin: any) => {
	RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET);
	RNTwitterSignIn.logIn()
		.then((loginData: Object) => {
			console.log('Twitter:', loginData);
			const { authToken, authTokenSecret, userID, userName, email } = loginData;
			if (authToken && authTokenSecret) {
				handleSocialLogin(userID, 'TWITTER', email, userName);
			}
		})
		.catch(error => {
			console.log(error);
		});
};

type Props = {
	handleSignUp: Function,
	handleLoginEvent: Function,
	handleSocialLogin: Function,
	isLoading: any,
};

export default function FirstAuthScreenUI(props: Props) {
	const {
		handleSignUp,
		handleLoginEvent,
		handleSocialLogin,
		isLoading,
		isEmailRequired,
		renderDialog,
	} = props;
	return (
		<View style={styles.container}>
			<StatusBar barStyle='light-content' backgroundColor='transparent' translucent />

			<View style={styles.logoContainer}>
				{/* <SvgUri
                    width={ScalePerctFullWidth(26)}
                    height={ScalePerctFullHeight(2)}
                    svgXmlData={logo}
                /> */}

				{/* <Image
                    resizeMode="contain"
                    source={Images.ABlogo}
                    style={{
                        width: 150,
                        height: 18,
                    }}
                /> */}
			</View>
			{isLoading && renderLoading()}
			{renderButton(handleLoginEvent)}

			{/* <Text style={styles.createAccountText} onPress={handleSignUp}>
                {Strings.authentication.CREATE_AN_ACCOUNT}
            </Text> */}

			{renderSeparator()}

			<TextButton
				textStyle={styles.createAccountText}
				//onPress={handleSignUp}
				title={Strings.authentication.CREATE_AN_ACCOUNT}
			/>
			{/* {renderSocialLogin(handleSocialLogin)} */}

			{/* <Video
                source={require("../../asset/Videos/login.mp4")} // Can be a URL or a local file.
                ref={ref => {
                    this.player = ref;
                }} // Store reference
                onBuffer={() => {}} // Callback when remote video is buffering
                onError={() => {}} // Callback when video cannot be loaded
                style={styles.backgroundVideo}
                repeat
                muted
                resizeMode="cover"
            /> */}

			<Image
				source={Images.loginScreen}
				resizeMode='cover'
				style={{
					width: ScalePerctFullWidth(100),
					height: ScalePerctFullHeight(100),
					zIndex: -2,
					position: 'absolute',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
				}}
			/>
			{isEmailRequired && renderDialog()}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: ScalePerctFullHeight(100),
		alignItems: 'center',
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'black',
	},
	dialogBox: {
		position: 'absolute',
		left: 30,
		right: 20,
		top: 250,
		bottom: 10,
		height: '40%',
		width: '85%',
		backgroundColor: Colors.bgPrimaryLight,
	},
	dialogHeader: {
		alignSelf: 'center',
		color: Colors.bgSecondaryDark,
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 10,
	},
	submitButton: {
		alignSelf: 'center',
		marginTop: 40,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'red',
		height: '10%',
		width: '40%',
		borderRadius: 5,
	},
	buttonTitile: {
		fontFamily: 'BentonSans Bold',
	},
	textInput: {
		borderBottomColor: Colors.bgTertiaryDark,
		margin: 10,
		borderBottomWidth: 2,
	},
	indicator: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00000080',
	},
	createAccountText: {
		fontSize: Metrics.SMALL_TEXT_SIZE,
		letterSpacing: 0.3,
		color: Colors.bgPrimaryLight,
		marginTop: 50
	},
	separator: {
		borderBottomColor: Colors.bgPrimaryLight,
		borderBottomWidth: 1,
		flex: 1,
		alignSelf: 'center',
	},
	orText: {
		fontSize: Metrics.VV_SMALL_TEXT_SIZE,
		color: Colors.bgPrimaryLight,
		flex: 0.25,
		textAlign: 'center',
		letterSpacing: 0,
	},
	separatorContainer: {
		flexDirection: 'row',
		margin: ScalePerctFullWidth(8),
		letterSpacing: 0,
	},
	socialLoginText: {
		fontSize: Metrics.V_SMALL_TEXT_SIZE,
		letterSpacing: 0.23,
		marginBottom: ScalePerctFullWidth(6),
		color: Colors.bgPrimaryLight,
	},
	iconContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: ScalePerctFullHeight(5.2),
	},
	backgroundVideo: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		zIndex: -1,
	},
	logoContainer: {
		position: 'relative',
		marginTop: ScalePerctFullHeight(10),
		marginBottom: ScalePerctFullHeight(45),
		alignItems: 'center',
	},
	icon: { paddingHorizontal: Metrics.DEFAULT_LIST_PADDING },
});
