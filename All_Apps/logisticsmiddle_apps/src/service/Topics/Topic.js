import { BaseAxiosInstance } from "../axios";

const TopicApi = (onSuccess, onFailure, onError) => {
	const url = "ws/topics_select?_format=json";
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
