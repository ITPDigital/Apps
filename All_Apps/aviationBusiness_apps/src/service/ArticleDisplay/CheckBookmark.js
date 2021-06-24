import { ItpAxiosInstance } from "../axios";
import { Analytics, Events } from "../../Analytics";

const CheckBookmark = (userId, BookmarkIds, onSuccess, onFailure, onError) => {
	const CheckBookmarkUrl = "ws/check-bookmark";
	console.log("CheckBookmark details, ", userId, BookmarkIds);
	ItpAxiosInstance.post(CheckBookmarkUrl, {
		user_id: userId,
		art_id: BookmarkIds,
	})
		.then((response: any) => {
			if (response) {
				console.log("Check Bookmark response", response.data);
				onSuccess(response);
			} else {
				console.log("Failed to fetch Check Bookmark data", response);
				onFailure("Can't fetch topics");
			}
		})
		.catch((error: any) => {
			console.log("Error to Check Bookmark data", error);
			onError(error);
		});
};

export default CheckBookmark;
