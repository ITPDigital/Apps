import { BaseAxiosInstance } from "../axios";
import {apis} from "../apis";

const TopicApi = (onSuccess, onFailure, onError) => {
	const url = apis.topics_select; 
	BaseAxiosInstance.get(url)
		.then((response: any) => {
			if (response) {
				// null or empty
				console.log("Got Topic response:", response);
				onSuccess(response.data);
			} else {
				onFailure("Can't fetch topics");
			}
		})
		.catch((error: any) => {
			onError(error);
		});
};

export default TopicApi;
