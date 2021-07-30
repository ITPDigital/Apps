import { ItpAxiosInstance } from "../axios";
import { siteKey } from "../Constant";
import { I18nManager } from "react-native";

const MagazinePrevIssueApi = (id, onSuccess, onFailure, onError, pageNumber) => {
	console.log("pagenumber----------------------------------", pageNumber);
	const url = I18nManager.isRTL ? `http://trove.itp.com/ws/mag-prev-issues/ab_ar?page=0` : `ws/mag-prev-issues/${siteKey}?page=${pageNumber}`;
	ItpAxiosInstance.get(url)
		.then((response: any) => {
			console.log("prev response ", id, response);
			if (response.status == 200) {
				onSuccess(response.data);
			} else {
				onFailure(response.data);
			}
		})
		.catch((error: any) => {
			console.log("prev error ", error);
			onError(error);
		});
};

export default MagazinePrevIssueApi;
