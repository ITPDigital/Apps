import React, {PureComponent} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Metrics, ScalePerctFullWidth} from '../../asset';
import {RelatedVideos, VideoDetailHeader, VideoPlay} from '../../components';
import {TabletRelatedVideos} from '../../components/VideoDetailItems';
import {Actions} from '../../redux';
import {
  ArticleDisplayApi,
  ManageBoookmarkApi,
  CheckBookmark,
} from '../../service';
import {Analytics, Screen} from '../../Analytics';
let apiStartTime, apiEndTime;

class VideoDetail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      refreshKey: 1,
      isBookmark: false,
      SelectedBookmarks: [],
      RelatedArticles: [],
    };
  }

  componentDidMount() {
    Analytics.setCurrentScreen('VIDEO_DETAILS');
    this.props.clearDisplayArticleAction();
    const itemId = this.props.navigation.getParam('nid');
    const site = this.props.navigation.getParam('site');
    let backgroundData = this.props.navigation.getParam('backgroundData');

    apiStartTime = new Date();
    console.log('time api call start video:' + new Date());
    if (backgroundData != null) {
		this.onBackgroundSuccess(backgroundData)
    } else {
      ArticleDisplayApi(
        `${itemId}~${site}`,
        this.onSuccess,
        this.onFailure,
        this.onError
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    apiEndTime = new Date();
    console.log('time api call end video:' + new Date());
    let time = Math.floor(
      apiEndTime.getMilliseconds() - apiStartTime.getMilliseconds()
    ); //Math.floor((apiEndTime.getTime()- apiStartTime.getTime()) / (1000))
    console.log('time api (total time required to load ) video: ' + time);
  }
  onBackgroundSuccess = (responseObj: any) => {
    if (responseObj != null &&  responseObj != undefined && responseObj.length > 0) {
	  var response = JSON.parse(responseObj);
	  
      const {user} = this.props;
      const videoRelation =
        response &&
        response.data &&
        !Array.isArray(response.data) &&
        response.data.hasOwnProperty('video_relation') &&
        response.data.video_relation &&
        response.data.video_relation.und;
      console.log('Video relation:', videoRelation);
      this.setState({
        loading: false,
        //bookmark: response.data.bookmark,
        articleDisplay: response.data,
        bookmarkIds: response.data.bookmark_ids,
        RelatedArticles: videoRelation,
      });
      CheckBookmark(
        user.id,
        this.state.bookmarkIds,
        this.onSuccessCheckBookmark,
        this.onFailure,
        this.onError
      );
      this.props.setDisplayArticleAction(response);
    }
  };

  onSuccess = (response: any) => {
    console.log('MYRESPONSE', response);
    const {user} = this.props;
    const videoRelation =
      response &&
      response.data &&
      !Array.isArray(response.data) &&
      response.data.hasOwnProperty('video_relation') &&
      response.data.video_relation &&
      response.data.video_relation.und;
    console.log('Video relation:', videoRelation);
    this.setState({
      loading: false,
      //bookmark: response.data.bookmark,
      articleDisplay: response.data,
      bookmarkIds: response.data.bookmark_ids,
      RelatedArticles: videoRelation,
    });
    CheckBookmark(
      user.id,
      this.state.bookmarkIds,
      this.onSuccessCheckBookmark,
      this.onFailure,
      this.onError
    );
    this.props.setDisplayArticleAction(response);
  };

  checkBookmark = (articleId: any) => {
    const {SelectedBookmarks} = this.state;
    console.log('SelectedBookmarks', this.state.SelectedBookmarks);
    const BookmarkFlag =
      SelectedBookmarks &&
      SelectedBookmarks.data &&
      SelectedBookmarks.data.find((element: any) => {
        return element === articleId;
      });
    return BookmarkFlag ? true : false;
  };

  onSuccessCheckBookmark = (response: any) => {
    console.log('response=====', response);
    const itemId = this.props.navigation.getParam('nid');
    const site = this.props.navigation.getParam('site');
    const ArticleKey = `${itemId}~${site}`;
    const BookmarkFlag = response.data.find((element: any) => {
      return element === ArticleKey;
    });
    this.setState({
      loading: false,
      isBookmark: BookmarkFlag ? true : false,
      SelectedBookmarks: response,
    });
    this.UpdatedRelatedArticles();
  };

  UpdatedRelatedArticles = () => {
    const {RelatedArticles} = this.state;
    console.log('UpdatedRelated:', RelatedArticles);
    const UpdatedRelatedArticles = RelatedArticles.map((item: any) => {
      const bookarkFlag = this.checkBookmark(`${item.nid}~${item.site}`);
      const bookmark = {bookmark: bookarkFlag};
      return {...item, ...bookmark};
    });
    this.setState({
      RelatedArticles: UpdatedRelatedArticles,
      refreshKey: Math.random(),
    });
  };

  onFailure = () => {
    this.setState({loading: true});
  };

  onError = () => {
    this.setState({loading: true});
  };

  videoHandler = (itemId: number, site: string, video: Array) => {
    const {navigation} = this.props;
    this.setState({loading: true});
    console.log(
      'Video handler values: ItemID:',
      itemId,
      'site',
      site,
      'video',
      video
    );
    if (video) {
      ArticleDisplayApi(
        `${itemId}~${site}`,
        this.onSuccess,
        this.onFailure,
        this.onError
      );
    } else {
      navigation.navigate('ArticleDisplayHomeScreen', {
        nid: itemId,
        site,
        refreshKey: Math.random(),
      });
    }
  };

  onBookMarkToggle = () => {
    const {user} = this.props;
    const {isBookmark, articleDisplay, loading} = this.state;
    const site = this.props.navigation.getParam('site');
    if (!loading) {
      const changes = !isBookmark;
      this.setState({isBookmark: changes});
      ManageBoookmarkApi(
        user.id,
        articleDisplay && articleDisplay.nid,
        site,
        isBookmark
      );
    }
  };

  onManageBookmark = (
    nId: string,
    siteKey: string,
    isBookmarked: boolean,
    index: number
  ) => {
    const {user} = this.props;
    const {RelatedArticles} = this.state;
    const changes = !RelatedArticles[index].bookmark;
    const refresh = Math.random();
    const updated = [...RelatedArticles];
    updated[index].bookmark = changes;
    this.setState({
      RelatedArticles: updated,
      refreshKey: refresh,
    });
    ManageBoookmarkApi(user.id, nId, siteKey, isBookmarked);
  };

  render() {
    const {navigation, articleDisplay, loading} = this.props;
    const {isBookmark, RelatedArticles, refreshKey} = this.state;
    console.log('videoDetail', this.props.articleDisplay);
    const video = articleDisplay && articleDisplay.video;
    console.log('video link', video);
    console.log('RAL', RelatedArticles);
    return loading || !articleDisplay ? (
      <View style={styles.indicator}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    ) : (
      <View style={styles.container}>
       <StatusBar hidden />
        <VideoDetailHeader
          onBack={() => {
            navigation.goBack();
          }}
        />
        {!video ? (
          // AlertComp(Strings.authentication.ALERT, "No data found", () =>
          // 	this.props.navigation.goBack(),
          // )
          <View
            style={{
              width: ScalePerctFullWidth(100),
              height: ScalePerctFullWidth(59),
            }}
          >
            <Text> Video link is not available</Text>
          </View>
        ) : (
          <VideoPlay videoData={video} loading={this.state.loading} />
        )}
        {/* <Text>example</Text> */}
        <View style={styles.subContainer}>
          {Metrics.isTablet ? (
            <TabletRelatedVideos
              RelatedVideos={RelatedArticles}
              refreshKey={refreshKey}
              data={articleDisplay}
              videoHandler={this.videoHandler}
              isBookmark={isBookmark}
              onBookMarkToggle={this.onBookMarkToggle}
              onManageBookmark={this.onManageBookmark}
            />
          ) : (
            <RelatedVideos
              data={articleDisplay}
              videoHandler={this.videoHandler}
              onBookMarkToggle={this.onBookMarkToggle}
              isBookmark={isBookmark}
            />
          )}
        </View>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    articleDisplay: state.articleDisplay,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(27, 27, 27)',
    // paddingLeft: 18,
    // paddingRight: 12.3,
    flex: 1,
  },
  text: {
    fontSize: Metrics.VERY_SMALL_LINE_HEIGHT,
    paddingBottom: Metrics.DEFAULT_PADDING,
    paddingTop: 20,
    fontFamily: 'BentonSans Bold',
    color: 'rgb(255,255,255)',
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    // width: ScalePerctFullWidth(100),
    // height: ScalePerctFullWidth(59),
    // backgroundColor: "red",
  },
});

// import React, { PureComponent } from "react";
// import { View, Text, StyleSheet } from "react-native";

// export default class VideoDetail extends PureComponent {
// 	render() {
// 		return <View />;
// 	}
// }
