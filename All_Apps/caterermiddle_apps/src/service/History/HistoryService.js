import { ItpAxiosInstance } from "../axios";
import { siteKey } from "../Constant";

const ShowHistoryApi = (userId, pageNumber, onSuccess, onFailure, onError) => {
	//console.log("TAGIDIS1.....", tagid);

	const url = "ws/show-history/";
	const historyUrl = `${url}${userId}?page=${pageNumber}&site_key=${siteKey}`;
	console.log("ShowhistoryUrl: ", historyUrl);
	ItpAxiosInstance.get(historyUrl)
		.then((response: any) => {
			if (response.data) {
				console.log("Got Show History response:", response);
				console.log("Show History are :", response.data.items);
				const emptyResult = [];
				if (response.data.items) onSuccess(response.data.items);
				else onSuccess(emptyResult);
			} else {
				console.log("Failed to Show History response:", response);
				onFailure("Can't fetch topics");
			}
		})
		.catch((error: any) => {
			console.log("Error to Show History response:", error);
			onError(error);
		});
};

export default ShowHistoryApi;
