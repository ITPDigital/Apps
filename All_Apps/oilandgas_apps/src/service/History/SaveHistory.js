import { ItpAxiosInstance } from "../axios";

const SaveHistoryApi = (userId, nodeId, siteKey) => {
	const saveHistoryUrl = "ws/save-history";
	ItpAxiosInstance.post(saveHistoryUrl, {
		user_id: userId,
		node_id: nodeId,
		site_key: siteKey,
	})
		.then((response: any) => {
			if (response.data.status === "Success") {
				console.log("Success in Save history", response);
			} else {
				console.log("Failed in Save history", response);
			}
		})
		.catch((error: any) => {
			console.log("Error to Save history response:", error);
		});
};

export default SaveHistoryApi;
