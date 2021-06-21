import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Metrics, ScalePerctFullWidth, Colors} from '../../asset';
import {Line} from '../common';

export default class ArticleLeadText extends PureComponent<> {
  render() {
    const {dynamicColor, data, font} = this.props;
    const leadText = data.lead_text ? data.lead_text : null;
    return (
      <View style={styles.container}>
        <Text
          style={[
            styles.text,
             { color: dynamicColor.fontColor },
            // {
            // 	fontSize:
            // 		font === "large"
            // 			? Metrics.EXTRA_MEDIUM_TEXT + 4
            // 			: Metrics.EXTRA_MEDIUM_TEXT,
            // },
            // {
            // 	lineHeight:
            // 		font === "large"
            // 			? Metrics.LARGE_LINE_HEIGHT + 4
            // 			: Metrics.LARGE_LINE_HEIGHT,
            // },
          ]}
        >
          {leadText}
        </Text>
        {/* <Line style={styles.lineSeperator} /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontFamily: 'BentonSans Medium',
    lineHeight: 21,
	paddingBottom: 20,
	color: '#000000'
    //paddingVertical: ScalePerctFullWidth(4),
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
  container: {
    //padding: ScalePerctFullWidth(4),
	//width: ScalePerctFullWidth(100),
	flex:1,
    marginHorizontal: 16,
  },
});
