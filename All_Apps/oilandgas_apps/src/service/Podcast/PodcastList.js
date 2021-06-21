import { ItpAxiosInstance } from "../axios";

const PodcastListApi = (page, onSuccess, onFailure, onError) => {
	const url = `ws/podcast-listing?page=${page}`;
	// login='robodiego'
	// password='Buddy6jar!'
	ItpAxiosInstance.get(url)
		.then((response: any) => {
			console.log("podcast response", response);
			if (response.status === 200) {
				onSuccess(response);
			} else {
				onFailure(response);
			}
		})
		.catch((error: any) => {
			onError(error);
		});
};

export default PodcastListApi;
