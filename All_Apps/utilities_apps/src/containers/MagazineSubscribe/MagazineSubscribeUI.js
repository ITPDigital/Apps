import React, { PureComponent } from "react";
import {
	StyleSheet,
	View,
	ScrollView,
	Text,
	Image,
	ActivityIndicator,
	TouchableOpacity,
} from "react-native";
import ImageLoad from "react-native-image-placeholder";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ListLoading, Button, TextInput } from '../../components';
import {
	TemplateConfig,
	Metrics,
	Constants,
	Colors,
	ScalePerctFullWidth,
	Images,
	ScalePerctFullHeight,
	Strings,
} from "../../asset";

type Props = {
	data: any,
	loading: boolean,
	refresh: boolean,
	subscriptions: Array,
};

export default class MagazineSubscriveUI extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = { email: "", password: "" };
	}

	render() {
		const {
			navigation,
			handleLogin,
			showLoader,
			item,
			data,
			subscription,
			onSubscriptionClick,
		} = this.props;
		const { email, password } = this.state;
		return (
			<View style={styles.fullContainer}>
				{showLoader ? (
					<View style={styles.indicator}>
						<ActivityIndicator size="large" color="white" />
					</View>
				) : (
					<ScrollView style={styles.fullContainer}>
						<View style={styles.loginContentContainer}>
							<ImageLoad
								resizeMode="cover"
								style={styles.loginContainer}
								placeholderStyle={styles.imageOne}
								isShowActivity={false}
								loadingStyle={{ size: "large", color: "grey" }}
								source={data.field_image != ""?{
									uri: data.field_image,
								}:Images.protrait}
								placeholderSource={Images.protrait}
								// borderRadius={4}
							/>
							<View style={styles.loginContentContainer}>
								<TouchableOpacity
									onPress={() => {
										navigation.goBack();
									}}
									style={styles.buttonContainer}
								>
									<Icon name="clear" size={20} color={Colors.bgPrimaryLight} />
								</TouchableOpacity>
								{/* <Text style={styles.subscribedText}>{"Already Subscribed?"}</Text>
								<View style={styles.formStyle}>
									<TextInput
										label={Strings.authentication.EMAIL}
										reference={(component: any) => {
											this.email = component;
										}}
										onSubmitEditing={() => this.password.focus()}
										returnKeyType="next"
										keyboardType="email-address"
										onChangeText={text => this.setState({ email: text })}
									/>
									<TextInput
										label={Strings.authentication.PASSWORD}
										secureTextEntry
										reference={(component: any) => {
											this.password = component;
										}}
										onChangeText={text => this.setState({ password: text })}
										buttonLabel="HELP"
										onPress={() => {}}
										onSubmitEditing={() => {
											handleLogin(email, password);
										}} //handleLogin(email, password)
										disabled={false}
									/>
								</View>
								<Text style={styles.restoreText}>
									{"Restore your Subscription "}
									<Text style={styles.clickHereText}>{"Click here"}</Text>
								</Text>
								<Button
									title={Strings.authentication.LOGIN}
									buttonStyle={{
										marginTop: ScalePerctFullHeight(8),
										marginBottom: Metrics.isTablet
											? ScalePerctFullHeight(2)
											: ScalePerctFullHeight(4),
									}}
									disabled={false}
									//showLoader={showLoader}
									onPress={() => handleLogin(email, password)}
									button={Images.loginButton}
									imageStyle={{
										alignSelf: "center",
										width: Metrics.isTablet
											? ScalePerctFullWidth(50)
											: ScalePerctFullWidth(100),
										height: Metrics.isTablet ? ScalePerctFullHeight(10) : 100,
									}}
									top={Metrics.isTablet ? 4 : 11}
								/>
								<Text style={styles.troubleText}>
									{"Having trouble accessing your Subscription? "}
									<Text style={styles.clickHereText}>{"Click here"}</Text>
								</Text> */}
							</View>
						</View>
						<View>
							<Text style={styles.subTitleText}>Subscribe to our magazine</Text>
							{subscription.map((item, index) => {
								return (
									<View style={styles.subView} key={index.toString()}>
										<Text style={styles.subViewTitle}>{item.title}</Text>
										<TouchableOpacity
											style={styles.subViewTouch}
											onPress={() => onSubscriptionClick(item)}
										>
											<Text
												style={styles.subViewRate}
											>
{`${item.localizedPrice}`}

           </Text>
										</TouchableOpacity>
									</View>
								);
							})}
							{/* {data.subs_options && data.subs_options.ISSUE && (
								<View style={styles.subView}>
									<Text style={styles.subViewTitle}>{"For 1 Issue"}</Text>
									<TouchableOpacity style={styles.subViewTouch}>
										<Text style={styles.subViewRate}>{`$${
											data.subs_options.ISSUE.subs_charge
										}`}</Text>
									</TouchableOpacity>
								</View>
							)}
							{data.subs_options && data.subs_options.BRAND_MONTHLY && (
								<View style={styles.subView}>
									<Text style={styles.subViewTitle}>{"For Brand Monthly"}</Text>
									<TouchableOpacity style={styles.subViewTouch}>
										<Text style={styles.subViewRate}>{`$${
											data.subs_options.BRAND_MONTHLY.subs_charge
										}`}</Text>
									</TouchableOpacity>
								</View>
							)}
							{data.subs_options && data.subs_options.BRAND_ANNUAL && (
								<View style={styles.subView}>
									<Text style={styles.subViewTitle}>{"For Brand Annual"}</Text>
									<TouchableOpacity style={styles.subViewTouch}>
										<Text style={styles.subViewRate}>{`$${
											data.subs_options.BRAND_ANNUAL.subs_charge
										}`}</Text>
									</TouchableOpacity>
								</View>
							)}
							{data.subs_options && data.subs_options.ALL_MONTHLY && (
								<View style={styles.subView}>
									<Text style={styles.subViewTitle}>{"For All Monthly"}</Text>
									<TouchableOpacity style={styles.subViewTouch}>
										<Text style={styles.subViewRate}>{`$${
											data.subs_options.ALL_MONTHLY.subs_charge
										}`}</Text>
									</TouchableOpacity>
								</View>
							)}
							{data.subs_options && data.subs_options.ALL_ANNUAL && (
								<View style={styles.subView}>
									<Text style={styles.subViewTitle}>{"For All Annual"}</Text>
									<TouchableOpacity style={styles.subViewTouch}>
										<Text style={styles.subViewRate}>{`$${
											data.subs_options.ALL_ANNUAL.subs_charge
										}`}</Text>
									</TouchableOpacity>
								</View>
							)} */}
						</View>
					</ScrollView>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	fullContainer: {
		flex: 1,
		alignSelf: "stretch",
	},
	container: {
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullHeight(100),
	},
	indicator: {
		position: "absolute",
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#00000090",
	},
	loginContainer: {
		flexDirection: "column",
		width: ScalePerctFullWidth(100),
		height: Metrics.isTablet ? ScalePerctFullHeight(45) : 450,
		position: "absolute",
	},
	loginContentContainer: {
		width: ScalePerctFullWidth(100),
		height: Metrics.isTablet ? ScalePerctFullHeight(45) : 450,
		backgroundColor: "#00000080",
	},
	imageOne: {
		width: ScalePerctFullWidth(100),
		height: Metrics.isTablet ? ScalePerctFullHeight(44) : 450,
	},
	buttonContainer: {
		marginRight: 22,
		marginTop: 25,
		paddingVertical: 10,
		paddingHorizontal: 10,
		alignSelf: "flex-end",
	},
	subscribedText: {
		color: Colors.bodyPrimaryLight,
		fontFamily: "BentonSans Bold",
		fontSize: 20,
		marginLeft: 32,
		marginTop: 5,
	},
	formStyle: {
		alignSelf: "stretch",
		paddingHorizontal: 32,
		paddingTop: 10,
	},
	restoreText: {
		color: Colors.bodyPrimaryLight,
		fontFamily: "BentonSans Regular",
		fontSize: 12,
		marginLeft: 32,
	},
	troubleText: {
		color: Colors.bodyPrimaryLight,
		fontFamily: "BentonSans Regular",
		fontSize: 12,
		alignSelf: "stretch",
		textAlign: "center",
		paddingHorizontal: 32,
		// marginBottom: Metrics.isTablet ? 5 : null,
	},
	clickHereText: {
		fontFamily: "BentonSans Bold",
		fontSize: 12,
		textDecorationLine: "underline",
	},
	dataView: {
		flex: 1,
	},
	imageTwo: {
		width: 200,
		height: 180,
	},
	subTitleText: {
		paddingVertical: 30,
		// paddingHorizontal: 33,
		textAlign: "center",
		fontFamily: "BentonSans Bold",
		color: Colors.bgSecondaryVarient,
		fontSize: Metrics.EXTRA_MEDIUM_TEXT,
	},
	subView: {
		flexDirection: "row",
		paddingHorizontal: 33,
		alignItems: "center",
		justifyContent: "space-between",
		paddingBottom: 20,
	},
	subViewTitle: {
		fontFamily: "BentonSans Regular",
		color: Colors.bgSecondaryVarient,
		fontSize: Metrics.MEDIUM_TEXT_SIZE,
		width: ScalePerctFullWidth(38),
	},
	subViewTouch: {
		height: 40,
		width: 125,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: Colors.borderSeparator,
	},
	subViewRate: {
		fontFamily: "BentonSans Bold",
		color: Colors.bgSecondaryVarient,
		fontSize: Metrics.SMALL_TEXT_SIZE,
	},
});
