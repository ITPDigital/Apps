import { ItpAxiosInstance } from "../axios";
import { siteKey } from "../Constant";
import { I18nManager } from "react-native";

const MenuTopics = (userId, onSuccess, onFailure, onError) => {
	console.log("STARTUPMENUCALLED")
	//const url = `ws/get-menu/${siteKey}`;
	//const url = `http://trove.itp.com/ws/get-menu/${siteKey}`
	const url = I18nManager.isRTL ? `http://trove.itp.com/ws/get-topic-menu/ab_ar`: `http://trove.itp.com/ws/get-topic-menu/${siteKey}`
	ItpAxiosInstance.get(url)
		.then((response: any) => {
			if (response) {
				console.log("Got Show MenuTopics response:", response);
				console.log("Show MenuTopics are :", response.data);
				onSuccess(response.data);
			} else {
				console.log("Failed to Show MenuTopics response:", response);
				onFailure("Can't fetch topics");
			}
		})
		.catch((error: any) => {
			console.log("Error to Show MenuTopics response:", error);
			onError(error);
		});
};

export default MenuTopics;
