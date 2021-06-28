import { ItpAxiosInstance } from "../axios";
import { siteKey } from "../Constant";
import {apis} from "../apis";
const TopStoriesApi = (pageNumber, onSuccess, onFailure, onError) => {
	const url = apis.topstories; 
	console.log("TopStoriesApi called for page number ", pageNumber);
	ItpAxiosInstance.post(url, {
		user_id: "1",
		page: pageNumber,
		device: "tablet",
		site_key: siteKey,
	})
		.then((response: any) => {
			if (response) {
				console.log("Got Show TopStoriesApi response:", response);
				console.log("Show TopStoriesApi are :", response.data);
				onSuccess(response.data);
			} else {
				console.log("Failed to Show TopStoriesApi response:", response);
				onFailure("Can't fetch topics");
			}
		})
		.catch((error: any) => {
			console.log("Error to Show TopStoriesApi response:", error);
			onError(error);
		});
};

export default TopStoriesApi;
