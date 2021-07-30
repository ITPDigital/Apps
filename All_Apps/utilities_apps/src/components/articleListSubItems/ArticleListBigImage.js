import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Dimensions,
  I18nManager
} from 'react-native';
import ImageLoad from 'react-native-image-placeholder';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors, Metrics, ScalePerctFullWidth, Images} from '../../asset';
import {getTimeAgo} from '../../utilities';
import {shareArticle} from '../common';
import TextTicker from 'react-native-text-ticker';
import Marquee from './Marquee';
import {getArticleBackgroundData} from '../../storage';
//  import { MarqueeHorizontal, MarqueeVertical } from 'react-native-marquee-ab';
import MarqueeHorizontal from '../../lib/MarqueeHorizontal';

type Props = {
  imageUrl?: string,
  padded?: boolean,
  isNotopMargin?: boolean,
  isVideo?: boolean,
};

export default function ArticleListBigImage(props: Props) {
  const {
    imageUrl,
    padded,
    isNotopMargin,
    height,
    width,
    isVideo,
    tabContainerStyle,
    title,
    item,
    user,
    onPress,
    marqueeList,
    screenProps,
  } = props;
  const url = !imageUrl || imageUrl.includes('public://') ? null : imageUrl;
  console.log('pubg: ' + JSON.stringify(marqueeList));
  const imageStyle = StyleSheet.flatten([
    styles.image,
    padded
      ? {
          borderRadius: Metrics.SMALL_RADIUS,
          width: ScalePerctFullWidth(100) - 40,
        }
      : {width: ScalePerctFullWidth(100)},
    {height: height},
    width && {width},
  ]);
  let time = getTimeAgo(item.pubDate);
  const userId = user && user.id;
  const widthMarque = Dimensions.get('window').width;
  return (
    <View
      style={[
        styles.container,
        padded ? {paddingHorizontal: 20, paddingTop: 0} : {paddingTop: 0},
        width && {width},
        tabContainerStyle || null,
        {flex: 1},
      ]}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          //alert("bjih");
          onPress();
        }}
      >
        <View>
        <ImageLoad
          resizeMode={'cover'}
          style={{height: 320, width: '100%'}}
          placeholderStyle={{height: 320, width: '100%'}}
          isShowActivity={false}
          loadingStyle={{size: 'large', color: 'grey'}}
          source={
            url
              ? {
                  uri: url,
                  // 'https://www.arabianbusiness.com/public/styles/926px_617px_landscape/public/images/2018/09/12/Jeita-Grotto.jpg',
                }
              : Images.square
          }
          placeholderSource={Images.square}
          children={
            title != '' && (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',

                  backgroundColor: 'rgba(0,0,0,0.3)',
                  // zIndex:5
                }}
              >
                <View
                  style={{
                    width: '100%',
                    position: 'absolute',
                    bottom: 0,
                    // flex: 1,
                    left: 16,
                    right: 16,
                    // marginHorizontal: 16,
                    flexDirection: 'column',
                    elevation: 3,
                    zIndex: 3,
                  }}
                >
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 12,
                      fontFamily: 'BentonSans Regular',
                      flex: 1,
                      lineHeight: 14,
                      marginBottom: 10,
                      zIndex: 1,
                      marginRight: I18nManager.isRTL ? 30 : 15,
                      writingDirection :I18nManager.isRTL ? 'rtl' : 'ltr',


                    }}
                    numberOfLines={1}
                  >
                    {item.tags && item.tags.name
                      ? item.tags.name.toUpperCase()
                      : 'Tag'}
                    {/* GARGASH GROUP */}
                  </Text>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 15,
                      fontFamily: 'BentonSans Medium',
                      lineHeight: 20,
                      writingDirection :I18nManager.isRTL ? 'rtl' : 'ltr',
                      marginRight: I18nManager.isRTL ? 30 : 15,
                    }}
                  >
                    {title}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                       justifyContent: 'space-between',
                      flex: 1,
                      alignItems: 'center',
                      alignContent: 'center',
                      marginBottom: 15,
                    }}
                  >
                    <Text
                      style={{
                        marginTop: 12,
                        color: '#FFFFFF',
                        fontSize: 13,
                        fontFamily: 'BentonSans Regular',
                        lineHeight: 15,
                        // justifyContent:"flex-start",
                        // flex:1,
                        // flexDirection:"row"
                      }}
                    >
                      {time}
                    </Text>
                    <TouchableHighlight
                      onPress={() => {
                        if (item) {
                          shareArticle(
                            item.title,
                            item.image,
                            item.nid,
                            item.content_type,
                            item.link,
                            userId,
                            item,
                            0
                          );
                        }
                      }}
                    >
                      <Image
                        source={require('../../asset/Images/whiteShare.png')}
                        style={{
                          height: 18,
                          width: 14,
                          marginRight:32
                          // justifyContent:"center",
                          // flex:1,
                          // flexDirection:"row"
                        }}
                        resizeMode={'contain'}
                      />
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            )
          }
        />

        {isVideo && (
          <View style={styles.timeContainer}>
            <Icon name="play" size={14} color={Colors.bgPrimaryLight} />
            {/* <Text style={styles.timeText}>{"0:00"}</Text> */}
          </View>
        )}
        </View>
        
      </TouchableWithoutFeedback>
{marqueeList ?  <MarqueeHorizontal
        textList={marqueeList}
        speed={100}
        width={Dimensions.get('window').width}
        height={50}
        duration={1000}
        direction={'right'}
        reverse={false}
        bgContainerStyle={{
          backgroundColor: '#F2F2F2',
          borderColor: '#D0D0D0',
          height: 50,
          flexDirection: 'row',
          borderWidth: 1,
        }}
        textStyle={{
          fontSize: 14,
          /// marginTop: 17,
          color: '#000000',
          fontFamily: 'BentonSans Medium',
          lineHeight: 20,

          paddingHorizontal: 20
        }}
        onTextClick={(item) => {
          //alert('' + JSON.stringify(item));
          getArticleBackgroundData(item.nid).then((response) => {
            if (response) {
              backgroundData = response;
              screenProps.navigation.navigate('ArticleDisplayHomeScreen', {
                nid: item.nid,
                site: item.site,
                backgroundData: response,
              });
            }
          });
        }}
      />
: null}
     
      {/* <Marquee
        style={{
          flex: 1,
          backgroundColor: '#F2F2F2',
          borderColor: '#D0D0D0',
          height: 50,
          flexDirection: 'row',
          borderWidth: 1,
        }}
        loop={true}
         bounce={true}
        duration={20000}
        animationType={'auto'}
        repeatSpacer={0}
        marqueeDelay={1}
         bounceSpeed={0}
        scrollSpeed={10}
      >
        <View
          style={{
            height: 50,
            flex: 1,
            flexDirection: 'row',
          }}
        >
          {marqueeList && marqueeList != undefined
            ? marqueeList.map((data, index) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      borderColor: '#D0D0D0',
                      borderRightWidth: 1,
                    }}
                  >
                    <TouchableWithoutFeedback
                      onPress={() => {
                        getArticleBackgroundData(data.nid).then((response) => {
                          if (response) {
                            backgroundData = response;
                            screenProps.navigation.navigate(
                              'ArticleDisplayHomeScreen',
                              {
                                nid: data.nid,
                                site: data.site,
                                backgroundData: response,
                              }
                            );
                          }
                        });
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          marginTop: 17,
                          color: '#000000',
                          fontFamily: 'BentonSans Medium',
                          lineHeight: 20,
                          // backgroundColor: 'red',

                          paddingHorizontal: 20,
                        }}
                      >
                        {data.title}
                      </Text>
                    </TouchableWithoutFeedback>
                    
                  </View>
                );
              })
            : null}
        </View>
      </Marquee>  */}
    </View>
  );
}

ArticleListBigImage.defaultProps = {
  imageUrl: '',
  padded: false,
  isNotopMargin: false,
  isVideo: false,
};

const styles = StyleSheet.create({
  container: {
    width: ScalePerctFullWidth(100),
    flex: 1,
  },
  image: {
    width: ScalePerctFullWidth(100),
  },
  timeContainer: {
    height: 30,
    borderRadius: 15,
    width: 30,
    paddingLeft: 2,
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Colors.bodySecondaryDark,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: Metrics.MEDIUM_TEXT_SIZE,
    color: Colors.bodyPrimaryLight,
    paddingLeft: 4,
  },
});
