import { ItpAxiosInstance } from "../axios";
import { Constants } from "../../asset";
import { siteKey } from "../Constant";
import {apis} from "../apis";   

function logError(email, api_response, api_request, error_log, error_message) {
	const url = apis.log_error; 
	let message = Constants.errorMessages.general;
	if (api_response.toString().includes(Constants.errorMessages.checkNetwork)) {
		message = Constants.errorMessages.network;
	}
	console.log("logerror----------", api_response);
	return ItpAxiosInstance.post(url, {
		email,
		api_response: `${api_response}`,
		error_log,
		error_message: message,
		api_request,
		site_key: siteKey,
	})
		.then((response: any) => {
			console.log("reg", response);
			if (response.data.status === "Success") {
				// onSuccess(response.data.message);
				console.log("error logged successfully");
			} else {
				console.log("error logging failed");
			}
		})
		.catch((error: any) => {
			console.log("onerror");

			// onError(error);
		});
}

export default logError;
