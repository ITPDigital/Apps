import axios from "axios";
import subUrls, {mainUrls} from '../config.js';   
const mainUrl =   mainUrls();  

export const BaseAxiosInstance = axios.create({
	baseURL: mainUrl.BASE_URL,
	timeout: 60000,
	headers: {
		"Content-Type": "application/json", 
		"Cache-Control": "no-cache",
	},
}); 
 
export const setGlobalHeader = (token: string) => {
	// console.log("token", token);
	ItpAxiosInstance.defaults.headers.common = { Authorization: "Bearer " + token };
	PaywallItpIntance.defaults.headers.common = { Authorization: "Bearer " + token };

};   

export const ItpAxiosInstance = axios.create({   
	baseURL: mainUrl.ITP_URL,
	timeout: 600000,
	headers: {
		"Content-Type": "application/json",
		"Cache-Control": "no-cache",
	},
});

export const PaywallItpIntance = axios.create({
	baseURL: mainUrl.PAYWALL_URL,
	timeout: 600000,
	headers: {
		"Content-Type": "application/json",
		"Cache-Control": "no-cache",
	},
})


PaywallItpIntance.interceptors.response.use(
	response => {
		console.log("_____NETWORK_CALL PAYWALL_____", response);
		return response;
	},
	function(error) {
		// Do something with response error
		return Promise.reject(error);
	},
);



ItpAxiosInstance.interceptors.response.use(
	response => {
		console.log("_____NETWORK_CALL_____", response);
		return response;
	},
	function(error) {
		// Do something with response error
		return Promise.reject(error);
	},
);

export const commentsAxiosInstance = axios.create({
	baseURL: mainUrl.COMMENTS_URL,
	timeout: 600000,
	headers: {
		"Content-Type": "application/json",
		"Cache-Control": "no-cache",
	},
});
