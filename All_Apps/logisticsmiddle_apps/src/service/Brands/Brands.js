import { BaseAxiosInstance } from "../axios";

const BrandApi = (onSuccess, onFailure, onError) => {
	const url = "ws/brands_select?_format=json";
	BaseAxiosInstance.get(url)
		.then((response: any) => {
			if (response) {
				// null or empty
				console.log("Got Brands response:", response);
				onSuccess(response.data);
			} else {
				onFailure("Can't fetch topics");
			}
		})
		.catch((error: any) => {
			onError(error);
		});
};

export default BrandApi;
