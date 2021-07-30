import { ItpAxiosInstance } from "../axios";
import {apis} from "../apis";  

const SaveSubscriptionApi = (userId, subsId, onSuccess, onFailure, onError) => {
	const url = apis.save_mag_subscription;   
	ItpAxiosInstance.post(url, { user_id: userId, subs_id: subsId })
		.then((response: any) => {
			if (response.data.status === "Success") {
				onSuccess(response.data.message);
			} else {
				onFailure(response.data.message);
			}
		})
		.catch((error: any) => {
			onError(error);
		});
};

export default SaveSubscriptionApi;
