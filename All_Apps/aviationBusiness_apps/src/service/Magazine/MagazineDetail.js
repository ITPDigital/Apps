import { ItpAxiosInstance } from "../axios";
import { siteKey } from "../Constant";

const MagazineDetailApi = (userId, issueId, onSuccess, onFailure, onError) => {
	const url = "ws/mag-issue-details";
	console.log("MagazineDetailParams"+userId+"---"+url+"---"+issueId+"---"+siteKey);
	ItpAxiosInstance.post(url, { user_id: userId, issue_id: issueId, brand: siteKey })
		.then((response: any) => {
			console.log("MagazineDetailData"+JSON.stringify(response));

			if (response.status == 200) {
				onSuccess(response.data);
			} else {
				onFailure(response.data);
			}
		})
		.catch((error: any) => {
			onError(error);
		});
};

export default MagazineDetailApi;
