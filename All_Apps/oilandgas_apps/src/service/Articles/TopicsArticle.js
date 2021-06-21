import { ItpAxiosInstance } from "../axios";
import { siteKey } from "../Constant";

const TopicArticleApi = (topic_id, userId, page, device, onSuccess, onFailure, onError) => {
	//alert("alert2");
	console.log("TopicArticleApi api :", page);
	const deviceType = device || "mobile";

	const url = `ws/article-list?brand=${siteKey}&topic_id=${topic_id}&page=${page}&device=${deviceType}`;
	//const url = I18nManager.isRTL ? `ws/article-list?brand=ab_ar&topic_id=${topic_id}&page=${page}&device=${deviceType}`: `ws/article-list?brand=${siteKey}&topic_id=${topic_id}&page=${page}&device=${deviceType}`;
	ItpAxiosInstance.get(url)
		.then((response: any) => {
			console.log("URLIS---", url);
			if (response.status === 200) {
				console.log("Got my trove topic response:", response);
				onSuccess(response.data.items);
			} else {
				onFailure("Can't fetch topics");
			}
		})
		.catch((error: any) => {
			console.log("error ", error);
			onError(error);
		});
};

export default TopicArticleApi;
