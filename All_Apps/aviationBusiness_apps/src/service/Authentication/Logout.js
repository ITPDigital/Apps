import { BaseAxiosInstance } from "../axios";

const LogoutApi = (onSuccess, onFailure, onError) => {
	const url = "logout";
	// login='robodiego'
	// password='Buddy6jar!'
	BaseAxiosInstance.post(url, {})
		.then((response: any) => {
			if (response.data.status === 1) {
				onSuccess();
			} else {
				onFailure(response.data.message);
			}
		})
		.catch((error: any) => {
			onError(error);
		});
};

export default LogoutApi;
