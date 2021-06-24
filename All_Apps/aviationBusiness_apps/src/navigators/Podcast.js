import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../redux";
import { Audio } from "../components";

type Props = {
	isPaused: Function,
	control: Object,
	podcastTracks: Array,
	setTotalLength: Function,
	setSelectedTrack: Function,
	onLoadEnd: Function,
	onLoadStart: Function,
};

class PodcastRoot extends PureComponent<Props> {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const {
			control,
			podcastTracks,
			isPaused,
			setTotalLength,
			setSelectedTrack,
			onLoadStart,
			onLoadEnd,
		} = this.props;
		return (
			<Audio
				control={control}
				isPaused={isPaused}
				setTotalLength={setTotalLength}
				setSelectedTrack={setSelectedTrack}
				podcastTracks={control.tracks}
				onLoadStart={onLoadStart}
				onLoadEnd={onLoadEnd}
			/>
		);
	}
}

function mapStateToProps(state) {
	// state
	return {
		// podcastTracks: state.podcastChaptor,
		control: state.podcastPlayControl,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PodcastRoot);
