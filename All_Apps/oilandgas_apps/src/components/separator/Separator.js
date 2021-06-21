import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../../asset";

export default function Separator() {
	return <View style={styles.container} />;
}

const styles = StyleSheet.create({
	container: {
		borderBottomColor: Colors.linePrimary,
		borderBottomWidth: 1,
		flex: 1,
		alignSelf: "center",
	},
});
