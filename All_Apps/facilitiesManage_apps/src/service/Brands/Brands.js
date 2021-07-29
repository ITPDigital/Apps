import { BaseAxiosInstance } from "../axios";
import {apis} from "../apis";   

const BrandApi = (onSuccess, onFailure, onError) => {
	const url = apis.brands_select;      
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
