import { Alert } from "react-native";

function AlertComp(
	title: string,
	msg: string,
	onOk: Function,
	isCancelBtn: boolean,
	okLabel: string,
) {
	const buttons = [];
	if (isCancelBtn) {
		buttons.push({ text: "Cancel", onPress: () => {}, style: "cancel" });
	}
	buttons.push({ text: okLabel || "OK", onPress: onOk });
	Alert.alert(title, msg, buttons, { cancelable: true });
}

export default AlertComp;
