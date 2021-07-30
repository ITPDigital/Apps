import React, { PureComponent } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import Carousel from "react-native-snap-carousel";
import SvgUri from "react-native-svg-uri";
import ImageLoad from "react-native-image-placeholder";
import { Colors, Metrics, ScalePerctFullWidth, Images } from "../../asset";
import {
	ArticleListTitleImage,
	ArticleListFooter,
	ArticleListDescription,
} from "../articleListSubItems";
import Icon from "../../asset/fonts/icons";
import { shareArticle } from "../common";

const share = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="14px" height="17px" viewBox="0 0 14 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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

type Props = {};

export default class ArticleListItem extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = { index: 0 };
	}

	renderImage = (item: any, onPress) => {
		const url =
			!item.field_image_landscape || item.field_image_landscape.includes("public://")
				? null
				: item.field_image_landscape;
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
							borderRadius={10}
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
						onPress={() => {
							if (item) {
								shareArticle(
									item.title,
									item.field_image,
									item.nid,
									"podcast",
									item.link,
									this.props.user.id,
								);
							}
						}}
						style={styles.icon}
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
		const { data, onPress, user } = this.props;
		const { index } = this.state;
		return (
			<View style={styles.container}>
				{/* <FlatList
					horizontal
					data={data}
					keyExtractor={(x, i) => i.toString()}
					renderItem={({ item }) => {
						return (
							<ArticleListBigImage
								height={300}
								width={ScalePerctFullWidth(84)}
								imageUrl={item.image}
								padded
								isNotopMargin
							/>
						);
					}}
				/> */}
				<Carousel
					ref={c => {
						this._carousel = c;
					}}
					data={data}
					// firstItem={data.length > 1 ? 1 : 0}
					renderItem={({ item }) => this.renderImage(item, onPress)}
					sliderWidth={ScalePerctFullWidth(100)}
					itemWidth={ScalePerctFullWidth(84)}
					onSnapToItem={this.onItemChanged}
					inactiveSlideOpacity={1}
					inactiveSlideScale={1}
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

ArticleListItem.defaultProps = {
	order: ["logo", "bigImage", "title", "footer"],
};

const styles = StyleSheet.create({
	container: {
		marginTop: 17,
		marginHorizontal: -6,
	},
	lineSeperator: {
		marginTop: 10,
		width: ScalePerctFullWidth(100) - 40,
		alignSelf: "center",
		borderBottomWidth: 1,
		borderColor: Colors.linePrimaryFull,
	},
	image: {
		width: ScalePerctFullWidth(79),
		height: ScalePerctFullWidth(55),
		borderRadius: 10,
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
		width: ScalePerctFullWidth(79),
		height: ScalePerctFullWidth(55),
		paddingHorizontal: 6,
		alignItems: "center",
		justifyContent: "center",
	},
	titleText: {
		color: Colors.textHeading,
		fontSize: Metrics.LARGE_TEXT_SIZE,
		fontFamily: "BentonSans Bold",
		paddingTop: 18,
		width: ScalePerctFullWidth(79),
		paddingHorizontal: 6,

		//marginHorizontal: 8,
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
