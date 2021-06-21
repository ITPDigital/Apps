import { ItpAxiosInstance } from "../axios";
import { siteKey } from "../Constant";

const MyTroveApi = (topic_id, brand, user_id, page, device, onSuccess, onFailure, onError) => {
	const deviceType = device || "mobile";
	const url = `ws/my-trove?brand=${siteKey}&page=${page}&device=${deviceType}`;
	ItpAxiosInstance.get(url)
		.then((response: any) => {
			if (response.status === 200) {
				// null or empty
				console.log("Got my trove response:", topic_id, brand, response);
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

export default MyTroveApi;
