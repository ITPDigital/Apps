import React, { PureComponent } from "react";
import { View, StyleSheet, FlatList, Animated, Text, I18nManager} from "react-native";

type Props = {
	header?: Function,
	flatListProps?: any,
	headerHeight?: number,
	listComponent?: any,
};

export class AnimatedHeaderList extends PureComponent<Props> {
	clampedScrollValue = 0;

	offsetValue = 0;

	scrollValue = 0;

	constructor(props) {
		super(props);
		const scrollAnim = new Animated.Value(0);
		const offsetAnim = new Animated.Value(0);
		this.state = {
			scrollAnim,
			offsetAnim,
			clampedScroll: Animated.diffClamp(
				Animated.add(
					scrollAnim.interpolate({
						inputRange: [0, 1],
						outputRange: [0, 1],
						extrapolateLeft: "clamp",
					}),
					offsetAnim,
				),
				0,
				props.headerHeight,
			),
		};
		this.AnimatedFlatList = Animated.createAnimatedComponent(props.listComponent);
	}

	componentDidMount = () => {
		this.state.scrollAnim.addListener(({ value }) => {
			// This is the same calculations that diffClamp does.
			const diff = value - this.scrollValue;
			this.scrollValue = value;
			this.clampedScrollValue = Math.min(
				Math.max(this.clampedScrollValue + diff, 0),
				this.props.headerHeight,
			);
		});
		this.state.offsetAnim.addListener(({ value }) => {
			this.offsetValue = value;
		});
	};

	componentWillUnmount() {
		// Don't forget to remove the listeners!
		this.state.scrollAnim.removeAllListeners();
		this.state.offsetAnim.removeAllListeners();
	}

	onScrollEndDrag = () => {
		this.scrollEndTimer = setTimeout(this.onMomentumScrollEnd, 250);
	};

	onMomentumScrollBegin = () => {
		clearTimeout(this.scrollEndTimer);
	};

	onMomentumScrollEnd = () => {
		const { headerHeight } = this.props;
		const toValue =
			this.scrollValue > headerHeight && this.clampedScrollValue > headerHeight / 2
				? this.offsetValue + headerHeight
				: this.offsetValue - headerHeight;

		Animated.timing(this.state.offsetAnim, {
			toValue,
			duration: 350,
			useNativeDriver: true,
		}).start();
	};

	render() {
		const { clampedScroll } = this.state;
		const { header, flatListProps, headerHeight } = this.props;
		const navbarTranslate = clampedScroll.interpolate({
			inputRange: [0, headerHeight],
			outputRange: [0, -headerHeight],
			extrapolate: "clamp",
		});
		console.log("Flatlistprops", flatListProps);
		const List = this.AnimatedFlatList;
		return (
			<View style={styles.container}>
				<List
					{...flatListProps}
					ListHeaderComponent={() => (
						<View style={{ paddingTop: headerHeight - 24 }}>
							{flatListProps.ListHeaderComponent
								? flatListProps.ListHeaderComponent()
								: null}
						</View>
					)}
					scrollEventThrottle={1}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
						{ useNativeDriver: true },
					)}
					onMomentumScrollBegin={this.onMomentumScrollBegin}
					onMomentumScrollEnd={this.onMomentumScrollEnd}
					onScrollEndDrag={this.onScrollEndDrag}
				/>
				<Animated.View
					style={[
						styles.navbar,
						{
							height: headerHeight,
							transform: [{ translateY: navbarTranslate }],
						},
					]}
				>
					{header()}
				</Animated.View>
			</View>
		);
	}
}

AnimatedHeaderList.defaultProps = {
	header: () => (
		<View>
			<Text>Title</Text>
		</View>
	),
	flatListProps: { data: [] },
	headerHeight: 50,
	listComponent: FlatList,
};

const styles = StyleSheet.create({
	container: { flex: 1, paddingTop: 24 },
	navbar: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		alignItems: "center",
		backgroundColor: "#f99509",
		borderBottomColor: "#dedede",
		borderBottomWidth: 1,
		justifyContent: "center",
	},
});
