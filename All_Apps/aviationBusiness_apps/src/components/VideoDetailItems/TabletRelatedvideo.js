import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { View, Image, Text, StyleSheet, TouchableOpacity, TouchableHighlight } from "react-native";
import SvgUri from "react-native-svg-uri";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import { withNavigation } from "react-navigation";
import Icon from "../../asset/fonts/icons";
import VideoComments from "./VideoComments";
import { Colors, Metrics, ScalePerctFullWidth, Images, ScalePerctFullHeight } from "../../asset";
import { shareArticle } from "../common";
import { ManageBoookmarkApi } from "../../service";

type props = {
	data: string,
};

const unBookMark = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="14px" height="17px" viewBox="0 0 14 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12.5920397,15.6848738 L6.79601985,11.6057422 L1,15.6848738 L1,2.63165265 C1,1.73051577 1.74141899,1 2.65600567,1 L10.936034,1 C11.8506207,1 12.5920397,1.73051577 12.5920397,2.63165265 L12.5920397,15.6848738 Z" id="Bookmark" stroke="#85888B" stroke-width="1.5"></path>
    </g>
</svg>`;

const share = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="17px" height="21px" viewBox="0 0 17 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
     <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="UI-KIT" transform="translate(-1886.000000, -4864.000000)" stroke="#85888B" stroke-width="1.6335">
            <g id="Share" transform="translate(1886.972222, 4865.304498)">
                <g id="share">
                    <path d="M0,9.08304498 L0,16.349481 C0,17.3527664 0.824542252,18.16609 1.84166667,18.16609 L12.8916667,18.16609 C13.9087911,18.16609 14.7333333,17.3527664 14.7333333,16.349481 L14.7333333,9.08304498" id="Shape"></path>
                    <polyline id="Shape" points="11.05 3.63321799 7.36666667 0 3.68333333 3.63321799"></polyline>
                    <path d="M7.36666667,0 L7.36666667,11.8079585" id="Shape"></path>
                </g>
            </g>
        </g>
    </g>
</svg>`;

class TabletRelatedVideos extends PureComponent<props> {
	state = {
		VideoDetails:
			this.props.data &&
			this.props.data.video_relation &&
			this.props.data.video_relation.und,
		refreshKey: 1,
		isBookmark: false,
		SelectedBookmarks: [],
	};

	keyExtractor = (item, index) => item.id;

	onPressBrand = (site, brandLogo) => {
		this.props.navigation.navigate("BrandsPage", {
			brand: site,
			brandLogo,
		});
	};

	renderVideoItem = ({ item }) => {
		const { data, videoHandler } = this.props;

		// const { imageURL, title, videoLength } = this.props;
		const itemId = item.nid;

		const site = item.site;
		const video = item.video;
		return (
			<TouchableHighlight
				style={styles.rowFront}
				underlayColor="#FFFFFF"
				onPress={() => videoHandler(itemId, site, video)}
			>
				<View style={styles.container}>
					<View style={styles.imageContainer}>
						<Image
							style={styles.image}
							source={{
								uri: item.image,
							}}
						/>
					</View>

					<View style={styles.subContainer}>
						<Text numberOfLines={3} style={styles.videoName}>
							{item.title}
						</Text>

						{/* <Text style={styles.videoLength}>{item.videoLength}</Text> */}
					</View>

					{/* <TouchableOpacity
						onPress={() => this.onPressBrand(item.site, item.brand_logo)}
						style={styles.logoContainer}
					>
						<Image
							//source={Images.ABlogo}
							source={{ uri: item.brand_logo }}
							style={styles.logo}
							resizeMode="stretch"
							onError={this.onError}
						/>
					</TouchableOpacity> */}
				</View>
			</TouchableHighlight>
		);
	};

	renderHeader = () => {
		const { data, onBookMarkToggle, isBookmark } = this.props;
		return (
			<View style={{ flex: 1, backgroundColor: Colors.bgPrimaryDark, width: "100%" }}>
				<VideoComments
					commentsData={data}
					onBookMarkToggle={onBookMarkToggle}
					isBookmark={isBookmark}
				/>
				<View style={styles.textView}>
					<Text style={styles.text}>Related videos</Text>
				</View>
			</View>
		);
	};

	// onManageBookmark = (nId: string, siteKey: string, isBookmarked: boolean, index: number) => {
	// 	const { user } = this.props;
	// 	const { VideoDetails } = this.state;
	// 	const changes = !VideoDetails[index].bookmark;
	// 	const refresh = Math.random();
	// 	const updated = [...VideoDetails];
	// 	updated[index].bookmark = changes;
	// 	this.setState({
	// 		VideoDetails: updated,
	// 		refreshKey: refresh,
	// 	});
	// 	ManageBoookmarkApi(user.id, nId, siteKey, isBookmarked);
	// };

	closeRow = (rowMap, rowKey) => {
		console.log("close");
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
	};

	renderHiddenitem = (data: any) => {
		return (
			<View style={styles.rowBack}>
				{this.renderShare(data)}
				{this.renderBookmark(data)}
			</View>
		);
	};

	renderShare = (data: any) => {
		return (
			<TouchableOpacity
				style={[styles.backRightBtn, styles.backRightBtnLeft]}
				onPress={() => {
					if (data) {
						shareArticle(
							data.item.title,
							data.item.image,
							data.item.nid,
							data.item.content_type,
							data.item.link,
							104,
							data,
						);
					}
				}}
			>
				<SvgUri width={16} height={16} svgXmlData={share} />
			</TouchableOpacity>
		);
	};

	renderBookmark = (data: any, rowMap: any) => {
		const { isBookmark, onBookMarkToggle, onManageBookmark } = this.props;
		return (
			<TouchableOpacity
				style={[styles.backRightBtn, styles.backRightBtnRight]}
				onPress={() =>
					onManageBookmark(data.item.nid, data.item.site, data.item.bookmark, data.index)
				}
			>
				{data.item.bookmark ? (
					<Icon name={Images.selectedBookmark} size={16} color={Colors.bodyTime} />
				) : (
					<SvgUri width={16} height={16} svgXmlData={unBookMark} />
				)}
				{/* {this.closeRow(rowMap, data.item.key)} */}
			</TouchableOpacity>
		);
	};

	render() {
		const { data, RelatedVideos, refreshKey } = this.props;
		const { VideoDetails } = this.state;
		const VideoDetails1 = data;

		return (
			<SwipeListView
				useFlatList
				closeOnRowOpen
				//	closeOnRowPress
				keyExtractor={(x, i) => i.toString()}
				data={RelatedVideos}
				extraData={refreshKey}
				renderItem={this.renderVideoItem}
				ListHeaderComponent={this.renderHeader()}
				renderHiddenItem={this.renderHiddenitem}
				rightOpenValue={-180}
			/>
		);
	}
}

const styles = StyleSheet.create({
	logo: {
		height: 15,
		width: 150,
	},
	logoContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		width: ScalePerctFullWidth(13),
		//height: ScalePerctFullHeight(11),
		//right: -3,
	},
	rowFront: {
		backgroundColor: "#FFFFFF",
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullHeight(10),
		paddingLeft: ScalePerctFullWidth(4.8),
		paddingRight: ScalePerctFullWidth(4),
		borderBottomColor: "rgba(0,0,0,0.2)",
		borderBottomWidth: 1,
	},
	container: {
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullHeight(10),
		flexDirection: "row",
		flex: 1,
	},
	subContainer: {
		marginLeft: 22.5,
		width: ScalePerctFullWidth(63),
		alignItems: "flex-start",
		justifyContent: "center",
	},
	image: {
		height: ScalePerctFullHeight(6),
		width: ScalePerctFullWidth(10),
		resizeMode: "cover",
		backgroundColor: Colors.bgSecondaryLight,
	},
	imageContainer: {
		alignSelf: "center",
	},

	videoName: {
		color: Colors.textColor,
		fontSize: Metrics.SMALL_TEXT_SIZE,
		fontFamily: "BentonSans Bold",
		lineHeight: Metrics.SMALL_LINE_HEIGHT,
		paddingLeft: ScalePerctFullWidth(2.3),
		alignItems: "center",
		justifyContent: "center",
	},
	videoLength: {
		color: Colors.bgPrimaryLight,
		fontSize: Metrics.VV_SMALL_TEXT_SIZE,
		paddingTop: ScalePerctFullHeight(0.8),
	},
	menuIcon: {
		alignSelf: "center",
	},
	textView: {
		paddingLeft: ScalePerctFullWidth(5),
	},
	text: {
		fontSize: Metrics.VERY_SMALL_LINE_HEIGHT,
		paddingBottom: Metrics.DEFAULT_PADDING,
		paddingTop: 20,
		fontFamily: "BentonSans Bold",
		color: Colors.bgPrimaryLight,
	},

	rowBack: {
		alignItems: "center",
		//backgroundColor: "#FE016B",
		backgroundColor: "black",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingLeft: 15,
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullHeight(10),
	},
	backRightBtnLeft: {
		//backgroundColor: "#FE016B",
		backgroundColor: "black",
		right: 75,
	},
	backRightBtnRight: {
		//backgroundColor: "#FE016B",
		backgroundColor: "black",

		right: 0,
	},
	backRightBtn: {
		alignItems: "center",
		bottom: 0,
		justifyContent: "center",
		position: "absolute",
		top: 0,
		width: 75,
	},
});

function mapStateToProps(state) {
	return {
		//	data: state.myTrove,
		user: state.user,
		//isSplashScreenHide: state.isSplashScreenHide,
	};
}

export default connect(
	mapStateToProps,
	null,
)(withNavigation(TabletRelatedVideos));
