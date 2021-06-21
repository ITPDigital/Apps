import { ItpAxiosInstance } from "../axios";

const SavePreferencesBgApi = (userId, value, onSuccess, onFailure, onError) => {
	const url = "ws/save-preferences/art-bg";
	console.log("value inside save preference: ", `"${value}"`);
	const val = `"${value}"`;
	console.log("userId", val);
	ItpAxiosInstance.post(url, {
		user_id: userId,
		values: `${value}`,
	})
		.then((response: any) => {
			console.log("SavePreferencesBgApi response", response, userId, value);
			if (response.data.status === "Success") {
				onSuccess(response.data);
			} else if (response.data.status === "Failed") {
				onFailure(response.data);
			}
		})
		.catch((error: any) => {
			onError(error);
			console.log("Error: in SavePreferencesBg: ", error);
		});
};

export default SavePreferencesBgApi;
