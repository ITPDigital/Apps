import React from "react";
import { StyleSheet, ActivityIndicator, View, Text, StatusBar } from "react-native";
import { Colors, ScalePerctFullHeight, ScalePerctFullWidth } from "../../asset";

type Props = {
	title?: string,
	style?: number | Object | Array<number>,
	textStyle?: number | Object | Array<number>,
};

const renderLoading = () => { 
	return <ActivityIndicator size="large" color="#f99509" />;
};

export default function Loading(props: Props) {
	const { style, textStyle, title } = props;
	return (
		<View style={StyleSheet.flatten([styles.container, style])}>
			<StatusBar backgroundColor={Colors.bgPrimaryDark} barStyle="light-content" />
			<Text style={StyleSheet.flatten([styles.text, textStyle])}>{title}</Text>
			{renderLoading()}
		</View>
	);
}

type ListProps = {
	loading?: boolean,
	refresh?: boolean,
};

export function ListLoading(props: ListProps) {
	const { loading, refresh } = props;
	if (loading && !refresh) {
		return (
			<View style={styles.footer}> 
				<ActivityIndicator size="large" color="#f99509"  />    
			</View>
		);
	}
	return <View style={styles.footerEmpty} />;
}

ListLoading.defaultProps = {
	loading: true,
	refresh: false,
};

Loading.defaultProps = {
	style: undefined,
	textStyle: undefined,
	title: "Loading",
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		width: ScalePerctFullWidth(70),
		height: ScalePerctFullHeight(15),
	},
	text: {
		paddingBottom: 20,
		fontSize: 17,
		color: Colors.bodyPrimaryLight,
	},
	footer: {
		padding: 100,
	},
	footerEmpty: {
		padding: 10,
	},
});

//   onPress: Function,
// <TouchableHighlight
// onPress={props.onPress}
// style={StyleSheet.flatten([styles.container, props.style])}
// >
// <Text style={StyleSheet.flatten([styles.text, props.textStyle])}>{props.children}</Text>
// </TouchableHighlight>
