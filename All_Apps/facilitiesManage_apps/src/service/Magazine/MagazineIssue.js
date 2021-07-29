import { ItpAxiosInstance } from "../axios";
import {apis} from "../apis";  

const MagazineIssueApi = (onSuccess, onFailure, onError) => {
	console.log("INMAGAZINESDATA");

	const url = apis.mag_issue_listing;  
	ItpAxiosInstance.get(url)
		.then((response: any) => {
			if (response.status == 200) {
				console.log("MAGAZINESDATA", JSON.stringify(response.data));

				onSuccess(response.data);
			} else {
				onFailure(response.data);
			}
		})
		.catch((error: any) => {
			onError(error);
		});
};

export default MagazineIssueApi;
