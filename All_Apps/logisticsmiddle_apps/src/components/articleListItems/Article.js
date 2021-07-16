import React, {PureComponent, useRef, useEffect } from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  Platform,
  TouchableNativeFeedback,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  I18nManager,
  Animated
} from 'react-native';
import {Colors, Metrics, ScalePerctFullWidth} from '../../asset';
import {
  ArticleListTitleImage,
  ArticleListLogo,
  ArticleListFooter,
  ArticleListBigImage,
  ArticleListDescription,
} from '../articleListSubItems';
import {getImageDisplayHeight, getTimeAgo} from '../../utilities';
import {GalleryDisplayOne, GalleryDisplayTwo} from '../ImageGallery';
import ArticleListFooterOther from '../articleListSubItems/ArticleListFooterOther';
import ArticleListTitleImageOther from '../articleListSubItems/ArticleListTitleImageOther';
import ArticleListBigImageOther from '../articleListSubItems/ArticleListBigImageOther';
import ImageLoad from 'react-native-image-placeholder';
import {Images} from '../../asset';
//import ArticleListTitleImageHome from '../articleListSubItems/ArticleListTitleImageHome';
import ArticleListFooterHome from '../articleListSubItems/ArticleListFooterHome';
import ArticleListTitleHome from '../articleListSubItems/ArticleListTitleHome';
import ArticleListTitleAndImageHome from '../articleListSubItems/ArticleListTitleAndImageHome';
import ArticleListTitleFooterHome from '../articleListSubItems/ArticleListTitleFooterHome';
import {shareArticle} from '../common';
const fadeAnim = new Animated.Value(0) ;

type Props = {
  order?: object,
};

const Touchable =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableHighlight;

//var isFirstItemBind = true;
var isFisrt = true;
export default class ArticleListItem extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {height: 400};
    this.isFirstItemBind = true;
  }

  componentDidMount() {

    Animated.timing(
			fadeAnim,
			{
			  toValue: 1,
			  duration: 3000, 
			}
		  ).start();
  }

  renderItem = (
    type: string,
    data: any,
    user: any,
    settings: any,
    height: number,
    onPress,
    tabContainerStyle: any,
    numberOfLines: number,
    imageStyle: any,
    imagePlaceHolderStyle: any,
    articleDescriptionstyle: any,
    onFollow: Function,
    onPressBrand: Function,
    bookmarkRequired: any,
    routeFlag: any,
    articleIndex: any,
    isFromHomePage: any,
    headerSectionIndex: any,
    marqueeList:any,
    screenProps:any,
    isIndustryTemplete:any,
    isTopSories:any
  ) => {
    const {
      onPressBookmark,
      navigation,
      textStyle,
      iconStyle,
      isVideo,
    } = this.props;
    const userId = user && user.id;
    if (isFromHomePage) {
      if (type === 'imgWithoutTitle') {
        console.log('image wothpout title' + JSON.stringify(data));
        return (
          <Animated.View
            style={{
              flex: 1,
              marginHorizontal: 16,
                opacity:fadeAnim,
              marginTop: 20,
              transform: [          
                {
                  translateX: fadeAnim.interpolate({     
                    inputRange: [0, 1],  
                    outputRange: [50,0] 
                  })
                }
              ], 
            }}
          >
            <ImageLoad
              //  resizeMode={ isVideo ? 'contain': 'cover'}
              resizeMode={'cover'}
              style={{
                aspectRatio: 16 / 9,
                flex: 1,
              }}
              placeholderStyle={{aspectRatio: 16 / 9, flex: 1}}
              loadingStyle={{size: 'large', color: 'grey'}}
              source={{
                uri:
                  data.image_crop_square != ''
                    ? data.image_crop_landscape //NTODO use landscape
                    : Images.square,
              }}
              placeholderSource={Images.square}
            />
          </Animated.View>
        );
      }
      if (type === 'onlyTitle') {
        return (
          <Animated.View
            style={{flex: 1, flexDirection: 'column', marginHorizontal: 16,   opacity:fadeAnim,     transform: [          
              {
                translateX: fadeAnim.interpolate({     
                  inputRange: [0, 1],  
                  outputRange: [50,0] 
                })
              }
            ],}}
          >
            <Text
              style={[
                textStyle ? [textStyle]: {color: '#000000'},
                {
                // color: '#000000',
                fontSize: 12,
                fontFamily: 'BentonSans Regular',
                flex: 1,
                lineHeight: 14,
                marginTop: 20,
                marginBottom: 10,
              }]}
              numberOfLines={1}
            >
              {data.tags && data.tags.name ? data.tags.name.toUpperCase(): 'Tag'}
              {/* GARGASH GROUP */}
            </Text>
            <Text
              style={{
                color: '#000000',
                fontSize: 15,
                fontFamily: 'BentonSans Medium',
                flex: 1,
                lineHeight: 20,
                //   borderColor:"red",
                //   borderWidth:1
              }}
              numberOfLines={3}
            >
              {data.title}
            </Text>
          </Animated.View>
        );
      }
      if (type === 'logo') {
        return (
          <ArticleListLogo
            imageUrl={
              data.brand_logo && data.brand_logo.length > 0
                ? data.brand_logo
                : undefined
            }
            site={data.site}
            user={user}
            isFollow={settings.isFollow}
            onFollow={onFollow}
            isLessPadding={settings.isLessPadding}
            tabContainerStyle={tabContainerStyle}
            onPressBrand={onPressBrand}
          />
        );
      }
      if (type === 'bigImage') {
        if (headerSectionIndex == 0) {
          return (
            <ArticleListBigImage
              height={settings.height + 30}
              imageUrl={
                data.template == 4
                  ? data.image_crop_portrait
                  : data.template == 9
                  ? data.image_crop_square
                  : data.image_crop_landscape //data.
              } // 4 land, 9 square
              padded={settings.isPadded}
              isVideo={settings.isVideo}
              isNotopMargin={settings.isNoTopMargin}
              tabContainerStyle={tabContainerStyle}
              title={articleIndex == 0 ? data.title : ''}
              isFromHomePage={isFromHomePage}
              item={data}
              user={user}
              onPress={onPress}
              marqueeList={marqueeList}
              screenProps={screenProps}
            />
          );
        } else {
          return (
            <ArticleListBigImageOther
              height={settings.height + 30}
              imageUrl={
                data.template == 4
                  ? data.image_crop_portrait
                  : data.template == 9
                  ? data.image_crop_square
                  : data.image_crop_landscape
              } // 4 land, 9 square
              padded={settings.isPadded}
              isVideo={settings.isVideo}
              isNotopMargin={settings.isNoTopMargin}
              tabContainerStyle={tabContainerStyle}
              title={articleIndex == 0 ? data.title : ''}
              isFromHomePage={isFromHomePage}
              isIndustryTemplete={isIndustryTemplete}
              // title={articleIndex == 0 ? data.title : ''}
            />
          );
        }
      }
      
      if (type === 'title') {
        if (isFromHomePage && settings.isTitleImage) {
          // console.log(
          //   'vai kale is in title isFirstItem != null' + this.isFirstItemBind
          // );
          // const abc =
          //   isFisrt && headerSectionIndex == 0 && articleIndex == 0 ? (
          //     <View
          //       style={{
          //         flex: 1,
          //         height: 200,
          //         width: 300,
          //         backgroundColor: 'red',
          //       }}
          //     ></View>
          //   ) : null;

          return (
            <Animated.View style={{opacity: fadeAnim,     
              transform: [          
                {
                  translateX: fadeAnim.interpolate({     
                    inputRange: [0, 1],  
                    outputRange: [50,0] 
                  })
                }
              ],}}> 
              <ArticleListTitleAndImageHome 
                isCenter={settings.isCenter}
                isTitleImage={settings.isTitleImage}
                // title={articleIndex == 0 ? data.title : ''}
                title={data.title}
                imageUrl={data.image_crop_landscape}
                tabContainerStyle={tabContainerStyle}
                numberOfLines={numberOfLines}
                imageStyle={imageStyle}
                imagePlaceHolderStyle={imagePlaceHolderStyle}
                textStyle={textStyle}
                isFromHomePage={isFromHomePage}
                item={data}
              />
            </Animated.View>
          );
        } else if (headerSectionIndex != 0) {
          return (
            <Animated.View style={{opacity: fadeAnim,     
              transform: [          
                {
                  translateX: fadeAnim.interpolate({  
                    inputRange: [0, 1],  
                    outputRange: [150, 0]
                  })
                }
              ],}}>
              <ArticleListTitleHome
                isCenter={settings.isCenter}
                isTitleImage={settings.isTitleImage}
                title={data.title}
                imageUrl={data.image_crop_landscape}
                tabContainerStyle={tabContainerStyle}
                numberOfLines={numberOfLines}
                imageStyle={imageStyle}
                imagePlaceHolderStyle={imagePlaceHolderStyle}
                textStyle={textStyle}
                isFromHomePage={isFromHomePage}
                item={data}
              />
            </Animated.View>  
          );
        }
      }

      if (type === 'footer') {
        if (isFromHomePage && settings.isTitleImage) {
          return (
            <ArticleListTitleFooterHome
              isCenter={settings.isCenter}
              time={getTimeAgo(data.pubDate)}
              isBookMarked={data.bookmark}
              onBookMarkToggle={() => onPressBookmark()}
              tabContainerStyle={tabContainerStyle}
              item={data}
              textStyle={textStyle}
              iconStyle={iconStyle}
              bookmarkRequired={!bookmarkRequired}
              user={user}
              routeFlag={routeFlag}
            />
          );
        } else if (headerSectionIndex != 0) {
          return (
            <ArticleListFooterHome
              isCenter={settings.isCenter}
              time={getTimeAgo(data.pubDate)}
              isBookMarked={data.bookmark}
              onBookMarkToggle={() => onPressBookmark()}
              tabContainerStyle={tabContainerStyle}
              item={data}
              textStyle={textStyle}
              iconStyle={iconStyle}
              bookmarkRequired={!bookmarkRequired}
              user={user}
              routeFlag={routeFlag}
            />
          );
        }
      }
      if (type === 'mostReadTitle') {
        return (
          <Animated.View style={{opacity: fadeAnim,     
            transform: [          
              {
                translateY: fadeAnim.interpolate({  
                  inputRange: [0, 1],  
                  outputRange: [600, 0]
                })
              }
            ],}}>
            <Text
              style={{
                color: '#000000',
                fontSize: 16,
                fontFamily: 'BentonSans Medium',
                flex: 1,
                lineHeight: 22,
                marginHorizontal: 16,
                marginTop: 20,
                writingDirection:I18nManager.isRTL ? 'rtl' : 'ltr'

              }}
            >
              {data.title}
            </Text>
            <Animated.View style={[styles.lineSeperatorHome]} />
          </Animated.View>
        );
      }
      if (type === 'description') {
        if (isFromHomePage) {
          return (
            <ArticleListDescription
              //   description={data.lead_text}
              isCenter={settings.isCenter}
              articleDescriptionstyle={articleDescriptionstyle}
            />
          );
        } else {
          return (
            <ArticleListDescription
              description={data.lead_text}
              isCenter={settings.isCenter}
              articleDescriptionstyle={articleDescriptionstyle}
            />
          );
        }
      }
      if (type === 'seperator') {
        if (headerSectionIndex != 0)
          return <View style={[styles.lineSeperatorHome]} />;
      }
      if (type === 'galleryOne') {
        return (
          <View style={{paddingTop: 15}}>
            <GalleryDisplayTwo
              onImagePress={() => onPress()}
              images={data.gallery_images}
            />
          </View>
        );
      }
      if (type === 'galleryTwo') {
        return (
          <View style={{paddingTop: 15}}>
            <GalleryDisplayOne
              onImagePress={() => onPress()}
              images={data.gallery_images}
            />
          </View>
        );
      }

      return null;
    } else {
      if (
        isFromHomePage &&
        headerSectionIndex == 0 &&
        type != 'bigImage' &&
        isFirstItemBind
      ) {
        //don't start wih list
        isFirstItemBind = false;
        isFirstItem = (
          <View style={{flex: 1, height: 200, width: 300}}>
            <ImageLoad
              resizeMode={'stretch'}
              style={{
                width: ScalePerctFullWidth(100),
                height: 200,
                marginBottom: 5,
              }}
              placeholderStyle={{
                width: ScalePerctFullWidth(100),
                height: 200,
                marginBottom: 5,
              }}
              isShowActivity={false}
              loadingStyle={{size: 'large', color: 'grey'}}
              source={Images.square}
              placeholderSource={Images.square}
            />
          </View>
        );
      } else {
        isFirstItem = null;
        isFirstItemBind = false;
      }
      if (type === 'logo') {
        return (
          <ArticleListLogo
            imageUrl={
              data.brand_logo && data.brand_logo.length > 0
                ? data.brand_logo
                : undefined
            }
            site={data.site}
            user={user}
            isFollow={settings.isFollow}
            onFollow={onFollow}
            isLessPadding={settings.isLessPadding}
            tabContainerStyle={tabContainerStyle}
            onPressBrand={onPressBrand}
          />
        );
      }
      if (type === 'bigImage') {
        return (
          <ArticleListBigImageOther
            height={articleIndex == 0 ? settings.height + 20 : settings.height}
            imageUrl={
              data.template == 4
                ? data.image_crop_portrait
                : data.template == 9
                ? data.image_crop_square
                : data.image_crop_landscape
            } // 4 land, 9 square
            padded={settings.isPadded}
            isVideo={settings.isVideo}
            isNotopMargin={settings.isNoTopMargin}
            tabContainerStyle={tabContainerStyle}
            title={articleIndex == 0 ? data.title : ''}
            isFromHomePage={isFromHomePage}
            // title={articleIndex == 0 ? data.title : ''}
          />
        );
      }
      if (type === 'title') {
        if (isFromHomePage && settings.isTitleImage) {
          return (
            <View>
              {isFirstItem != null ? isFirstItem : null}

              <ArticleListTitleImage
                isCenter={settings.isCenter}
                isTitleImage={settings.isTitleImage}
                // title={articleIndex == 0 ? data.title : ''}
                title={data.title}
                imageUrl={data.image_crop_landscape}
                tabContainerStyle={tabContainerStyle}
                numberOfLines={numberOfLines}
                imageStyle={imageStyle}
                imagePlaceHolderStyle={imagePlaceHolderStyle}
                textStyle={textStyle}
                isFromHomePage={isFromHomePage}
              />
            </View>
          );
        } else {
          return (
            <View>
              {isFirstItem != null ? isFirstItem : null}
              <ArticleListTitleImageOther
                isCenter={settings.isCenter}
                isTitleImage={settings.isTitleImage}
                title={data.title}
                imageUrl={data.image_crop_landscape}
                tabContainerStyle={tabContainerStyle}
                numberOfLines={numberOfLines}
                imageStyle={imageStyle}
                imagePlaceHolderStyle={imagePlaceHolderStyle}
                textStyle={textStyle}
                isFromHomePage={isFromHomePage}
              />
            </View>
          );
        }
      }

      if (type === 'footer') {
        if (isFromHomePage && settings.isTitleImage) {
          return (
            <ArticleListFooter
              isCenter={settings.isCenter}
              time={getTimeAgo(data.pubDate)}
              isBookMarked={data.bookmark}
              onBookMarkToggle={() => onPressBookmark()}
              tabContainerStyle={tabContainerStyle}
              item={data}
              textStyle={textStyle}
              iconStyle={iconStyle}
              bookmarkRequired={!bookmarkRequired}
              user={user}
              routeFlag={routeFlag}
            />
          );
        } else if (!isFromHomePage) {
          return (
            <ArticleListFooterOther
              isCenter={settings.isCenter}
              time={getTimeAgo(data.pubDate)}
              isBookMarked={data.bookmark}
              onBookMarkToggle={() => onPressBookmark()}
              tabContainerStyle={tabContainerStyle}
              item={data}
              textStyle={textStyle}
              iconStyle={iconStyle}
              bookmarkRequired={!bookmarkRequired}
              user={user}
              routeFlag={routeFlag}
            />
          );
        }
      }
      if (type === 'description') {
        if (isFromHomePage) {
          return (
            <ArticleListDescription
              //   description={data.lead_text}
              isCenter={settings.isCenter}
              articleDescriptionstyle={articleDescriptionstyle}
            />
          );
        } else {
          return (
            <ArticleListDescription
              description={data.lead_text}
              isCenter={settings.isCenter}
              articleDescriptionstyle={articleDescriptionstyle}
            />
          );
        }
      }
      if (type === 'seperator') {
        return <View style={[styles.lineSeperator2]} />;
      }
      if (type === 'galleryOne') {
        return (
          <View style={{paddingTop: 15}}>
            <GalleryDisplayTwo
              onImagePress={() => onPress()}
              images={data.gallery_images}
            />
          </View>
        );
      }
      if (type === 'galleryTwo') {
        return (
          <View style={{paddingTop: 15}}>
            <GalleryDisplayOne
              onImagePress={() => onPress()}
              images={data.gallery_images}
            />
          </View>
        );
      }
      return null;
    }
    return null;
  };
  renderArticle = (
    order: any,
    data: any,
    user: any,
    settings: any,
    height: number,
    refreshKey: number,
    onPress,
    tabContainerStyle: any,
    numberOfLines: number,
    imageStyle: any,
    imagePlaceHolderStyle: any,
    articleDescriptionstyle: any,
    onFollow: Function,
    onPressBrand: Function,
    bookmarkRequired: any,
    routeFlag: any,
    articleIndex: any,
    isFromHomePage: any,
    headerSectionIndex: any,
    marqueeList: any,
    screenProps:any,
    isIndustryTemplete:any,
    isTopSories:any
  ) => {
    // console.log("table chair order"+ JSON.stringify(order) + ", data: "+ JSON.stringify(data))
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <FlatList
          data={order}
          extraData={[data, refreshKey]}
          keyExtractor={(x, i) => i.toString()}
          listKey={(item, index) => `D${index.toString()}`}
          renderItem={({item}) => (
            <View style={{flex: 1, justifyContent: 'center'}}>
              {this.renderItem( 
                item,
                data,
                user,
                settings,
                height,
                onPress,
                tabContainerStyle,
                numberOfLines,
                imageStyle,
                imagePlaceHolderStyle,
                articleDescriptionstyle,
                onFollow,
                onPressBrand,
                bookmarkRequired,
                routeFlag,
                articleIndex,
                isFromHomePage,
                headerSectionIndex,
                marqueeList,
                screenProps,
                isIndustryTemplete,
                isTopSories
              )}  
            </View>
          )}
        />
      </View>
    );
  };

  render() {
    const {
      order, 
      data,
      user,
      settings,
      onPress,
      tabContainerStyle,
      numberOfLines,
      imageStyle,
      articleContainerStyle,
      imagePlaceHolderStyle,
      articleDescriptionstyle,
      onFollow,
      onPressBrand,
      seperator,
      bookmarkRequired,
      routeFlag,
      articleIndex,
      isFromHomePage,
      headerSectionIndex,
      marqueeList,
      screenProps,
      dataLength,
      masterIndex,
      isIndustryTemplete,
      isTopSories
    } = this.props;
    let {refreshKey} = this.props;
    refreshKey = refreshKey ? refreshKey : 1;
    const {height} = this.state;
console.log("datalength: "+ dataLength + " ,masterindex: "+masterIndex)
    return (
      <Touchable onPress={() => onPress()} underlayColor={'#00000030'}>
        <View style={[styles.container, articleContainerStyle || null]}>
          {this.renderArticle(
            order,
            data,
            user,
            settings,
            height,
            refreshKey,
            onPress,
            tabContainerStyle,
            numberOfLines,
            imageStyle,
            imagePlaceHolderStyle,
            articleDescriptionstyle,
            onFollow,
            onPressBrand,
            bookmarkRequired,
            routeFlag,
            articleIndex,
            isFromHomePage,
            headerSectionIndex,
            marqueeList,
            screenProps,
            isIndustryTemplete,
            isTopSories
          )}
          {isFromHomePage && settings.isTitleImage && (dataLength-1) != masterIndex && (
            <View style={[styles.lineSeperatorHome]} />
          )}
          {/* {settings && settings.isFooterLine && !isFromHomePage && (
            <View style={[styles.lineSeperatorOther, seperator]} />
          )} */}
        </View>
      </Touchable>
    );
  }
}

ArticleListItem.defaultProps = {
  order: ['logo', 'bigImage', 'title', 'footer'],
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lineSeperator: {
    width: ScalePerctFullWidth(40),
    alignSelf: 'flex-start',
    borderBottomWidth: 1,
    left: 36,
    borderColor: Colors.linePrimaryFull,
  },
  lineSeperatorOther: {
    width: ScalePerctFullWidth(89),
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.linePrimaryFull,
  },
  lineSeperator2: {
    width: ScalePerctFullWidth(92),
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.linePrimaryFull,
    marginTop: 10,
    paddingHorizontal: 12,
  },
  lineSeperatorHome: {
    width: ScalePerctFullWidth(92),
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: '#E6E6E6',
    marginTop: 20,
    paddingHorizontal: 16,
  },
});
