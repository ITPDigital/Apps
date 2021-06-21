import React, { Component } from "react";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { FollowList } from "../../components";
import { connect } from "react-redux";
import { StartUp, TopicsPreferenceAPI } from "../../service";
import { bindActionCreators } from "redux";
import { Actions } from "../../redux";
import { Analytics, Screen } from "../../Analytics";

type Props = {
	navigation: any,
	topics: any,
	selectedList: any,
	isNotStartUp?: boolean,
};

class Topics extends Component {
	constructor(props) {
		super(props);
		this.state = {
			preferenceLoading: false,
			imageUrl: "https://facebook.github.io/react-native/docs/assets/favicon.png",
		};
		this.magnageTopics(props.topics, props.user, props.setMenuTopicsAction);
		//new StartUp(props);
	}

	componentDidMount() {
		SplashScreen.hide();
		Analytics.setCurrentScreen("SELECT_TOPICS");
		if (!this.props.isSplashScreenHide) {
			this.props.setStartUpAction(true);
		}
	}

	magnageTopics = (topics: array, user, setMenuTopicsAction) => {
		if (user) {
			const alreadySelected = new Set(user["topics"].split("|"));
			const selectedTopics = [];
			topics.forEach((item: any) => {
				if (alreadySelected.has(item.tid)) {
					selectedTopics.push(item);
				}
			});
			setMenuTopicsAction(selectedTopics);
			console.log("Selected topics in topics after login", selectedTopics);
		}
	};

	onSelected = (followTrack: array) => {
		const { setMenuTopicsAction, navigation, user, selectedTopics } = this.props;
		this.setState({ preferenceLoading: true });
		setMenuTopicsAction(followTrack);

		user &&
			TopicsPreferenceAPI(
				user.id,
				getTopicString(followTrack),
				this.onSuccess,
				this.onFailure,
				this.onError,
			);
	};

	onSuccess = (response: any, selectedTopics: string) => {
		const { navigation, isNotStartUp, setUserTopicAction } = this.props;
		this.setState({ preferenceLoading: false });
		setUserTopicAction(selectedTopics);
		navigation.navigate(isNotStartUp ? "BrandsStackScreen" : "BrandsAuthScreen");
	};

	onFailure = (response: any) => {
		alert("Filed to save your preferences.");
	};

	onError = (error: any) => {
		alert("Please check your internet connection. ");
	};

	render() {
		const { topics, selectedTopics, navigation, isNotStartUp } = this.props;
		const { isLoading, preferenceLoading } = this.state;
		const isBack = isNotStartUp;
		console.log("selectedTopics", selectedTopics);
		console.log("topics--", topics);

		return (
			<FollowList
				preferenceLoading={preferenceLoading}
				loading={false}
				isLoading={isLoading}
				data={topics}
				isBack={isBack}
				navigation={navigation}
				isTopic
				onSelected={followTrack => this.onSelected(followTrack)}
				selectedTopicList={selectedTopics}
			/>
		);
	}
}

function getTopicString(selectedTopics) {
	console.log("selectedTopics1", selectedTopics);
	let topics;
	selectedTopics.forEach((item, index) => {
		if (index === 0) {
			topics = item.tid;
		} else {
			topics = topics + "|" + item.tid;
		}
	});
	//let topicValue = topics.slice(0, -1);
	console.log("topicValue: ", topics);
	return topics;
}

Topics.defaultProps = {
	isNotStartUp: false,
};

const mapStateToProps = state => ({
	topics: state.allTopics,
	selectedTopics: state.menuTopics,
	user: state.user,
	isSplashScreenHide: state.isSplashScreenHide,
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Topics);
