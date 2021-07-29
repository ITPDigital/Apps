import { ItpAxiosInstance } from "../axios";
import { siteKey } from "../Constant";

const TabletVideoHomeAPI = (userId, pageNumber, onSuccess, onFailure, onError) => {
	const url = `ws/article-list?ctype=video&brand=${siteKey}&page=${pageNumber}&device=tablet`;
	console.log("VideoHomeAPI url: ", url);
	ItpAxiosInstance.get(url)
		.then((response: any) => {
			console.log("status code", response.status);
			if (response.status === 200) {
				console.log("TabletVideoHomeAPI response for page number:", pageNumber, response);
				// console.log("VideoHomeAPI are :", response.data.items);
				console.log("TabletVideoHomeAPI are :", response.data);

				onSuccess(response.data);
			} else {
				console.log("Failed to Show TabletVideoHomeAPI:", response);
				onFailure("Can't fetch Videos");
			}
		})
		.catch((error: any) => {
			console.log("Error to Video Home:", error);
			onError(error);
		});
};

export default TabletVideoHomeAPI;
