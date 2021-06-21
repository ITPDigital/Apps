import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import ImageLoad from 'react-native-image-placeholder';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors, Metrics, ScalePerctFullWidth, Images} from '../../asset';

type Props = {
  imageUrl?: string,
  padded?: boolean,
  isNotopMargin?: boolean,
  isVideo?: boolean,
};

export default function ArticleListBigImageNew(props: Props) {
  const {
    imageUrl,
    padded,
    isNotopMargin,
    height,
    width,
    isVideo,
	tabContainerStyle,
	title
  } = props;
  const url = !imageUrl || imageUrl.includes('public://') ? null : imageUrl;
  console.log("img: "+url)
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
  return (
    <View
      style={[
        styles.container,
        padded ? {paddingHorizontal: 20, paddingTop: 0} : {paddingTop: 0},
        width && {width},
        tabContainerStyle || null,
       // {borderColor:"yellow",borderWidth:1,position:"relative"}
      ]}
    >
      <ImageLoad
        resizeMode={'stretch'}
        style={imageStyle}
        placeholderStyle={imageStyle}
        isShowActivity={false}
        loadingStyle={{size: 'large', color: 'grey'}}
        source={url ? {uri: url} : Images.square}
        placeholderSource={Images.square}
        children={ title != ""  &&
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center',marginHorizontal:36,marginBottom:30}}
          >
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: 0
              }}
            >
              <Text style={{color: '#fff', fontSize: 20,fontFamily:"BentonSans-Regular"}}>{title}</Text>
            </View>
          </View>
        }
      />

      {isVideo && (
        <View style={styles.timeContainer}>
          <Icon name="play" size={14} color={Colors.bgPrimaryLight} />
          {/* <Text style={styles.timeText}>{"0:00"}</Text> */}
        </View>
      )}
    </View>
  );
}

ArticleListBigImageNew.defaultProps = {
  imageUrl: '',
  padded: false,
  isNotopMargin: false,
  isVideo: false,
};

const styles = StyleSheet.create({
  container: {
    width: ScalePerctFullWidth(100),
    flex:1,
   // backgroundColor:"blue"
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
