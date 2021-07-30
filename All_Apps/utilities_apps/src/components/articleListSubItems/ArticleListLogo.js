import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors, Metrics, ScalePerctFullWidth, Images } from "../../asset";

type Props = {
	imageUrl?: string,
	isFollow?: boolean,
	paddingTop?: boolean,
	onPressBrand?: Function,
};

export default function ArticleListLogo(props: Props) {
	const {
		imageUrl,
		isFollow,
		isLessPadding,
		tabContainerStyle,
		site,
		user,
		onFollow,
		onPressBrand,
	} = props;
	const url = !imageUrl || imageUrl.includes("public://") ? null : imageUrl;
	let isFollowing = false;
	if (user && user.brands) {
		isFollowing = user.brands.includes(site);
	}
	return (
		<View
			style={[
				styles.container,
				tabContainerStyle || null,
				isLessPadding ? { paddingTop: 15 } : {},
			]}
		>
			<TouchableOpacity
				onPress={() => onPressBrand(site, url)}
				style={styles.imageContainer}
			>
				<Image
					source={{ uri: url }}
					//source={Images.ABlogo}
					resizeMode={"stretch"}
					style={StyleSheet.flatten([styles.imageOne])}
				/>
			</TouchableOpacity>
			{isFollow &&
				(isFollowing ? (
					<TouchableOpacity onPress={() => onFollow(false, site)}>
						<View style={styles.followCont}>
							<Text style={styles.followContText}>{"Following"}</Text>
						</View>
					</TouchableOpacity>
				) : (
					<TouchableOpacity onPress={() => onFollow(true, site)}>
						<Image
							source={require("../../asset/Images/follow.png")}
							resizeMode={"stretch"}
							style={StyleSheet.flatten([styles.followImage])}
						/>
					</TouchableOpacity>
				))}
		</View>
	);
}

ArticleListLogo.defaultProps = {
	imageUrl: null,
	isFollow: true,
	paddingTop: false,
	onPressBrand: () => {},
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		paddingHorizontal: 20,
		paddingTop: 10,
		width: ScalePerctFullWidth(100),
		paddingBottom: 0,
		alignItems: "center",
	},
	imageContainer: {
		flex: 1,
		alignSelf: "flex-start",
		paddingTop: 10,
	},
	imageOne: {
		height: 15,
		width: 150,
	},
	followImage: {
		height: 30,
		width: 90,
		paddingLeft: Metrics.DEFAULT_LIST_PADDING,
	},
	followCont: {
		height: 30,
		width: 90,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: Colors.bgPink,
		alignItems: "center",
		justifyContent: "center",
	},
	followContText: {
		fontSize: 12,
		fontFamily: "BentonSans Bold",
		color: Colors.bgPink,
	},
});
