import React from "react";
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity ,Image} from "react-native";
import SvgUri from "react-native-svg-uri";
import { ScalePerctFullWidth, ScalePerctFullHeight, Colors, Metrics } from "../../asset";

type Props = {
	name: string,
	id: number,
	field_image: string,
	containerStyle: any,
	isFollowed: boolean,
	blur: boolean,
	onPress: function,
};

const follow = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="102px" height="32px" viewBox="0 0 102 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Group-2">
            <path d="M16,0.5 C7.43958638,0.5 0.5,7.43958638 0.5,16 C0.5,24.5604136 7.43958638,31.5 16,31.5 L86,31.5 C94.5604136,31.5 101.5,24.5604136 101.5,16 C101.5,7.43958638 94.5604136,0.5 86,0.5 L16,0.5 Z" id="Rectangle" stroke="#FFFFFF" fill-rule="nonzero"></path>
        </g>
    </g>
</svg>`;

const following = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="102px" height="32px" viewBox="0 0 102 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Group-2-Copy">
            <path d="M16,0.5 C7.43958638,0.5 0.5,7.43958638 0.5,16 C0.5,24.5604136 7.43958638,31.5 16,31.5 L86,31.5 C94.5604136,31.5 101.5,24.5604136 101.5,16 C101.5,7.43958638 94.5604136,0.5 86,0.5 L16,0.5 Z" id="Rectangle" stroke="#FFFFFF" fill="#FFFFFF" fill-rule="nonzero"></path>
            
        </g>
    </g>
</svg>`;

export default function TopcisCard(props: Props) {
	let { name, id, field_image, containerStyle, isFollowed, onPress, blur, isTopic } = props;

	const followButtonWidth = Metrics.isTablet? 10:24;
	field_image = field_image ? field_image : "https://www.the-star.co.ke/sites/default/files/styles/new_full_content/public/articles/2018/06/03/1481290.jpg?itok=tr_Wexxs"
	
	return (
		<TouchableOpacity onPress={onPress} activeOpacity={1.0}>
			{isTopic ? (<ImageBackground
				source={{
					uri: field_image,
				}}
				style={[style.container, containerStyle]}
			>
				<View style={style.emptyView} />
				<View style={style.nameContainer}>
					<Text style={style.text}>{name}</Text>
				</View>
				{/* <Text style={style.text}>{name}</Text> */}
				{/* <View style={style.followButton} /> */}

				<View style={style.followView}>
					<SvgUri
						width={ScalePerctFullWidth(followButtonWidth)}
						height={ScalePerctFullHeight(5)}
						svgXmlData={isFollowed ? following : follow}
					/>
					<View
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						{isFollowed ? (
							<Text> Following</Text>
						) : (
								<Text style={style.follow}>+ Follow</Text>
							)}
					</View>
				</View>
			</ImageBackground>):(<View
				style={StyleSheet.flatten([style.container, containerStyle,style.brandContainer])}
			>
				<View style = {style.fieldLogo}>
					<Image source = {{uri:field_image}} style = {style.fieldLogo}/>
				</View>
				
				{/* <View style={style.followButton} /> */}

				<View style={style.followView}>
					<SvgUri
						width={ScalePerctFullWidth(followButtonWidth)}
						height={ScalePerctFullHeight(5)}
						svgXmlData={isFollowed ? following : follow}
					/>
					<View
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						{isFollowed ? (
							<Text style = {style.following}> Following  </Text>
						) : (
								<Text style={style.follow}>+ Follow</Text>
							)}
					</View>
				</View>
			</View>)
			}
		</TouchableOpacity>
	);
}


TopcisCard.defaultProps = {
	id: 1,
	name: "Topics name",
	field_image: "https://www.the-star.co.ke/sites/default/files/styles/new_full_content/public/articles/2018/06/03/1481290.jpg?itok=tr_Wexxs",
	actionLabel: "Action",
	page: 1,
	totalPage: 2,
};

const tabStyles = StyleSheet.create({
	container: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 4,
		backgroundColor: Colors.bgPrimaryDark,
		height: ScalePerctFullHeight(15),
		width: ScalePerctFullWidth(15),
		margin: 10,
	},
	brandContainer: {
		backgroundColor: Colors.bgPrimaryDark,
	},
	emptyView: {
		flex: 1,
	},
	text: {
		fontFamily: "BentonSans Bold",
		fontSize: 14,
		color: Colors.bgPrimaryLight,
		//marginBottom: 10,
		alignSelf: "center",
		textAlign: "center",
		//backgroundColor:"red"
	},
	nameContainer:{
		//marginBottom: 1,
		alignItems: "center",
		justifyContent:"center",
		flex:0.3,
		//marginBottom:18,
		//width: ScalePerctFullWidth(10),
		//height: ScalePerctFullHeight(10),
		//backgroundColor:"yellow"
	},
	followButton: {
		backgroundColor: Colors.brandPrimary,
		height: ScalePerctFullHeight(5),
		width: ScalePerctFullWidth(24),
		margin: 16,
		borderRadius: 17.5,
	},
	followView: {
		height: ScalePerctFullHeight(5),
		width: ScalePerctFullWidth(24),
		alignItems: "center",
		paddingBottom: 16,
		//marginBottom: 16,
		//backgroundColor:"orange"
	},
	fieldLogo:{
		alignSelf:"center",
		height: ScalePerctFullHeight(4),
		width: ScalePerctFullWidth(14),
		marginBottom:ScalePerctFullHeight(3),
		marginTop:ScalePerctFullHeight(2),
		resizeMode:"contain",
	},
	followText: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "red",
		alignSelf: "center",
	},
	follow: {
		textAlign: "center",
		//alignSelf: "center",
		color: Colors.bgPrimaryLight,
	},
	following: {
		justifyContent: "center",
		color: Colors.bgPrimaryDark,
		textAlign: "center",
		//alignSelf: "center",
	},
	blur: {
		backgroundColor: Colors.bgTransparent,
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
});

const normalStyles = StyleSheet.create({
	container: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 4,
		backgroundColor: Colors.bgPrimaryDark,
		height: ScalePerctFullHeight(28),
		width: ScalePerctFullWidth(35),
		margin: 10,
	},
	emptyView: {
		flex: 1,
	},
	brandContainer: {
		backgroundColor: Colors.bgPrimaryDark,
	},
	fieldLogo:{
		alignSelf:"center",
		height: ScalePerctFullHeight(10),
		width: ScalePerctFullWidth(24),
		marginBottom:ScalePerctFullHeight(3),
		resizeMode: "contain"
	},
	text: {
		fontFamily: "BentonSans Bold",
		fontSize: 14,
		alignSelf: "center",
		color: Colors.bgPrimaryLight,
		marginBottom: 10,
		textAlign: "center",
	},
	nameContainer:{
		marginBottom: 0,
		flexDirection: "row",
		alignSelf: "center",
		width: ScalePerctFullWidth(25),
		justifyContent: "center",
		alignItems: "center",
	},
	followButton: {
		backgroundColor: Colors.brandPrimary,
		height: ScalePerctFullHeight(5),
		width: ScalePerctFullWidth(24),
		margin: 16,
		borderRadius: 17.5,
	},
	followView: {
		height: ScalePerctFullHeight(5),
		width: ScalePerctFullWidth(24),
		alignItems: "center",
		marginBottom: 16,
	},
	followText: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "red",
		alignSelf: "center",
	},
	follow: {
		alignSelf: "center",
		color: Colors.bgPrimaryLight,
	},
	following: {
		
		color: Colors.bgPrimaryDark,
		alignSelf: "center",
	},
	blur: {
		backgroundColor: Colors.bgTransparent,
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
});

const style = Metrics.isTablet ? tabStyles : normalStyles;
