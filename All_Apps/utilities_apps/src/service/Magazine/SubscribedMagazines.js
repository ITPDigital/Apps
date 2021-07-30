import { ItpAxiosInstance } from "../axios";
import {apis} from "../apis";  

const SubscribedMagazineApi = (id, onSuccess, onFailure, onError) => {
	const url = apis.get_mag_subscriptions+`/${id}`; 
	ItpAxiosInstance.get(url)
		.then((response: any) => {
			if (response.status == 200) {
				onSuccess(response.data);
			} else {
				onFailure(response.data);
			}
		})
		.catch((error: any) => {
			onError(error);
		});
};

export default SubscribedMagazineApi;
