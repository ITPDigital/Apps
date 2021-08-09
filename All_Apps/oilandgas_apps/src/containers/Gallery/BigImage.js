import React, { PureComponent } from "react";
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
import SvgUri from "react-native-svg-uri";
import { bindActionCreators } from "redux";
import { Actions } from "../../redux";
import Swiper from "../../lib/Swiper";
import { BigImageHeader, PodcastPlayView, shareArticle } from "../../components";
import GalleryImage from "./GalleryImage";
import { Metrics, ScalePerctFullHeight, ScalePerctFullWidth, Colors, Images } from "../../asset";
import { Analytics, Screen } from "../../Analytics";
import Icon from "../../asset/fonts/icons";

const share = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="5px" height="17px" viewBox="0 0 14 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
       <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="UI-KIT" transform="translate(-1040.000000, -4889.000000)" stroke="#85888B" stroke-width="1.35">
            <g id="Share" transform="translate(1041.000000, 4890.000000)">
                <g id="share">
                    <path d="M0,7.5 L0,13.5 C0,14.3284271 0.681596351,15 1.52238806,15 L10.6567164,15 C11.4975081,15 12.1791045,14.3284271 12.1791045,13.5 L12.1791045,7.5" id="Shape"></path>
                    <polyline id="Shape" points="9.13432836 3 6.08955224 0 3.04477612 3"></polyline>
                    <path d="M6.08955224,0 L6.08955224,9.75" id="Shape"></path>
                </g>
            </g>
        </g>
    </g>
</svg>`;

type Props = {
	navigation: Function,
	flag: boolean,
};

class BigImage extends PureComponent<Props> {
	constructor() {
		super();
		this.state = {};
	}

	componentDidMount = () => {
		Analytics.setCurrentScreen("BIG_PICTURE");
	};

	handlePlay = () => {
		const { navigation } = this.props;
		return Metrics.isTablet ? this.renderTabPlayScreen() : navigation.navigate("PlayScreen");
	};

	render() {
		const { navigation, flag } = this.props;
		const data = navigation.getParam("data");
		const index = navigation.getParam("index");
		let linkdata = navigation.getParam("linkdata");
		const content = navigation.getParam("content");
		console.log("viewlink", linkdata);

		return (
			<SafeAreaView style={styles.container} pagingEnabled={false}>
				{/* <BigImageHeader
					isBottomBorder
					onBack={() => navigation.goBack()}
					title=""
					style={styles.back}
					onShare={() => {}}
					data={data}
					linkdata={linkdata}
					content={content}
				/> */}
					<View
					style={{
						backgroundColor: "black",
						flexDirection: "row",
						justifyContent: "space-between",
						width: ScalePerctFullWidth(100),
						height: ScalePerctFullHeight(10), 
						alignItems: "center",
						marginTop:20
						//padding: Metrics.DEFAULT_PADDING, 
					}}
				>
					<TouchableOpacity onPress={() => navigation.pop()} style={{}}>
						<Icon
							name={Images.back}
							size={14}
							color={'#fff'}
							style={styles.icon} 
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							if (data) {
								shareArticle(
									content.title,
									"image",
									content.nid,
									"gallery",
									linkdata,
									104,
									data,
								);
							}
						}}
					>
						<Icon
							style={styles.icon}
							name={Images.share}
							size={16}
							color={'#fff'}
						/>
					</TouchableOpacity>
				</View>

				<Swiper index={index} showsPagination={false}>
					{data.map((item: any, innerIndex) => {
						return <GalleryImage item={item} innerIndex={innerIndex} />;
					})}
				</Swiper>
				{flag && <PodcastPlayView onPress={this.handlePlay} />}
			</SafeAreaView>
		);
	}
}

function mapStateToProps(state) {
	return {
		flag: state.podcastPlayControl ? state.podcastPlayControl.flag : false,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
	},
	back: {
		backgroundColor: "white",
	},
	icon: {
		paddingHorizontal: Metrics.isTablet
			? ScalePerctFullWidth(2)
			: Metrics.DEFAULT_LIST_PADDING,
		alignSelf: "center",
		paddingTop: 14,
		paddingBottom: 10,
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(BigImage);
