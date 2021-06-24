import { ItpAxiosInstance } from "../axios";
import { siteKey } from "../Constant";

const SearchApi = (searchKey, pageNumber, user_id, onSuccess, onFailure, onError, sortBy) => {
	console.log("sortBy", sortBy);
	const searchUrl = `ws/search?sort_by=${sortBy}`;
	console.log("Search KEy inside the service: ", searchKey);
	ItpAxiosInstance.post(searchUrl, {
		key: searchKey,
		page: pageNumber,
		user_id,
		site_key: siteKey,
	})
		.then((response: any) => {
			if (response.data.status === "ok") {
				console.log("Got search response for page number:", pageNumber, response.data);
				onSuccess(response.data.items);
			} else {
				console.log("Failed to  for page number:", pageNumber, response);
				onFailure("Can't fetch topics");
			}
		})
		.catch((error: any) => {
			console.log("Error to Show Search results response:", error);
			onError(error);
		});
};

export default SearchApi;
