import { ItpAxiosInstance } from "../axios";
import { Strings } from "../../asset";
import { siteKey } from "../Constant";

const SaveDeviceInfo = (userId: any, deviceInfo: any, flag: any) => {
	console.log(
		"SaveDeviceInfo is calling with following credentials: userId",
		userId,
		"deviceInfo",
		deviceInfo,
		Strings.device.deviceId,
	);
	const url = "ws/save-notification";
	ItpAxiosInstance.post(url, {
		user_id: userId,
		notification_token: deviceInfo,
		flag,
		device_id: Strings.device.deviceId,
		site_key: siteKey,
	})
		.then((response: any) => {
			if (response.data.status === "Success") {
				console.log("Success in Saving device information", response);
			} else {
				console.log("Failed in Saving device information", response);
			}
		})
		.catch((error: any) => {
			console.log("Error in Saving device information", error);
		});
};

export default SaveDeviceInfo;
