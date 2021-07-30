import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../../asset";

export default function GalleryLine() {
	return <View style={styles.container} />;
}

const styles = StyleSheet.create({
	container: {
		borderBottomColor: Colors.linePrimary,
		borderBottomWidth: 2,
		flex: 1,
		alignSelf: "center",
		borderColor: "black",
	},
});
