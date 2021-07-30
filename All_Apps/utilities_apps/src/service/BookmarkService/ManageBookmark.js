import { ItpAxiosInstance } from "../axios";
import { Analytics, Events } from "../../Analytics";
import {apis} from "../apis";   

const ManageBoookmarkApi = (
	userId,
	nodeId,
	siteKey,
	manageFlag,    
	onSuccess,
	onFailure,
	onError,
) => {
	const managaeBookmarkUrl = apis.save_bookmark;
	console.log("user details, ", userId, nodeId, siteKey, manageFlag ? "U" : "F");
	manageFlag
		? Analytics.logEvent(Events.unBookmark, {})
		: Analytics.logEvent(Events.bookmark, {});
	ItpAxiosInstance.post(managaeBookmarkUrl, {
		user_id: userId,
		node_id: nodeId,
		site_key: siteKey,
		flag: manageFlag ? "U" : "F",
	})
		.then((response: any) => {
			if (response) {
				console.log(manageFlag, "Following|Unfollowing", response);
				//onSuccess(response.data.items);
			} else {
				console.log("Failed to Manage Boomark response:", response);
				//onFailure("Can't fetch topics");
			}
		})
		.catch((error: any) => {
			console.log("Error to Manage Boomark response:", error);
			//onError(error);
		});
};

export default ManageBoookmarkApi;
