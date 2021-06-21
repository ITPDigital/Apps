import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Platform, Alert } from "react-native";
import * as RNIap from "react-native-iap";

import { Actions } from "../../redux";
import MagazineSubscribeUI from "./MagazineSubscribeUI";
import { Metrics, emailValidator, Strings, Constants } from "../../asset";
import { LoginApi, SubscriptionApi } from "../../service";
import { setSubscribeUserIdStorage } from "../../storage";
import { AlertComp } from "../../components";
import { Analytics, Screen } from "../../Analytics";
import { brandId } from "../../service/Constant";

type Props = {};

const subscriptionItems = Platform.select({
	ios: ["ab.monthly", "ab.annual"],
	android: ["ab.monthly", "ab.annual"],
});

class MagazineDetailContainer extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = {
			showLoader: true,
			subscription: [],
			receipt: {},
		};
	}

	componentDidMount = () => {
		Analytics.setCurrentScreen("MAGAZINE_LOGIN");
		RNIap.initConnection();

		RNIap.getSubscriptions(subscriptionItems)
			.then((items) => {
				console.log(items);
				this.setState({
					subscription: items,
					showLoader: false,
				});
			})
			.catch((error) => {
				this.setState({
					showLoader: false,
				});
				console.log(error.message);
			});
	};

	componentWillUnmount() {
		RNIap.endConnection();
	}

	subscribe = (item) => {
		const { user } = this.props;
		console.log(item);
		RNIap.buySubscription(item.productId)
			.then((purchase) => {
				console.log("purchaseID of IAP", purchase);
				const isIOS = Platform.OS === "ios";
				let transactionDetails = {};
				if (isIOS) {
					transactionDetails = {
						user_id: user && user.id,
						brandId,
						amount: item.price,
						transactionId: purchase && purchase.transactionId,
						productId: purchase && purchase.productId,
						transactionDate: purchase && purchase.transactionDate,
						transactionReceipt: purchase && purchase.transactionReceipt,
						originalTransactionIdentifier:
							purchase && purchase.originalTransactionIdentifierIOS,
						originalTransactionDate: purchase && purchase.originalTransactionDateIOS,
						payment_gateway: "APPLE",
					};
				} else {
					transactionDetails = {
						user_id: user && user.id,
						brandId,
						amount: item.price,
						transactionId: purchase && purchase.transactionId,
						productId: purchase && purchase.productId,
						transactionDate: purchase && purchase.transactionDate,
						transactionReceipt: purchase && purchase.purchaseToken,
						payment_gateway: "GOOGLE",
					};
				}
				this.setState({
					receipt: purchase,
				});
				SubscriptionApi(
					transactionDetails,
					this.onSuccessfullTransaction,
					this.onFailureTransaction,
					this.onErrorTransaction,
				);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	onSuccessfullTransaction = (response) => {
		const { navigation } = this.props;
		AlertComp(Strings.authentication.ALERT, "Successfully subscribed", () => navigation.navigate("MagazineTabScreen"),);
	};

	onFailureTransaction = (response) => {
		const { receipt } = this.state;
		const myResponse = JSON.stringify(receipt);
		alert("Failed to save magazine");
	};

	onErrorTransaction = (response) => {
		const { receipt } = this.state;
		const myResponse = JSON.stringify(receipt);
		alert("Error in save magazine");
	};

	handleLogin = (email, password) => {
		if (!email || !password) {
			AlertComp(Strings.authentication.ALERT, "Enter the valid email and password");
		} else if (!emailValidator(email)) {
			AlertComp(Strings.authentication.ALERT, Strings.authentication.ENTER_VALID_EMAIL);
		} else {
			this.setState({ showLoader: true });
			LoginApi(email, password, this.onSuccess, this.onFailure, this.onError);
		}
	};

	onSuccess = (data: Object) => {
		const { setSubscribeUserAction, navigation } = this.props;
		this.setState({ showLoader: false });
		setSubscribeUserIdStorage(data.id);
		setSubscribeUserAction(data);
		const item = navigation.getParam("item");
		const flowPlayer = navigation.getParam("data");

		const issue =			data
			&& data.magazines
			&& data.magazines.ISSUE
			&& data.magazines.ISSUE.find(obj => obj.issue_id == item.nid);

		if (issue) {
			navigation.navigate("FlowPlayerHomeScreen", {
				link: flowPlayer && flowPlayer.field_magazine_code,
			});
		} else {
			AlertComp(
				Strings.authentication.ALERT,
				"Not subscribed for this issue, Please subscribe",
			);
		}
	};

	onFailure = (response: Object) => {
		// const { navigation } = this.props;
		this.setState({ showLoader: false });
		// if (response.error_code === "103") {
		// 	// alert(response.message);
		// 	navigation.navigate("MessageAuthScreen", {
		// 		message: response.message,
		// 	});
		// } else if (response.error_code === "101") {
		// 	navigation.navigate("MessageAuthScreen", {
		// 		message: response.message,
		// 		resend: true,
		// 		id: response.id,
		// 	});
		// 	console.log("fail", response.message);
		// } else if (response.error_code === "102") {
		// 	navigation.navigate("MessageAuthScreen", {
		// 		message: response.message,
		// 	});
		// } else {
		// alert(response.message);
		// }
		AlertComp(Strings.authentication.ALERT, response.message);
	};

	onError = (error: any) => {
		this.setState({ showLoader: false });
		let message = Constants.errorMessages.general;
		if (error.toString().includes(Constants.errorMessages.checkNetwork)) {
			message = Constants.errorMessages.network;
		}
		AlertComp(Strings.authentication.ALERT, message);
	};

	render() {
		const { showLoader, subscription } = this.state;

		const { navigation } = this.props;
		const item = navigation.getParam("item");
		const data = navigation.getParam("data");
		return (
			<MagazineSubscribeUI
				{...this.props}
				showLoader={showLoader}
				handleLogin={this.handleLogin}
				item={item}
				data={data}
				subscription={subscription}
				onSubscriptionClick={item => this.subscribe(item)}
			/>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(MagazineDetailContainer);
