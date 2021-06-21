import React, { PureComponent } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { WebView } from "react-native-webview";
import Orientation from "react-native-orientation";
import { Actions } from "../../redux";
import { ScalePerctFullWidth, ScalePerctFullHeight, Metrics, Colors } from "../../asset";
import { ProfileHeader } from "../../components";

type Props = {
	navigation: any,
};

class FlowPlayerContainer extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = { loading: true };
	}

	// componentDidMount() {

	// 	Orientation.lockToLandscape();
	// }

	// componentWillUnmount() {

	// 	Orientation.lockToPortrait();
	// }

	hideSpinner = () => {
		this.setState({ loading: false });
	};

	render() {
		const { navigation } = this.props;
		let link = navigation.getParam("link");
		link = link && link.replace("<p>", "");
		link = link && link.replace("</p>", "");

		return (
			<View style={styles.container}>
				<ProfileHeader
					navigation={navigation}
					onBack={() => navigation.goBack()}
					title=""
					isBottomBorder={false}
				/>
				<WebView
				    useWebKit={true}
					onLoad={() => this.hideSpinner()}
					source={{
						uri: link,
					}}
					style={{
						height: ScalePerctFullHeight(100) - Metrics.HEADER_HEIGHT,
						width: ScalePerctFullWidth(100),
					}}
				/>
				{this.state.loading && (
					<ActivityIndicator
						style={{
							position: "absolute",
							top: ScalePerctFullHeight(100) / 2,
							left: ScalePerctFullWidth(100) / 2,
						}}
						size="small"
					/>
				)}
			</View>
		);
	}
}

function mapStateToProps() {
	// state
	return {};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(FlowPlayerContainer);

const styles = StyleSheet.create({
	header: {
		alignSelf: "flex-start",
	},
	container: {
		flexDirection: "column",
		alignItems: "center",
		alignContent: "center",
		justifyContent: "center",
		flex: 1,
	},
});
