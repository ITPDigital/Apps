import React, {PureComponent} from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation';
import {
  View,
  StyleSheet,
  Animated,
  Image,
  ActivityIndicator,
  Text,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions} from '../redux';
import {ArticleList} from '../containers';
import {
  Colors,
  ScalePerctFullWidth,
  Metrics,
  Constants,
  ScalePerctFullHeight,
  Images,
} from '../asset';
import HomeHeaderContainer from './HomeHeaderContainer';
import {MenuTopics} from '../service/MenuTopics';
import {InitialWebService} from '../service';
import {getMenuTopics} from '../storage';
import Icon from '../asset/fonts/icons';
import store from '../redux/Store';

//https://reactnativecode.com/collapsible-expandable-animated-header-ios-android/
type Props = {
  menuTopics: any,
  navigation: any,
};

const Header_Maximum_Height = 320;

const Header_Minimum_Height = 100;

class HomeMenuNav extends PureComponent<Props> {
  clampedScrollValue = 0;

  offsetValue = 0;

  scrollValue = 0;

  constructor(props) {
    super(props);
    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);
    this.state = {
      sectionFlag: false,
      menuTopics: [],
      scrollAnim,
      offsetAnim,
      clampedScroll: Animated.diffClamp(
        Animated.add(
          scrollAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
          offsetAnim
        ),
        0,
        Metrics.HEADER_HEIGHT
      ),
      isCollapsed: false,
    };
    this.AnimatedHeaderValue = new Animated.Value(0);
    // AnimatedImage = Animated.createAnimatedComponent(ImageBackground);
    AnimatedImage = Animated.createAnimatedComponent(View);

    this.childRef = null;
    // this.AnimatedFlatList = Animated.createAnimatedComponent(); // TODO
  }

  componentDidMount = () => {
    const {menuTopics} = this.state;
    this.state.scrollAnim.addListener(({value}) => {
      // This is the same calculations that diffClamp does.
      const diff = value - this.scrollValue;
      this.scrollValue = value;
      this.clampedScrollValue = Math.min(
        Math.max(this.clampedScrollValue + diff, 0),
        Metrics.HEADER_HEIGHT
      );
    });
    this.state.offsetAnim.addListener(({value}) => {
      this.offsetValue = value;
    });
    console.log('async func', getMenuTopics());
    getMenuTopics()
      .then((items) => {
        console.log('async', items);
        const item = JSON.parse(items);
        console.log('async after', item.menuTopics);
        this.setState({menuTopics: item.menuTopics}, function () {
          if (this.state.menuTopics.length === 0) {
            console.log('Menu API is calling from navigator');
            MenuTopics('100', this.onSuccess, this.onFailure, this.onError);
          }
        });
      })
      .catch((error) => console.log('error in asyc', error));
  };

  componentWillUnmount() {
    // Don't forget to remove the listeners!
    this.state.scrollAnim.removeAllListeners();
    this.state.offsetAnim.removeAllListeners();
  }

  onSuccess = (response: any) => {
    const {menuTopics} = this.state;
    this.setState({menuTopics: [...response], sectionFlag: true});
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
    const {setInitialWebServiceData} = this.props;
    console.log('Onfetch Success data(From Initial WebService):', response);
    setInitialWebServiceData(response);
    this.setAllSections(response);
  };

  onFailure = (response: any) => {
    console.log('On Failure of menuTopicsApi', response);
  };

  onError = () => {
    console.log('error');
  };

  onScrollEndDrag = () => {
    this.scrollEndTimer = setTimeout(this.onMomentumScrollEnd, 250);
  };

  onMomentumScrollBegin = () => {
    clearTimeout(this.scrollEndTimer);
  };

  onMomentumScrollEnd = () => {
    console.log('on scroll 3');
    const headerHeight = Metrics.HEADER_HEIGHT;
    const toValue =
      this.scrollValue > headerHeight &&
      this.clampedScrollValue > headerHeight / 2
        ? this.offsetValue + headerHeight
        : this.offsetValue - headerHeight;

    Animated.timing(this.state.offsetAnim, {
      toValue,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  onScrollCompMount = () => {
    console.log('on scroll 2');

    this.clampedScrollValue = 0;
    this.offsetValue = 0;
    this.scrollValue = 0;
    this.onMomentumScrollEnd();
    // this.setState({
    // 	scrollAnim: new Animated.Value(0),
    // 	offsetAnim: new Animated.Value(0),
    // });
  };

  tab = (category: any) => {
    // const screen = this.getTabForCategory(category);
    console.log('category id', category);
    //alert(category)
    const screen = (props) => (
      //	this.state.sectionFlag ? (
      <ArticleList
        tid={category.id}
        type={category.type}
        brandKey={category.brand_key}
        {...props}
      />
    );
    //	) : null;
    return {
      screen,
      navigationOptions: {
        tabBarLabel:
          category.type === 'topic'
            ? category.name
            : category.type !== 'topic' && (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    width: Metrics.isTablet
                      ? ScalePerctFullWidth(15)
                      : ScalePerctFullWidth(30),
                    marginLeft: ScalePerctFullWidth(15),

                  }}
                >
                  <Image
                    style={{
                      alignItems: 'center',
                      alignSelf: 'center',
                      resizeMode: 'contain',
                      height: Metrics.isTablet ? 18 : 15,
                      width: Metrics.isTablet
                        ? ScalePerctFullWidth(15)
                        : ScalePerctFullWidth(30),
                      // marginLeft: ScalePerctFullWidth(5),
                    }}
                    source={{
                      uri: category.logo,
                    }}
                  />
                </View>
              ),
      },
    };
  };

  tabs(categories) {
    const routes = {};
    categories.forEach((category: any, index: any) => {
      if (category.type == 'topic') {
        //alert(JSON.stringify(category))
        routes[index] = this.tab(category);
      } else if (category.type === 'brand') {
        routes[index] = this.tab(category);
      }
    });
    return routes;
  }

  render() {
    const AnimateHeaderBackgroundColor = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],

      outputRange: ['#009688', '#00BCD4'],

      extrapolate: 'clamp',
    });

    const AnimateHeaderOpacityWhite = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, 90],

      outputRange: [0, 90],

      extrapolate: 'clamp',
    });
    const AnimateHeaderOpacityBlack = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, 90],

      outputRange: [90, 0],

      extrapolate: 'clamp',
    });

    const AnimateHeaderHeight = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],

      outputRange: [Header_Maximum_Height, Header_Minimum_Height],

      extrapolate: 'clamp',
    });
    const AnimateHeaderWhiteHeight = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, 30],

      outputRange: [0, 90],

      extrapolate: 'clamp',
    });
    const {navigation} = this.props;
    return (
      <View style={styles.MainContainer}>
        <View
          style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}
        >
          <ArticleList
            tid={0}
            navigation
            screenProps={{
              navigation,
              onMomentumScrollBegin: this.onMomentumScrollBegin,
              onMomentumScrollEnd: this.onMomentumScrollEnd,
              onScrollEndDrag: this.onScrollEndDrag,
              scrollAnim: this.state.scrollAnim,
              onScrollCompMount: this.onScrollCompMount,
              AnimatedHeaderValue: this.AnimatedHeaderValue,
              isFromHomePage: true,
            }}
          />
        </View>

        <StatusBar
          backgroundColor={this.state.isCollapsed ? 'white' : 'black'}
          animated={true}
          translucent
          barStyle="dark-content"
          style={{height: 32}}
        />

        {Platform.OS === 'ios' ? (
          <View
            pointerEvents={'none'}
            style={{
              width: '100%',
              height: 200,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <TouchableOpacity style={{height: 300}}>
              <Animated.View
                style={{
                  height: AnimateHeaderHeight,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  opacity: AnimateHeaderOpacityBlack,
                }}
              >
                <View style={[styles.headerContainer]}>
                  {renderSearchbuffer}
                  <Image
                    //source={Images.ABlogo}
                    source={require('../asset/Images/white_logo.png')}
                    resizeMode="cover"
                    style={{
                      width: 180,
                      height: 45,
                      marginLeft: 10,
                      marginTop: 30,
                      elevation: 3,
                      zIndex: 3,
                    }}
                  />
                  {renderSearchbtn(
                    () => navigation.navigate('SearchDrawerScreen'),
                    false
                  )}
                  {renderActionbtn(() => {}, '', navigation)}
                </View>
              </Animated.View>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={{
              width: '100%',
              height: 200,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            {/* <TouchableOpacity style={{height: 300}}> */}
              <Animated.View
                style={{
                  height: AnimateHeaderHeight,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  opacity: AnimateHeaderOpacityBlack,
                }}
              >
                <View style={[styles.headerContainer]}>
                  {renderSearchbuffer}
                  <Image
                    //source={Images.ABlogo}
                    source={require('../asset/Images/white_logo.png')}
                    resizeMode="contain"
                    style={{
                      width: 120,
                      height: 40,
                      marginLeft: 10,
                      marginTop: 30,
                      elevation: 3,
                      zIndex: 3,
                    }}
                  />
                  {renderSearchbtn(
                    () => navigation.navigate('SearchDrawerScreen'),
                    false
                  )}
                  {renderActionbtn(() => {}, '', navigation)}
                </View>
              </Animated.View>
            {/* </TouchableOpacity> */}
          </TouchableOpacity>
        )}

        <Animated.View
          style={{
            backgroundColor: '#f99509',
            height: AnimateHeaderWhiteHeight,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            opacity: AnimateHeaderOpacityWhite,
            shadowColor: '#999999',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.9,
            shadowRadius: 2, 
            elevation: 3,

          }}
        >
          <View style={[styles.headerContainer]}>
            {renderSearchbuffer}
            <Image
              source={require('../asset/Images/black_logo.png')}
              resizeMode="cover"
              style={{
                width: 180,
                height: 30,
                marginLeft: 10,
                marginTop: 30,
                position: 'absolute',
              }}
            />

            {renderSearchbtn(
              () => navigation.navigate('SearchDrawerScreen'),
              true
            )}
            {renderActionbtn(null, '', navigation)}
          </View>
        </Animated.View>
      </View>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    menuTopics: state.menuTopics,
    userId: state.user.id,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeMenuNav);

const renderSearchbtn = (onSearch: Function, isCollapsed: Boolean) => {
  return (
    <TouchableHighlight
      onPress={() => onSearch()}
      style={styles.searchBtnContainer}
    >
      <Icon
        name={Images.search}
        size={25}
        color={isCollapsed ? 'black' : 'white'}
        style={styles.icon}
      />
    </TouchableHighlight>
  );
};
const renderSearchbuffer = () => {
  return <View style={{paddingHorizontal: 16}} />;
};
const renderActionbtn = (
  onAction: Function,
  imageUrl: string,
  navigation: any
) => {

  let storeData = store.getState().user;
  let userName, profilePic = "";
  if(store.getState().user.hasOwnProperty('data')){
    console.log("STOREUSERSocialLogin")
    userName = store.getState().user.data[0].name;
    if(userName == null || userName == ""){
      userName = store.getState().user.data[0].email;
    }
    //profilePic = store.getState().user.data[0].profile_picture;
  }else{
    console.log("STOREUSERNormalLogin")
    userName = store.getState().user.name
    //profilePic store.getState().user.profile_picture;
  }

  let userInitial = userName ? userName.split('')[0] : '';
  console.log('Profile pic in pager header:', store.getState().user.name);
  const displayImage = profilePic
    ? {uri: profilePic}
    : Images.defaultProfilePic;
  return (
    <TouchableHighlight
      onPress={() => navigation.navigate('ProfileDrawerScreen')}
      style={styles.actionPicContainer}
    >
      {profilePic ? (
        <Image style={styles.actionPic} source={displayImage} />
      ) : (
        <View
          style={{
            height: 35,
            width: 35,
            borderRadius: 17,
            backgroundColor: 'green',
            borderColor: '#FFFFFF',
            borderWidth: 1,
            alignItems: 'center',
            alignContent: 'center',
            // flex:1
            justifyContent: 'center',
            textAlign: 'center', // <-- the magic

          }}
        >
          <Text
            style={{
            //fontWeight: 'bold',
            color:'white',
            fontSize: 18,
            marginTop: -3,
            alignItems: 'center',
            alignContent: 'center',
            // flex:1
            justifyContent: 'center',
    //width: 200,
   // backgroundColor: 'yellow',
            }}
          >
            {userInitial}
          </Text>
        </View>
      )}
    </TouchableHighlight>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, paddingTop: 0},
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  statusContainer: {
    flexDirection: 'column',
    width: ScalePerctFullWidth(100),
    height: Metrics.HEADER_HEIGHT,
    borderBottomWidth: Metrics.LINE_WIDTH,
  },
  headerContainer: {
    flex: 1,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  MainContainer: {
    flex: 1,
    flexDirection: 'column',
  },

  HeaderStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 20,
  },

  HeaderInsideTextStyle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },

  TextViewStyle: {
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
    margin: 5,
    padding: 7,
    backgroundColor: '#ECEFF1',
  },
  actionPicContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginRight: 16,
    marginLeft: 15,
    height: 30,
    marginTop: 30,
  },
  actionPic: {
    borderRadius: 0,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBtnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 30,
    marginTop: 30
  },
});
