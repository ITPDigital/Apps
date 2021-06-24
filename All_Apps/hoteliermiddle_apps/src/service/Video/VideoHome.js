import { ItpAxiosInstance } from "../axios";
import { siteKey } from "../Constant";
import { I18nManager } from 'react-native'


const VideoHomeAPI = (userId, pageNumber, onSuccess, onFailure, onError) => {
	// const url = "ws/article-list";
	const url = I18nManager.isRTL ? `http://trove.itp.com/ws/article-list?brand=ab_ar&ctype=video&page=0`:`ws/article-list?ctype=video&brand=${siteKey}&page=${pageNumber}`;
	console.log("VideoHomeAPI url: ", url);
	ItpAxiosInstance.get(url)
		.then((response: any) => {
			if (response.data.status === "ok") {
				console.log("VideoHomeAPI response for page number:", pageNumber, response);
				// console.log("VideoHomeAPI are :", response.data.items);
				console.log("VideoHomeAPI are :", response.data.items[0]);

				onSuccess(response.data.items);
			} else {
				console.log("Failed to Show VideoHomeAPI:", response);
				onFailure("Can't fetch Videos");
			}
		})
		.catch((error: any) => {
			console.log("Error to Video Home:", error);
			onError(error);
		});
};

export default VideoHomeAPI;
