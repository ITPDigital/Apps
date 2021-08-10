import React, { PureComponent } from "react";
import { View, StyleSheet, Text, SectionList, NativeModules, Platform } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../redux";
import {
	ProfileHeader,
	Article,
	ListLoading,
	PodcastPlayView,
	AlertComp,
	ArticlePodcast,
	AnimatedHeaderList,
	BottomBar,
} from "../../components";
import {
	ScalePerctFullWidth,
	ScalePerctFullHeight,
	Colors,
	TemplateConfig,
	Strings,
	Metrics,
	Images,
} from "../../asset";
import { BrandPageApi, ManageBoookmarkApi } from "../../service";
import { getCurrentUserToken } from "../../storage";

const abLogo = Images.abLogo;

class Brand extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			topStories: [],
			editorsChoise: [],
			podcast: [],
			storiesList: [],
			loading: true,
			refreshKey: 1,
			manageHistoryLoad: false,
			pageNumber: 0,
			imageUrl: "https://facebook.github.io/react-native/docs/assets/favicon.png",
		};
		BrandPageApi(
			props.navigation.getParam("brand") || "ahl_en",
			0,
			this.onSuccess,
			this.onFailure,
			this.onError,
		);
	}

	componentDidUpdate(prevProps) {
		const { navigation } = this.props;
		const previousBrand = prevProps.navigation.getParam("brand");
		const currentBrand = navigation.getParam("brand");
		if (currentBrand !== previousBrand) {
			BrandPageApi(
				currentBrand || "ahl_en",
				0,
				this.onSuccess,
				this.onFailure,
				this.onError,
			);
		}
	}

	onSuccess = (data: any) => {
		const { storiesList, topStories, editorsChoise, podcast } = this.state;
		const updatedstory = [...storiesList, ...data.stories_list];
		const newTopStory = data.top_stories || [];
		const updatedTopStory = [...topStories, ...newTopStory];
		const newEditorChoice = data.editors_choice || [];
		const updatedEditorChoice = [...editorsChoise, ...newEditorChoice];
		const newPodcast = data.podcast || [];
		const updatedPodcast = [...podcast, ...newPodcast];

		this.setState({
			topStories: updatedTopStory,
			editorsChoise: updatedEditorChoice,
			storiesList: updatedstory,
			podcast: updatedPodcast,
			loading: false,
		});
	};

	onManageBookmark = (
		nId: string,
		siteKey: string,
		isBookmarked: boolean,
		index: number,
		section: any,
	) => {
		const { user } = this.props;
		if (section.key === "Top Stories") {
			const { topStories } = this.state;
			const changes = !topStories[index].bookmark;
			const refresh = Math.random();
			const updated = [...topStories];
			updated[index].bookmark = changes;
			this.setState({
				topStories: updated,
				refreshKey: refresh,
			});
		}
		if (section.key === "Editorial Highlights") {
			const { editorsChoise } = this.state;
			const changes = !editorsChoise[index].bookmark;
			const refresh = Math.random();
			const updated = [...editorsChoise];
			updated[index].bookmark = changes;
			this.setState({
				editorsChoise: updated,
				refreshKey: refresh,
			});
		}
		if (section.key === "Podcast") {
			const { podcast } = this.state;
			const changes = !podcast[index].bookmark;
			const refresh = Math.random();
			const updated = [...podcast];
			updated[index].bookmark = changes;
			this.setState({
				podcast: updated,
				refreshKey: refresh,
			});
		}
		if (section.key === "Stories") {
			const { storiesList } = this.state;
			const changes = !storiesList[index].bookmark;
			const refresh = Math.random();
			const updated = [...storiesList];
			updated[index].bookmark = changes;
			this.setState({
				storiesList: updated,
				refreshKey: refresh,
			});
		}
		ManageBoookmarkApi(user.id, nId, siteKey, isBookmarked);
	};

	onFailure = () => {
		const { navigation } = this.props;
		AlertComp(Strings.authentication.ALERT, "No data found", () => navigation.goBack());
	};

	onError = (error: any) => {
		const { navigation } = this.props;
		AlertComp(Strings.authentication.ALERT, "No data found", () => navigation.goBack());
	};

	onRefresh = async () => {
		const { navigation } = this.props;
		const brand = navigation.getParam("brand");
		const refresh = Math.random();
		this.setState({ manageBookmarkLoad: true });
		BrandPageApi(brand || "ahl_en", 0, this.onSuccess, this.onFailure, this.onError);
		this.setState({ manageBookmarkLoad: false, refreshKey: refresh });
	};

	onItemPress = (nid: number, site: string, item: any) => {
		const { navigation, user } = this.props;
		//	const nextScreen = item.video ? "VideoDetail" : "ArticleDisplayHomeScreen";

		const userId = user.id;
		if (item.content_type === "video") {
			item.video
				? Platform.OS === "android"
					? getCurrentUserToken().then((token: string) => {
							NativeModules.BlueConic.setBlueconic(
								item.nid.toString(),
								item.site,
								userId.toString(),
								token,
								item.link,
							);
							navigation.navigate("ArticleDisplayHomeScreen", {
								nid: item.nid,
								site: item.site,
								refreshKey: Math.random(),
						  });
					  })
					: navigation.navigate("ArticleDisplayHomeScreen", {
							nid: item.nid,
							site: item.site,
							refreshKey: Math.random(),
					  })
				: navigation.push("ArticleDisplayHomeScreen", {
						video: item.video,
						nid: item.nid,
						site: item.site,
				  });
		} else if (item.content_type === "gallery") {
			navigation.push("GalleryHomeScreen", { nid, site });
		} else {
			navigation.push("ArticleDisplayHomeScreen", { nid, site });
		}
	};

	handlePlay = () => {
		const { navigation } = this.props;
		navigation.navigate("PlayScreen");
	};

	onEndReached = () => {
		const { pageNumber } = this.state;
		const { navigation } = this.props;
		const brand = navigation.getParam("brand");
		const updated = pageNumber + 1;
		console.log("page number in Brands Page:", updated);
		this.setState({ pageNumber: updated, loading: true });
		BrandPageApi(brand || "ahl_en", updated, this.onSuccess, this.onFailure, this.onError);
		console.log("Brands Page: list:", this.state.storiesList);
	};

	// UI Part functions

	renderHeader = () => {
		const { navigation } = this.props;
		console.log("Navigation in Brands:", navigation);
		const brandLogo = navigation.getParam("brandLogo");
		return (
			<ProfileHeader
				onAction={() => {
					navigation.navigate("ProfileDrawerScreen");
				}}
				onBack={() => {
					navigation.goBack();
				}}
				// logoUrl={
				// 	brandLogo ||
				// 	"http://trove-drupal.itp.com/sites/default/files/logo/2019-02/Esquire%20ME.png"
				// }
				//brandIcon={Images.ABlogo}
			/>
		);
	};

	renderItemsHeader = (title: Number, data: Array) => {
		const { loading } = this.state;
		console.log("data inside render item header:", data);
		const condition = !loading || (data && data.length !== 0);
		return (
			condition && (
				<View style={styles.itemHeaderContainer}>
					<Text style={styles.itemHeaderText}>{title}</Text>
				</View>
			)
		);
	};

	onPodcastPress = (item: any) => {
		const { navigation } = this.props;
		navigation.navigate("ChaptorPodcastScreen", {
			id: item.nid,
			brand: item.site,
			brand_key: item.site,
			logo: "",
			item,
		});
	};

	renderItem = (item, index, section) => {
		const { user } = this.props;
		const { podcast } = this.state;
		if (section.key === "Podcast") {
			return (
				<ArticlePodcast
					onPress={this.onPodcastPress}
					onPressBookmark={() =>
						this.onManageBookmark(item.nid, item.site, item.bookmark, index, section)
					}
					key={index.toString()}
					order={TemplateConfig.articleTemplates[item.template || 2]}
					settings={TemplateConfig.articleTemplateSettings[item.template || 2]}
					data={podcast}
				/>
			);
		}
		return (
			<Article
				onPress={() => this.onItemPress(item.nid, item.site, item)}
				onPressBookmark={() =>
					this.onManageBookmark(item.nid, item.site, item.bookmark, index, section)
				}
				key={index.toString()}
				order={TemplateConfig.articleTemplates[item.template || 2]}
				settings={TemplateConfig.articleTemplateSettings[item.template || 2]}
				data={item}
				user={user}
				onFollow={() => {}}
				onPressBrand={() => {}}
			/>
		);
	};

	renderBrandsItems = () => {
		const { topStories, storiesList, editorsChoise, loading, manageHistoryLoad } = this.state;
		const items = [
			{ data: [...topStories], key: "Top Stories" },
			// { data: [...editorsChoise], key: "Editorial Highlights" },
			{ data: "1", key: "Podcast" },
			{ data: [...storiesList], key: "Stories" },
		];
		console.log("Editorial:", editorsChoise);
		if (editorsChoise && editorsChoise.length > 0) {
			items.push({ data: [...editorsChoise], key: "Editorial Highlights" });
		}
		return (
			<SectionList
				sections={items}
				keyExtractor={(x, i) => i.toString()}
				stickySectionHeadersEnabled={false}
				onEndReachedThreshold={0.5}
				onEndReached={() => this.onEndReached()}
				onRefresh={() => this.onRefresh()}
				refreshing={manageHistoryLoad}
				ListFooterComponent={() => <ListLoading loading={loading} />}
				renderItem={({ item, index, section }) => {
					console.log("section", section);
					return this.renderItem(item, index, section);
				}}
				renderSectionHeader={({ section: { key } }, { section: { data } }) =>
					this.renderItemsHeader(key, data)
				}
			/>
		);
	};

	render() {
		const { control, navigation } = this.props;
		const {
			topStories,
			storiesList,
			editorsChoise,
			loading,
			manageHistoryLoad,
			podcast,
		} = this.state;
		const items = [];
		if (topStories && topStories.length > 0) {
			items.push({ data: [...topStories], key: "Top Stories" });
		}
		if (editorsChoise && editorsChoise.length > 0) {
			items.push({ data: [...editorsChoise], key: "Editorial Highlights" });
		}
		if (podcast && podcast.length > 0) {
			items.push({ data: "1", key: "Podcast" });
		}
		if (storiesList && storiesList.length > 0) {
			items.push({ data: [...storiesList], key: "Stories" });
		}
		return (
			<View style={styles.container}>
				<AnimatedHeaderList
					header={() => this.renderHeader()}
					flatListProps={{
						sections: items,
						keyExtractor: (x, i) => i.toString(),
						stickySectionHeadersEnabled: false,
						onEndReachedThreshold: 0.5,
						onEndReached: () => this.onEndReached(),
						onRefresh: () => this.onRefresh(),
						refreshing: manageHistoryLoad,
						ListFooterComponent: () => <ListLoading loading={loading} />,
						renderItem: ({ item, index, section }) => {
							return this.renderItem(item, index, section);
						},
						renderSectionHeader: ({ section: { key } }) => this.renderItemsHeader(key),
					}}
					headerHeight={Metrics.HEADER_HEIGHT}
					listComponent={SectionList}
				/>
				{control.flag && <PodcastPlayView onPress={this.handlePlay} />}
				<BottomBar navigation={navigation} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// height: ScalePerctFullHeight(100),
		// width: ScalePerctFullWidth(100),
	},
	itemHeaderContainer: {
		marginLeft: 20,
		marginTop: 25,
	},
	itemHeaderText: {
		fontFamily: "BentonSans Bold",
		color: Colors.itemHeader,
		fontSize: 12,
	},
	authorDetails: {
		flexDirection: "row",
		width: ScalePerctFullWidth(100),
	},
	footer: {
		marginBottom: ScalePerctFullHeight(20),
	},
	ListItems: {
		//flex: 1,
		flexDirection: "row",
	},
	contentContainerStyle: {
		flexGrow: 1,
		justifyContent: "center",
	},
	image: {
		height: ScalePerctFullWidth(32),
		width: ScalePerctFullWidth(32),
		marginLeft: ScalePerctFullWidth(6),
		marginTop: ScalePerctFullHeight(4),
		borderRadius: ScalePerctFullWidth(15),
	},
	textInfo: {
		backgroundColor: Colors.bgPrimaryLight,
		width: ScalePerctFullWidth(100),
	},
	followButton: {
		height: ScalePerctFullHeight(6),
		width: ScalePerctFullWidth(44),
		marginLeft: ScalePerctFullWidth(7),
		marginTop: ScalePerctFullHeight(4),
	},
});

const mapStateToProps = state => ({
	user: state.user,
	history: state.history,
	control: state.podcastPlayControl,
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Brand);

Brand.defaultProps = {};
