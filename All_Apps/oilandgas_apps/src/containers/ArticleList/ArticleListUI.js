import React from 'react';
import {
  StyleSheet,
  View,
  Animated,
  SectionList,
  Text,
  TouchableOpacity,
  I18nManager
} from 'react-native';
import {
  Article,
  ArticleEditorial,
  ArticlePodcast,
  ArticleVideo,
  ListLoading,
  WorthWatching,
} from '../../components';
import {TemplateConfig, Metrics, Constants, Colors} from '../../asset';
import TextTicker from 'react-native-text-ticker';
import {
	setTopicId,
	setTopicName,
  } from '../../storage/AsyncStore';
type Props = {
  data: any,
  loading: boolean,
  refresh: boolean,
};

const renderItem = (
  item,
  user,
  index,
  section,
  onItemPress,
  onPodcastPress,
  onManageBookmark,
  onFollow,
  onPressBrand,
  bookmarkRequired,
  tid,
  isFromHomePage,
  headerSectionIndex,
  screenProps
) => {
  let itemLength = section.data ? section.data.length : 0;
  if (section.title === Constants.articleListSections.editorial) {
    console.log('land 123 ArticleEditorial');
    itemLength++;
    return (
      <ArticleEditorial
        onPress={onItemPress}
        onPressBookmark={onManageBookmark}
        key={index.toString()}
        order={TemplateConfig.articleTemplates[item.template || 2]}
        settings={TemplateConfig.articleTemplateSettings[item.template || 2]}
        data={item}
      />
    );
  }
  if (section.title === Constants.articleListSections.podcast) {
    itemLength++;

    return (
      <ArticlePodcast
        onPress={onPodcastPress}
        onPressBookmark={() =>
          onManageBookmark(item.nid, item.site, item.bookmark)
        }
        key={index.toString()}
        order={TemplateConfig.articleTemplates[item.template || 2]}
        settings={TemplateConfig.articleTemplateSettings[item.template || 2]}
        data={item}
        user={user}
      />
    );
  }
  if (section.title === Constants.articleListSections.WorthFollowing) {
    console.log('land 123 WorthWatching');
    itemLength++;

    return <WorthWatching />;
  }
  if (section.title === Constants.articleListSections.videos) {
    console.log('land 123 ArticleVideo');
    console.log(
      'land 123 Article but with type ArticleVideo' +
        item.template +
        ',item:   ' +
        JSON.stringify(item)
    );
    itemLength++;

    return (
      <ArticleVideo
        onPress={onItemPress}
        onPressBookmark={() =>
          onManageBookmark(item.nid, item.site, item.bookmark)
        }
        key={index.toString()}
        order={TemplateConfig.articleTemplates[item.template || 2]}
        settings={TemplateConfig.articleTemplateSettings[item.template || 2]}
        data={item}
        user={user}
        isFromHomePage={isFromHomePage}
      />
    );
  }
  if (item.content_type === 'video') {
    console.log(
      'land 123 Article but with type video' +
        item.template +
        ',item:   ' +
        JSON.stringify(item)
    );
    itemLength++;

    if (
      section.title != 'Trending stories' ||
      section.title != 'Industries' ||
      section.title != 'Opinion' ||
      section.title != 'Lifestyle' ||
      section.title != 'Startup' ||
      section.title != 'CEO'
    ) {
      return (
        <Article
          onPress={() => onItemPress(item.nid, item.site, item)}
          onPressBookmark={() =>
            onManageBookmark(item.nid, item.site, item.bookmark)
          }
          key={index.toString()}
          order={TemplateConfig.articleTemplates[13]}
          settings={TemplateConfig.articleTemplateSettings[13]}
          data={item}
          onFollow={onFollow}
          onPressBrand={onPressBrand}
          bookmarkRequired={bookmarkRequired}
          user={user}
          articleIndex={tid.toString()}
          isFromHomePage={isFromHomePage}
          headerSectionIndex={headerSectionIndex}
          screenProps={screenProps}
          dataLength={itemLength}
          masterIndex={index}
        />
      );
    }

    return (
      <Article
        onPress={() => onItemPress(item.nid, item.site, item)}
        onPressBookmark={() =>
          onManageBookmark(item.nid, item.site, item.bookmark)
        }
        key={index.toString()}
        order={TemplateConfig.articleTemplates[16]}
        settings={TemplateConfig.articleTemplateSettings[15]}
        data={item}
        onFollow={onFollow}
        onPressBrand={onPressBrand}
        bookmarkRequired={bookmarkRequired}
        user={user}
        articleIndex={tid.toString()}
        isFromHomePage={isFromHomePage}
        headerSectionIndex={headerSectionIndex}
        isVideo={true}
        screenProps={screenProps}
        dataLength={itemLength}
        masterIndex={index}
      />
    );
  }
  if (item.content_type === 'gallery') {
    console.log('item.template: ' + item.template);
    console.log(
      'land 123 Article but with type gallery before' +
        JSON.stringify(itemLength)
    );
    itemLength = itemLength + 1;
    console.log(
      'land 123 Article but with type gallery after' +
        JSON.stringify(itemLength)
    );
    return (
      <Article
        onPress={() => onItemPress(item.nid, item.site, item)}
        onPressBookmark={() =>
          onManageBookmark(item.nid, item.site, item.bookmark)
        }
        key={index.toString()}
        order={TemplateConfig.galleryTemplate[item.template || 1]}
        settings={
          TemplateConfig.galleryTemplateSettings[
            item.template <= 2 ? item.template : 1
          ]
        }
        data={item}
        onFollow={onFollow}
        onPressBrand={onPressBrand}
        bookmarkRequired={bookmarkRequired}
        user={user}
        articleIndex={tid.toString()}
        isFromHomePage={isFromHomePage}
        headerSectionIndex={headerSectionIndex}
        screenProps={screenProps}
        dataLength={itemLength}
        masterIndex={index}
      />
    );
  }

  if (section.title === 'Trending stories') {
    console.log('Trending stories: ' + JSON.stringify(item));
    itemLength++;

    return (
      <Article
        onPress={() => onItemPress(item.nid, item.site, item)}
        onPressBookmark={() =>
          onManageBookmark(item.nid, item.site, item.bookmark)
        }
        key={index.toString()}
        order={TemplateConfig.articleTemplates[16]}
        settings={TemplateConfig.articleTemplateSettings[15]}
        data={item}
        user={user}
        onFollow={onFollow}
        onPressBrand={onPressBrand}
        bookmarkRequired={bookmarkRequired}
        articleIndex={tid.toString()}
        isFromHomePage={isFromHomePage}
        headerSectionIndex={headerSectionIndex}
        screenProps={screenProps}
        dataLength={itemLength}
        masterIndex={index}
      />
    );
  }
  if (section.title === 'Most read stories') {
    itemLength++;

    return (
      <Article
        onPress={() => onItemPress(item.nid, item.site, item)}
        onPressBookmark={() =>
          onManageBookmark(item.nid, item.site, item.bookmark)
        }
        key={index.toString()}
        order={TemplateConfig.articleTemplates[17]}
        settings={{}}
        data={item}
        user={user}
        onFollow={onFollow}
        onPressBrand={onPressBrand}
        bookmarkRequired={bookmarkRequired}
        articleIndex={tid.toString()}
        isFromHomePage={isFromHomePage}
        headerSectionIndex={headerSectionIndex}
        screenProps={screenProps}
        dataLength={itemLength}
        masterIndex={index}
        isTopSories={section.isTopSories}
      />
    );
  }
  console.log(
    'index:' +
      index +
      'section title: ' +
      JSON.stringify(section.marquee) +
      ' ,item: ' +
      JSON.stringify(item)
  );

  let template = item.template || null;

  return (
    <Article
      onPress={() => onItemPress(item.nid, item.site, item)}
      onPressBookmark={() =>
        onManageBookmark(item.nid, item.site, item.bookmark)
      }
      key={index.toString()}
      order={
        TemplateConfig.articleTemplates[
          index == 0 && (template == null || template == 2) ? 1 : template || 2
        ]
      }
      settings={
        TemplateConfig.articleTemplateSettings[
          index == 0 && (!template || template == 2) ? 1 : template || 2
        ]
      }
      data={item}
      user={user}
      onFollow={onFollow}
      onPressBrand={onPressBrand}
      bookmarkRequired={bookmarkRequired}
      articleIndex={tid.toString()}
      isFromHomePage={isFromHomePage}
      headerSectionIndex={headerSectionIndex}
      marqueeList={index == 0 ? section.marquee : null}
      screenProps={screenProps}
      dataLength={itemLength}
      masterIndex={index}
    />
  );

  return null;
};

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

export default function ArticleListUI(props: Props) {
  const {
    data,
    onItemPress,
    onPodcastPress,
    onManageBookmark,
    loading,
    refresh,
    onRefresh,
    onEndReached,
    user,
    onFollow,
    onPressBrand,
    tid,
    onMomentumScrollBegin,
    onMomentumScrollEnd,
    onScrollEndDrag,
    scrollAnim,
    bookmarkRequired,
    getScrollY,
    AnimatedHeaderValue,
    isFromHomePage,
    pageNumber,
    screenProps,
  } = props;
  let headerSectionIndex = 0;
  console.log('Articlelistui123: ' + JSON.stringify(data));

  return (
    // <View style={{flex:1,justifyContent:"flex-start",flexDirection:"row",backgroundColor:"green"}}>

    <SectionList
    // refreshControl={
				// 	<RefreshControl
				// 		refreshing={this.state.loading === true}
				// 		onRefresh={() => this.refreshTab()}
				// 	/>
				// }
      sections={data}
      key={tid.toString()}
      listKey={tid.toString()}
      keyExtractor={(x, i) => i.toString()}
      stickySectionHeadersEnabled={false}
      // onEndReachedThreshold={50}
      onEndReached={() => onEndReached()}
      onRefresh={() => onRefresh()}
      refreshing={refresh}
      removeClippedSubviews
      initialNumToRender={6}
      maxToRenderPerBatch={2}
      //   contentContainerStyle={{paddingTop: 34}}
      onScroll={Animated.event([
        {nativeEvent: {contentOffset: {y: AnimatedHeaderValue}}},
      ])}
      scrollEventThrottle={16}
      ListFooterComponent={() => (
        <ListLoading loading={loading} refresh={refresh} />
      )}
      renderItem={({item, index, section}) => {
        console.log(
          'section index: ' +
            index +
            ' section title: ' +
            section.title +
            'this.state.pageNumber: ' +
            pageNumber +
            ',item.title' +
            JSON.stringify(section.data.length)
        );
        return (
          <View style={{flex: 1, justifyContent: 'center'}}>
            {renderItem(
              item,
              user,
              index,
              section,
              onItemPress,
              onPodcastPress,
              onManageBookmark,
              onFollow,
              onPressBrand,
              bookmarkRequired,
              tid.toString(),
              isFromHomePage,
              headerSectionIndex,
              screenProps
            )}
            {section.title == 'CEO' && index == 4 ? (
              <View
                style={{
                  height: 60,
                  borderTopWidth: 1,
                  borderColor: '#E6E6E6',
                  flex: 1,
                  borderBottomWidth: 1,
                  justifyContent: 'center',
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    //alert('will land on list');
                    screenProps.navigation.navigate('HistoryDrawerScreen');
			                  setTopicId(37);
			                  setTopicName(section.title); 
                  }}
                >
                  <Text
                    style={{
                      // marginVertical: 12,
                      color: '#EB4960',
                      fontSize: 14,
                      fontFamily: 'BentonSans Medium',
                      lineHeight: 17,
                      textAlign: 'center',
                      alignSelf: 'center',
                      alignItems: 'center',
                      alignContent: 'center',
                    }}
                  >
                    MORE FROM CEO
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        );
      }}
      renderSectionHeader={({section}) => {
        let title = section.title;
        headerSectionIndex = data.indexOf(section);
        if (isFromHomePage) {
          if (
            title !== Constants.articleListSections.empty &&
            title !== Constants.articleListSections.WorthFollowing &&
            title !== Constants.articleListSections.videos &&
            title !== 'Marquee'
          ) {
            return (
              <View style={{flex: 1}}>
                {section.isReadMore && section.previousTitle ? (
                  <View
                    style={{
                      height: 60,
                      borderTopWidth: 1,
                      borderColor:
                        section.previousTitle == 'Videos'
                          ? 'rgba(52, 52, 52, 0.9)'
                          : '#E6E6E6',
                      flex: 1,
                      borderBottomWidth: 1,
                      justifyContent: 'center',
                      marginTop: section.previousTitle != 'Videos' ? 20 : 0,
                      backgroundColor:
                        section.previousTitle != 'Videos' ? 'white' : '#000000',
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        screenProps.navigation.navigate('HistoryDrawerScreen');
			                  setTopicId(section.tagId);
			                  setTopicName(section.previousTitle);                       
                      }}
                    >
                      {I18nManager.isRTL ? <Text
                        style={{
                          color:
                            section.previousTitle != 'Videos'
                              ? '#EB4960'
                              : 'white',
                          fontSize: 14,
                          fontFamily: 'BentonSans Medium',
                          lineHeight: 17,
                          textAlign: 'center',
                          alignSelf: 'center',
                          alignItems: 'center',
                          alignContent: 'center',
                        }}
                      >
                         اكثر من {' '}
                        {section.previousTitle
                          ? section.previousTitle.toUpperCase()
                          : 'THIS SECTION'}
                      </Text> : <Text
                        style={{
                          color:
                            section.previousTitle != 'Videos'
                              ? '#EB4960'
                              : 'white',
                          fontSize: 14,
                          fontFamily: 'BentonSans Medium',
                          lineHeight: 17,
                          textAlign: 'center',
                          alignSelf: 'center',
                          alignItems: 'center',
                          alignContent: 'center',
                        }}
                      >
                         MORE FROM{' '}
                        {section.previousTitle
                          ? section.previousTitle.toUpperCase()
                          : 'THIS SECTION'}
                      </Text>
                    } 
                      
                    </TouchableOpacity>
                  </View>
                ) : <View style={{ paddingTop: 20}}></View>}
                <View
                  style={{height: 20, backgroundColor: '#F8F8F8', flex: 1}}
                ></View>
                <View style={{backgroundColor: '#FFFFFF', flex: 1,marginTop: section.isTopSories == undefined || section.isTopSories ? 0: 30}}>
                  <Text
                    style={{
                      paddingTop: 20,
                      marginHorizontal: 16,
                      paddingBottom: 0,
                      fontFamily: 'BentonSans Bold',
                      color: '#000000',
                      lineHeight: 22,
                      fontSize: 18,
                    }}
                  >
                    {title}
                  </Text>
                </View>
              </View>
            );
          } else if (title === Constants.articleListSections.videos) {
            return (
              <View style={{flex: 1}}>
                <View
                  style={{height: 20, backgroundColor: '#F8F8F8', flex: 1}}
                ></View>
                <View style={{backgroundColor: '#000000', flex: 1}}>
                  <Text
                    style={{
                      paddingTop: 20,
                      marginHorizontal: 16,
                      paddingBottom: 0,
                      fontFamily: 'BentonSans Bold',
                      color: '#FFFFFF',
                      lineHeight: 22,
                      fontSize: 18,
                    }}
                  >
                    {title}
                  </Text>
                </View>
              </View>
            );
          }
        } else {
          if (
            title !== Constants.articleListSections.empty &&
            title !== Constants.articleListSections.WorthFollowing &&
            title !== 'Marquee'
          ) {
            return <Text style={styles.sectionHeader}>{title}</Text>;
          }
        }

        return null;
      }}
    />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    paddingTop: 30,
    marginHorizontal: 20,
    paddingBottom: 0,
    fontFamily: 'BentonSans Bold',
    color: Colors.bgSecondaryVarient,
    fontSize: Metrics.SMALL_TEXT_SIZE,
  },
});
