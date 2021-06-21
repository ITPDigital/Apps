import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../redux";
import MagazineDetailUI from "./MagazineDetailUI";
import { MagazineDetailApi } from "../../service";
import { Constants, Metrics } from "../../asset";
import TabletMagazinedetail from "./TabletMagazineDetail";
import { Analytics, Screen, Events } from "../../Analytics";

type Props = {
	screenProps: any,
	navigation: any,
};

class MagazineDetailContainer extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = { data: null };
	}

	componentDidMount() {
		Analytics.setCurrentScreen("MAGAZINE_DETAILS");
		const { navigation, user } = this.props;
		const item = navigation.getParam("item");
		console.log("ITEMDATA", JSON.stringify(item));
		MagazineDetailApi(
			'1455',
			item.nid,
			this.onFetchSuccess,
			this.onFetchFailure,
			this.onFetchError,
		);
	}

	onFetchSuccess = (data: any) => {
		this.setState({ data });
	};

	onFetchFailure = () => {
		this.setState({ data: null });
	};

	onFetchError = (error: any) => {
		let message = Constants.errorMessages.general;
		if (error.toString().includes(Constants.errorMessages.checkNetwork)) {
			message = Constants.errorMessages.network;
		}
		this.setState({ data: null });
	};

	onItemPress = () => {
		const { data } = this.state;
		const { navigation } = this.props;
		const item = navigation.getParam("item");
		navigation.navigate("MagazinePrevHomeScreen", { item, title: data.brand_title, data });
	};

	onDownloadPress = () => {
		const { data } = this.state;
		const { navigation, user, userSubscribe } = this.props;
		const item = navigation.getParam("item");
		console.log("magitem", data);
		console.log("maguser", user);
		console.log("usersubscribe", userSubscribe);

		// let issue =
		// 	user &&
		// 	user.magazines &&
		// 	user.magazines.ISSUE &&
		// 	user.magazines.ISSUE.find(obj => obj.issue_id == item.nid);
		// if (!issue && userSubscribe) {
		// 	issue =
		// 		userSubscribe.magazines &&
		// 		userSubscribe.magazines.ISSUE &&
		// 		userSubscribe.magazines.ISSUE.find(obj => obj.issue_id == item.nid);
		// }

		if (data.subscribed) {
			if (data.field_magazine_code) {
				navigation.navigate("FlowPlayerHomeScreen", {
					link: data.field_magazine_code,
				});
			} else alert("No Data Found");

			Analytics.logEvent(Events.magazine.download, {});
		} else {
			navigation.navigate("MagazineSubscriptionHomeScreen", { data, item });
			Analytics.logEvent(Events.magazine.subscribe, {});
		}
	};

	onRefresh = () => {};

	onEndReached = () => {};

	render() {
		const { data } = this.state;
		const { navigation } = this.props;
		const item = navigation.getParam("item");

		// const { data } = this.props;
		return Metrics.isTablet ? (
			<TabletMagazinedetail
				{...this.props}
				data={data}
				onItemPress={this.onItemPress}
				isBrandId={!!item && !!item.brand_id}
				onDownloadPress={this.onDownloadPress}
			/>
		) : (
			<MagazineDetailUI
				{...this.props}
				data={data}
				onItemPress={this.onItemPress}
				isBrandId={!!item && !!item.brand_id}
				onDownloadPress={this.onDownloadPress}
			/>
		);
	}
}

function mapStateToProps(state) {
	return {
		data: state.myTrove,
		user: state.user,
		userSubscribe: state.userSubscribe,
		isSplashScreenHide: state.isSplashScreenHide,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(MagazineDetailContainer);
