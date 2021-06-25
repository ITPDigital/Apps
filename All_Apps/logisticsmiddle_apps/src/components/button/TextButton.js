import React, { PureComponent } from "react";
import { TouchableOpacity, Text } from "react-native";

type Props = {
	title: string,
	onPress: Function,
	textStyle: Object,
	touchableStyle: Object,
	disabled: boolean,
};

export default class TextButton extends PureComponent<Props> {
	render() {
		const { onPress, title = "click here", touchableStyle, textStyle, disabled } = this.props;

		return (
			<TouchableOpacity onPress={onPress} style={touchableStyle} disabled={disabled}>
				<Text style={textStyle}>{title}</Text>
			</TouchableOpacity>
		);
	}
}
