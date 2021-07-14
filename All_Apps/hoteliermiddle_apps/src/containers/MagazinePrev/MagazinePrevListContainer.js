import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../redux";
import MagazineListUI from "./MagazinePrevListUI";
import { PreviousIssueApi } from "../../service";
import { Constants, Metrics } from "../../asset";
import { Analytics, Screen } from "../../Analytics";

type Props = {
	screenProps: any,
	navigation: any,
};

class MagazinePrevListContainer extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			refresh: false,
			message: Constants.emptyMessages.noRecord,
			data: [],
			tempData: [],
			pageNumber: 1,
		};
	}

	componentDidMount() {
		Analytics.setCurrentScreen("MAGAZINE_LIST");
		this.setState({
			loading: true,
		});
		const { navigation } = this.props;
		//const item = navigation.getParam("item");
		PreviousIssueApi(
			"MagazinePrevListContainer",
			this.onFetchSuccess,
			this.onFetchFailure,
			this.onFetchError,
			0,
		);
	}

	onFetchSuccess = (data: any) => {
		const da = [...this.state.tempData, ...data];
		const len = da.length;
		const newData = [];
		let i = 0;
		if (data.length === 0) {
			this.setState({ flag: true });
		}
		while (i < len) {
			const subArr = [];
			subArr.push(da[i]);
			i += 1;
			if (i < len) {
				subArr.push(da[i]);
				i += 1;
			}
			if (Metrics.isTablet) {
				if (i < len) {
					subArr.push(da[i]);
					i += 1;
				}
				if (i < len) {
					subArr.push(da[i]);
					i += 1;
				}
			}
			newData.push(subArr);
		}
		console.log("*******", da);
		this.setState({
			loading: false,
			refresh: false,
			message: Constants.emptyMessages.noRecord,
			data: newData,
			tempData: [...this.state.tempData, ...data],
		});
	};

	onFetchUpdate = (data1: any) => {
		const { data, tempData } = this.state;
		console.log("tempdata", tempData);
		const temp = [...tempData, ...data1];
		const newData = [...data1];

		if (newData.length === 0) {
			this.setState({ flag: true });
		}
		const len = newData.length;

		console.log("newData", newData);
		console.log("data1", data1);
		let i = 0;
		while (i < len) {
			const subArr = [];
			subArr.push(newData[i]);
			i += 1;
			if (i < len) {
				subArr.push(newData[i]);
				i += 1;
			}
			if (Metrics.isTablet) {
				if (i < len) {
					subArr.push(newData[i]);
					i += 1;
				}
				if (i < len) {
					subArr.push(newData[i]);
					i += 1;
				}
			}
			newData.push(subArr);
			console.log("new data", newData);
		}
		this.setState({
			loading: false,
			refresh: false,
			message: Constants.emptyMessages.noRecord,
			data: newData,
			tempData: temp,
		});
	};

	onFetchFailure = () => {
		this.setState({
			loading: false,
			refresh: false,
			message: Constants.errorMessages.general,
			data: [],
		});
	};

	onFetchError = (error: any) => {
		console.log("mag error", error);
		let message = Constants.errorMessages.general;
		if (error.toString().includes(Constants.errorMessages.checkNetwork)) {
			message = Constants.errorMessages.network;
		}
		this.setState({ loading: false, refresh: false, message });
	};

	onItemPress = (item: any) => {
		const { navigation } = this.props;
		console.log("itemmmms ", item);
		navigation.navigate("MagazineIssueHomeScreen", {
			item: {
				nid: item.nid,
				title: item.title,
				issue_date: item.field_issue_date,
				brand_id: item.field_magazine_brand,
				image: item.field_image,
			},
		});
	};

	onRefresh = () => {
		this.setState({
			//refresh: true,
			loading: true,
		});
		console.log("refresh");
		PreviousIssueApi(
			"MagazinePrevListContainer",
			this.onFetchSuccess,
			this.onFetchFailure,
			this.onFetchError,
			0,
		);
	};

	onEndReached = () => {
		const { pageNumber, flag } = this.state;
		if (!flag) {
			if (this.state.loading === false) {
				const updated = pageNumber + 1;
				this.setState({ pageNumber: updated, loading: true });
				PreviousIssueApi(
					"MagazinePrevListContainer",
					this.onFetchSuccess,
					this.onFetchFailure,
					this.onFetchError,
					pageNumber,
				);
			}
		}
	};

	render() {
		const { loading, message, refresh, data } = this.state;
		const { navigation, user, userSubscribe } = this.props;
		const item = navigation.getParam("item");
		const title = navigation.getParam("title");
		let issue =
			user.magazines &&
			user.magazines.ISSUE &&
			user.magazines.ISSUE.find(obj => obj.issue_id == item.nid);
		if (!issue && userSubscribe) {
			issue =
				userSubscribe.magazines &&
				userSubscribe.magazines.ISSUE &&
				userSubscribe.magazines.ISSUE.find(obj => obj.issue_id == item.nid);
		}
		return (
			<MagazineListUI
				loading={loading}
				message={message}
				refresh={refresh}
				{...this.props} 
				data={data}
				passedItem={item}
				title={title}
				onItemPress={this.onItemPress}
				onRefresh={this.onRefresh}
				onEndReached={this.onEndReached}
				isBanner={!issue}
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
)(MagazinePrevListContainer);
