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

export default function ArticleListBigImageOther(props: Props) {
  const {
    imageUrl,
    padded,
    isNotopMargin,
    height,
    width,
    isVideo,
    tabContainerStyle,
    isIndustryTemplete
  } = props;
  const url = !imageUrl || imageUrl.includes('public://') ? null : imageUrl;
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
        // styles.container,
        // padded ? { paddingHorizontal: 20, paddingTop: 12 } : { paddingTop: 12 },
        // width && { width },
        // tabContainerStyle || null,
        // {marginHorizontal:16}
        {flex: 1, marginHorizontal: 16, marginTop:  20,},
      ]}
    >
      <ImageLoad
        resizeMode={'cover'}
        style={{aspectRatio: 16 / 9, flex: 1}}
        placeholderStyle={{
          aspectRatio: 16 / 9,
          flex: 1,
        }}
        isShowActivity={false}
        loadingStyle={{size: 'large', color: 'grey'}}
        source={url ? {uri: url} : Images.square}
        placeholderSource={Images.square}
      />
      {isVideo && (
        <View style={styles.timeContainer}>
          <Icon name="play" size={14} color={Colors.bgPrimaryLight} />
        </View>
      )}
    </View>
  );
}

ArticleListBigImageOther.defaultProps = {
  imageUrl: '',
  padded: false,
  isNotopMargin: false,
  isVideo: false,
};

const styles = StyleSheet.create({
  container: {
    width: ScalePerctFullWidth(100),
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
