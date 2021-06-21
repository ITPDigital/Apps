import React from "react";
import {
	StyleSheet,
	View,
	ActivityIndicator,
	SectionList,
	Text,
	TouchableOpacity,
} from "react-native";
import {
	Article,
	ArticleEditorial,
	ArticlePodcast,
	ArticleVideo,
	ListLoading,
	ArticleTabletBig,
	ArticleTabletSmall,
	ArticleTabletSmallFullImage,
	ArticleTabletVideo,
	ArticleTabletVideoFullScreen,
	Line,
} from "../../components";
import {
	TemplateConfig,
	Metrics,
	Constants,
	Colors,
	ScalePerctFullWidth,
	ScalePerctFullHeight,
} from "../../asset";
import { ArticleTabletPodcast } from "../../components/articleListItems";

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
) => {
	if (section.title === Constants.articleListSections.podcast) {
		return (
			<ArticleTabletPodcast
				onPress={onPodcastPress}
				onPressBookmark={() => onManageBookmark(item.nid, item.site, item.bookmark)}
				key={index.toString()}
				order={TemplateConfig.articleTemplates[item.template || 2]}
				settings={TemplateConfig.articleTemplateSettings[item.template || 2]}
				data={item}
			/>
		);
	}
	if (section.title === Constants.articleListSections.videos) {
		return (
			<ArticleVideo
				onPress={onItemPress}
				onPressBookmark={() => onManageBookmark(item.nid, item.site, item.bookmark)}
				key={index.toString()}
				order={TemplateConfig.articleTemplates[item.template || 2]}
				settings={TemplateConfig.articleTemplateSettings[item.template || 2]}
				data={item}
			/>
		);
	}
	// if (item.content_type === "video") {
	// 	return (
	// 		<Article
	// 			onPress={() => onItemPress(item.nid, item.site, item)}
	// 			onPressBookmark={() => onManageBookmark(item.nid, item.site, item.bookmark)}
	// 			key={index.toString()}
	// 			order={TemplateConfig.articleTemplates[13]}
	// 			settings={TemplateConfig.articleTemplateSettings[13]}
	// 			data={item}
	// 			onFollow={onFollow}
	// 			onPressBrand={onPressBrand}
	// 		/>
	// 	);
	// }

	if (item.content_type === "video") {
		// console.log("index", index);
		// const indexValue = index % 2 != 0;
		// console.log("indexid", indexValue);
		return (
			<ArticleTabletVideoFullScreen
				onPress={() => onItemPress(item.nid, item.site, item)}
				onPressBookmark={() => onManageBookmark(item.nid, item.site, item.bookmark)}
				key={item.nid.toString()}
				data={item}
				onPressBrand={onPressBrand}
				isImage={item.template == "T2"}
				onFollow={onFollow}
			/>
		);
		// ) : (
		// 	<ArticleTabletVideo
		// 		onPress={() => onItemPress(item.nid, item.site, item)}
		// 		onPressBookmark={() => onManageBookmark(item.nid, item.site, item.bookmark)}
		// 		key={item.nid.toString()}
		// 		data={item}
		// 		onPressBrand={onPressBrand}
		// 		isImage={item.template == "T2"}
		// 		onFollow={onFollow}
		// 	/>
		// );
	}

	// if (item.content_type === "gallery") {
	// 	return (
	// 		<Article
	// 			onPress={() => onItemPress(item.nid, item.site, item)}
	// 			onPressBookmark={() => onManageBookmark(item.nid, item.site, item.bookmark)}
	// 			key={index.toString()}
	// 			order={TemplateConfig.galleryTemplate[item.template || 1]}
	// 			settings={TemplateConfig.galleryTemplateSettings[item.template || 1]}
	// 			data={item}
	// 			onFollow={onFollow}
	// 			onPressBrand={onPressBrand}
	// 		/>
	// 	);
	// }
	if (Array.isArray(item)) {
		return (
			<View style={styles.doubleContainer}>
				<View style={{ flex: 1 }}>
					{renderArticle(
						item[0],
						onItemPress,
						onManageBookmark,
						onPressBrand,
						bookmarkRequired,
					)}
				</View>
				<View style={{ flex: 1, marginLeft: 35 }}>
					{renderArticle(
						item[1],
						onItemPress,
						onManageBookmark,
						onPressBrand,
						bookmarkRequired,
					)}
				</View>
			</View>
		);
	}
	return (
		<ArticleTabletBig
			onPress={() => onItemPress(item.nid, item.site, item)}
			onPressBookmark={() => onManageBookmark(item.nid, item.site, item.bookmark)}
			key={index.toString()}
			data={item}
			user={user}
			onFollow={onFollow}
			onPressBrand={onPressBrand}
			isLogo={item.template == "T1"}
		/>
	);
};

const renderArticle = (item, onItemPress, onManageBookmark, onPressBrand, bookmarkRequired) => {
	if (item && item.content_type === "video") {
		return (
			<ArticleTabletVideo
				onPress={() => onItemPress(item.nid, item.site, item)}
				onPressBookmark={() => onManageBookmark(item.nid, item.site, item.bookmark)}
				key={item.nid.toString()}
				data={item}
				onPressBrand={onPressBrand}
				isImage={item.template == "T2"}
				onFollow={() => {}}
			/>
		);
	}
	if (item && item.template === "T4") {
		return renderArticleSmallFullImage(item, onItemPress, onManageBookmark, onPressBrand);
	}
	if (item) {
		return renderArticleSmall(
			item,
			onItemPress,
			onManageBookmark,
			onPressBrand,
			bookmarkRequired,
		);
	}
	return null;
};

const renderArticleSmall = (
	item,
	onItemPress,
	onManageBookmark,
	onPressBrand,
	bookmarkRequired,
) => {
	return (
		<ArticleTabletSmall
			onPress={() => onItemPress(item.nid, item.site, item)}
			onPressBookmark={() => onManageBookmark(item.nid, item.site, item.bookmark)}
			key={item.nid.toString()}
			data={item}
			onPressBrand={onPressBrand}
			isImage={item.template == "T2"}
			bookmarkRequired={true}
		/>
	);
};

const renderArticleSmallFullImage = (item, onItemPress, onManageBookmark, onPressBrand) => {
	return (
		<ArticleTabletSmallFullImage
			onPress={() => onItemPress(item.nid, item.site, item)}
			onPressBookmark={() => onManageBookmark(item.nid, item.site, item.bookmark)}
			key={item.nid.toString()}
			data={item}
			onPressBrand={onPressBrand}
			isImage={item.template == "T4"}
		/>
	);
};

export default function ArticleTabletSectionList(props: Props) {
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
		onPressMoreStories,
		bookmarkRequired,
	} = props;
	const imageUrl = data.brand_logo && data.brand_logo.length > 0 ? data.brand_logo : undefined;
	console.log("datasite section list", bookmarkRequired);

	return (
		<SectionList
			sections={data}
			keyExtractor={(x, i) => i.toString()}
			stickySectionHeadersEnabled={false}
			// onEndReachedThreshold={50}
			onEndReached={() => onEndReached()}
			onRefresh={() => onRefresh()}
			refreshing={refresh}
			removeClippedSubviews
			initialNumToRender={6}
			maxToRenderPerBatch={2}
			onEndReachedThreshold={0.5}
			// ItemSeparatorComponent={() => <View />}
			// ListHeaderComponent={() => <View style={styles.header} />}
			ListFooterComponent={() => <ListLoading loading={loading} refresh={refresh} />}
			renderItem={({ item, index, section }) => {
				return renderItem(
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
				);
			}}
			renderSectionHeader={({ section: { title } }) => {
				if (title !== Constants.articleListSections.empty) {
					return <Text style={styles.sectionHeader}>{title}</Text>;
				}
				return null;
			}}
			renderSectionFooter={({ section: { title, footer } }) => {
				console.log("footer", footer);
				if (footer) {
					if (title === Constants.articleListSections.editorial) {
						return (
							<TouchableOpacity
								onPress={() => onPressMoreStories(title)}
								style={styles.line}
							>
								<Text style={styles.sectionFooter}>More from {title}</Text>
							</TouchableOpacity>
						);
					}
					// return (
					// 	<View style={styles.line}>
					// 		<Text style={styles.sectionFooter}>More from Top Stories</Text>
					// 	</View>
					// );
				}
				return null;
			}}
		/>
	);
}

const styles = StyleSheet.create({
	line: {
		borderBottomColor: Colors.linePrimary,
		borderBottomWidth: 2,
		marginHorizontal: ScalePerctFullWidth(4.8),
	},
	container: {
		flex: 1,
	},
	sectionHeader: {
		paddingTop: 30,
		marginHorizontal: ScalePerctFullWidth(6.4),
		paddingBottom: 0,
		fontFamily: "BentonSans Bold",
		color: Colors.bgSecondaryVarient,
		fontSize: Metrics.SMALL_TEXT_SIZE,
	},
	sectionFooter: {
		textAlign: "center",
		fontFamily: "BentonSans Bold",
		fontSize: 14,
		lineHeight: 18,
		color: Colors.bodySecondaryDark,
		paddingVertical: ScalePerctFullHeight(2),
	},
	doubleContainer: {
		flexDirection: "row",
		paddingHorizontal: 50,
		width: ScalePerctFullWidth(100),
	},
});
