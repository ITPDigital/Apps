import React, { PureComponent } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Colors,
  Metrics,
  ScalePerctFullHeight,
  ScalePerctFullWidth,
  TemplateConfig,
  Images,
} from '../../asset';
import {
  Article,
  ArticleDisplayDescription,
  ArticleDisplayImage,
  ArticleDisplayLogo,
  ArticleDisplaytitle,
  ArticleLeadText,
  PodcastPlayView,
  ProfileHeader,
  TransparentHeader,
  VideoPlay,
} from '../../components';
// import { NavigationActions } from "react-navigation";
import { Actions } from '../../redux';
import {
  ArticleDisplayApi,
  CheckBookmark,
  ManageBoookmarkApi,
  SaveHistoryApi,
  SavePreferencesBgApi,
  SavePreferencesFontApi,
} from '../../service';
import theme from '../../utilities/data.json';
import ArticleFooter from './ArticleFooter';
import { Analytics, Screen, Events } from '../../Analytics';
import ArticletabletSmall from '../../components/articleListItems/ArticleTabletSmall';
import { TabModal } from '../ChaptorPodcastScreen';
import ModalView from '../../components/podcastChaptorCard/ModalView';
import DetailHeader from '../../components/headers/DetailHeader';
import { siteKey } from '../../service/Constant';
import { WebView } from 'react-native-webview';
import YouTube from 'react-native-youtube';

type Props = {
  navigation: any,
  order?: object,
};

const font = {
  NORMAL: 'small',
  LARGE: 'large',
};
let apiStartTime, apiEndTime;
class ArticleView extends PureComponent<Props> {
  constructor(props) {
    super(props);

    this.state = {
      isBookmark: false,
      SelectedBookmarks: [],
      articleDisplay: {},
      refreshKey: 1,
      bookmarkIds: [],
      isOpen: false,
      themeId: props.bg,
      size: props.font,
      loading: true,
      bookmarks: [],
      isLogoVisible: false,
      showModal: false,
      RelatedArticles: [],
      site: props.navigation.getParam('site'),
      nid: props.navigation.getParam('nid'),
      showImageModal: false,
    };

    console.log('preferences size ', this.state.size);
    console.log('preferences theme ', this.state.themeId);
    console.log('this.props');
    console.log('themeId===', this.state.themeId);
  }

  // static navigationOptions = ({navigation}) => {
  //   return {
  //     header: () => null,
  //   };
  // };
  componentDidUpdate(prevProps, prevState) {
    apiEndTime = new Date();
    console.log('time api call end:' + new Date());
    let time = Math.floor(
      apiEndTime.getMilliseconds() - apiStartTime.getMilliseconds()
    ); //Math.floor((apiEndTime.getTime()- apiStartTime.getTime()) / (1000))
    console.log('time api (total time required to load): ' + time);
  }
  componentDidMount() {
    console.log('componentdidMount');
    console.log('deeplink ArticleView - ', this.props.navigation.state.params);
    SaveHistoryApi(this.props.userId, this.state.nid, this.state.site);
    Analytics.setCurrentScreen('ARTICLE_DETAILS');
    const itemId = this.props.navigation.getParam('nid');
    let site = this.props.navigation.getParam('site');
    let backgroundData = this.props.navigation.getParam('backgroundData');
    site = site || siteKey;
    console.log('deeplink itemId - ', itemId);
    console.log('deeplink site - ', site);
    apiStartTime = new Date();
    console.log('time api call start:' + new Date());
    console.log('time backgroundData: ' + JSON.stringify(backgroundData));

    if (backgroundData && backgroundData != null) {
      // ArticleDisplayApi(
      //   `${itemId}~${site}`,
      //   this.onSuccess,
      //   this.onFailure,
      //   this.onError
      // );
      this.onBackgroundSuccess(JSON.parse(backgroundData));
      // this.onSuccess(JSON.parse(backgroundData))
    } else {
      console.log('time backgroundData:::: ');
      ArticleDisplayApi(
        `${itemId}~${site}`,
        this.onSuccess,
        this.onFailure,
        this.onError
      );
    }
  }

  onBackgroundSuccess = (response) => {
    const { userId } = this.props;

    // if (responseObj != undefined && responseObj != {} && responseObj.length > 0 ) {
    // var response = JSON.parse(responseObj);
    console.log('async article data: ', response.data);

    this.setState(
      {
        bookmark: response.data.bookmark,
        articleDisplay: response.data,
        bookmarkIds: response.data.bookmark_ids,
      },
      () => {
        CheckBookmark(
          userId,
          this.state.bookmarkIds,
          this.onSuccessCheckBookmark,
          this.onFailure,
          this.onError
        );
        Analytics.logEvent(Events.screen_view, {
          article_title: response.data.title,
          article_url: response.data.link,
        });
        this.setRelaredArticles();
      }
    );
    console.log('user id', response);
  };

  onSuccess = (response) => {
    const { userId } = this.props;
    console.log('async article data old: ', response.data);
    this.setState({
      bookmark: response.data.bookmark,
      articleDisplay: response.data,
      bookmarkIds: response.data.bookmark_ids,
    });
    console.log('user id', response);
    CheckBookmark(
      userId,
      this.state.bookmarkIds,
      this.onSuccessCheckBookmark,
      this.onFailure,
      this.onError
    );
    Analytics.logEvent(Events.screen_view, {
      article_title: response.data.title,
      article_url: response.data.link,
    });

    this.setRelaredArticles();
  };

  setRelaredArticles = () => {
    const { articleDisplay } = this.state;
    console.log('related articl: ' + JSON.stringify(articleDisplay));
    const array = [];
    const storyRelation =
      articleDisplay &&
      !Array.isArray(articleDisplay) &&
      articleDisplay.hasOwnProperty('story_relation') &&
      articleDisplay.story_relation &&
      articleDisplay.story_relation.und;

    if (storyRelation && storyRelation.length > 0) {
      Array.prototype.push.apply(array, storyRelation);
      console.log('st1', array);
    }

    const galleryRelation =
      articleDisplay &&
      !Array.isArray(articleDisplay) &&
      articleDisplay.hasOwnProperty('gallery_relation') &&
      articleDisplay.gallery_relation &&
      articleDisplay.gallery_relation.und;

    if (galleryRelation && galleryRelation.length > 0) {
      Array.prototype.push.apply(array, galleryRelation);
      console.log('st2', array);
    }

    const videoRelation =
      articleDisplay &&
      !Array.isArray(articleDisplay) &&
      articleDisplay.hasOwnProperty('video_relation') &&
      articleDisplay.video_relation &&
      articleDisplay.video_relation.und;

    if (videoRelation && videoRelation.length > 0) {
      Array.prototype.push.apply(array, videoRelation);
      console.log('st3', array);
    }

    console.log('storyRelation', array);
    this.setState({ RelatedArticles: array });
  };

  checkBookmark = (articleId: any) => {
    const { SelectedBookmarks } = this.state;
    console.log('SelectedBookmarks', this.state.SelectedBookmarks);
    const BookmarkFlag =
      SelectedBookmarks &&
      SelectedBookmarks.data &&
      SelectedBookmarks.data.find((element: any) => {
        return element === articleId;
      });
    return !!BookmarkFlag;
  };

  UpdatedRelatedArticles = () => {
    const { RelatedArticles } = this.state;
    const UpdatedRelatedArticles = RelatedArticles.map((item: any) => {
      const bookarkFlag = this.checkBookmark(`${item.nid}~${item.site}`);
      const bookmark = { bookmark: bookarkFlag };
      return { ...item, ...bookmark };
    });
    this.setState({ RelatedArticles: UpdatedRelatedArticles });
  };

  onSuccessCheckBookmark = (response: any) => {
    console.log('response=====', response);
    const itemId = this.state.nid;
    const { site } = this.state;
    const ArticleKey = `${itemId}~${site}`;
    const BookmarkFlag = response.data.find((element: any) => {
      return element === ArticleKey;
    });
    this.setState({
      loading: false,
      isBookmark: !!BookmarkFlag,
      SelectedBookmarks: response,
    });
    this.UpdatedRelatedArticles();
    console.log('Check bookmark', this.state.SelectedBookmarks);
  };

  onFailure = (response: any) => {
    this.setState({ loading: false });
    console.log('Check bookmark', response);
    // alert(response);
  };

  onError = (response: any) => {
    this.setState({ loading: false });
    console.log('Check bookmark', response);
  };

  renderVideo = (data) => {
    const { articleDisplay } = this.state;
    if (articleDisplay.type == 'video') {
      const urlarray = articleDisplay.video.split('/');
      const urlarraylength = articleDisplay.video.split('/').length;
      const id = urlarray[urlarraylength - 1].replace('watch?v=', '');
      const videoId = id;

      console.log("VIDEOID" + videoId);

      return (
        <View
          style={{
            backgroundColor: 'blue',
            width: ScalePerctFullWidth(100),
            height: ScalePerctFullWidth(59),
          }}
        >
          {Platform.OS == 'android' ?
            <WebView
              apiKey="AIzaSyBewBa6kxgVwxpEjfxlpjnqsb0k9xBhDak"
              style={{
                width: ScalePerctFullWidth(100),
                height: ScalePerctFullWidth(59),
                backgroundColor: 'black',
              }}
              allowsInlineMediaPlayback
              mediaPlaybackRequiresUserAction={false}
              useWebKit={true}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{
                uri: `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&modestbranding=1&autoplay=1&mute=1&showinfo=0&controls=1&playsinline`,
                // html:`<iframe width="100" height="100" src="https://www.youtube.com/embed/HELzP9VcPTo" frameborder="0" allow="accelerometer; autoplay="1"; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
              }}
              //userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
              userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Chrome/77.0.3865.90 Safari/605.1.15"
            //Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Safari/605.1.15
            /> : <YouTube
            videoId={videoId} // The YouTube video ID
            play // control playback of video with true/false
            fullscreen = {false} // control whether the video should play in fullscreen or inline
            loop // control whether the video should loop when ended
            onReady={e => this.setState({ isReady: true })}
            onChangeState={e => this.setState({ status: e.state })}
            onChangeQuality={e => this.setState({ quality: e.quality })}
            onError={e => this.setState({ error: e.error })}
            style={{ alignSelf: 'stretch', height: ScalePerctFullWidth(61) }}
          />}
        </View>
      )
    }
    else {
      return null
    }
  }
  renderDisplayItem = (type: string, data: any, settings: any) => {
    const { themeId, size, articleDisplay, site } = this.state;
    const { userId, navigation, commentBanned } = this.props;

    if (type === 'title') {
      return (
        <ArticleDisplaytitle
          dynamicColor={theme[themeId]}
          font={font[size]}
          data={articleDisplay}
          site={site}
        />
      );
    }
    if (type === 'image') {
      console.log('isvideotype: ' + JSON.stringify(articleDisplay));
      const video = articleDisplay && articleDisplay.video;
      //console.log('ARTICLEVIEwVIDEO' + JSON.stringify(video));

      if (articleDisplay.type == 'video') {
        const urlarray = articleDisplay.video.split('/');
        const urlarraylength = articleDisplay.video.split('/').length;
        const id = urlarray[urlarraylength - 1].replace('watch?v=', '');
        const videoId = id;

        return (
          <></>
        );
      } else {
        return (
          <ArticleDisplayImage
            dynamicColor={theme[themeId]}
            font={font[size]}
            data={articleDisplay}
            onPress={this.toggleModal}
            disabled={this.state.showImageModal}
          />
        );
      }
    }
    if (type === 'description') {
      return (
        <ArticleDisplayDescription
          dynamicColor={theme[themeId]}
          font={font[size]}
          data={articleDisplay}
          sitekey={site}
          userId={userId}
          commentBanned={commentBanned}
        />
      );
    }
    if (type === 'lead_text') {
      return (
        <ArticleLeadText
          dynamicColor={theme[themeId]}
          font={font[size]}
          data={articleDisplay}
          sitekey={site}
          userId={userId}
          commentBanned={commentBanned}
        />
      );
    }
  };

  onPressBrand = (site, brandLogo) => {
    const { navigation } = this.props;
    navigation.push('BrandsPage', {
      brand: site,
      brandLogo,
    });
  };

  displayOrder = () => {
    const { articleDisplay } = this.state;
    const articleTemplate = articleDisplay && articleDisplay.article_template;
    if (articleTemplate === '1') {
      return ['logo', 'title', 'lead_text', 'image', 'description'];
    }
    if (articleTemplate === '2') {
      return ['logo', 'title', 'lead_text', 'image', 'description'];
    } else {
      return ['logo', 'title', 'image', 'lead_text', 'description'];
    }
  };

  renderDisplayArticle = (
    order: any,
    data: any,
    settings: any,
    size: string,
    themeId: string
  ) => {
    const dynamicColor = theme[themeId];
    const { navigation } = this.props;
    const { articleDisplay } = this.state;
    return (
      <View>
        <FlatList
          data={this.displayOrder()}
          keyExtractor={(x, i) => i.toString()}
          extraData={[size, themeId]}
          renderItem={({ item }) =>
            this.renderDisplayItem(item, articleDisplay, data, settings)
          }
          style={{ backgroundColor: dynamicColor.bgColor }}

        />
      </View>
    );
  };

  toggleFooter = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  closeFooter = () => {
    this.setState({
      isOpen: false,
    });
  };

  selectTheme = (themeId: number) => {
    const { userId } = this.props;
    this.setState({
      themeId,
    });
    console.log('select theme function called for the themeId :', themeId);
    SavePreferencesBgApi(
      userId,
      themeId,
      this.onBgSuccess,
      this.onBgFailure,
      this.onBgError
    );
    this.props.SaveUserPreferencesBg(themeId);
  };

  onBgSuccess = (response: any) => {
    console.log(
      'bgColor is setting properly on Success: for the color: ',
      response
    );
    // this.props.SaveUserPreferencesBg(this.state.themeId);
  };

  selectFont = (size: string) => {
    const { userId } = this.props;
    this.setState({
      size,
    });

    SavePreferencesFontApi(
      userId,
      size,
      this.onFontSuccess,
      this.onFontFailure,
      this.onFontError
    );
    this.props.SaveUserPreferencesFont(size);
  };

  onFontSuccess = (response: any) => {
    console.log('success');
    // this.props.SaveUserPreferencesFont(this.state.size);
  };

  onItemPress = (nid: number, site: string, item: any) => {
    console.log('item in article list: ', item);
    const nextScreen = item.video ? 'ArticleDisplayHomeScreen' : 'ArticleDisplayHomeScreen';

    const { navigation } = this.props;
    if (item.content_type === 'video') {
      navigation.replace(nextScreen, {
        video: item.video,
        nid: item.nid,
        site: item.site,
      });
    } else if (item.content_type === 'gallery') {
      navigation.push('GalleryHomeScreen', { nid, site });
    } else {
      this.setState({
        loading: true,
        SelectedBookmarks: [],
        articleDisplay: {},
        isLogoVisible: false,
        site,
        nid,
      });
      SaveHistoryApi(this.props.userId, nid, site);
      ArticleDisplayApi(
        `${nid}~${site}`,
        this.onSuccess,
        this.onFailure,
        this.onError
      );
    }

    // navigation.push("ArticleDisplayHomeScreen", { nid, site });
  };

  onBookMarkToggle = () => {
    const { userId } = this.props;
    const { bookmark, articleDisplay, isBookmark, site } = this.state;
    // const site = this.props.navigation.getParam("site");
    const changes = !isBookmark;
    // const isBookmarked = bookmark ? "U" : "F";
    const updated = { ...articleDisplay, bookmark: changes };
    this.setState({ isBookmark: changes });
    console.log('article display in onBookMarkToggle', articleDisplay);
    console.log(
      'onBookmark toggle userId:',
      userId,
      'nid:',
      articleDisplay.nid,
      'site:',
      site,
      'isBookmarked:',
      bookmark
    );
    ManageBoookmarkApi(userId, articleDisplay.nid, site, isBookmark);
  };

  onManageBookmark = (
    nId: string,
    siteKey: string,
    isBookmarked: boolean,
    index: number
  ) => {
    const { userId } = this.props;
    const { RelatedArticles } = this.state;
    const changes = !RelatedArticles[index].bookmark;
    const refresh = Math.random();
    const updated = [...RelatedArticles];
    updated[index].bookmark = changes;
    this.setState({
      RelatedArticles: updated,
      refreshKey: refresh,
    });
    ManageBoookmarkApi(userId, nId, siteKey, isBookmarked);
  };

  renderTabPlayScreen = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  };

  handlePlay = () => {
    const { navigation } = this.props;
    return Metrics.isTablet
      ? this.renderTabPlayScreen()
      : navigation.navigate('PlayScreen');
  };

  handleScroll = (event: Object) => {
    console.log(
      'event',
      event.nativeEvent.contentOffset.y > 15 + Metrics.DEFAULT_LIST_PADDING
    );
    if (event.nativeEvent.contentOffset.y > 15 + Metrics.DEFAULT_LIST_PADDING) {
      this.setState({ isLogoVisible: true });
    } else if (this.state.isLogoVisible) {
      this.setState({ isLogoVisible: false });
    }
  };

  toggleModal = () =>
    this.setState({
      showImageModal: !this.state.showImageModal,
    });

  render() {
    console.log('USER=====', this.props.userId);
    console.log('user preferences', this.props.userId);
    console.log('Display1', this.props.articleDisplay);
    console.log('loading', this.state.loading);
    console.log('site and nid', this.state.site, this.state.nid);
    const noOfColumn = Metrics.isTablet ? 2 : 1;
    const numberOfLines = Metrics.isTablet ? 3 : null;
    const {
      isOpen,
      themeId,
      size,
      loading,
      bookmarks,
      refreshKey,
      bookmark,
      articleDisplay,
      showModal,
      isBookmark,
      RelatedArticles,
    } = this.state;
    const { order, data, settings, navigation, flag } = this.props;
    const articleTemplate = articleDisplay && articleDisplay.article_template;

    const dynamicColor = theme[themeId];
    const textStyle = StyleSheet.flatten([{ color: dynamicColor.fontColor }]);
    console.log('articleDisplay: ', JSON.stringify(RelatedArticles));
    return (
      <View style={styles.container}>
        {articleTemplate && articleTemplate === '2' ? (
          <TransparentHeader
            navigation={navigation}
            title=""
            onBack={() => navigation.goBack()}
            translucent
            onAction={() => {
              navigation.navigate('ProfileDrawerScreen');
            }}
            isIconVisible={false}
          />
        ) : (
            <DetailHeader
              navigation={navigation}
              title=""
              isBottomBorder
              onBack={() => navigation.goBack()}
              isTransculent
              // dynamicColor={theme[themeId]}
              dynamicColor= "#f99509"
              style={{
                backgroundColor: '#f99509', 
              }}
              onAction={() => {
                navigation.navigate('ProfileDrawerScreen');
              }}
              // isLogo
              isIconVisible={false}
            // logoUrl={
            // 	this.state.isLogoVisible &&
            // 	articleDisplay &&
            // 	articleDisplay.brand_logo &&
            // 	articleDisplay.brand_logo
            // }
            // brandIcon={this.state.isLogoVisible ? Images.ABlogo : null}
            />
          )}
        {this.renderVideo(data)}

        {loading || !articleDisplay ? (
          <View style={styles.indicator}>
            <ActivityIndicator size="large" color="#f99509" />
          </View>
        ) : (
            <View
              style={StyleSheet.flatten([
                styles.listContainer,
                !flag && {
                  backgroundColor: dynamicColor.bgColor,
                  paddingBottom: ScalePerctFullWidth(2),
                },
              ])}
            >
              {!articleDisplay ? (
                <Text style={styles.errorText}>No data found</Text>
              ) : (
                  <FlatList
                    data={RelatedArticles}
                    keyExtractor={(x, i) => i.toString()}
                    style={{
                      flex: 1,
                      backgroundColor: dynamicColor.bgColor,
                      color: dynamicColor.fontColor,
                    }}
                    numColumns={noOfColumn}
                    renderItem={({ item, index }) => (
                      <Article
                        style={{ flex: 1 }}
                        onPress={() => this.onItemPress(item.nid, item.site, item)}
                        onPressBookmark={() =>
                          this.onManageBookmark(
                            item.nid,
                            item.site,
                            item.bookmark,
                            index
                          )
                        }
                        key={index.toString()}
                        order={
                          TemplateConfig.articleTemplates[
                          Metrics.isTablet ? 15 : 18
                          ]
                        }
                        settings={
                          TemplateConfig.articleTemplateSettings[
                          Metrics.isTablet ? 14 : 16
                          ]
                        }
                        data={item}
                        refreshKey={refreshKey}
                        numberOfLines={numberOfLines}
                        onPressBrand={this.onPressBrand}
                        textStyle={textStyle}
                        iconStyle={textStyle}
                        tabContainerStyle={styles.tabContainerStyle}
                        articleContainerStyle={styles.articleContainerStyle}
                        imageStyle={styles.imageStyle}
                        imagePlaceHolderStyle={styles.imagePlaceHolderStyle}
                        articleDescriptionstyle={styles.articleDescriptionstyle}
                        // seperator={styles.lineSeperator}
                        isFromHomePage={true}
                      />
                    )}
                    ListHeaderComponent={this.renderDisplayArticle(
                      order,
                      data,
                      settings,
                      size,
                      themeId,
                      articleDisplay
                    )}
                    onScroll={
                      (articleTemplate === '3' || articleTemplate === '1') &&
                      this.handleScroll
                    }
                  />
                )}

              {Metrics.isTablet && !flag ? (
                <View
                  style={{
                    backgroundColor: dynamicColor.bgColor,
                    // paddingBottom: ScalePerctFullWidth(9),
                  }}
                />
              ) : null}
            </View>
          )}
        {isOpen && (
          <TouchableOpacity
            style={styles.absoluteContainer}
            onPress={() => this.closeFooter()}
          />
        )}

        <ArticleFooter
          onBookMarkToggle={this.onBookMarkToggle}
          isBookmark={isBookmark}
          isOpen={isOpen}
          themeId={themeId}
          selectTheme={this.selectTheme}
          toggleFooter={this.toggleFooter}
          dynamicColor={theme[themeId]}
          selectFont={this.selectFont}
          data={articleDisplay}
          user={this.props.userId}
        />
        <View
          style={{
            zIndex: -1,
            width: ScalePerctFullWidth(100),
            height: Metrics.isTablet
              ? ScalePerctFullHeight(7)
              : ScalePerctFullHeight(4),
            backgroundColor: dynamicColor.bgColor,
          }}
        />
        {/* {flag && <PodcastPlayView onPress={this.handlePlay} />} */}
        {!showModal
          ? flag && <PodcastPlayView onPress={this.handlePlay} />
          : null}
        {showModal && (
          <TabModal showModal={showModal} handlePlay={this.handlePlay} />
        )}
        {this.state.showImageModal && (
          <ModalView
            onPress={this.toggleModal}
            image={
              articleDisplay &&
              articleDisplay.field_picture_ref &&
              articleDisplay.field_picture_ref.und[0] &&
              articleDisplay.field_picture_ref.und[0].image_path
            }
            isVisible={this.state.showImageModal}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  console.log('state1', state.articleDisplay);
  return {
    articleDisplay: state.articleDisplay,
    userId: state.user.id,
    commentBanned: state.user.commentBanned,
    font: state.user.article_font_size,
    bg: state.user.article_bg_color,
    flag: state.podcastPlayControl ? state.podcastPlayControl.flag : false,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleView);

const mobileStyles = StyleSheet.create({
  errorText: {
    flex: 1,
    fontSize: 15,
    marginHorizontal: ScalePerctFullWidth(35),
  },
  container: {
    width: ScalePerctFullWidth(100),
    flex: 1,
  },
  listContainer: {
    width: ScalePerctFullWidth(100),
    flex: 1,
    // paddingBottom: ScalePerctFullWidth(10),
  },
  absoluteContainer: {
    width: ScalePerctFullWidth(100),
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    position: 'absolute',
  },
  containerStyle: {
    alignItems: 'center',
  },
  createAccountText: {
    fontSize: Metrics.SMALL_TEXT_SIZE,
    letterSpacing: 0.3,
    marginBottom: ScalePerctFullHeight(8),
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textStyle: {},
});

const tabStyles = StyleSheet.create({
  line: {
    borderBottomColor: Colors.linePrimary,
    borderBottomWidth: 2,
    marginHorizontal: ScalePerctFullWidth(4.8),
  },
  sectionFooter: {
    textAlign: 'center',
    fontFamily: 'BentonSans Bold',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.bodySecondaryDark,
    paddingVertical: ScalePerctFullHeight(2),
  },
  container: {
    width: ScalePerctFullWidth(100),
    flex: 1,
  },
  listContainer: {
    width: ScalePerctFullWidth(100),
    flex: 1,
  },
  absoluteContainer: {
    width: ScalePerctFullWidth(100),
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    position: 'absolute',
  },
  containerStyle: {
    alignItems: 'center',
  },
  createAccountText: {
    fontSize: Metrics.SMALL_TEXT_SIZE,
    letterSpacing: 0.3,
    marginBottom: ScalePerctFullHeight(8),
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
  },
  tabContainerStyle: {
    width: ScalePerctFullWidth(47),
    alignSelf: 'flex-start',
  },
  articleContainerStyle: {
    width: ScalePerctFullWidth(47),
    paddingHorizontal: (ScalePerctFullWidth(100) - ScalePerctFullWidth(95)) / 2,
  },
  articleDescriptionstyle: {
    height: 80,
    width: ScalePerctFullWidth(47),
  },
  imageStyle: {
    width: ScalePerctFullWidth(14.6),
    height: ScalePerctFullHeight(8.4),
    borderRadius: Metrics.SMALL_RADIUS,
    marginLeft: Metrics.DEFAULT_LIST_PADDING,
  },
  imagePlaceHolderStyle: {
    width: ScalePerctFullWidth(14.6),
    height: ScalePerctFullHeight(8.4),
    borderRadius: Metrics.SMALL_RADIUS,
  },
  lineSeperator: {
    width: ScalePerctFullWidth(42),
    alignSelf: 'flex-start',
    borderBottomWidth: 2.5,
    borderColor: Colors.linePrimary,
    marginLeft: ScalePerctFullWidth(3),
  },
});

const styles = Metrics.isTablet ? tabStyles : mobileStyles;
