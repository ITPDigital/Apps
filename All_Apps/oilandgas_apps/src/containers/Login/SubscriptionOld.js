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
import subUrls from '../../config.js';   
const subUrl =   subUrls();

const subscriptionItems = Platform.select({
  ios: ["com.pagesuite.arabianbusiness.monthly"],
  android: ["ab.monthly"],
});

export default class SubscriptionOld extends Component {

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

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    console.log("ViewportHeight", windowHeight);
    console.log("ViewportWidth", windowWidth);


    RNIap.initConnection();

    RNIap.getSubscriptions(subscriptionItems)
      .then((items) => {
        console.log("SUBSCRIPTION", items[0]);
        this.setState({
          subscriptionamount: items[0]["localizedPrice"],
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
    PaywallItpIntance.post(subUrl+'order_det', { 
      online_ucode: '17',
      bank_id: '0',
      email: 'logu.vijay1@itp.com',//email
      subs_type: 'D',
      subs_cat: 'Free',
      sitekey: 'OAG',
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
    //console.log("AMOUNT--- ", Dimensions.get('window').height);

    return (
      <View style={styles.maincontainer}>
        <View style={styles.imagestyle}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require('./assets/images/ablogo.png')}
          />
        </View>
        <View style={styles.container}>
          <ImageBackground
            resizeMode="cover"
            style={styles.heading}
            source={require('./assets/images/header_sec.png')}
          >
            <View
              style={{
                position: 'absolute',
                top: -10,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>
                ALL ACCESS
              </Text>
            </View>
          </ImageBackground>
          {Dimensions.get('window').height > 800 ?
            <View style={styles.computerContainer}>
              <Image
                resizeMode="contain"
                style={styles.computer}
                source={require('./assets/images/computer.png')}
              />
            </View> : null}
          <View style={styles.pricing}>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              {/* {this.state.subscription.map((item, index) => { */}
              <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#D20A1E' }} >
                {this.state.subscriptionamount} 
                 {/* Rs.520 */}
                 {/* $5.99 */}
              </Text>
              {/* } */}
              <Text style={{ fontSize: 22, color: '#D20A1E', marginTop: 5, fontFamily: "Roboto-Medium", }}>
                {' '}
                /
              </Text>
              <Text style={{ fontSize: 18, color: '#D20A1E', marginTop: 10, fontFamily: "Roboto-Regular", }}>
                month
              </Text>
              <Text style={{ fontSize: 20, color: '#D20A1E', marginTop: 8, fontFamily: "Roboto-Regular", }}>
                *
              </Text>
            </View>
          </View>

          <View style={{ backgroundColor: '#CCC', height: 1, marginTop: 10, marginBottom: 10 }} />

          <View style={styles.whiteContainer}>
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
                Access to Oil & Gas’ award- winning journalism, podcasts
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
                Digital access to Oil & Gas magazine.
              </Text>
            </View>

          </View>

          <View
            style={{
              width: '100%',
              height: 60,
              //backgroundColor: '#EE5407',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute', //Here is the trick
              bottom: 10,
              //overflow: 'hidden',
              paddingRight: 10,
              paddingLeft: 10,
              paddingBottom: 5
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


        </View>
      </View>
    );
  }
}

const styles = {
  maincontainer: { height: '100%', backgroundColor: '#000000', paddingBottom: 10 },
  logo: { height: 40, width: 300 },
  computerContainer: { height: 150, alignItems: 'center', marginTop: 10 },
  computer: { width: 184, height: 200 },
  whiteContainer: {
    justifyContent: 'flex-start',
    paddingLeft: 47,
    paddingRight: 47,
  },
  noteContainer: { flexDirection: 'row', marginTop: 10 },
  checkbox: { width: 30, height: 30, marginTop: -5 },
  note: {
    fontSize: 14,
    color: 'black',
    marginLeft: 18,
    flexShrink: 1,
    width: 215,
    fontFamily: "Roboto-Regular",

  },
  imagestyle: {
    marginTop: (Dimensions.get('window').height > 800) ? 30 : 15,
    padding: 20,
    height: 36,
    alignItems: 'center',
    borderWidth: 1,
  },
  container: {
    //flex: 1,
    height: '80%',
    //flexDirection: 'column',
    marginRight: 16,
    marginLeft: 16,
    //marginBottom: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    //borderRadius: 15,
    borderWidth: 0,
    borderColor: '#fff',
    marginTop: 50,
    overflow: 'hidden',
    position: 'relative'
  },
  heading: {
    alignItems: 'center',
    justifyContent:'flex-start',
    //height: (Dimensions.get('window').height > 800) ? 90 : 100,
    minHeight: 90,     // <-- Min height is 20
    width: '100%',
    // paddingLeft: 10,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    //  marginTop: -0.8,
    //  marginLeft: -0.8,
  },
  pricing: {
    alignItems: 'center',
    marginTop: (Dimensions.get('window').height > 800) ? -40 : 0,

  },
  subscribebutton: {
    //paddingTop: 15,
    //paddingBottom: 15,
    backgroundColor: '#D20A1E',
    borderRadius: 8,
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
    // position:'absolute',
    // bottom: 10,

     //right: '5%',
     //left: '5%'
    // background color must be set
  },
  buttontext: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: "Roboto-Medium",  
  },
};
