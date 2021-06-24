/* eslint-disable no-nested-ternary */
import React, { PureComponent } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	ActivityIndicator,
	Animated,
	TouchableOpacity,
} from "react-native";
import ImageLoad from "react-native-image-placeholder";
import HTML from "react-native-render-html";
import { Button, PodcastChaptorCard, PodcastPlayView, BuildFeedButton } from "../../components";
import {
	ScalePerctFullHeight,
	ScalePerctFullWidth,
	Metrics,
	Colors,
	Strings,
	Images,
} from "../../asset";
import { compare } from "../../utilities";
import TabModal from "./TabModal";
import ModalView from "../../components/podcastChaptorCard/ModalView";

type Props = {
	handlePlay: Function,
	data: any,
	onSubscribe: Function,
	flag: string,
	loading: boolean,
	setSelectedTrack: Function,
	isPaused: boolean,
	setFlag: Function,
	setTrack: Function,
	control: Object,
	showLoader: boolean,
	setTotalLength: Function,
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class ChaptorPodcastScreenUI extends PureComponent<Props> {
	constructor() {
		super();
		this.state = {
			animatedValue: new Animated.Value(0),
			visibility: new Animated.Value(0),
			headerHeight: 0,
			isSticky: false,
			showImageModal: false,
		};
	}

	componentDidMount() {}

	renderHeaderView = (data: any) => {
		const { onSubscribe, flag, loading } = this.props;
		return (
			<View style={{ width: ScalePerctFullWidth(49) }}>
				<Text style={styles.title}>{data[0].title}</Text>
				<Text style={styles.chapter} numberOfLines={3}>
					{data[0].field_lead_text}
				</Text>

				<Button
					title={flag === "F" ? Strings.podCast.SUBSCRIBE : Strings.podCast.UNSUBSCRIBE}
					button={Images.subscribeButton}
					buttonStyle={{
						alignSelf: "flex-start",
						marginRight: ScalePerctFullWidth(17.5),
					}}
					top={11}
					onPress={onSubscribe}
					disabled={loading}
				/>
			</View>
		);
	};

	toggleModal = () =>
		this.setState({
			showImageModal: !this.state.showImageModal,
		});

	renderImage = data => (
		<TouchableOpacity onPress={this.toggleModal}>
			<ImageLoad
				resizeMode="cover"
				style={styles.image}
				placeholderStyle={styles.image}
				isShowActivity={false}
				loadingStyle={{ size: "large" }}
				source={data ? { uri: data } : Images.square}
				placeholderSource={Images.square}
				borderRadius={Metrics.isTablet ? ScalePerctFullWidth(14) : ScalePerctFullWidth(20)}
			/>
		</TouchableOpacity>
	);

	renderTabletHeader = (data: any) => {
		const { onSubscribe, flag, loading } = this.props;
		return (
			<View
				style={{
					flex: 0.5,
					paddingLeft: ScalePerctFullWidth(4.8),
				}}
			>
				<View style={{ width: ScalePerctFullWidth(32.7) }}>
					<Text style={styles.title}>{data[0].title}</Text>
					<Text style={styles.chapter}>{data[0].field_lead_text}</Text>
				</View>
				<View style={{ alignItems: "center" }}>
					{this.renderImage(data[0].field_image)}
					{/* <Button
						title={
							flag === "F" ? Strings.podCast.SUBSCRIBE : Strings.podCast.UNSUBSCRIBE
						}
						button={Images.subscribeButton}
						buttonStyle={{
							alignSelf: "center",
							marginTop: 40,
							marginBottom: 15,
						}}
						top={10}
						onPress={onSubscribe}
						disabled={loading}
					/> */}
					<BuildFeedButton
						title={
							flag === "F" ? Strings.podCast.SUBSCRIBE : Strings.podCast.UNSUBSCRIBE
						}
						onPress={onSubscribe}
						style={styles.subscribe}
						disabled={loading}
					/>
				</View>
			</View>
		);
	};

	handleTrackPlay = (index: number) => {
		const {
			setSelectedTrack,
			isPaused,
			setFlag,
			setTrack,
			data,
			control,
			setTotalLength,
		} = this.props;
		if (!control.tracks || !compare(control.tracks, data[0])) {
			setTrack(data[0]);
		}
		const status =
			control.tracks &&
			control.tracks.field_podcast_details[index].podcast_url ===
				data[0].field_podcast_details[index].podcast_url;
		if (!status) {
			setTotalLength(0);
		}
		setSelectedTrack(index);
		isPaused(false);
		setFlag(true);
	};

	renderHeaderComponent = (data: any) => (
		<View style={styles.container}>
			{this.renderHeaderView(data)}
			<View style={styles.image}>{this.renderImage(data[0].field_image)}</View>
		</View>
	);

	renderHeaderComponentConstant = (data: any, fieldImage: any) => {
		const { onSubscribe, flag, loading } = this.props;

		return (
			<View style={[styles.containerDefault, this.state.headerStyle]}>
				<View
					onLayout={(event: any) => {
						const { x, y, width, height } = event.nativeEvent.layout;
						this.setState({
							headerHeight: height + Metrics.LARGE_TEXT_SIZE * 2,
						});
					}}
				>
					<Text style={styles.headerTitle}>{data[0].title}</Text>
					<View style={styles.headerDescription}>
						<HTML html={data[0].field_lead_text} />
					</View>
				</View>

				<View style={styles.headerWrapper}>
					<View
						style={{
							justifyContent: "center",
							marginTop: ScalePerctFullHeight(10),
						}}
					>
						<BuildFeedButton
							title={
								flag === "F"
									? Strings.podCast.SUBSCRIBE
									: Strings.podCast.UNSUBSCRIBE
							}
							onPress={onSubscribe}
							style={styles.subscribe}
							disabled={loading}
						/>
					</View>
					<View style={styles.image}>{this.renderImage(data[0].field_image)}</View>

					{/* {fieldImage} */}
				</View>
			</View>
		);
	};

	renderStickyHeader = (data: any, fieldImage) => {
		const { onSubscribe, flag, loading } = this.props;

		const opacityLowToHigh = this.state.visibility.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 1],
		});

		const translateY = this.state.visibility.interpolate({
			inputRange: [0, 1],
			outputRange: [-600, 0],
			extrapolate: "clamp",
		});
		return (
			<Animated.View
				style={[
					{
						position: "absolute",
						left: 0,
						right: 0,
						backgroundColor: "white",
						elevation: 1,
						zIndex: 0,
					},
					{
						transform: [{ translateY }],
						opacity: opacityLowToHigh,
					},
				]}
			>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						marginTop: ScalePerctFullHeight(3),
						marginLeft: ScalePerctFullWidth(5.3),
						marginBottom: ScalePerctFullHeight(3),
					}}
				>
					<View style={{ width: ScalePerctFullWidth(49) }}>
						<Text style={styles.title} numberOfLines={2}>
							{data[0].title}
						</Text>
						<View
							style={{
								marginTop: ScalePerctFullHeight(5),
							}}
						>
							<BuildFeedButton
								title={
									flag === "F"
										? Strings.podCast.SUBSCRIBE
										: Strings.podCast.UNSUBSCRIBE
								}
								onPress={onSubscribe}
								style={styles.subscribeAnimated}
								disabled={loading}
							/>
						</View>
					</View>
					<View style={styles.image}>{this.renderImage(data[0].field_image)}</View>
					{/* {fieldImage} */}
				</View>
			</Animated.View>
		);
	};

	renderTabletList = (list: any) => {
		return this.props.showLoader || !list ? (
			<View
				style={{
					alignItems: "center",
					justifyContent: "center",
					flex: 1,
				}}
			>
				<ActivityIndicator size="large" color="red" />
			</View>
		) : (
			<FlatList
				data={list[0].field_podcast_details}
				renderItem={({ item, index }) => (
					<PodcastChaptorCard onPress={() => this.handleTrackPlay(index)} data={item} />
				)}
				style={styles.listStyle}
				ListHeaderComponent={() => <Text style={styles.listHeader}>Related Episodes</Text>}
				keyExtractor={(item, index) => index.toString()}
			/>
		);
	};

	renderList = (data: any) => {
		const list = data;

		return (
			<Animated.View style={[{ flex: 1 }]}>
				<Text style={styles.listHeader}>Related Episodes</Text>
				<AnimatedFlatList
					scrollEnabled={this.state.isContentScrollable}
					data={list && list[0] && list[0].field_podcast_details}
					renderItem={({ item, index }) => (
						<PodcastChaptorCard
							onPress={() => this.handleTrackPlay(index)}
							data={item}
						/>
					)}
					style={styles.listStyle}
					keyExtractor={(item, index) => index.toString()}
				/>
			</Animated.View>
		);
	};

	onScroll = (e: any) => {
		if (e.nativeEvent.contentOffset.y > this.state.headerHeight - 10) {
			Animated.timing(this.state.visibility, {
				toValue: 1,
				duration: 300,
			}).start(() => {
				this.setState({
					isSticky: true,
				});
			});
		} else {
			Animated.timing(this.state.visibility, {
				toValue: 0,
				duration: 200,
			}).start(() => {
				this.setState({
					isSticky: false,
				});
			});
		}
	};

	render() {
		const { handlePlay, data, showLoader, loading, control, item, showModal } = this.props;
		const fieldImage = data && data[0] && data[0].field_image && (
			<View style={styles.image}>{this.renderImage(data[0].field_image)}</View>
		);
		console.log("field image", data && data[0] && data[0]);
		console.log("field image1", data && data[0] && data[0].field_image !== "");
		return (
			<View style={styles.mainContainer}>
				{loading && (
					<View style={styles.indicator}>
						<ActivityIndicator size="large" color="red" />
					</View>
				)}
				{showLoader || !data || !data[0] ? (
					<View
						style={{
							alignItems: "center",
							justifyContent: "center",
							flex: 1,
						}}
					>
						<ActivityIndicator size="large" color="red" />
					</View>
				) : Metrics.isTablet ? (
					<View style={{ flex: 1, flexDirection: "row" }}>
						{this.renderTabletHeader(data)}
						<View
							style={{
								flex: 0.5,
								paddingRight: ScalePerctFullWidth(4.8),
							}}
						>
							{this.renderTabletList(data)}
						</View>
					</View>
				) : (
					<Animated.ScrollView
						style={{ flex: 1 }}
						onScroll={Animated.event(
							[
								{
									nativeEvent: {
										contentOffset: {
											y: this.state.animatedValue,
										},
									},
								},
							],
							{
								listener: e => {
									this.onScroll(e);
								},
							},
						)}
					>
						{this.renderHeaderComponentConstant(data, fieldImage)}
						{this.renderList(data)}
					</Animated.ScrollView>
				)}

				{!showModal ? control.flag && <PodcastPlayView onPress={handlePlay} /> : null}
				{showModal && (
					<TabModal
						showModal={showModal}
						handlePlay={handlePlay}
						styles={{
							width: "100%",
							alignSelf: "center",
							height: "80%",
							justifyContent: "flex-start",
						}}
						deviceHeight={ScalePerctFullWidth(100)}
					/>
				)}
				{this.state.showImageModal && data && data[0] && data[0].field_image ? (
					<ModalView
						onPress={this.toggleModal}
						image={data && data[0] && data[0].field_image}
						isVisible={this.state.showImageModal}
					/>
				) : null}

				{!Metrics.isTablet && this.state.isSticky
					? this.renderStickyHeader(data, fieldImage)
					: null}
			</View>
		);
	}
}

const mobileStyle = StyleSheet.create({
	headerWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	headerDescription: {
		fontSize: Metrics.VV_SMALL_TEXT_SIZE,
		color: Colors.bgSecondaryDark,
		marginTop: ScalePerctFullHeight(2.1),
	},
	headerTitle: {
		fontSize: Metrics.LARGE_TEXT_SIZE,
		color: Colors.bodyPrimaryDark,
	},
	mainContainer: { flex: 1, zIndex: -1, elevation: 0 },
	container: {
		flexDirection: "row",
		paddingHorizontal: Metrics.DEFAULT_PADDING,
		paddingTop: Metrics.DEFAULT_PADDING,
		paddingBottom: ScalePerctFullHeight(6),
		justifyContent: "space-between",
	},
	containerDefault: {
		flexDirection: "column",
		paddingHorizontal: Metrics.DEFAULT_PADDING,
		paddingTop: Metrics.DEFAULT_PADDING,
		paddingBottom: ScalePerctFullHeight(6),
		zIndex: -1,
	},
	image: {
		width: ScalePerctFullWidth(40),
		height: ScalePerctFullWidth(40),
		borderRadius: ScalePerctFullWidth(20),
	},
	imageView: {
		width: ScalePerctFullWidth(40),
		height: ScalePerctFullWidth(40),
		borderRadius: ScalePerctFullWidth(20),
	},
	logo: {
		height: 18,
		backgroundColor: "pink",
		width: 90,
	},
	title: {
		fontSize: Metrics.EXTRA_MEDIUM_TEXT,
		lineHeight: 25,
		letterSpacing: 0,
		color: Colors.bgPrimaryBlack,
		fontFamily: "BentonSans Bold",
		marginBottom: ScalePerctFullHeight(2),
	},
	chapter: {
		fontSize: Metrics.VV_SMALL_TEXT_SIZE,
		fontFamily: "BentonSans Regular",
		color: Colors.bodySecondaryDark,
		marginBottom: ScalePerctFullHeight(3),
	},
	listStyle: {
		paddingHorizontal: ScalePerctFullWidth(5.6),
		flex: 1,
	},
	listHeader: {
		fontSize: Metrics.SMALL_TEXT_SIZE,
		color: Colors.bodySecondaryDark,
		paddingLeft: ScalePerctFullWidth(4.8),
		marginBottom: ScalePerctFullHeight(2),
		fontFamily: "BentonSans Bold",
	},
	indicator: {
		position: "absolute",
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		justifyContent: "center",
		alignItems: "center",
	},
	subscribe: {
		height: ScalePerctFullHeight(6.1),
		width: ScalePerctFullWidth(33.3),
		marginBottom: ScalePerctFullHeight(5),
	},
	subscribeAnimated: {
		height: ScalePerctFullHeight(6.1),
		width: ScalePerctFullWidth(33.3),
		// marginBottom: ScalePerctFullHeight(5),
	},
});

const tabletStyle = StyleSheet.create({
	mainContainer: {
		flex: 1,
		paddingTop: ScalePerctFullHeight(2),
		//paddingHorizontal: ScalePerctFullWidth(4.8),
	},
	container: {
		flexDirection: "row",
		paddingHorizontal: Metrics.DEFAULT_PADDING,
		paddingTop: Metrics.DEFAULT_PADDING,
		paddingBottom: ScalePerctFullHeight(6),
		justifyContent: "space-between",
	},
	image: {
		width: ScalePerctFullWidth(28),
		height: ScalePerctFullWidth(28),
		borderRadius: ScalePerctFullWidth(14),
	},
	logo: {
		height: 18,
		backgroundColor: "pink",
		width: 90,
	},
	title: {
		fontSize: Metrics.EXTRA_MEDIUM_TEXT,
		lineHeight: 25,
		letterSpacing: 0,
		color: Colors.bgPrimaryBlack,
		fontFamily: "BentonSans Bold",
		marginBottom: ScalePerctFullHeight(2),
	},
	chapter: {
		fontSize: Metrics.VV_SMALL_TEXT_SIZE,
		fontFamily: "BentonSans Regular",
		color: Colors.bodySecondaryDark,
		marginBottom: ScalePerctFullHeight(3),
	},
	listStyle: {
		flex: 1,
	},
	listHeader: {
		fontSize: Metrics.SMALL_TEXT_SIZE,
		color: Colors.bodySecondaryDark,
		marginBottom: ScalePerctFullHeight(2),
	},
	indicator: {
		position: "absolute",
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		justifyContent: "center",
		alignItems: "center",
	},
	subscribe: {
		height: ScalePerctFullHeight(3),
		width: ScalePerctFullWidth(12.2),
		marginTop: ScalePerctFullHeight(3),
		marginBottom: ScalePerctFullHeight(5),
	},
});

const styles = Metrics.isTablet ? tabletStyle : mobileStyle;
