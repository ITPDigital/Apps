import React from 'react';
import {View, Image, Text, StyleSheet, Platform, I18nManager} from 'react-native';
import ImageLoad from 'react-native-image-placeholder';
import {
  Colors,
  Metrics,
  ScalePerctFullWidth,
  Images,
  ScalePerctFullHeight,
} from '../../asset';

type Props = {
  title?: string,
  imageUrl?: string,
  isCenter?: boolean,
  isTitleImage?: boolean,
};

const renderImage = (
  image: string,
  imageStyle: any,
  imagePlaceHolderStyle: any
) => {
  if (isFromHomePage) {
    return (
        <ImageLoad
          resizeMode={'stretch'}
          style={[styles.imageOne, imageStyle || null]}
          placeholderStyle={[
            styles.imageOnePlaceHolder,
            imagePlaceHolderStyle || null,
          ]}
          isShowActivity={false}
          loadingStyle={{size: 'large', color: 'grey'}}
          source={image != ""?{uri: image}:Images.landscape}
          placeholderSource={Images.landscape}
          borderRadius={Metrics.SMALL_RADIUS}
        />
      );
  } else {
    return (
      <ImageLoad
        resizeMode={'stretch'}
        style={[styles.imageOne, imageStyle || null]}
        placeholderStyle={[
          styles.imageOnePlaceHolder,
          imagePlaceHolderStyle || null,
        ]}
        isShowActivity={false}
        loadingStyle={{size: 'large', color: 'grey'}}
        source={image != ""?{uri: image}:Images.landscape} 
        placeholderSource={Images.landscape}
        borderRadius={Metrics.SMALL_RADIUS}
      />
    );
  }
};

export default function ArticleListTitleHome(props: Props) {
  const {
    title,
    imageUrl,
    isTitleImage,
    isCenter,
    tabContainerStyle,
    numberOfLines,
    imageStyle,
    imagePlaceHolderStyle,
    textStyle,
    isFromHomePage,
    item
  } = props;

  const url = !imageUrl || imageUrl.includes('public://') ? null : imageUrl;
  if (isFromHomePage) {
    return (
      <View
        style={{
          width: ScalePerctFullWidth(100),
          flexDirection: 'row',
          paddingHorizontal: 16,
        }}
      >
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Text
            style={[
              textStyle ? textStyle: {color: '#000000'},
              {
              // color: '#000000',
              fontSize: 12,
              fontFamily: 'BentonSans Regular',
              flex: 1,
              lineHeight: 14,
              marginTop: 20,
              marginBottom: 10,
              writingDirection:I18nManager.isRTL ? 'rtl' : 'ltr'

            }]}
            numberOfLines={1}
          >
            {item.tags && item.tags.name?  item.tags.name.toUpperCase() : ""}
              {/* GARGASH GROUP */}
          </Text>
          <Text
            style={[
              textStyle ? textStyle: {color: '#000000'},
              {
              // color: '#000000',
              fontSize: 15,
              fontFamily: 'BentonSans Medium',
              flex: 1,
              lineHeight: 20,
              //   borderColor:"red",
              //   borderWidth:1
              writingDirection:I18nManager.isRTL ? 'rtl' : 'ltr'

            }]}
            numberOfLines={3}
          >
            {title}
          </Text>
        </View>

        {isTitleImage && renderImage(url, imageStyle, imagePlaceHolderStyle)}
      </View>
    );
  } else {
    return (
      <View style={[styles.container, tabContainerStyle || null]}>
        <Text
          style={[
            styles.titleText,
            isCenter ? {textAlign: 'center'} : {},
            textStyle,
          ]}
          numberOfLines={numberOfLines}
        >
          {title}
        </Text>
        {isTitleImage && renderImage(url, imageStyle, imagePlaceHolderStyle)}
      </View>
    );
  }
}

ArticleListTitleHome.defaultProps = {
  title: 'Fashion Designer Alexis Mabille’s Paris Villa',
  imageUrl: undefined,
  isCenter: false,
  isTitleImage: false,
};

const styles = StyleSheet.create({
  container: {
    width: ScalePerctFullWidth(100),
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 0,
  },
  titleText: {
    //paddingTop: ScalePerctFullHeight(1),
    color: Colors.textHeading,
    fontSize: Metrics.LARGE_TEXT_SIZE,
    fontFamily: 'BentonSans Bold',
    flex: 1,
    marginTop: Platform.OS === 'android' ? 1 : 4,
    lineHeight: 20,
  },
  imageOne: {
    width: ScalePerctFullWidth(25),
    height: ScalePerctFullWidth(15),
    borderRadius: Metrics.SMALL_RADIUS,
    marginLeft: Metrics.DEFAULT_LIST_PADDING,
    marginTop: 5,
  },
  imageOnePlaceHolder: {
    width: ScalePerctFullWidth(25),
    height: ScalePerctFullWidth(15),
    //borderRadius: Metrics.SMALL_RADIUS,
  },
});
