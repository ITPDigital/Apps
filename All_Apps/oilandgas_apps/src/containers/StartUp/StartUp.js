import React, {PureComponent} from 'react';
import {View, StyleSheet, Image, Dimensions, AsyncStorage, Linking, Animated} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions} from '../../redux';
import {Colors, ScalePerctFullWidth, ScalePerctFullHeight} from '../../asset';
import {
  getCurrentUserIdStorage,
  getCurrentUserToken,
  getSubscribeUserIdStorage,
  setMenuTopics,
  getSubscriptionStatus,
} from '../../storage';
import {
  StartUp,
  StartBrandsService,
  setGlobalHeader,
  NavigationService,
  InitialWebService,
  MenuTopics,
} from '../../service';
import FetchPreferenceApi from '../../service/Authentication/FetchPreference';
import { getUserActionInAsync } from '../../storage/AsyncStore';





type Props = {
  navigation: any,
  setUserAction: Function,
};

class StartUpScreen extends PureComponent<Props> {
  constructor(props) {
    super(props);
    new StartUp(props);
    StartBrandsService(props);
    this.state = {menuTopics: [], canNavigate: false,   fadeAnim: new Animated.Value(0)};
  }



  componentDidMount() {

    this.fadeIn(); 

    const {navigation, setUserAction} = this.props;

    getCurrentUserIdStorage()
      .then((userId: number) => {
        console.log("user id", userId);
        if (userId) {
         getUserActionInAsync().then((user)=>{
           console.log("USERDATA: "+ JSON.stringify(user))
          setUserAction(JSON.parse(user));
          setGlobalHeader(JSON.parse(user).jwt);
         })
         
          MenuTopics(
            '100',
            this.onMenuSuccess,
            this.onMenuFailure,
            this.onMenuError
          );
        } else {
          this.onError();
        }
      })
      .catch((error: any) => {
        this.onError();
      });
  }


  fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 5000
    }).start();

  };
  
  onMenuSuccess = (response: any) => {
    const {menuTopics} = this.state;
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
    this.setState({canNavigate: true});
    // console.log("isSubscribe: before " + AsyncStorage.getItem('isSubscribe'));



    setTimeout(()=>{
      getSubscriptionStatus().then((status)=>{
        console.log("SUBSCRIPTIONSTATUS: "+ status);
  
        if (status == "true") {
          console.log("isSubscribe11"+JSON.stringify(status));
  
          navigation.navigate('HomeNavigation');
        } else if (status == "false") {
          console.log("isSubscribe22"+status);
  
         // navigation.navigate('SubscriptionPaywall');
          //navigation.navigate('HomeNavigation');
  
          //Linking.openURL("https://www.arabianbusiness.com/subscriptions/index.html");
          navigation.navigate("LoginAuthScreen");
  
        
        }
  
       
      })

          //console.log('isSubscribe: ' + isSubscribe);
    if (this.props.deeplink && this.props.deeplink.deeplinkData) {
      console.log('deeplink data - ', this.props.deeplink.deeplinkData);
      NavigationService.handleDeepLinkData(
        this.props.deeplink.deeplinkData,
        this.props.resetDeeplinkData,
        navigation
      );
    } 

    },2000)  



  };

  onSuccess = (response: 'string') => {
    // const {navigation, setUserAction} = this.props;
    // setUserAction(response);
    // // if (response.topics === null) {
    // // 	// console.log("---------------------------true");
    // // 	navigation.navigate("TopicsAuthScreen");
    // // 	// SplashScreen.hide();
    // // } else {
    //  console.log("onSuccess: "+ JSON.stringify(response));
    // MenuTopics('100', this.onMenuSuccess, this.onMenuFailure, this.onMenuError);
    // console.log('deeplink onSuccess - StartUp', this.props.deeplink);
    // // if (this.props.deeplink && this.props.deeplink.deeplinkData) {
    // // 	console.log("deeplink data - ", this.props.deeplink.deeplinkData);
    // // 	NavigationService.handleDeepLinkData(
    // // 		this.props.deeplink.deeplinkData,
    // // 		this.props.resetDeeplinkData,
    // // 		navigation,
    // // 	);
    // // } else {
    // // 	console.log("*********");
    // // 	navigation.navigate("HomeNavigation");
    // // }
    // // SplashScreen.hide();
    // // }
  };

  onSuccessSubscribe = (response: 'string') => {
    const {setSubscribeUserAction} = this.props;
    setSubscribeUserAction(response);
  };

  onMenuFailure = (response: any) => {
    console.log('On Failure of menuTopicsApi', response);
  };

  onMenuError = () => {
    console.log('error');
  };

  // onFailure = (response: 'object') => {
  // 	const { navigation } = this.props;
  // 	navigation.navigate("AuthNavigation");
  // };

  onError = () => {
    const {navigation} = this.props;
    // console.log("-------------------------------failed");
    //navigation.navigate('AuthNavigation');
    
		navigation.navigate("LoginAuthScreen");
  };

  render() { 
    console.log('canNavigate', this.state.canNavigate);

    return (
      <Animated.View style={styles.container}>              
        <Animated.Image 
          resizeMode="contain"  
          source={require('../../asset/Images/black_logo.png')}   
          style={[styles.image, {
            // Bind opacity to animated value 
            opacity: this.state.fadeAnim, 
            transform: [
              {
                scale: this.state.fadeAnim.interpolate({   
                  inputRange: [7.5, 15],  
                  outputRange: [10, 20],        
                })
              },  
            ],
          }]}  
        />
      </Animated.View>
    );
  }
}

function mapStateToProps(state) {
  // state
  return {
    podcastTracks: state.podcastChaptor,
    control: state.podcastPlayControl,
    deeplink: state.deeplink,
  }; 
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StartUpScreen);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  header: {
    alignSelf: 'flex-start',
  },
  container: { 
    flexDirection: 'column', 
    alignItems: 'center',
    alignContent: 'center', 
    backgroundColor:'#fff',   
    width: ScalePerctFullWidth(100),
    height: ScalePerctFullHeight(100),
  },
  image: {
    width: ScalePerctFullWidth(75),
    height: ScalePerctFullHeight(75),
  },
});
