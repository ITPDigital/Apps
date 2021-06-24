import { ItpAxiosInstance } from "../axios";
import { siteKey } from "../Constant";
import { I18nManager } from 'react-native'

const InitialWebService = (deviceType, onSuccess, onFailure, onError) => {
	console.log("STARTUPInitialWebservices");

	const url = I18nManager.isRTL ? `http://trove.itp.com/ws/home?brand=ab_ar&device=mobile`:`ws/home?brand=${siteKey}&device=mobile`;
	//const url = `ws/home?brand=${siteKey}&device=mobile`
	ItpAxiosInstance.get(url)
		.then((response: any) => {
			if (response.status === 200) {
				console.log("Initial Web Service Response:", response);
				onSuccess(response.data);
			} else {
				onFailure("Can't fetch Initial Web Service Response");
			}
		})
		.catch((error: any) => {
			console.log("error in Initial Web Service ", error);
			onError(error);
		});
};

export default InitialWebService;
