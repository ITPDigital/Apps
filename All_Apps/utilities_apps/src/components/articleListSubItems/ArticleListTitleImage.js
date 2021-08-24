import React from 'react';
import {View, Image, Text, StyleSheet, Platform} from 'react-native';
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
  // return <Image source={{ uri: image }} style={StyleSheet.flatten([styles.imageOne])} />;
  return (
    <View
      style={[
      //styles.imageOne,
      //  imageStyle || null,
        {
         // width: 133,
          //height: 90,
          //  position: 'absolute',
         // right: 0,
          //top: 0,
          // bottom: 8,
          //justifyContent: '',
          flexDirection:"row",
          flex: 1,
        //  bottom: 0,
          //margin: 0,
          // borderColor: 'blue',
          // borderWidth: 1,
         /// backgroundColor: 'blue',
        },
      ]}
    >
      <ImageLoad
        resizeMode={'cover'}
        style={[
         // styles.imageOne,
          imageStyle || null,
          {
            flex:1
            //s position: 'absolute',
            //  right: 0,
            //top: 0,
            // bottom: 8,
            // justifyContent: 'center', 
            // flex: 1,
            // marginBottom: 8,
          },
        ]}
        placeholderStyle={[
          styles.imageOnePlaceHolder,
          imagePlaceHolderStyle || null,
        ]}
        isShowActivity={false}
        loadingStyle={{size: 'large', color: 'grey'}} 
        source={image != ""?{uri: image}:Images.landscape} 
        placeholderSource={Images.landscape}
        //borderRadius={Metrics.SMALL_RADIUS}
      />
    </View>
  );
};

export default function ArticleListTitleImage(props: Props) {
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
  } = props;

  const url = !imageUrl || imageUrl.includes('public://') ? null : imageUrl;

  return (
    <View style={[styles.container, tabContainerStyle || null]}>
      <View
        style={{flex:1, height: 80, marginBottom:4,marginRight:4,justifyContent:"flex-start",flexDirection:"row",
     //   backgroundColor:"yellow"
            // borderColor: 'red', borderWidth: 1
          }}
      >
        <Text
          style={[
            styles.titleText,
            isCenter ? {textAlign: 'left'} : {},
            textStyle,
            {
              fontFamily: 'BentonSans Bold',
              fontSize: 12,
              fontWeight: 'bold',
              //marginRight: 136,
            },
          ]}
          numberOfLines={3}
        >
          {title}
        </Text>
      </View>

      {isTitleImage && renderImage(url, imageStyle, imagePlaceHolderStyle)}
    </View>
  );
}

ArticleListTitleImage.defaultProps = {
  title: 'Fashion Designer Alexis Mabille’s Paris Villa',
  imageUrl: undefined,
  isCenter: false,
  isTitleImage: false,
};

const styles = StyleSheet.create({
  container: {
   // width: ScalePerctFullWidth(100),
     flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    // paddingHorizontal: 36,
    paddingTop: 20,
    paddingBottom: 0,
    // backgroundColor:"red",
    marginHorizontal: 12,
    // borderColor:"red",
    // borderWidth:1
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
    width: ScalePerctFullWidth(25),
    height: ScalePerctFullWidth(15),
    //borderRadius: Metrics.SMALL_RADIUS,
  },
});
