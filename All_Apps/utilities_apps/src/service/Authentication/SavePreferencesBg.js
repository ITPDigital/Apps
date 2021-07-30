import { ItpAxiosInstance } from "../axios";
import {apis} from "../apis";   

const SavePreferencesBgApi = (userId, value, onSuccess, onFailure, onError) => {
	const url = apis.save_preferences_art_bg; 
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
