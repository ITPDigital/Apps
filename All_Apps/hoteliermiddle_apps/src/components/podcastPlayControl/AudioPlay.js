import React, { PureComponent } from "react";
import { StyleSheet } from "react-native";
import Video from "react-native-video";

type Props = {
	isPaused: Function,
	setTotalLength: Function,
	setSelectedTrack: Function,
	control: Object,
	onLoadEnd: Function,
	onLoadStart: Function,
};

let instance = null;

export default class Audio extends PureComponent<Props> {
	player = {
		currentTime: 0,
	};

	constructor(props) {
		super(props);
		if (!instance) {
			instance = this;
		}
		return instance;
	}

	getCurrentTime = () => {
		return this.player.currentTime;
	};

	onBack = () => {
		const { control, isPaused, setTotalLength, setSelectedTrack } = this.props;
		if (control.selectedTrack > 0) {
			this.refs.audioElement && this.refs.audioElement.seek(0);
			this.setState({ isChanging: true });
			setTimeout(() => {
				this.player.currentTime = 0;
				isPaused(false);
				setTotalLength(1);
				setSelectedTrack(control.selectedTrack - 1);
				this.setState({
					isChanging: false,
				});
			}, 0);
		} else {
			this.refs.audioElement.seek(0);
			this.player.currentTime = 0;
		}
	};

	onForward = () => {
		const { control, isPaused, setTotalLength, setSelectedTrack } = this.props;
		if (control.selectedTrack < control.tracks.field_podcast_details.length - 1) {
			this.refs.audioElement && this.refs.audioElement.seek(0);
			this.setState({ isChanging: true });
			setTimeout(() => {
				this.player.currentTime = 0;
				isPaused(false);
				setTotalLength(1);
				setSelectedTrack(control.selectedTrack + 1);
				this.setState({
					isChanging: false,
				});
			}, 0);
		}
	};

	setDuration = (data: any) => {
		const { setTotalLength, onLoadEnd, control } = this.props;
		onLoadEnd();
		!control.paused && this.seek(0);
		setTotalLength(Math.floor(data.duration));
	};

	setTime = (data: any) => {
		this.player.currentTime = Math.floor(data.currentTime);
	};

	seek = (time: any) => {
		const { isPaused } = this.props;
		const newtime = Math.round(time);
		this.refs.audioElement && this.refs.audioElement.seek(newtime);
		this.player.currentTime = newtime;
		isPaused(false);
	};

	onEnd = () => {
		const { control, setSelectedTrack, isPaused, setTotalLength } = this.props;
		if (control.selectedTrack < control.tracks.field_podcast_details.length - 1) {
			setSelectedTrack(control.selectedTrack + 1);
		} else {
			this.player.currentTime = 0;
			setTotalLength(control.totalLength);
			setSelectedTrack(control.selectedTrack);
			this.seek(0);
			isPaused(true);
		}
	};

	loadStart = () => {
		const { onLoadStart } = this.props;
		onLoadStart();
	};

	render() {
		const { control } = this.props;
		const track =
			control.tracks &&
			control.tracks.field_podcast_details &&
			control.tracks.field_podcast_details[control.selectedTrack].podcast_url;
		const video = (
			<Video
				source={{
					uri: `${track}/stream?client_id=iGbpgb5l4aNHCP8BcSxvJBGe7D9Q6pWQ`,
				}} // Can be a URL or a local file.
				ref="audioElement"
				paused={control.paused} // Pauses playback entirely.
				resizeMode="cover" // Fill the whole screen at aspect ratio.
				// repeat={true} // Repeat forever.
				onLoadStart={this.loadStart} // Callback when video starts to load
				onBuffer={() => console.log("buffering")}
				onLoad={this.setDuration} // Callback when video loads
				onProgress={this.setTime} // Callback every ~250ms with currentTime
				onEnd={this.onEnd} // Callback when playback finishes
				onError={this.videoError} // Callback when video cannot be loaded
				style={styles.audioElement}
				playInBackground={true}
				ignoreSilentSwitch="ignore"
			/>
		);

		return control.tracks && control.tracks.field_podcast_details && video;
	}
}

const styles = StyleSheet.create({
	audioElement: {
		height: 0,
		width: 0,
	},
});
