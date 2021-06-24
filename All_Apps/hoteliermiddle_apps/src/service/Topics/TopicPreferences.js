import { ItpAxiosInstance } from "../axios";

// function getTopicString(selectedTopics) {
// 	//console.log(selectedBrands);
// 	let topics;
// 	selectedTopics.forEach((item, index) => {
// 		if (index === 0) {
// 			topics = item.tid;
// 		} else {
// 			topics = topics + "|" + item.tid;
// 		}
// 	});
// 	//let topicValue = topics.slice(0, -1);
// 	//console.log("topicValue: ", topicValue);
// 	return topics;
// }

const TopicsPreferenceAPI = (userId, selectedTopics, onSuccess, onFailure, onError) => {
	const url = "ws/save-preferences/topic";
	console.log(
		"TopicsPreferenceAPI got called:with userId:",
		userId,
		"   selectedTopics:",
		selectedTopics,
	);

	ItpAxiosInstance.post(url, {
		user_id: userId,
		values: selectedTopics,
	})
		.then((response: any) => {
			if (response) {
				console.log("Success in Topic Preference: ", response);
				onSuccess(response, selectedTopics);
			} else {
				console.log("Failure in Topic Preference: ", response);
				onFailure(response);
			}
		})
		.catch((error: any) => {
			console.log("Error in Topic Preference: ", error);
			onError(error);
		});
};

export default TopicsPreferenceAPI;
