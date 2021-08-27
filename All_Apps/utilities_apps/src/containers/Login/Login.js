import React, {PureComponent} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  AsyncStorage,
  Linking
} from 'react-native';
import {connect} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {bindActionCreators} from 'redux';
import {Actions} from '../../redux';
import LoginUI from './LoginUI';
import LoginTabletUI from './LoginTabletUI';
import {Metrics, emailValidator, Strings, Constants, Colors, Images} from '../../asset';
import {
  LoginApi,
  StartUp,
  StartBrandsService,
  setGlobalHeader,
  SocialLogin,
  SaveDeviceInfo,
  NavigationService,
  InitialWebService,
  MenuTopics,
} from '../../service';
import {AlertComp} from '../../components';
import {
  setCurrentUserIdStorage,
  setCurrentUserEmailStorage,
  setUserName,
  setCurrentUserToken,
  setMenuTopics,
  setSubscriptionStatus,
  getLanguage
} from '../../storage';
import {Analytics, Events} from '../../Analytics';
// import { addUserCredentialsRealm, setCurrentUserIdStorage } from "../../storage";
import { setUserActionInAsync } from '../../storage/AsyncStore';

type Props = {
  navigation: any,
  setUserAction: Function,
};

class Login extends PureComponent<Props> {
  constructor(props) {
    super(props);

    this.state = {
      showLoader: false,
      email: '',
      name: '',
      emailAuth: false,
      userId: '',
      mediatype: '',
    };
  }

  componentDidMount() {
    MenuTopics('100', this.onMenuSuccess, this.onMenuFailure, this.onMenuError);
    SplashScreen.hide();
    if (!this.props.isSplashScreenHide) {
      this.props.setStartUpAction(true);
    }
    getLanguage().then(language => {
      console.log("LANUGUAGE", language);
    });

  }
  
  handleSignUp = () => {
    // const {navigation} = this.props;
    // navigation.navigate('SignUpAuthScreen');

    Linking.openURL(Images.subscription_link);

  };

  handleForgotPassword = () => {
    const {navigation} = this.props;
    navigation.navigate('ForgotAuthScreen');
  };

  handleSocialLogin = (loginId, mediaType, email, userName) => {
    let event = Events.auth.googleLogin;
    if (mediaType == 'TWITTER') {
      event = Events.auth.twitterLogin;
    } else if (mediaType == 'FACEBOOK') {
      console.log('fb', Events.auth.facebookLogin);
      event = Events.auth.facebookLogin;
    }
    Analytics.logEvent(event);
    console.log(
      'Handle social login recieved items:',
      loginId,
      'type:',
      mediaType
    );
    this.setState({showLoader: true, email, name: userName});
    SocialLogin(
      loginId,
      mediaType,
      userName,
      email,
      this.onSuccess,
      this.onFailure,
      this.onError
    );
  };

  handleLogin = (email, password) => {
    if (!email || !password) {
      AlertComp(
        Strings.authentication.ALERT,
        'Enter the valid email and password'
      );
    } else if (!emailValidator(email)) { 
      AlertComp(
        Strings.authentication.ALERT,
        Strings.authentication.ENTER_VALID_EMAIL
      );
    } else {
      this.setState({showLoader: true, email});
      LoginApi(email, password, this.onSuccess, this.onFailure, this.onError,this.onUnregisterUser,this.onInvalidCredentials);
    }
  };

  setAllSections = (HomeScreenData) => {
    const {setMyTroveAction} = this.props;
    console.log('data inside the settings:', HomeScreenData);

    for (const key in HomeScreenData) {
      const SectionKey = key === 'home' ? '0' : key;
      setMyTroveAction(SectionKey, HomeScreenData[key], 'topic');
    }
  };

  onFetchSuccess = (response) => {
    const {navigation, setUserAction} = this.props;
    const {setInitialWebServiceData} = this.props;
    console.log('Onfetch Success data(From Initial WebService):', response);
    setInitialWebServiceData(response);
    this.setAllSections(response);
  };

  onMenuSuccess = (response: any) => {
    const {menuTopics} = this.state;
    console.log('Menutopics API Success');
    console.log('response in menu', response);
    this.setState({menuTopics: [...response]});
    setMenuTopics({menuTopics: response});
    InitialWebService(
      'moblie',
      this.onFetchSuccess,
      this.onFailure,
      this.onError
    );
  };

  onMenuFailure = (response: any) => {
    console.log('On Failure of menuTopicsApi', response);
  };

  onMenuError = () => {
    console.log('error');
  };

  onSuccess = (data) => {
    // MenuTopics("100", this.onMenuSuccess, this.onMenuFailure, this.onMenuError);
    console.log('LOGINDATA:  ' + JSON.stringify(data.data[0]));
    if(JSON.stringify(data.data[0]) == undefined){
      console.log('LOGINDATA11:  ' + JSON.stringify(data.data[0]));
      this.setState({showLoader: false});
      Linking.openURL(Images.subscription_link);
    }else{
      console.log('LOGINDATA22:  ' + JSON.stringify(data.data[0]));

      Analytics.logEvent(Events.auth.signIn);
      const {setUserAction, navigation, deviceInfo} = this.props;
      const dataId = data.data[0] && data.data[0].id;
      const deviceInfoUserId = (deviceInfo && deviceInfo.userId) || 100;
      this.setState({showLoader: false});
      console.log('login dataId', dataId);
      setUserAction(data.data[0]);
      setUserActionInAsync(data.data[0]);
      setCurrentUserIdStorage(dataId);
      setCurrentUserToken(data.data[0].jwt);
      setGlobalHeader(data.data[0].jwt);
      setCurrentUserEmailStorage(data.data[0].email);
      setUserName(data.data[0].name);
      console.log('dataId', dataId);
      console.log('deviceInfoId', deviceInfoUserId);
      console.log('jwt' + data.data[0]);
  
      //set issubscribe in asynstorage
      if (data.data[0].order_id == null) {
        //AsyncStorage.setItem("isSubscribe", JSON.stringify(false));
        setSubscriptionStatus("false");
      } else {
        //AsyncStorage.setItem("isSubscribe", JSON.stringify(true));
        setSubscriptionStatus("true");
      }
      //console.log("AsyncStorage: "+ JSON.stringify(AsyncStorage.getItem("isSubscribe")));
  
      if (dataId > 0) {
        AsyncStorage.setItem("customerId", `${dataId}`);
      } 
  
      SaveDeviceInfo(dataId, deviceInfoUserId, 'F');
      new StartUp(this.props);
      StartBrandsService(this.props);
      // setUserStorage(data.id, data);
      // if (data.topics === "") {
      // 	navigation.navigate("TopicsAuthScreen");
      // } else {
      console.log('deeplink onSuccess - Login', this.props.deeplink);
      if (this.props.deeplink && this.props.deeplink.deeplinkData) {
        console.log('deeplink data - ', this.props.deeplink.deeplinkData);
        NavigationService.handleDeepLinkData(
          this.props.deeplink.deeplinkData,
          this.props.resetDeeplinkData,
          navigation
        );
      } else {
        console.log("login after: ");
        if(data && data.data[0].order_id != null){
          navigation.navigate('HomeNavigation'); 
        }
        else{ 
          //land on subscription page
          // NTodo: Redirect to SubscriptionPaywall 
          //navigation.navigate('SubscriptionPaywall');  
         //navigation.navigate('HomeNavigation'); 
         Linking.openURL(Images.subscription_link);
  
  
        }
      }
    } 
    
    // }
  };

  reTry = () => {
    const {name, email, userId, mediatype} = this.state;
    console.log('retry function called with parameters:', name);
    this.setState({showLoader: true, emailAuth: false});
    SocialLogin(
      userId,
      mediatype,
      name,
      email,
      this.onSuccess,
      this.Failure,
      this.onError
    );
  };

  onFetchFailure = () => {
    console.log('Failure to fetch initial web service data');
  };
  onInvalidCredentials=(errorCode:any)=>{
	const {navigation} = this.props;
	  if(errorCode == 401){
		  this.setState({
			  showLoader:false
		  })
		  console.log("login onInvalidCredentials: "+ errorCode);
		  navigation.navigate('MessageAuthScreen', {
			message: "Invalid Username/Password.",
		  });
	  }

  }
  onFailure = (response: Object, userId: Number, mediatype: String) => {
    if (response.error_code === '103') {
      navigation.navigate('MessageAuthScreen', {
        message: response.message,
      });
    } else if (response.error_code === '101') {
      navigation.navigate('MessageAuthScreen', {
        message: response.message,
        resend: true,
        id: response.id,
      });
    } else if (response.error_code === '102') {
      navigation.navigate('MessageAuthScreen', {
        message: response.message,
      });
    } else if (response.error_code === '105') {
      this.setState({emailAuth: true, showLoader: false, userId, mediatype});
    } else {
	  navigation.navigate('MessageAuthScreen', {
        message: response.status,
      });
    }
  };
  onUnregisterUser = (msg: String) => {
    const {navigation} = this.props;
	this.setState({showLoader: false});
    navigation.navigate('SignUpAuthScreen');
  };
  onError = (error: any) => {
    this.setState({showLoader: false});
    let message = Constants.errorMessages.general;
    console.log('Error message:', message);
    if (error.toString().includes(Constants.errorMessages.checkNetwork)) {
      message = Constants.errorMessages.network;
    }
    AlertComp(Strings.authentication.ALERT, message);
  };

  renderDialog = () => {
    console.log('fillEmail called');
    return (
      <View style={styles.dialogBox}>
        <Text style={styles.dialogHeader}>Email required</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text: String) => this.setState({email: text})}
          placeholder="Email - Id"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text: String) => this.setState({name: text})}
          placeholder="Name"
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.reTry()}
        >
          <Text style={styles.buttonTitile}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderItem = () => {
    return Metrics.isTablet ? (
      <LoginTabletUI
        handleSignUp={this.handleSignUp}
        handleForgotPassword={this.handleForgotPassword}
        handleLogin={this.handleLogin}
        showLoader={this.state.showLoader}
        handleSocialLogin={this.handleSocialLogin}
        isEmailRequired={this.state.emailAuth}
        renderDialog={this.renderDialog}
      />
    ) : (
      <LoginUI
        handleSignUp={this.handleSignUp}
        handleForgotPassword={this.handleForgotPassword}
        handleLogin={this.handleLogin}
        showLoader={this.state.showLoader}
      />
    );
  };

  render() {
    console.log('device info', this.props.deviceInfo);
    return this.renderItem();
  }
}

const styles = StyleSheet.create({
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
    fontFamily: 'BentonSans Bold',
  },
  textInput: {
    borderBottomColor: Colors.bgTertiaryDark,
    margin: 10,
    borderBottomWidth: 2,
  },
});

function mapStateToProps(state) {
  // state
  return {
    user: state.User,
    isSplashScreenHide: state.isSplashScreenHide,
    deviceInfo: state.deviceInfo,
    deeplink: state.deeplink,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
