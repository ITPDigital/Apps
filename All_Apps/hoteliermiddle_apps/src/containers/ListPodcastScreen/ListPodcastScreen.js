import React, { PureComponent } from "react";
import { View, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../redux";

import { PodcastListCard, TextButton, Line } from "../../components";
import { Metrics, Colors, Strings, ScalePerctFullWidth } from "../../asset";

type Props = {
	navigation: Function,
	index: number,
	data: any,
};

export default class ListPodcastScreen extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = {};
	}

	renderHeader = (logo, id, site) => {
		const { navigation } = this.props;
		return (
			<View style={style.header}>
				<TouchableOpacity
					style={{ padding: ScalePerctFullWidth(1) }}
					onPress={() =>
						navigation.navigate("BrandsPage", {
							brand: site,
							brandLogo: logo,
						})
					}
				>
					<Image
						source={{ uri: logo }}
						style={style.logo}
						resizeMode="stretch"
						onError={this.onError}
					/>
				</TouchableOpacity>

				<TextButton
					textStyle={style.viewButton}
					title={Strings.podCast.VIEW_ALL}
					touchableStyle={style.touchableStyle}
					onPress={() => navigation.navigate("ViewListPodcastScreen", { id, logo })}
				/>
			</View>
		);
	};

	renderList = (listData: Array, logo) => {
		const { navigation, index } = this.props;
		return (
			<View>
				<FlatList
					showsHorizontalScrollIndicator={false}
					horizontal
					data={listData}
					renderItem={({ item }) => (
						<PodcastListCard
							data={item}
							onPress={() =>
								navigation.navigate("ChaptorPodcastScreen", {
									id: item.nid,
									brand: item.site,
									logo,
									item,
								})
							}
							index={index}
						/>
					)}
					keyExtractor={(item, index) => item.nid.toString()}
				/>
			</View>
		);
	};

	handlePlay = () => {
		const { navigation } = this.props;
		navigation.navigate("PlayScreen");
	};

	render() {
		const { data } = this.props;
		const list = (
			<View key={data.brand_id}>
				{this.renderHeader(data.brand_logo, data.brand_id, data.podcasts[0].site)}
				{this.renderList(data.podcasts, data.brand_logo)}
				<Line style={style.separator} />
			</View>
		);

		return (
			<View style={{ flex: 1 }}>
				<View style={style.container}>{list}</View>
			</View>
		);
	}
}

const mobileStyle = StyleSheet.create({
	container: {
		paddingTop: Metrics.DEFAULT_PADDING,
		paddingLeft: Metrics.DEFAULT_PADDING,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginRight: Metrics.DEFAULT_PADDING,
		marginBottom: Metrics.DEFAULT_PADDING,
	},
	viewButton: {
		fontSize: Metrics.SMALL_TEXT_SIZE,
		color: Colors.bgPrimaryVarient,
		fontFamily: "BentonSans Regular",
	},
	touchableStyle: {
		justifyContent: "center",
		padding: 2,
	},
	logo: {
		height: Metrics.isTablet ? 20 : 15,
		width: Metrics.isTablet ? 180 : 150,
	},
	separator: {
		marginTop: Metrics.DEFAULT_PADDING,
		marginRight: Metrics.DEFAULT_PADDING,
	},
});

const tabStyle = StyleSheet.create({
	container: {
		paddingTop: ScalePerctFullWidth(2),
		paddingLeft: Metrics.DEFAULT_PADDING,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginRight: Metrics.DEFAULT_PADDING,
		marginBottom: ScalePerctFullWidth(2),
	},
	viewButton: {
		fontSize: Metrics.SMALL_TEXT_SIZE,
		color: Colors.bgPrimaryVarient,
		fontFamily: "BentonSans Regular",
	},
	touchableStyle: {
		justifyContent: "center",
		padding: 2,
	},
	logo: {
		height: Metrics.isTablet ? 20 : 15,
		width: Metrics.isTablet ? 180 : 150,
	},
	separator: {
		marginTop: Metrics.DEFAULT_PADDING,
		marginRight: Metrics.DEFAULT_PADDING,
	},
});

const style = Metrics.isTablet ? tabStyle : mobileStyle;
