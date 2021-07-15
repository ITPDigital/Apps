import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../redux";
import MagazineListUI from "./MagazineListUI";
import { MagazineIssueApi } from "../../service";
import { Constants, Metrics } from "../../asset";
import { Analytics, Screen } from "../../Analytics";

type Props = {
	screenProps: any,
	navigation: any,
};

class MagazineListContainer extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			refresh: false,
			message: Constants.emptyMessages.noRecord,
			data: [],
		};
	}

	componentDidMount() {
		Analytics.setCurrentScreen("MAGAZINE_HOME");
		this.setState({
			loading: true,
		});
		MagazineIssueApi(this.onFetchSuccess, this.onFetchFailure, this.onFetchError);
	}

	onFetchSuccess = (data: any) => {
		console.log("MAGAZINESDATA", data);
		const len = data.length;
		const newData = [];
		let i = 0;
		while (i < len) {
			const subArr = [];
			subArr.push(data[i]);
			i += 1;
			if (i < len) {
				subArr.push(data[i]);
				i += 1;
			}
			if (Metrics.isTablet) {
				if (i < len) {
					subArr.push(data[i]);
					i += 1;
				}
				if (i < len) {
					subArr.push(data[i]);
					i += 1;
				}
			}
			newData.push(subArr);
			console.log("newData,", newData);
		}
		this.setState({
			loading: false,
			refresh: false,
			message: Constants.emptyMessages.noRecord,
			data: newData,
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
		let message = Constants.errorMessages.general;
		if (error.toString().includes(Constants.errorMessages.checkNetwork)) {
			message = Constants.errorMessages.network;
		}
		this.setState({ loading: false, refresh: false, message });
	};

	onItemPress = (item: number) => {
		const { navigation } = this.props;

		navigation.navigate("MagazineIssueHomeScreen", { item });
	};

	onRefresh = () => {};

	onEndReached = () => {};

	render() {
		const { loading, message, refresh, data } = this.state;
		console.log("main data for mag", this.props.data);
		// const { data } = this.props;
		return (
			<MagazineListUI
				loading={loading}
				message={message}
				refresh={refresh}
				{...this.props}
				data={data}
				onItemPress={this.onItemPress}
				onRefresh={this.onRefresh}
				onEndReached={this.onEndReached}
			/>
		);
	}
}

function mapStateToProps(state) {
	return {
		data: state.myTrove,
		user: state.user,
		isSplashScreenHide: state.isSplashScreenHide,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(MagazineListContainer);
