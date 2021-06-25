import React, { PureComponent } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text, FlatList } from "react-native";
import Carousel from "react-native-snap-carousel";
import SvgUri from "react-native-svg-uri";
import ImageLoad from "react-native-image-placeholder";
import { Colors, Metrics, ScalePerctFullWidth, Images, ScalePerctFullHeight } from "../../asset";
import {
	ArticleListTitleImage,
	ArticleListFooter,
	ArticleListDescription,
} from "../articleListSubItems";
import Icon from "../../asset/fonts/icons";
import { shareArticle } from "../common";

type Props = {};

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

export default class ArticleTabletPodcast extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = { index: 0 };
	}

	renderImage = (item: any, onPress) => {
		const url =
			!item.field_image_square || item.field_image_square.includes("public://")
				? null
				: item.field_image_square;
		return (
			<View>
				<TouchableOpacity onPress={() => onPress(item)}>
					<View style={styles.imageEditorialContainer}>
						{/* <Image source={{ uri: url }} style={StyleSheet.flatten([styles.image])} /> */}
						<ImageLoad
							resizeMode={"stretch"}
							style={styles.image}
							placeholderStyle={styles.image}
							isShowActivity={false}
							loadingStyle={{ size: "large", color: "grey" }}
							source={!url ? Images.landscape : { uri: url }} //url == "" ? Images.landscape :
							placeholderSource={Images.landscape}
							//borderRadius={10}
						/>
						<View style={styles.symbolContainer}>
							<Icon name={Images.podcast} size={15} color={Colors.bgPrimaryLight} />
						</View>
					</View>
					{/* <ArticleListTitleImage
					isCenter={false}
					isTitleImage={false}
					title={item.title}
					imageUrl={null}
				/> */}
					<Text numberOfLines={3} style={[styles.titleText]}>
						{item.title}
					</Text>
				</TouchableOpacity>
				<View style={[styles.footerContainer]}>
					<Text style={styles.hours}>{item.field_total_duration}</Text>
					<TouchableOpacity
						style={styles.icon}
						onPress={() => {
							if (item) {
								shareArticle(
									item.title,
									item.image,
									item.nid,
									"podcast",
									item.link,
									104,
									item,
								);
							}
						}}
					>
						{/* <Icon
							style={styles.icon}
							name={Images.share}
							size={16}
							color={Colors.bodySecondaryLight}
						/> */}
						<SvgUri width={16} height={16} svgXmlData={share} />
					</TouchableOpacity>
				</View>
				{/* <ArticleListFooter
					isBookMarkNeeded={false}
					isCenter={false}
					time={item.field_total_duration}
					isBookMarked={false}
				/> */}
			</View>
		);
	};

	onItemChanged = (index: number) => {
		this.setState({ index });
	};

	render() {
		const { data, onPress } = this.props;
		const { index } = this.state;
		return (
			<View style={styles.container}>
				<FlatList
					horizontal
					data={data}
					keyExtractor={(x, i) => i.toString()}
					renderItem={({ item }) => this.renderImage(item, onPress)}
				/>

				{/* <TouchableOpacity onPress={() => onPress(data[index])}>
					<ArticleListTitleImage
						isCenter={false}
						isTitleImage={false}
						title={data[index].title}
						imageUrl={null}
					/>
				</TouchableOpacity>
				<ArticleListFooter
					isBookMarkNeeded={false}
					isCenter={false}
					time={data[index].field_total_duration}
					isBookMarked={false}
				/>
				<View style={styles.lineSeperator} /> */}
				<View style={styles.lineSeperator} />
			</View>
			// </TouchableOpacity>
		);
	}
}

ArticleTabletPodcast.defaultProps = {
	order: ["logo", "bigImage", "title", "footer"],
};

const styles = StyleSheet.create({
	container: {
		marginTop: 17,
		marginHorizontal: ScalePerctFullWidth(5),
	},
	lineSeperator: {
		marginTop: 10,
		width: ScalePerctFullWidth(100) - 40,
		alignSelf: "center",
		borderBottomWidth: 1,
		borderColor: Colors.linePrimaryFull,
	},
	image: {
		width: ScalePerctFullWidth(31),
		height: ScalePerctFullWidth(30),
		//borderRadius: 10,
	},
	symbolContainer: {
		height: 30,
		borderRadius: 15,
		width: 30,
		position: "absolute",
		bottom: 20,
		right: 25,
		backgroundColor: Colors.bodySecondaryDark,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	imageEditorialContainer: {
		width: ScalePerctFullWidth(32),
		height: ScalePerctFullWidth(30),
		paddingHorizontal: 8,
		//alignItems: "center",
		//justifyContent: "center",
	},
	titleText: {
		color: Colors.textHeading,
		fontSize: Metrics.LARGE_TEXT_SIZE,
		fontFamily: "BentonSans Bold",
		paddingTop: 18,
		paddingHorizontal: 2,
		marginHorizontal: 8,
		width: ScalePerctFullWidth(32),
		height: ScalePerctFullHeight(8),
	},
	footerContainer: {
		//alignSelf: "center",
		flexDirection: "row",
		//justifyContent: "center",
		//alignItems: "center",
		paddingTop: 12,
		paddingBottom: 20,
		paddingHorizontal: 2,
		marginHorizontal: 8,
		width: ScalePerctFullWidth(32),
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
		paddingLeft: 2,
		color: "#8895a9",
	},
	icon: { paddingHorizontal: Metrics.DEFAULT_LIST_PADDING },
});
