import React, { PureComponent } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../redux";
import { TabletVideoHomeAPI } from "../../service";
import ListVideoScreen from "./ListVideoScreen";
import ProfileHeader from "../../components/headers/BigimageHeader";
import HomeHeaderContainer from "../../navigators/HomeHeaderContainer";
import { Analytics } from "../../Analytics";
import { AnimatedHeaderList } from "../../components";
import { Metrics } from "../../asset";

class TabletVideoHome extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = {
			video: {},
			pageNumber: 0,
			showLoader: true,
			refreshing: false,
			showModal: false,
			refreshKey: 1,
			imageUrl: "https://facebook.github.io/react-native/docs/assets/favicon.png",
		};
		TabletVideoHomeAPI(props.user.id, 0, this.onSuccess, this.onFailure, this.onError);
	}

	componentDidMount = () => {
		Analytics.setCurrentScreen("VIDEO_HOME");
	};

	onSuccess = (videoDetails: Object) => {
		const { video } = this.state;
		const updated = { ...video, ...videoDetails };
		console.log("tablet video response", videoDetails);
		this.setState({ video: updated });
		this.setState({ showLoader: false });
	};

	onRefresh = async () => {
		const { user } = this.props;
		this.setState({ refreshing: true, loading: true, video: [] });
		TabletVideoHomeAPI(user.id, 0, this.onSuccess, this.onFailure, this.onError);
		this.setState({ refreshing: false });
	};

	onFailure = (message: string) => {
		console.log(message);
	};

	onError = (error: any) => {
		alert("No Data found");
	};

	onEndReached = () => {
		const { user } = this.props;
		const { pageNumber } = this.state;
		const updated = pageNumber + 1;
		this.setState({ pageNumber: updated, loading: true });
		TabletVideoHomeAPI(user.id, updated, this.onSuccess, this.onFailure, this.onError);
	};

	onPressBrand = (site, brandLogo) => {
		const { navigation } = this.props;
		navigation.navigate("BrandsPage", {
			brand: site,
			brandLogo,
		});
	};

	render() {
		let list = null;
		const { video, refreshing } = this.state;
		if (this.state.video) {
			list = Object.keys(video).map((item: any, index) => {
				return video[item];
			});
		}

		return this.state.showLoader ? (
			<View style={styles.loaderstyle}>
				<ActivityIndicator size="large" color="red" />
			</View>
		) : (
			<View style={styles.listStyle}> 
				<AnimatedHeaderList
					header={() => <HomeHeaderContainer navigation={this.props.navigation} />}
					flatListProps={{
						data: list,
						renderItem: ({ item, index }) => (
							<ListVideoScreen
								data={item}
								index={index}
								userId={this.props.user.id}
							/>
						),
						listKey: (item, index) => `D${index.toString()}`,
						onRefresh: this.onRefresh,
						refreshing: refreshing,
						style: { flex: 1 },
						onEndReachedThreshold: 0.5,
						onEndReached: () => this.onEndReached(),
					}}
					headerHeight={Metrics.HEADER_HEIGHT}
				/>
			</View>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
	topics: state.user.topics,
	brands: state.user.brands,
	control: state.podcastPlayControl,
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(TabletVideoHome);

const styles = StyleSheet.create({
	loaderstyle: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	listStyle: { flexDirection: "column", flex: 1 },
});
