import { ItpAxiosInstance } from "../axios";

const SubscribedMagazineApi = (id, onSuccess, onFailure, onError) => {
	const url = `ws/get-mag-subscriptions/${id}`;
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
