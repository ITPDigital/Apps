import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../asset";

type Props = {
	style?: number | Object | Array<number>,
};

export default function Line(props: Props) {
	return <View style={StyleSheet.flatten([styles.container, props.style])} />;
}

Line.defaultProps = {
	style: undefined,
};

const styles = StyleSheet.create({
	container: {
		borderBottomColor: Colors.linePrimary,
		borderBottomWidth: 2,
	},
});
