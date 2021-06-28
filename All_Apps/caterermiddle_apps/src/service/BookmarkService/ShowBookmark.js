import { ItpAxiosInstance } from "../axios";
import { siteKey } from "../Constant";
import {apis} from "../apis";   

const ShowBoookmarkApi = (userId, pageNumber, onSuccess, onFailure, onError) => {
	console.log("Show book mark API calling............", userId);
	const url = apis.show_bookmarks; 
	const bookmarkUrl = `${url}${userId}?site_key=${siteKey}&page=${pageNumber}`;
	console.log("Show Bookmark Url: ", bookmarkUrl);
	ItpAxiosInstance.get(bookmarkUrl)
		.then((response: any) => {
			if (response.status === 200 && response.data.length !== 0) {
				console.log("Got Show Boomark response: for page number: ", pageNumber, response);
				console.log("Show bookmarks are :", response.data.items);
				const bookmarkFlag = { bookmark: true };
				const bookmark =					response.data
					&& response.data.items
					&& response.data.items.map(
						(item: object) => (item = { ...item, ...bookmarkFlag }),
					);
				onSuccess(bookmark);
			} else if (response.data.length === 0) {
				onFailure("No data found for this page");
				return 0;
			} else {
				console.log("Failed to Show Boomark response:", response);
				onFailure("Can't fetch Bookmarks");
			}
		})
		.catch((error: any) => {
			console.log("Error to Show Boomark response:", error);
			onError(error);
		});
};

export default ShowBoookmarkApi;
