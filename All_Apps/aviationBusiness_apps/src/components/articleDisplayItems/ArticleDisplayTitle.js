import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import Moment from "moment";
import {withNavigation} from 'react-navigation';
import {
  Colors,
  Metrics,
  ScalePerctFullWidth,
  Constants,
  ScalePerctFullHeight,
} from '../../asset';
import {Line} from '../common';
import moment from 'moment';

class ArticleDisplaytitle extends PureComponent<Props> {
  onItemPress = (authorName: string, authorId: number, site: string) => {
    const {navigation, data} = this.props;
    data.author && navigation.navigate('Author', {authorName, authorId, site});
  };

  renderTitle = (title: string) => {
    const {dynamicColor, font} = this.props;
    return (
      <Text
        style={[
          styles.titleText,
           { color: dynamicColor.fontColor },
          // {
          // 	fontSize:
          // 		font == "large"
          // 			? Metrics.EXTRA_LARGE_TEXT_SIZE + 4
          // 			: Metrics.EXTRA_LARGE_TEXT_SIZE,
          // },
          // {
          // 	lineHeight:
          // 		font == "large"
          // 			? Metrics.EXTRA_LARGE_LINE_HEIGHT + 4
          // 			: Metrics.EXTRA_LARGE_LINE_HEIGHT,
          // },
        ]}
      >
        {title}
      </Text>
    );
  };

  renderDate = (author, date) => {
    const {dynamicColor, font, data, site} = this.props;
    const authorName =
      data.author && data.author.und[0].name ? data.author.und[0].name : null;
    const authorId =
      data.author && data.author.und[0].id ? data.author.und[0].id : null;
    // Moment.locale("en");
    return (
      <View
        style={{
          flexDirection: 'column',
          // paddingTop: Metrics.isTablet
          // 	? ScalePerctFullHeight(1)
          // 	: ScalePerctFullWidth(4),
          marginTop: 10,
          flex: 1,
          // paddingBottom: ScalePerctFullWidth(4),
        }}
      >
        <View style={Metrics.isTablet ? styles.authorStyle : null}>
          <View
            style={
              Metrics.isTablet
                ? {paddingLeft: ScalePerctFullWidth(2.3)}
                : {flex: 1}
            }
          >
            <Text
              style={[
                styles.date,
                // { color: dynamicColor.fontColor },
                // {
                // 	fontSize:
                // 		font == "large"
                // 			? Metrics.SMALL_TEXT_SIZE + 4
                // 			: Metrics.SMALL_TEXT_SIZE,
                // },s
                // {
                // 	lineHeight:
                // 		font == "large"
                // 			? Metrics.LARGE_LINE_HEIGHT + 4
                // 			: Metrics.LARGE_LINE_HEIGHT,
                // },
              ]}
            >
              {'Updated on ' +
                moment(date, 'ddd, YYYY-MM-DD hh:mm').format('dddd') +
                ' | ' +
                moment(date, 'ddd, YYYY-MM-DD hh:mm').format('MMMM DD, YYYY') +
                ' | ' +
                moment(date, 'ddd, YYYY-MM-DD hh:mm').format('h:mm A')}
              {/* {moment(date, "ddd, YYYY-MM-DD hh:mm").format("MMM DD, YYYY, h:mm A")} */}
            </Text>
          </View>
          {author ? (
            <TouchableOpacity
              onPress={() => this.onItemPress(authorName, authorId, site)}
            >
            
                <Text
                  style={[
                    // styles.author,
                    {color: dynamicColor.fontColor},
                    {
                      fontFamily: 'BentonSans Medium',
                      fontSize: 13,
					  lineHeight: 15,
					  marginTop:10
                    },
                  ]}
                >
                  By {`${author}`}
                </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  };

  render() {
    const {dynamicColor, data} = this.props;
    const author = data.byline
      ? data.byline
      : !data.author
      ? null
      : data.author && data.author.und[0] && data.author.und[0].name;
    const title = data.title ? data.title : null;
    const date = data.published_date ? data.published_date : data.created_date;
    const articleTemplate = data.article_template;
    return (
      <View
        style={[
          styles.container,
          {backgroundColor: dynamicColor.bgColor},
          {color: dynamicColor.fontColor},
        ]}
      >
        {this.renderTitle(title)}
        {this.renderDate(author, date)}
        {articleTemplate && articleTemplate === '3' ? (
          <View />
        ) : (
			<View style={{marginBottom:20}}>
				</View>
        //   <Line style={styles.lineSeperator} />
        )}
      </View>
    );
  }
}
export default withNavigation(ArticleDisplaytitle);

const tabStyles = StyleSheet.create({
  authorStyle: {flex: 1, flexDirection: 'row'},
  container: {
    alignItems: 'flex-start',
    flex: 1,
    paddingTop: ScalePerctFullHeight(4),
    paddingBottom: ScalePerctFullHeight(4),
    paddingHorizontal: Metrics.DEFAULT_PADDING,
  },
  titleText: {
    fontSize: Metrics.EXTRA_LARGE_TEXT_SIZE,
    lineHeight: Metrics.EXTRA_LARGE_LINE_HEIGHT,
    fontFamily: 'BentonSans Regular',
  },
  lineSeperator: {
    width: ScalePerctFullWidth(90),
    height: 1,
    paddingBottom: Metrics.DEFAULT_PADDING,
    paddingTop: 0,
    borderBottomWidth: 2,
    borderColor: Colors.linePrimaryFull,
    paddingHorizontal: Metrics.DEFAULT_PADDING,
  },
  // author: {
  // 	fontSize: Metrics.SMALL_TEXT_SIZE,
  // 	lineHeight: Metrics.LARGE_LINE_HEIGHT,
  // 	fontFamily: "BentonSans Bold",
  // },
  date: {
    // paddingLeft: Metrics.DEFAULT_PADDING,
    fontSize: Metrics.SMALL_TEXT_SIZE,
    lineHeight: Metrics.LARGE_LINE_HEIGHT,
    fontFamily: 'BentonSans Regular',
  },
  dot: {
    paddingLeft: Metrics.DEFAULT_PADDING,
    paddingRight: Metrics.DEFAULT_PADDING,
    paddingTop: 3,
  },
});

const mobileStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
    flex: 1,
    paddingTop: Metrics.DEFAULT_LIST_PADDING,
    paddingHorizontal: Metrics.DEFAULT_LIST_PADDING,
  },
  titleText: {
    // fontSize: Metrics.EXTRA_LARGE_TEXT_SIZE,
    // lineHeight: Metrics.EXTRA_LARGE_LINE_HEIGHT,
    fontFamily: 'BentonSans Bold',
    lineHeight: 28,
    fontSize: 20,
    color: '#000000',
    //  borderColor:"red",
    //  borderWidth:1
  },
  lineSeperator: {
    width: ScalePerctFullWidth(90),
    height: 1,
    paddingBottom: Metrics.DEFAULT_PADDING,
    paddingTop: 0,
    borderBottomWidth: 2,
    borderColor: Colors.linePrimaryFull,
    paddingHorizontal: Metrics.DEFAULT_PADDING,
  },
  date: {
    // paddingLeft: Metrics.DEFAULT_PADDING,
    fontSize: 13,
    lineHeight: 15,
    fontFamily: 'BentonSans Regular',
    color: '#999999',
  },
  dot: {
    paddingLeft: Metrics.DEFAULT_PADDING,
    paddingRight: Metrics.DEFAULT_PADDING,
    paddingTop: 3,
  },
});

const styles = Metrics.isTablet ? tabStyles : mobileStyles;
