import { ItpAxiosInstance } from "../axios";
import {apis} from "../apis";   

const SavePreferencesFontApi = (userId, value, onSuccess, onFailure, onError) => {
	const url = apis.save_preferences_art_font; 
	ItpAxiosInstance.post(url, {
		user_id: userId,
		values: `${value}`,
	})
		.then((response: any) => {
			console.log("SavePreferencesFontApi response", response, userId, value);
			if (response.data.status === "Success") {
				onSuccess(response.data);
			} else if (response.data.status === "Failed") {
				onFailure(response.data);
			}
		})
		.catch((error: any) => {
			onError(error);
			console.log("Error: in SavePreferencesFont: ", error);
		});
};

export default SavePreferencesFontApi;
