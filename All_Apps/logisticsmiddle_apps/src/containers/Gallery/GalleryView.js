import React, { PureComponent } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Metrics, ScalePerctFullWidth, Images } from "../../asset";
import {
	GalleryDisplayOne,
	GalleryDisplayTwo,
	GalleryFooter,
	GalleryLeadText,
	GalleryLogo,
	GalleryTitle,
	PodcastPlayView,
	ProfileHeader,
} from "../../components";
import { Actions } from "../../redux";
import { ArticleDisplayApi, ManageBoookmarkApi, CheckBookmark } from "../../service";
import { chunkArray } from "../../utilities";
import { Analytics, Screen } from "../../Analytics";
import DetailHeader from "../../components/headers/DetailHeader";

type Props = {
	title: string,
	onPress: Function,
};

class GalleryView extends PureComponent<Props> {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			index: 0,
			refreshKey: 1,
			isLogoVisible: false,
			isBookmark: false,
			SelectedBookmarks: [],
		};
	}

	componentDidMount() {
		Analytics.setCurrentScreen("GALLERY");
		this.props.clearDisplayArticleAction();
		const itemId = this.props.navigation.getParam("nid");
		const site = this.props.navigation.getParam("site");
		ArticleDisplayApi(`${itemId}~${site}`, this.onSuccess, this.onFailure, this.onError);
	}

	onSuccess = (response: any) => {
		const { user } = this.props;
		this.setState({
			loading: false,
			bookmark: response.data.bookmark,
			articleDisplay: response.data,
			bookmarkIds: response.data.bookmark_ids,
		});
		CheckBookmark(
			user.id,
			this.state.bookmarkIds,
			this.onSuccessCheckBookmark,
			this.onFailure,
			this.onError,
		);
		this.props.setDisplayArticleAction(response);
	};

	onSuccessCheckBookmark = (response: any) => {
		console.log("response=====", response);
		const itemId = this.props.navigation.getParam("nid");
		const site = this.props.navigation.getParam("site");
		const ArticleKey = `${itemId}~${site}`;
		const BookmarkFlag = response.data.find((element: any) => {
			return element === ArticleKey;
		});
		this.setState({
			loading: false,
			isBookmark: BookmarkFlag ? true : false,
			SelectedBookmarks: response,
		});
	};

	onFailure = () => {
		this.setState({ loading: false });
	};

	onError = () => {
		this.setState({ loading: false });
	};

	onImagePress = (id: any) => {
		const { navigation, articleDisplay } = this.props;
		console.log("onImagePress", articleDisplay.path_alias);
		const index =
			articleDisplay &&
			articleDisplay.field_picture_ref &&
			articleDisplay.field_picture_ref.und.findIndex(item => item.target_id === id);
		navigation.navigate("BigImage", {
			data: this.props.articleDisplay.field_picture_ref.und,
			index: index,
			linkdata: articleDisplay.path_alias,
			content: articleDisplay,
		});
	};

	onBookMarkToggle = () => {
		const { user } = this.props;
		const { isBookmark, articleDisplay, loading } = this.state;
		const site = this.props.navigation.getParam("site");
		if (!loading) {
			const changes = !isBookmark;
			this.setState({ isBookmark: changes });
			ManageBoookmarkApi(user.id, articleDisplay && articleDisplay.nid, site, isBookmark);
		}
	};

	onPressBrand = (site, brandLogo) => {
		const { navigation } = this.props;
		navigation.navigate("BrandsPage", {
			brand: site,
			brandLogo,
		});
	};

	galleryHeader = () => { 
		const { articleDisplay, navigation } = this.props;
		const site = this.props.navigation.getParam("site");
		return (
			<View style={styles.header}> 
				{/* <GalleryLogo
					data={articleDisplay}
					onPressBrand={() =>
						navigation.navigate("BrandsPage", {
							brand: site,
							brandLogo: articleDisplay.brand_logo,
						})
					}
				/> */}

				<GalleryTitle data={articleDisplay} />
				{Metrics.isTablet ? <GalleryLeadText data={articleDisplay} /> : null}
			</View>
		);
	};

	handlePlay = () => {
		const { navigation } = this.props;
		return Metrics.isTablet ? this.renderTabPlayScreen() : navigation.navigate("PlayScreen");
	};

	handleScroll = (event: Object) => {
		console.log(
			"event",
			event.nativeEvent.contentOffset.y > 15 + Metrics.DEFAULT_LIST_PADDING,
		);
		if (event.nativeEvent.contentOffset.y > 15 + Metrics.DEFAULT_LIST_PADDING) {
			this.setState({ isLogoVisible: true });
		} else if (this.state.isLogoVisible) {
			this.setState({ isLogoVisible: false });
		}
	};

	render() {
		const { navigation, articleDisplay, flag } = this.props;
		const { loading, isBookmark, isLogoVisible } = this.state;

		const images =
			articleDisplay &&
			articleDisplay.field_picture_ref &&
			articleDisplay.field_picture_ref.und &&
			chunkArray(articleDisplay.field_picture_ref.und, 3, false);
		console.log("article display in gallery", articleDisplay);

		return (
			<View style={styles.container}>
				<DetailHeader
					navigation={navigation }
					title=""
					isBottomBorder
					onBack={() => navigation.goBack()}  
					isTransculent
					// logoUrl={
					// 	isLogoVisible
					// 		? articleDisplay &&
					// 		  articleDisplay.brand_logo &&
					// 		  articleDisplay.brand_logo
					// 		: null
					// }
					// isLogo

					//brandIcon={isLogoVisible ? Images.ABlogo : null}
					//contentColor={Colors.bodyPrimaryLight}
				/>
				{loading || !articleDisplay ? (
					<View style={styles.indicator}>
						<ActivityIndicator size="large" color="#000" />
					</View>
				) : (
					// <View style={StyleSheet.flatten([styles.listContainer])}>
					// 	{!images ? (
					// 		<Text style={styles.errorText}>No data found</Text>
					// 	) : (
					<FlatList
						data={images}
						renderItem={({ item, index }) => {
							if (index % 2 === 0) {
								return (
									<GalleryDisplayTwo
										images={item}
										gallery
										onImagePress={this.onImagePress}
									/>
								);
							} else
								return (
									<GalleryDisplayOne
										images={item}
										gallery
										onImagePress={this.onImagePress}
									/>
								);
						}}
						ListHeaderComponent={this.galleryHeader()}
						style={styles.subContainer}
						keyExtractor={(item, index) => index.toString()}
						onScroll={this.handleScroll}
					/>
					// 	)}
					// </View>
				)}
				{flag && <PodcastPlayView onPress={this.handlePlay} />}
				<GalleryFooter
					onBookMarkToggle={this.onBookMarkToggle}
					isBookmark={isBookmark}
					data={articleDisplay}
				/>
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {
		articleDisplay: state.articleDisplay,
		user: state.user,
		flag: state.podcastPlayControl ? state.podcastPlayControl.flag : false,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(GalleryView);

// export default withNavigation(GalleryView);

const styles = StyleSheet.create({
	container: {
		marginTop: 0,
		width: ScalePerctFullWidth(100),
		flex: 1,
	},
	subContainer: {
		flexDirection: "column",
		flex: 1,
	},
	header: {
		flexDirection: "column",
		// backgroundColor:'red'
	},
	indicator: {
		// position: "absolute",
		// top: 0,
		// bottom: 0,
		// right: 0,
		// left: 0,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		// backgroundColor: "red",
	},
});

// const tabStyles = StyleSheet.create({
// 	container: {},
// });

// let styles = Metrics.isTablet ? tabStyles : mobileStyles;
