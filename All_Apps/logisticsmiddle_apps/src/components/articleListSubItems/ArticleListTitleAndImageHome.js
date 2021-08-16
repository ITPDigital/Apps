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
  imagePlaceHolderStyle: any,
  isOpinionArticle: Boolean
) => {
  // return <Image source={{ uri: image }} style={StyleSheet.flatten([styles.imageOne])} />;
  return (
    <View
      style={[
        {
          justifyContent: 'flex-end',
          marginLeft: 20,

          //   flexDirection: 'row',
          //   flex: 1,
        },
      ]}
    >
      <ImageLoad
        resizeMode={'cover'}
        style={[
          imageStyle || null,
          {
            // flex: 1,
            width: 88,
            height: 88,
          },
        ]}
        placeholderStyle={[
          // styles.imageOnePlaceHolder,
          // imagePlaceHolderStyle || null,
          {
            width: 88,
            height: 88,
            borderRadius: isOpinionArticle ? 44 : 0,
          },
        ]}
        isShowActivity={false}
        loadingStyle={{size: 'large', color: 'grey'}}
        source={image != ""?{uri: image}:Images.landscape} 
        placeholderSource={Images.landscape}
        borderRadius={isOpinionArticle ? 44 : 0} 
      />
    </View>
  );
};

export default function ArticleListTitleAndImageHome(props: Props) {
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
    item,
  } = props;

  const url = !imageUrl || imageUrl.includes('public://') ? null : imageUrl;
  const isOpinionArticle = item.article_context == 'opinion' ? true : false;

  return (
    <View style={[styles.container, tabContainerStyle || null]}>
      <View
        style={{
          flex: 1,
        }}
      >
        {item.tags && item.tags.name ? (
          <Text
            style={[
             
              textStyle ? [textStyle ,styles.titleText]: {color: '#000000'},
              {
                fontSize: 12,
                fontFamily: 'BentonSans Regular',
                lineHeight: 14,
                marginBottom: 10,
                writingDirection:I18nManager.isRTL ? 'rtl' : 'ltr'

              },
            ]}
            numberOfLines={1}
          >
            {item.tags && item.tags.name ? item.tags.name.toUpperCase() : ''}
            {/* GARGASH GROUP */}
          </Text>
        ) : null}

        <Text
          style={[
            textStyle ? [textStyle ]: {color: '#000000'},

            {
              fontFamily: 'BentonSans Medium',
              lineHeight: 20,
              fontSize: 15,
              writingDirection:I18nManager.isRTL ? 'rtl' : 'ltr'
            },
          ]}
          numberOfLines={3}
        >
          {title}
        </Text>
      </View>

      {isTitleImage &&
        renderImage(url, imageStyle, imagePlaceHolderStyle, isOpinionArticle)}
    </View>
  );
}

ArticleListTitleAndImageHome.defaultProps = {
  title: 'Fashion Designer Alexis Mabille’s Paris Villa',
  imageUrl: undefined,
  isCenter: false,
  isTitleImage: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 0,
    marginHorizontal: 16,
    justifyContent: 'space-between',
  },
  titleText: {
    //paddingTop: ScalePerctFullHeight(1),
    color: Colors.textHeading,
    fontFamily: 'BentonSans Bold',
    //flex: 1,
    marginTop: Platform.OS === 'android' ? 1 : 4,
    lineHeight: 14,
    fontSize: 12,
    fontWeight: 'bold',
    //width: 180,
  },
  imageOne: {
    width: 150, //ScalePerctFullWidth(130),
    height: 90, //ScalePerctFullWidth(85),
    //borderRadius: Metrics.SMALL_RADIUS,
    //	marginLeft: Metrics.DEFAULT_LIST_PADDING,
    //	marginTop: 5,
  },
  imageOnePlaceHolder: {
    width: 88, //ScalePerctFullWidth(25),
    height: 88, // ScalePerctFullWidth(15),
    //borderRadius: Metrics.SMALL_RADIUS,
  },
});
