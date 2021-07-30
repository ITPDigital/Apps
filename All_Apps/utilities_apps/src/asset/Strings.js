import DeviceInfo from "react-native-device-info";

const deviceId = DeviceInfo.getDeviceId();
const LOGIN_WITH_YOUR_EMAIL_ID = "Log in with your email id";
//const CREATE_AN_ACCOUNT = "Create an account";
const CREATE_AN_ACCOUNT = "Members Only Access";
const OR = "OR";
const LOGIN_WITH_SOME_SOCIAL_NETWORKS = "Log in with a social network";
const EMAIL = "Email";
const PASSWORD = "Password";
const LOGIN = "Login";
const NAME = "Name";
const SIGN_UP = "Sign Up";
const RETURN_TO_SIGN_IN = "Return to Sign in";
const I_AGREE_WITH_TROVE = " I agree with Trove";
const PRIVACY = "Privacy Policy";
const POLICY = "Policy";
const BY_CLICKING_ON = "By clicking on ";
const TERMS_AND_CONDITION = "Terms and Conditions";
const SUBMIT = "Submit";
const MESSAGE_TITLE = "Message sent";
const MESSAGE_DESCRIPTION = "Activation link sent to mail "; 
const OK = "OK";
const CLICK_HERE = "Click here";
const TO_RESEND_MAIL = "to resend mail.";
const ALERT = "Alert";
const ENTER_VALID_EMAIL = "Enter valid Email";
const ENTER_VALID_PASSWORD = "Enter a valid password with minimum 6 characters";
const AGREE_TERMS_AND_CONDITION = "Please agree Terms and Condition to proceed";
const VIEW_ALL = "View all";
const RESEND = "Resend";
const SUBSCRIBE = "Subscribe";
const UNSUBSCRIBE = "Unsubscribe";
const ON_SUC_PROF_PIC_UPLOAD = "Image uploaded successfully. It will appear once approved";
const ON_FAIL_PROF_PIC_UPLOAD = "Error! Uploaded file must be a valid image smaller than 2 MB.";
const CHECK_CONNECTION = "Please check your internet connection and try again later";
const I_AGREE_WITH_ARABIANBUSINESS = "I agree with Facilities Management";
const RETRIEVE_PASSWORD = "Retrieve Password";

export const Strings = {
	authentication: {
		LOGIN_WITH_YOUR_EMAIL_ID,
		CREATE_AN_ACCOUNT,
		OR,
		LOGIN_WITH_SOME_SOCIAL_NETWORKS,
		EMAIL,
		PASSWORD,
		LOGIN,
		NAME,
		SIGN_UP,
		RETURN_TO_SIGN_IN,
		I_AGREE_WITH_TROVE,
		PRIVACY,
		POLICY,
		BY_CLICKING_ON,
		TERMS_AND_CONDITION,
		SUBMIT,
		MESSAGE_TITLE,
		MESSAGE_DESCRIPTION,
		OK,
		CLICK_HERE,
		TO_RESEND_MAIL,
		ALERT,
		ENTER_VALID_EMAIL,
		ENTER_VALID_PASSWORD,
		AGREE_TERMS_AND_CONDITION,
		RESEND,
		I_AGREE_WITH_ARABIANBUSINESS,
		RETRIEVE_PASSWORD,
	},
	podCast: {
		VIEW_ALL,
		SUBSCRIBE,
		UNSUBSCRIBE,
	},
	profile: {
		ON_SUC_PROF_PIC_UPLOAD,
		ON_FAIL_PROF_PIC_UPLOAD,
	},
	bookmark: {
		CHECK_CONNECTION,
	},
	device: {
		deviceId,
	},
};
