import { ItpAxiosInstance } from "../axios";
import { siteKey } from "../Constant";

const ResendApi = (id: number, onSuccess, onFailure, onError) => {
	const url = `resend-activation/${id}?&site_key=${siteKey}`;
	// login='robodiego'
	// password='Buddy6jar!'
	ItpAxiosInstance.get(url)
		.then((response: any) => {
			console.log("response in resend", response);

			onSuccess(response.data.message);
		})
		.catch((error: any) => {
			console.log("error error", error);

			onError(error);
		});
};

export default ResendApi;
