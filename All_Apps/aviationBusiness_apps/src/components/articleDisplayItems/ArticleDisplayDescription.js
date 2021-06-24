

import React, { PureComponent } from "react";
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	Linking,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import AutoHeightWebView from "react-native-autoheight-webview";
import HTML from "react-native-render-html";
import { withNavigation } from "react-navigation";
import { Colors, Metrics, ScalePerctFullHeight, ScalePerctFullWidth } from "../../asset";
import { Line } from "../common";

class ArticleDisplayDescription extends PureComponent {
	state = {
		key: 1,
		showLoader: true,
		data: [],
	};

	componentDidMount = () => {
		const { data } = this.props;
		const body = data && data.body;
		const splitedArray = data && data.body ? body.split("[node:media_embed_") : null;
		const arr = [];
		splitedArray &&
			splitedArray.map((item, index) => {
				if (index !== 0) {
					const secondSplit = item.split("]");
					arr.push(secondSplit[0]);
					arr.push(secondSplit[1]);
				} else {
					arr.push(item);
				}
			});

		this.setState({
			data: arr,
		});
	};

	onItemPress = () => {
		const { navigation, data, userId, sitekey, commentBanned } = this.props;
		navigation.navigate("Comments", { data, userId, sitekey, commentBanned });
	};

	renderLoading = () => {
		const { dynamicColor } = this.props;
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "flex-start",
					alignItems: "center",
					backgroundColor: dynamicColor.bgColor,
				}}
			>
				<ActivityIndicator size="large" color="#000" />
			</View>
		);
	};

	hideSpinner = () => {
		this.setState({
			showLoader: false,
		});
	};

	renderArticleDetails = (item, index) => {
		const { data, dynamicColor, font, sitekey } = this.props;

		const fontSize =
			font === "large" ? Metrics.EXTRA_MEDIUM_TEXT_SIZE + 4 : Metrics.EXTRA_MEDIUM_TEXT_SIZE;

		const styleScript = `function myStyle() {
			document.body.style.color = '${dynamicColor.fontColor}';
			document.body.style.fontSize = '${fontSize}px';
			document.body.style.backgroundColor = '${dynamicColor.bgColor}';
		};myStyle(); 
		document.addEventListener("message", function(data) {
						myStyle(); 
		  });`;

		if (index % 2 === 0) {
			console.log("dataimg", data);
			var class_style = {};
			class_style = data && data.classstyle;
			var body_style = data && data.tagstyle;
			body_style.p = {
				...body_style.p,
				alignItems: "center",
				color: dynamicColor.fontColor,
				fontFamily: "BentonSans Regular",
				fontSize:
					font == "large"
						? Metrics.EXTRA_MEDIUM_TEXT_SIZE + 4
						: Metrics.EXTRA_MEDIUM_TEXT_SIZE,
				lineHeight:
					font == "large"
						? Metrics.EXTRA_LARGE_LINE_HEIGHT + 4
						: Metrics.EXTRA_LARGE_LINE_HEIGHT,
			};
			console.log("body_style:", body_style);
			console.log("class_style:", class_style);
			console.log("item of html:", item);

			return (
				<HTML
					html={item}
					tagsStyles={body_style}
					classesStyles={class_style}
					onLinkPress={(evt, href) => {
						Linking.openURL(href);
					}}
				/>
			);
		}
		// const url = `http://trove.itp.com/embed-data/${
		// 	data.nid
		// }~${sitekey}/[node:media_embed_${item}]`;
		const url = `http://trove.itp.com/embed-data/${
			data.nid
		}~${'arabian_business'}/[node:media_embed_${item}]`;
		console.log("url----", url, sitekey);
		return (
			<View style={{ overflow: "hidden" }}>
				<AutoHeightWebView
					style={{
						width: Dimensions.get("screen").width,
						backgroundColor: dynamicColor.bgColor,
					}}
					startInLoadingState
					renderLoading={() => (
						<View
							style={{
								flex: 1,
								justifyContent: "flex-start",
								alignItems: "center",
								backgroundColor: dynamicColor.bgColor,
							}}
						>
							<ActivityIndicator size="large" color="#000" />
						</View>
					)}
					onLoadEnd={() => this.setState({ showLoader: false })}
					customScript={styleScript}
					customStyle={{}}
					onSizeUpdated={size => console.log(size.height)}
					source={{ uri: url }}
					onNavigationStateChange={(event: any) => {
						if (event.url.indexOf("trove.itp.com") === -1) {
							Linking.openURL(event.url);
							console.log("event.url", event.url);
						}
					}}
				/>
			</View>
		);
	};

	componentWillReceiveProps = (nextProps: any) => {
		if (
			(nextProps.dynamicColor &&
				this.props.dynamicColor &&
				nextProps.dynamicColor.bgColor !== this.props.dynamicColor.bgColor) ||
			(nextProps.dynamicColor && this.props.font && nextProps.font !== this.props.font)
		) {
			this.resetWebView();
		}
	};

	resetWebView = () => {
		this.setState({
			// eslint-disable-next-line react/no-access-state-in-setstate
			key: this.state.key + 1,
		});
	};

	renderFunction = () => {
		const { data } = this.state;
		const { dynamicColor } = this.props;

		return (
			<FlatList
				data={data}
				style={{ backgroundColor: dynamicColor.bgColor }}
				extraData={this.state.key}
				keyExtractor={(x, i) => i.toString()}
				initialNumToRender={15}
				renderItem={({ item, index }) => this.renderArticleDetails(item, index)}
			/>
		);
	};

	render() {
		const { dynamicColor } = this.props;
		return (
			<ScrollView style={[styles.container, { backgroundColor: dynamicColor.bgColor }]}>
				{/* {this.state.showLoader && this.state.data.length > 1 ? this.renderLoading() : null} */}
				{this.renderFunction()}
				<Line style={styles.lineSeperator2} />
				{/* <View style={{ backgroundColor: dynamicColor.bgColor }}>
					<Line style={styles.lineSeperator} />
					<TouchableOpacity style={styles.openion} onPress={() => this.onItemPress()}>
						<Text
							style={StyleSheet.flatten([
								styles.openionText,
								{ backgroundColor: dynamicColor.bgColor },
								{ color: dynamicColor.fontColor },
							])}
						>
							Add your opinion
						</Text>
					</TouchableOpacity>
					<Line style={styles.lineSeperator} />
				</View> */}
			</ScrollView>
		);
	}
}

export default withNavigation(ArticleDisplayDescription);

const phoneStyle = StyleSheet.create({
	container: {
		padding: Metrics.DEFAULT_PADDING,
		paddingHorizontal: Metrics.DEFAULT_PADDING,
	},
	lineSeperator: {
		width: ScalePerctFullWidth(90),
		height: 1,
		paddingBottom: Metrics.DEFAULT_PADDING,
		paddingTop: 0,
		borderBottomWidth: 1,
		borderColor: Colors.linePrimary,
		marginBottom: 10,
		marginTop: 0,
		paddingHorizontal: Metrics.DEFAULT_PADDING,
	},
	lineSeperator2: {
		width: ScalePerctFullWidth(90),
		height: 1,
		// paddingBottom: Metrics.DEFAULT_PADDING,
		paddingTop: 0,
		borderBottomWidth: 1,
		borderColor: Colors.linePrimary,
		marginTop: 16,
		paddingHorizontal: Metrics.DEFAULT_PADDING,
	},
	openion: {
		alignItems: "center",
		justifyContent: "center",
	},
	openionText: {
		fontSize: Metrics.MEDIUM_TEXT_SIZE,
		lineHeight: Metrics.SMALL_LINE_HEIGHT,
		fontFamily: "BentonSans Bold",
	},
});

const tabStyles = StyleSheet.create({
	container: {
		paddingVertical: ScalePerctFullHeight(2),
		paddingHorizontal: Metrics.DEFAULT_PADDING,
	},
	lineSeperator: {
		width: ScalePerctFullWidth(90),
		height: 1,
		paddingTop: 0,
		borderBottomWidth: 1,
		borderColor: Colors.linePrimary,
		marginTop: 0,
		paddingHorizontal: Metrics.DEFAULT_PADDING,
	},
	openion: {
		alignItems: "center",
		justifyContent: "center",
	},
	openionText: {
		fontSize: Metrics.SMALL_TEXT_SIZE,
		lineHeight: Metrics.SMALL_LINE_HEIGHT,
		paddingTop: 20,
		paddingBottom: 20,
		fontWeight: "bold",
		fontFamily: "BentonSans Bold",
	},
});

const styles = Metrics.isTablet ? tabStyles : phoneStyle;

