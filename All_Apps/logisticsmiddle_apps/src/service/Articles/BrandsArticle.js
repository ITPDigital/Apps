import { ItpAxiosInstance } from "../axios";

const BrandsArticleApi = (brand, onSuccess, onFailure, onError) => {
	const url = "ws/article-list";
	console.log("my trove api :", { brand });
	ItpAxiosInstance.post(url, { brand, user_id: "1" })
		.then((response: any) => {
			if (response.status === 200) {
				// null or empty
				console.log("Got my trove brand response:", brand, response);
				onSuccess(response.data);
			} else {
				onFailure("Can't fetch topics");
			}
		})
		.catch((error: any) => {
			console.log("error ", error);
			onError(error);
		});
};

export default BrandsArticleApi;
// : "2|3|5"
// : "cwo_en|mea_en|aviation_en"
