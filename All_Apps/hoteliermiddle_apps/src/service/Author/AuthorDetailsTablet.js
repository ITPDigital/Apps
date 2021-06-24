import { ItpAxiosInstance } from "../axios";

const AuthorDetailsTabletAPI = (authorId, siteKey, pageNumber, onSuccess, onFailure, onError) => {
	//const url = "ws/article-list";
	const key = `${authorId ? authorId : 181957}~${siteKey ? siteKey : msl_en}`;
	console.log("Author Details API is calling for the author: ", key);
	const url = `ws/article-list?author=${key}&page=${pageNumber}&device="tablet"`;
	console.log("VideoHomeAPI url: ", url);
	ItpAxiosInstance.get(url)
		// ItpAxiosInstance.post(url, {
		// 	author: key,
		// 	page: pageNumber,
		// 	device: "tablet",
		// })
		.then((response: any) => {
			if (response && response.data && response.data.status == "ok") {
				console.log("Success in Author Details data fetching: ", response);
				onSuccess(response.data);
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

export default AuthorDetailsTabletAPI;
