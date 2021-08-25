import React, { PureComponent } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Carousel from "react-native-snap-carousel";
import ImageLoad from "react-native-image-placeholder";
import SvgUri from "react-native-svg-uri";
import { Colors, Metrics, ScalePerctFullWidth, Images } from "../../asset";
import {
	ArticleListTitleImage,
	ArticleListFooter,
	ArticleListDescription,
} from "../articleListSubItems";
import { getTimeAgo } from "../../utilities";
import Icon from "../../asset/fonts/icons";

type Props = {};

const unBookMark = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="14px" height="17px" viewBox="0 0 14 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12.5920397,15.6848738 L6.79601985,11.6057422 L1,15.6848738 L1,2.63165265 C1,1.73051577 1.74141899,1 2.65600567,1 L10.936034,1 C11.8506207,1 12.5920397,1.73051577 12.5920397,2.63165265 L12.5920397,15.6848738 Z" id="Bookmark" stroke="#000000" stroke-width="1.5"></path>
    </g>
</svg>`;

export default class ArticleEditorial extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = { index: 0 };
	}

	renderImage = (item: any, onPressBookmark: Function, onPress) => {
		const url =
			!item.image_crop_landscape || item.image_crop_landscape.includes("public://")
				? ""
				: item.image_crop_landscape;
		return (
			<View style={styles.imageEditorialContainer}>
				{/* <Image source={{ uri: url }} style={StyleSheet.flatten([styles.image])} /> */}
				<TouchableOpacity onPress={() => onPress(item.nid, item.site, item)}>
					<View style={styles.imageEditorialContainer}>
						<ImageLoad
							resizeMode={"stretch"}
							style={styles.image}
							placeholderStyle={styles.image}
							isShowActivity={false}
							loadingStyle={{ size: "large", color: "grey" }}
							source={url != ""?{ uri: url }:Images.landscape}
							placeholderSource={Images.landscape} 
							borderRadius={10}
						/>
					</View>

					<Text style={[styles.titleText]}>{item.title}</Text>
					{!!item.lead_text && (
						<Text numberOfLines={3} style={styles.descriptionText}>
							{item.lead_text}
						</Text>
					)}
				</TouchableOpacity>
				<View style={[styles.footerContainer]}>
					<Text style={styles.hours}>{getTimeAgo(item.pubDate)}</Text>
					<TouchableOpacity onPress={() => {}}>
						<Icon
							style={styles.icon}
							name={Images.share}
							size={16}
							color={Colors.bodySecondaryLight}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => onPressBookmark(item.nid, item.site, item.bookmark)}
						style={styles.icon}
					>
						{item.bookmark ? (
							<Icon
								name={Images.selectedBookmark}
								size={16}
								color={Colors.bodyPrimaryDark}
							/>
						) : (
							<SvgUri width={16} height={16} svgXmlData={unBookMark} />
						)}
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	onItemChanged = (index: number) => {
		this.setState({ index });
	};

	render() {
		const { data, onPress, onPressBookmark } = this.props;
		const { index } = this.state;
		return (
			<View style={styles.container}>
				<Carousel
					ref={c => {
						this._carousel = c;
					}}
					data={data}
					// firstItem={data.length > 1 ? 1 : 0}
					renderItem={({ item }) => (
						<TouchableOpacity onPress={() => onPress(item.nid, item.site, item)}>
							{this.renderImage(item, onPressBookmark, onPress)}
						</TouchableOpacity>
					)}
					sliderWidth={ScalePerctFullWidth(100)}
					itemWidth={ScalePerctFullWidth(84)}
					onSnapToItem={this.onItemChanged}
					inactiveSlideOpacity={1}
					inactiveSlideScale={1}
				/>
				{/* <TouchableOpacity
					onPress={() => onPress(data[index].nid, data[index].site, data[index])}
				>
					<ArticleListTitleImage
						isCenter={false}
						isTitleImage={false}
						title={data[index].title}
						imageUrl={null}
					/>
					<ArticleListDescription description={data[index].lead_text} isCenter={false} />
				</TouchableOpacity>
				<ArticleListFooter
					isCenter={false}
					time={getTimeAgo(data[index].pubDate)}
					isBookMarked={data[index].bookmark || false}
					onBookMarkToggle={() =>
						onPressBookmark(data[index].nid, data[index].site, data[index].bookmark)
					}
				/>
				<View style={styles.lineSeperator} /> */}
				<View style={styles.lineSeperator} />
			</View>
			// </TouchableOpacity>
		);
	}
}

ArticleEditorial.defaultProps = {
	order: ["logo", "bigImage", "title", "footer"],
};

const styles = StyleSheet.create({
	container: {
		marginTop: 17,
		marginHorizontal: -6,
	},
	lineSeperator: {
		marginTop: 10,
		width: ScalePerctFullWidth(89),
		alignSelf: "center",
		borderBottomWidth: 1,
		borderColor: Colors.linePrimaryFull,
	},
	image: {
		width: ScalePerctFullWidth(84) - 16,
		height: ScalePerctFullWidth(55),
		borderRadius: 10,
	},
	imageEditorialContainer: {
		width: ScalePerctFullWidth(84),
		paddingHorizontal: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	titleText: {
		color: Colors.textHeading,
		fontSize: Metrics.LARGE_TEXT_SIZE,
		fontFamily: "BentonSans Bold",
		paddingTop: 18,
	},
	descriptionText: {
		color: Colors.textHeading,
		fontSize: Metrics.MEDIUM_TEXT_SIZE,
		fontFamily: "BentonSans Regular",
	},
	footerContainer: {
		alignSelf: "flex-start",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 12,
		paddingBottom: 20,
		width: ScalePerctFullWidth(84) - 12,
		// borderBottomColor: Colors.bgPrimaryLight,
		// borderBottomWidth: 1,
	},
	hours: {
		fontSize: Metrics.MEDIUM_TEXT_SIZE,
		letterSpacing: 0.3,
		textAlign: "left",
		flexWrap: "wrap",
		alignItems: "flex-start",
		lineHeight: Metrics.LARGE_LINE_HEIGHT,
		flex: 1,
	},
	icon: { padding: Metrics.DEFAULT_LIST_PADDING },
});
