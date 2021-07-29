import React, {PureComponent} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import ImageLoad from 'react-native-image-placeholder';
import {Colors, Metrics, ScalePerctFullWidth, Images} from '../../asset';
import {
  ArticleListTitleImage,
  ArticleListFooter,
  ArticleListDescription,
} from '../articleListSubItems';
import Icon from '../../asset/fonts/icons';
import {getTimeAgo} from '../../utilities';
import {shareArticle} from '../common';

type Props = {};
export default class ArticleListItem extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {index: 0};
  }

  renderImage = (item: any) => {
    console.log('itemvideolatest', item);
    const url =
      !item.image_crop_square || item.image_crop_square.includes('public://')
        ? null
        : item.image_crop_square;
    return (
      <View>
        {/* <Image source={{ uri: url }} style={StyleSheet.flatten([styles.image])} /> */}
        <ImageLoad
          resizeMode={'stretch'}
          style={styles.image}
          placeholderStyle={styles.image}
          isShowActivity={false}
          loadingStyle={{size: 'large', color: 'grey'}}
          source={{uri: url}}
          placeholderSource={Images.landscape}
        />
        <Text style={[styles.titleText]}>
          {item.video && item.video.length > 0 && item.title}
        </Text>
      </View>
    );
  };

  renderImageHome = (item: any, userId: any) => {
    console.log('itemvideolatest', item);
    const url =
      !item.image_crop_square || item.image_crop_square.includes('public://')
        ? null
        : item.image_crop_square;
    let time = getTimeAgo(item.pubDate);

    return (
      <View style={{marginHorizontal: 16, aspectRatio: 1, flex: 1}}>
        {/* <Image source={{ uri: url }} style={StyleSheet.flatten([styles.image])} /> */}
        <ImageLoad
          resizeMode={'cover'}
          style={{
            aspectRatio: 1,
            flex: 1,
          }}
          placeholderStyle={styles.image}
          isShowActivity={false}
          loadingStyle={{size: 'large', color: 'grey'}}
          source={{uri: url}}
          placeholderSource={Images.landscape}
        />
        <View
          style={[
            {flex: 1, flexDirection: 'column', justifyContent: 'space-between'},
            styles.titleTextHome,
          ]}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 15,
              fontFamily: 'BentonSans Medium',
              lineHeight: 19,
              marginHorizontal: 15,
              elevation: 3,
              zIndex: 3,
            }}
          >
            {item.video && item.video.length > 0 && item.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 15,
              alignItems: 'center',
              alignContent: 'center',
              marginBottom:15

            }}
          >
            <Text
              style={{
                marginTop: 12,
                color: '#FFFFFF',
                fontSize: 13,
                fontFamily: 'BentonSans Regular',
                lineHeight: 15,
              }}
            >
              {time}
            </Text>
            <TouchableOpacity
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
                }}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  onItemChanged = (index: number) => {
    this.setState({index});
  };

  render() {
    const {data, onPress, isFromHomePage, user} = this.props;
    const {index} = this.state;
    const userId = user && user.id;

    if (isFromHomePage) {
      return (
        <View style={{paddingTop: 17, backgroundColor: '#000000'}}>
          <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            data={data}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => onPress(item.nid, item.site, item)}
              >
                {this.renderImageHome(item, userId)}
              </TouchableOpacity>
            )}
            sliderWidth={ScalePerctFullWidth(100)}
            itemWidth={ScalePerctFullWidth(100)}
            onSnapToItem={this.onItemChanged}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
            layoutCardOffset={0}
          />
          <Pagination
            dotsLength={data.length}
            activeDotIndex={index}
            containerStyle={styles.paginationContainerHome}
            dotStyle={{
              width: 30,
              height: 3,
              borderRadius: 5,
              marginHorizontal: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              borderColor: Colors.bgTertiaryDark,
              borderWidth: 0.2,
            }}
            inactiveDotStyle={
              {
                // Define styles for inactive dots here
              }
            }
            inactiveDotOpacity={0.3}
            inactiveDotScale={1}
          />

          <View style={styles.lineSeperatoroHome} />
        </View>
        // </TouchableOpacity>
      );
    } else {
      <View style={{marginTop: 17}}>
        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => onPress(item.nid, item.site, item)}
            >
              {this.renderImage(item)}
            </TouchableOpacity>
          )}
          sliderWidth={ScalePerctFullWidth(100)}
          itemWidth={ScalePerctFullWidth(100)}
          onSnapToItem={this.onItemChanged}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          layoutCardOffset={0}
        />
        <Pagination
          dotsLength={data.length}
          activeDotIndex={index}
          containerStyle={styles.paginationContainer}
          dotStyle={{
            width: 30,
            height: 3,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            borderColor: Colors.bgTertiaryDark,
            borderWidth: 0.2,
          }}
          inactiveDotStyle={
            {
              // Define styles for inactive dots here
            }
          }
          inactiveDotOpacity={0.3}
          inactiveDotScale={1}
        />

        <View style={styles.lineSeperator} />
      </View>;
    }
  }
}

ArticleListItem.defaultProps = {
  order: ['logo', 'bigImage', 'title', 'footer'],
};

const styles = StyleSheet.create({
  container: {
    marginTop: 17,
  },
  lineSeperator: {
    paddingTop: 30,
    width: ScalePerctFullWidth(92),
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.linePrimaryFull,
    paddingHorizontal: 12,
  },
  lineSeperatoroHome: {
    paddingTop: 40,
    width: ScalePerctFullWidth(92),
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: '#000000',
    paddingHorizontal: 12,
  },
  image: {
    width: ScalePerctFullWidth(100),
    height: ScalePerctFullWidth(100),
  },
  symbolContainer: {
    height: 30,
    borderRadius: 15,
    width: 30,
    position: 'absolute',
    bottom: 30,
    right: 15,
    backgroundColor: Colors.bodySecondaryDark,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    bottom: 20,
    left: 0,
    right: 0,
    position: 'absolute',
  },
  paginationContainerHome: {
    bottom: -10,
    left: 0,
    right: 0,
    position: 'absolute',
  },
  titleTextHome: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  titleText: {
    color: Colors.bodyPrimaryLight,
    fontSize: Metrics.EXTRA_LARGE_TEXT_SIZE,
    flex: 1,
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  icon: {
    paddingHorizontal: Metrics.isTablet
      ? ScalePerctFullWidth(2)
      : Metrics.DEFAULT_LIST_PADDING,
    alignSelf: 'center',
    paddingTop: 14,
    paddingBottom: 10,
  },
});
