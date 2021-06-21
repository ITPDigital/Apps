import React, { PureComponent } from "react";
import { View, StyleSheet, Linking } from "react-native";
import HTML from "react-native-render-html";

import { ScalePerctFullWidth, ScalePerctFullHeight } from "../../asset";
// import { Button, TextInput } from "../../components";

type Props = {
	caption: any,
};

export default class BigImageFooter extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = {};
	}

	renderDescription = (title: string) => {
		const caption = "<body style='color:white'>" + title + "</body>";
		return (
			<View
				style={{
					marginTop: ScalePerctFullHeight(1.6),
					marginLeft: ScalePerctFullWidth(5.6),
					marginRight: ScalePerctFullWidth(5.3),
					marginBottom: ScalePerctFullHeight(1.6),
				}}
			>
				<HTML
					html={caption}
					tagsStyles={{ a: { color: "#EC0018" } }}
					onLinkPress={(evt, href) => {
						Linking.openURL(href);
						console.log("evt", evt, "href", href);
					}}
				/>
			</View>
		);
	};

	// renderAuthor = (author: string) => {
	// 	return <Text style={[styles.authorText]}>{author}</Text>;
	// };

	render() {
		const { caption, author } = this.props;

		return (
			<View style={StyleSheet.flatten([styles.container])}>
				{this.renderDescription(caption)}
				{/* {this.renderAuthor(author)} */}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: ScalePerctFullWidth(100),

		flexDirection: "column",
		justifyContent: "center",
		backgroundColor: "black",
	},
});
