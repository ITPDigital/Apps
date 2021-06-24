import { ItpAxiosInstance } from "../axios";

const MagazineIssueApi = (onSuccess, onFailure, onError) => {
	console.log("INMAGAZINESDATA");

	const url = "ws/mag-issue-listing";
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
