import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NativeModules, Platform, I18nManager} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Actions} from '../../redux';
import ArticleListUI from './ArticleListUI';
import {
  MyTroveApi,
  TopicsArticleApi,
  ManageBoookmarkApi,
  BrandsPreferenceAPI,
  BrandPageApi,
} from '../../service';
import {Constants} from '../../asset';
import {Analytics, Screen} from '../../Analytics';
import {getCurrentUserToken} from '../../storage';
import {ArticleDisplayApi, ArticleDisplayOnBackgroundReq} from '../../service';
import {
  setBackgroundArticleData,
  getArticleBackgroundData,
} from '../../storage/AsyncStore';

type Props = {
  screenProps: any,
  navigation: any,
};
let backgroundApiCallStart = false;
var backgroundData = new Object();
class ArticleListContainer extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refresh: false,
      pageNumber: 1,
      message: Constants.emptyMessages.noRecord,
    };
  }

  componentDidMount() {
    this.setState({loading: true});
    const screenName = 'Trove';
    Analytics.setCurrentScreen(screenName);
    SplashScreen.hide();
    // this.fetchArticles();
  }

  fetchArticles = () => {
    const {
      tid,
      user,
      clearMyTroveAction,
      type,
      brandKey,
      setMyTroveAction,
      HomeScreenData,
    } = this.props;
    console.log('type12', type, tid);

    if (tid == 0) {
      if (user) {
        console.log('MyTroveApi');
        // this.setState({loading: true});
        MyTroveApi(
          user.topics,
          user.brands,
          user.id,
          0,
          null,
          this.onFetchSuccess,
          this.onFetchFailure,
          this.onFetchError
        );
      }
    } else if (type === 'topic') {
      console.log('topic123', HomeScreenData[tid]);
      // this.setState({loading: true});
      TopicsArticleApi(
        tid,
        user.id,
        0,
        null,
        this.onFetchSuccess,
        this.onFetchFailure,
        this.onFetchError
      );
    } else if (type === 'brand') {
      BrandPageApi(
        brandKey || 'ahl_en',
        0,
        this.onFetchSuccess,
        this.onFetchFailure,
        this.onFetchError
      );
    }
    console.log('2');
    this.setState({
      pageNumber: 0,
      loading: false,
    });
  };

  onFetchSuccess = (data: any) => {
    const {setMyTroveAction, tid, type} = this.props;
    console.log('data on success', data);
    this.setState({
      loading: false,
      refresh: false,
      message: Constants.emptyMessages.noRecord,
    });
    setMyTroveAction(tid, data, type);
  };

  onFetchFailure = () => {
    console.log('failfetch');

    this.setState({
      loading: false,
      refresh: false,
      message: Constants.errorMessages.general,
    });
    this.fetchArticles();
  };

  onFetchError = (error: any) => {
    let message = Constants.errorMessages.general;
    if (error.toString().includes(Constants.errorMessages.checkNetwork)) {
      message = Constants.errorMessages.network;
    }
   
    this.setState({loading: false, refresh: false, message});
  };
  onBackgroundSuccess = (response: any) => {
   
    return null;
  };

  getItemId = (data) => {
    let nidArr = [];
    if (data) {
      data.filter(function (outerArr) {
        if(outerArr.title == 'Most read stories'){
          // alert(JSON.stringify(outerArr));
          outerArr.data.filter(function (item) {
            // alert(JSON.stringify(item))
            if (item.contentID != null) {
              nidArr.push(item.contentID);
            }
          });
        }
        if(outerArr.title == 'Industries'||outerArr.title == 'Opinion'||outerArr.title == 'Lifestyle'||outerArr.title == 'Startup'|| outerArr.title == 'CEO'){
          outerArr.data.filter(function (item) {
            if (item.nid != null) {
              nidArr.push(item.nid);
            }
          });
        }
        // console.log("outerArr: "+ JSON.stringify(outerArr))
        if (outerArr.title == '' ) {
          outerArr.data.filter(function (innerArr) {
            
            if (innerArr.nid != null) {
              nidArr.push(innerArr.nid);
            }
          });
          if(outerArr.marquee != null){
            outerArr.marquee.filter(function (innerArr) {
              
              if (innerArr.nid != null) {
                nidArr.push(innerArr.nid);
              }
            });
          }
        } else if (outerArr.title == 'Latest videos') {
          outerArr.data.filter(function (innerArr) {
           
              innerArr.filter(function (item) {
                if (item.nid != null) {
                  nidArr.push(item.nid);
                }
              });
           
          });
        }
        
      });
    }
 
    return nidArr;
  };
  componentDidUpdate(prevProps, prevState) {
    if (!backgroundApiCallStart) {
      let articleArr = [];
      backgroundApiCallStart = true;
      articleArr = this.getItemId(this.props.data[this.props.tid]);

      let site = 'arabian_business';
      if (articleArr.length > 0) {
        articleArr.filter(function (itemId) {
          I18nManager.isRTL ? ArticleDisplayOnBackgroundReq(
            `${itemId}`,
            this.onBackgroundSuccess
          ) :
          ArticleDisplayOnBackgroundReq(
            `${itemId}~${site}`,
            this.onBackgroundSuccess
          );
        });
      }
    }
  }

  onItemPress = (nid: number, site: string, item: any) => {
    const {screenProps, user} = this.props;
    const userId = user.id;

    if (item.content_type === 'video') {
      item.video
        ? Platform.OS === 'android'
          ? getCurrentUserToken().then((token: string) => {
              NativeModules.BlueConic.setBlueconic(
                item.nid.toString(),
                item.site,
                userId.toString(),
                token,
                item.link
              );
            })
          : getArticleBackgroundData( item.nid).then((response) => {
            if (response) {
              backgroundData = response;
              screenProps.navigation.navigate('ArticleDisplayHomeScreen', {
                nid: item.nid,
                site: item.site,
                refreshKey: Math.random(),
                backgroundData
              });
            }
          })
        : screenProps.navigation.navigate('ArticleDisplayHomeScreen', {
            video: item.video,
            nid: item.nid,
            site: item.site,
          });

    } else if (item.content_type === 'gallery') {
      screenProps.navigation.navigate('GalleryHomeScreen', {nid, site});
    } else {
    // alert(JSON.stringify(item));
     let articlId = nid > 0 ? nid : item.contentID > 0 ?  item.contentID : 0;


      getArticleBackgroundData(articlId)
        .then((response) => {
          if (response) {
            backgroundData = response;


            screenProps.navigation.navigate('ArticleDisplayHomeScreen', {
              nid:articlId,
              site,
              backgroundData,
            });
          } else {
            backgroundData = null;
            screenProps.navigation.navigate('ArticleDisplayHomeScreen', {
              nid:articlId,
              site,
              backgroundData,
            });
          }
        })
        .catch((error) => console.log('error in asyc', error));
    }
  };

  onPodcastPress = (item: any) => {
    const {screenProps} = this.props;
    screenProps.navigation.navigate('ChaptorPodcastScreen', {
      id: item.nid,
      brand: item.site,
      brand_key: item.site,
      logo: '',
      item,
    });
  };

  onRefresh = () => {
    this.setState({
      refresh: true,
    });
    this.fetchArticles();
  };

  onFollow = (isFollow, brand: string) => {
    const {user} = this.props;
    const alreadySelected = new Set(user.brands.split('|'));
    if (!isFollow && alreadySelected.has(brand)) {
      alreadySelected.delete(brand);
    }
    if (isFollow && !alreadySelected.has(brand)) {
      alreadySelected.add(brand);
    }
    BrandsPreferenceAPI(
      user.id,
      Array.from(alreadySelected).join('|'),
      this.onSuccess,
      this.onFailure,
      this.onError
    );
  };

  onFollowSuccess = (response: any) => {
    console.log('response in follow', response);
  };

  onSuccess = (response: any, selectedBrands: string) => {
    const {setUserBrandAction} = this.props;
    setUserBrandAction(selectedBrands);
  };

  onFailure = (response: any) => {
    console.log('OnFailure of Preference Brands: ', response);
  };

  onError = (error: any) => {
    console.log('OnError of Preference Brands: ', error);
  };

  onManageBookmark = (nId: string, siteKey: string, isBookMark: boolean) => {
    console.log('bookmark in list', isBookMark);
    const {user, data, tid, updateMyTroveAction} = this.props;
    try {
      const newData = data[tid].map((obj) => ({
        ...obj,
        data: obj.data.map((subObj: any) => {
          if (Array.isArray(subObj)) {
            return subObj.map((arrObj) => ({
              ...arrObj,
              bookmark:
                arrObj.nid == nId && arrObj.site == siteKey
                  ? !arrObj.bookmark
                  : arrObj.bookmark,
            }));
          }
          return {
            ...subObj,
            bookmark:
              subObj.nid == nId && subObj.site == siteKey
                ? !subObj.bookmark
                : subObj.bookmark,
          };
        }),
      }));
      updateMyTroveAction(tid, newData);
      ManageBoookmarkApi(user.id, nId, siteKey, isBookMark);
    } catch (error) {
      console.log('add bookamrk ', error);
    }
  };

  onEndReached = () => {
    const {tid, user, brandKey, type} = this.props; //NTODO
    const {pageNumber} = this.state;
    // if (this.state.loading === false) {
    const updated = pageNumber + 1;
    if (user) {
      console.log('end reached');

      this.setState({pageNumber: updated, loading: false});
      if (type === 'brand') {
        console.log('brand onEndReached called----------');
        BrandPageApi(
          brandKey || 'ahl_en',
          updated,
          this.onFetchUpdateSuccess,
          this.onFetchUpdateFailure,
          this.onFetchUpdateError
        );
      } else if (tid != 0) {
        console.log('onEndReached called----------');
        TopicsArticleApi(
          tid,
          user.id,
          updated,
          null,
          this.onFetchUpdateSuccess,
          this.onFetchUpdateFailure,
          this.onFetchUpdateError
        );
      } else {
        console.log('home onEndReached called----------');
        MyTroveApi(
          user.topics,
          user.brands,
          user.id,
          updated,
          null,
          this.onFetchUpdateSuccess,
          this.onFetchUpdateFailure,
          this.onFetchUpdateError
        );
      }
    }
  };

  onFetchUpdateSuccess = (data: any) => {
    const {setPaginationMyTroveAction, tid, type} = this.props;
    console.log('pagination');

    this.setState({
      loading: false,
      refresh: false,
      message: Constants.emptyMessages.noRecord,
    });
    setPaginationMyTroveAction(tid, data, type);
  };

  onFetchUpdateFailure = () => {
    console.log('pag fail');

    this.setState({
      loading: false,
      refresh: false,
      message: Constants.errorMessages.general,
    });
  };

  onFetchUpdateError = (error: any) => {
    let message = Constants.errorMessages.general;
    if (error.toString().includes(Constants.errorMessages.checkNetwork)) {
      message = Constants.errorMessages.network;
    }
    console.log('page error');

    this.setState({loading: false, refresh: false, message});
  };

  onPressBrand = (site, brandLogo) => {
    const {screenProps} = this.props;
    screenProps.navigation.navigate('BrandsPage', {
      brand: site,
      brandLogo,
    });
  };

  render() {
    const {loading, message, refresh} = this.state;
    const {data, tid, screenProps, user,ref} = this.props;
    const {
      onMomentumScrollBegin,
      onMomentumScrollEnd,
      onScrollEndDrag,
      scrollAnim,
      AnimatedHeaderValue,
      isFromHomePage,
    } = screenProps;
   
    return (
      <ArticleListUI
        loading={loading}
        message={message}
        refresh={refresh}
        {...this.props}
        onItemPress={this.onItemPress}
        data={data[tid] ? data[tid] : []}
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
        onManageBookmark={this.onManageBookmark}
        onPodcastPress={this.onPodcastPress}
        onFollow={this.onFollow}
        onPressBrand={this.onPressBrand}
        tid={tid}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollEndDrag={onScrollEndDrag}
        scrollAnim={scrollAnim}
        bookmarkRequired
        user={user}
        AnimatedHeaderValue={AnimatedHeaderValue}
        isFromHomePage={isFromHomePage}
        pageNumber={this.state.pageNumber}
      //  ref={ref=> ref}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.myTrove,
    user: state.user,
    isSplashScreenHide: state.isSplashScreenHide,
    menuTopics: state.menuTopics,
    HomeScreenData: state.HomeScreenData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleListContainer);
