import { ItpAxiosInstance } from "../axios";
import { siteKey } from "../Constant";
import {apis} from "../apis";   

const FetchPreferenceApi = (userId, onSuccess, onFailure, onError) => {
	const url = apis.user_preferences+`/${userId}`; 
	ItpAxiosInstance.get(url, { site_key: siteKey })
		.then((response: any) => {
			console.log("STARTUP2DATA", response);

			if (response.data.status === "Success") {
				onSuccess(response.data);
			} else {
				onFailure(response.data);
			}
		})
		.catch((error: any) => {
			console.log("STARTUP2APIERROR", error);

			onError(error);
		});
};

export default FetchPreferenceApi;
