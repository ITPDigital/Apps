import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Platform
} from 'react-native';
import { PaywallItpIntance } from '../../service/axios';
import * as RNIap from "react-native-iap";
import { getCurrentUserEmailStorage } from "../../storage";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions} from '../../redux';
import SplashScreen from "react-native-splash-screen";

const subscriptionItems = Platform.select({
  ios: ["com.pagesuite.arabianbusiness.monthly"],
  android: ["ab.monthly"],
});

type Props = {
	navigation: any,
	topics: any,
	selectedList: any,
	isNotStartUp?: boolean,
};

class Subscription extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showLoader: true,
      subscription: [],
      subscriptionamount: "",
      productid: "",
      receipt: {},
      screenheight: 0,
    };
  }


  componentDidMount = () => {
		SplashScreen.hide();

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    console.log("ViewportHeight", windowHeight);
    console.log("ViewportWidth", windowWidth);


    RNIap.initConnection();

    RNIap.getSubscriptions(subscriptionItems)
      .then((items) => {
        console.log("SUBSCRIPTION", items[0]);
        this.setState({
          subscriptionamount: "₹1.00", //items[0]["localizedPrice"],
          productid: items[0]["productId"],
          subscription: items,
          showLoader: false,
          screenheight: windowHeight,
        });
      })
      .catch((error) => {
        this.setState({
          showLoader: false,
        });
        console.log(error.message);
      });
  };


  OnSubscribe = () => {
    console.log('ProductID---', this.state.productid);
    console.log("AVAILBLEPURCH", RNIap.getAvailablePurchases());

    RNIap.getAvailablePurchases();

    RNIap.buySubscription(this.state.productid)
      .then((purchase) => {
        console.log('purchaseID of IAP', purchase);
        const isIOS = Platform.OS === 'ios';
        let transactionDetails = {};
        if (isIOS) {
          transactionDetails = {
            user_id: user && user.id,
            brandId,
            amount: item.price,
            transactionId: purchase && purchase.transactionId,
            productId: purchase && purchase.productId,
            transactionDate: purchase && purchase.transactionDate,
            transactionReceipt: purchase && purchase.transactionReceipt,
            originalTransactionIdentifier:
              purchase && purchase.originalTransactionIdentifierIOS,
            originalTransactionDate:
              purchase && purchase.originalTransactionDateIOS,
            payment_gateway: 'APPLE',
          };
        } else {
          transactionDetails = {
            user_id: user && user.id,
            brandId,
            amount: item.price,
            transactionId: purchase && purchase.transactionId,
            productId: purchase && purchase.productId,
            transactionDate: purchase && purchase.transactionDate,
            transactionReceipt: purchase && purchase.purchaseToken,
            payment_gateway: 'GOOGLE',
          };
        }
        this.setState({
          receipt: purchase,
        });

        console.log('RECEIPT:', receipt);
        if (transactionDetails != null) {
          //call add order api
          this.addOrder();
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  addOrder = () => {
    const { navigation } = this.props;
    let email = '';
    getCurrentUserEmailStorage().then((mailId) =>
      email = mailId
    );

    console.log("emaill: " + mailId)
    PaywallItpIntance.post('mobileapp/order_det', {
      online_ucode: '17',
      bank_id: '0',
      email: 'logu.vijay1@itp.com',//email
      subs_type: 'D',
      subs_cat: 'Free',
      sitekey: 'CWO',
    })
      .then((response) => {
        console.log('subscribe :' + JSON.stringify(response));
        if (response.status === 200) {
          //if subscribe then land on home screen
          navigation.navigate('HomeNavigation');
        }
      })
      .catch((error) => {
        //then land on msg screen with msg
        console.log('subscribe error:' + JSON.stringify(response));
        alert(error.request.status);
        if (error.request.status == 401 || error.request.status == 400) {
          navigation.navigate('MessageAuthScreen', {
            message: error.request._response,
          });
        }
      });
  };

  render() {
    console.log("Height--- ", Dimensions.get('window').height);

    return (
      // <ScrollView style={{height: '100%'}}>
      <ScrollView style={{flex:1}}
      contentContainerStyle={{ 
        flexGrow: 1, 
        flexDirection: 'column', 
      }}>
        <ImageBackground style={{
          //flex: 1,
          width: '100%',
          height: 450,
          resizeMode: 'cover',
          //justifyContent:'center',
          alignItems:'center',
          paddingBottom: 20
        }}
          source={require('./assets/images/digonal.png')}>

          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require('./assets/images/ablogo.png')}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: 'white' }} />

          </View>

          <Text style={{ fontSize: 22, color: 'black', fontFamily: "Roboto-Bold", textAlign:'center' }}>Get unlimited access to ArabianBusiness.com</Text>


          <View style={styles.pricing}>
            <View style={{ flexDirection: 'row' }}>
              {/* {this.state.subscription.map((item, index) => { */}
              <Text style={{ fontSize: 30, fontFamily: "Roboto-Bold", color: '#FFF' }} >
                {this.state.subscriptionamount}
                {/* Rs.520 */}
                {/* $5.99 */}
              </Text>
              {/* } */}
              <Text style={{ fontSize: 22, color: '#FFF', marginTop: 5, fontFamily: "Roboto-Medium", }}>
                {' '}
                /
              </Text>
              <Text style={{ fontSize: 18, color: '#FFF', marginTop: 10, fontFamily: "Roboto-Regular", }}>
                month
              </Text>
              <Text style={{ fontSize: 20, color: '#FFF', marginTop: 8, fontFamily: "Roboto-Regular", }}>
                *
              </Text>
            </View>
          </View>

          <Image
            resizeMode="contain"
            style={styles.computer}
            source={require('./assets/images/trump.png')}
          />

        </ImageBackground>

        <View style={styles.noteContainer}>
          <Image
            resizeMode="contain"
            style={styles.checkbox}
            source={require('./assets/images/checkbox.png')}
          />
          <Text style={styles.note}>
            Unlimited access to ArabianBusiness.com + iOS &amp; Android news
            apps
              </Text>
        </View>

        <View style={styles.noteContainer}>
          <Image
            resizeMode="contain"
            style={styles.checkbox}
            source={require('./assets/images/checkbox.png')}
          />
          <Text style={styles.note}>
            Access to Arabian Business’ award- winning journalism, podcasts
            &amp; videos
              </Text>
        </View>

        <View style={styles.noteContainer}>
          <Image
            resizeMode="contain"
            style={styles.checkbox}
            source={require('./assets/images/checkbox.png')}
          />
          <Text style={styles.note}>
            Exclusive subscriber-only articles, emails and events
              </Text>
        </View>

        <View style={styles.noteContainer}>
          <Image
            resizeMode="contain"
            style={styles.checkbox}
            source={require('./assets/images/checkbox.png')}
          />
          <Text style={styles.note}>
            Columns written by business leaders from the Gulf region &amp;
            worldwide
              </Text>
        </View>

        <View style={styles.noteContainer}>
          <Image
            resizeMode="contain"
            style={styles.checkbox}
            source={require('./assets/images/checkbox.png')}
          />
          <Text style={styles.note}>
            Digital access to Arabian Business magazine.
              </Text>
        </View>

        <View
          style={{
            width: '100%',
            height: 60,
            //backgroundColor: '#EE5407',
            justifyContent: 'center',
            alignItems: 'center',
            position:(Dimensions.get('window').height > 800) ? 'absolute' : null, //Here is the trick
            bottom: (Dimensions.get('window').height > 800) ? 20 : null,
            //overflow: 'hidden',
            paddingRight: 10,
            paddingLeft: 10,
            paddingBottom: 5,
            // marginTop: 20
          }}
        >
          <TouchableOpacity
            style={styles.subscribebutton}
            onPress={() => {
              //call subscribe function
              this.OnSubscribe();
            }}
          >
            <Text style={styles.buttontext}> SUBSCRIBE </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    );
  }
}

const styles = {
  logo: {
    height: 40,
    marginTop: (Dimensions.get('window').height > 800) ? 50 : 40
  },
  pricing: {
    alignItems: 'center',
    marginTop: 10
  },
  computer: {
    width: (Dimensions.get('window').height > 800) ? 283 : 283,
    height: (Dimensions.get('window').height > 800) ? 300 : 300,
    marginTop: 80,
  },
  noteContainer: {
    marginLeft: 20,
    // marginRight: 20,
    flexDirection: 'row',
    marginTop: 8,
    // backgroundColor:'red',
    //width:'100%',
  },
  checkbox: { width: 30, height: 30, marginTop: -5 },
  note: {
    fontSize: 14,

    color: 'black',
    marginLeft: 18,
    flexShrink: 1,
    // width: 282,
    fontFamily: "Roboto-Regular",

  },

  subscribebutton: {
    //paddingTop: 15,
    //paddingBottom: 15,
    backgroundColor: '#333333',
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: '100%',
    shadowOffset: { width: 0, height: 5 },
    shadowColor: '#000',
    shadowOpacity: 0.2,
    elevation: 3,
  },
  buttontext: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: "Roboto-Medium",
  },
};


function mapStateToProps() {
	// state
	return {};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Subscription);