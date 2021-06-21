import { BaseAxiosInstance } from "../axios";

const ItemsApi = (onSuccess, onFailure, onError) => {
	const url = "items";
	// login='robodiego'
	// password='Buddy6jar!'
	BaseAxiosInstance.get(url)
		.then((response: any) => {
			if (response.data.status === 1) {
				onSuccess(response.data.data.groups);
			} else {
				onFailure(response.data.message);
			}
		})
		.catch((error: any) => {
			onError(error);
		});
};

export default ItemsApi;
