import axios from "axios";

const BASE_URL = "http://trove-drupal.itp.com/";
const ITP_URL = "http://trove.itp.com/";
const COMMENTS_URL = "https://firestore.googleapis.com/";
const PAYWALL_URL = "https://paywall.itp.com/";

export const BaseAxiosInstance = axios.create({
	baseURL: BASE_URL,
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
	baseURL: ITP_URL,
	timeout: 600000,
	headers: {
		"Content-Type": "application/json",
		"Cache-Control": "no-cache",
	},
});

export const PaywallItpIntance = axios.create({  
	baseURL: PAYWALL_URL,
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
	baseURL: COMMENTS_URL,
	timeout: 600000,
	headers: {
		"Content-Type": "application/json",
		"Cache-Control": "no-cache",
	},
});
