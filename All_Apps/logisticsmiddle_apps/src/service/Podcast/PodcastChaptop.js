import { ItpAxiosInstance } from "../axios";

const PodcastChaptorApi = (id, onSuccess, onFailure, onError) => {
	const url = `ws/podcast-details/${id}`;
	// login='robodiego'
	// password='Buddy6jar!'
	ItpAxiosInstance.get(url)
		.then((response: any) => {
			console.log("podcast chaptor", response);
			if (response.status === 200) {
				onSuccess(response);
			} else {
				onFailure(response);
			}
		})
		.catch((error: any) => {
			console.log("error in podcast");
			onError(error);
		});
};

export default PodcastChaptorApi;
