import { ItpAxiosInstance } from "../axios";

const AuthorDetailsAPI = (
	authorId,
	siteKey,
	pageNumber,
	user_id,
	onSuccess,
	onFailure,
	onError,
	stop,
) => {
	//const url = "ws/article-list";
	const key = `${authorId ? authorId : 181957}~${siteKey ? siteKey : msl_en}`;
	console.log("Author Details API is calling for the author: ", authorId, siteKey);

	const url = `ws/article-list?author=${key}&page=${pageNumber}`;
	console.log("VideoHomeAPI url: ", url);
	ItpAxiosInstance.get(url)

		// ItpAxiosInstance.post(url, {
		// 	author: key,
		// 	page: pageNumber,
		// 	user_id,
		// })
		.then((response: any) => {
			if (response && response.data && response.data.status === "ok") {
				console.log("Success in Author Details data fetching: ", response);
				// if (response && response.data && response.data.items) {
				onSuccess(response.data);
				// } else stop();
			} else {
				console.log("Failure in Author Details data fetching ", response);
				onFailure();
			}
		})
		.catch((error: any) => {
			//console.log("Error in Author Details data fetching: ", error);
			onError(error);
		});
};

export default AuthorDetailsAPI;
