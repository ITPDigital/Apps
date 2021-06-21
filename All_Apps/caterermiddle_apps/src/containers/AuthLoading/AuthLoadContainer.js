import React, { PureComponent } from "react";
import { View, StyleSheet, Text, WebView } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SvgUri from "react-native-svg-uri";
import Svg, { Circle, Rect } from "react-native-svg";
// import Icon from "react-native-vector-icons/FontAwesome";
import Icon from "../../asset/fonts/icons";
import { Actions } from "../../redux";
import { Colors, ScalePerctFullWidth, ScalePerctFullHeight } from "../../asset";
import { LoadingComp, PagerHeader } from "../../components";
// const small = require("./small.svg") as string ;
// var fs = require("fs");

// function readModuleFile(path, callback) {
// 	try {
// 		var filename = require.resolve(path);
// 		fs.readFile(filename, "utf8", callback);
// 	} catch (e) {
// 		callback(e);
// 	}
// }

// readModuleFile("./small.svg", function(err, words) {

// 	small = words;

// });
const small = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="18px" height="14px" viewBox="0 0 18 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="UI-KIT" transform="translate(-1526.000000, -5181.000000)" stroke="#FFFFFF" stroke-width="1.5">
            <g id="arrow-left" transform="translate(1527.000000, 5182.000000)">
                <path d="M16,6 L0,6" id="Shape"></path>
                <polyline id="Shape" points="6 12 0 6 6 0"></polyline>
            </g>
        </g>
    </g>
</svg>`;
// var RNFS = require("react-native-fs");
// RNFS.readFile("./small.svg", "utf8").then(contents => {
// 	console.warn(contents);
// 	small = contents;
// });

type Props = {
	navigation: any,
};

class AuthLoadContainer extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View style={styles.container}>
				{/* <LoadingComp title="Authenticating..." /> */}
				{/* <SvgUri width="200" height="200" svgXmlData={small} />
				<PagerHeader
					page={1}
					totalPage={2}
					onAction={() => {}}
					onBack={() => {}}
					actionLabel={"Skip"}
					style={styles.header}
				/> */}
				<WebView
					source={{
						uri:
							"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/501298839",
					}}
					useWebKit={true}
					style={{ height: 300, width: ScalePerctFullWidth(100) }}
				/>
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
)(AuthLoadContainer);

const styles = StyleSheet.create({
	header: {
		alignSelf: "flex-start",
	},
	container: {
		flexDirection: "column",
		alignItems: "center",
		alignContent: "center",
		justifyContent: "center",
		backgroundColor: Colors.bgPrimaryLight,
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullHeight(100),
	},
});
