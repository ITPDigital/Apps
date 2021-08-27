import { Linking, Platform } from "react-native";
import firebase from "react-native-firebase";
import { NativeModules } from "react-native";
import { Actions, Store } from "./../../redux";
import { NavigationService } from "../Common";
import { getCurrentUserToken } from "../../storage";
import { mainSiteLink, siteKey, siteLink } from "../Constant";

export class DeeplinkService { 
	static deeplinkInstance = null;

	_firebaseOnLink = null; 

	static getInstance() {
		if (DeeplinkService.deeplinkInstance == null) {
			DeeplinkService.deeplinkInstance = new DeeplinkService();
		}

		return this.deeplinkInstance;
	}

	setDeeplinkOnMount() {
		this.handleDeeplinkURL();
		this.handleFirebaseDynamicLink();
	}

	removeDeeplinkOnUnmount() {
		Linking.removeEventListener("url", this.onDeeplinkURLReceived);
		if (this._firebaseOnLink) {
			this._firebaseOnLink();
		}
	}

	handleDeeplinkURL = () => {
		Linking.getInitialURL()
			.then((url) => {
				console.log("linking url", url);
				if (url) {
					this.onDeeplinkURLReceived({ url });
				}
			})
			.catch((e) => {});

		Linking.addEventListener("url", this.onDeeplinkURLReceived);
	};

	getQueryString = (field, url) => {
		let href = url || window.location.href;
		let reg = new RegExp("[?&]" + field + "=([^&#]*)", "i");
		let string = reg.exec(href);
		return string ? string[1] : null;
	};

	handleFirebaseDynamicLink = () => {
		firebase
			.links()
			.getInitialLink()
			.then((url) => {
				if (url) {
					this.onDeeplinkURLReceived({ url });
				}
			});

		// TODO: this doesnt work
		this._firebaseOnLink = firebase.links().onLink((url) => {
			if (url) {
				this.onDeeplinkURLReceived({ url });
			}
		});
	};

	onDeeplinkURLReceived = (event: any) => {
		// this.getQueryString("content_type", event.url);

		console.log("deeplink onDeeplinkURLReceived - ", event.url);

		if (
			event
			&& event.url
			&& (event.url.startsWith(mainSiteLink)
				|| event.url.startsWith(siteLink))
		) {
			console.log("deeplink onDeeplinkURLReceived111 - ");

			let route;
				let routeName;
				let {url} = event;
			const paramsList = this.getAllUrlParams(event.url);
			const params = Object.assign(paramsList, {
				user: 104,
				id: paramsList.nid,
				site: siteKey,
				brand: siteKey,
			});

			console.log("params", params);
			console.log("url", url);

			//  else if (event.url.indexOf("link=https") > 0) {
			//     // Extracting params from link
			// 	const link = params["link"];
			// 	route = link ? decodeURIComponent(link).replace(/.*?:\/\/.*?\//g, "") : null;

			// 	// Need to split based on link first as decodeURIComponent(params["link"]) will not work for android short dynamic links
			// 	url = url.split("link=")[1];
			// 	url = decodeURIComponent(url);
			// 	params = this.getAllUrlParams(url);
			// } else
			if (event.url.startsWith("arabianbusinessapp")) {
				// URL Scheme
				route = url.replace(/.*?:\/\//g, "");
			} else if (params.ct) {
				if (params.ct === "video") {
					Platform.OS === "android"
						? getCurrentUserToken().then((token: string) => {
							console.log("NativeModules", NativeModules);
							NativeModules.BlueConic.setBlueconic(
								params.nid.toString(),
								params.site,
								params.user.toString(),
								token,
								url,
							);
						  })
						: (route = "VideoDetail");
				} else if (params.ct === "podcast") {
					route = "ChaptorPodcastScreen";
				} else if (params.ct === "gallery") {
					route = "GalleryHomeScreen";
				} else {
					route = "ArticleDisplayHomeScreen";
				}
			}

			if (!route) {
				routeName = "HomeTabScreen";
			} else if (route.indexOf("?") > 0) {
				routeName = route.split("?")[0];
			} else if (route.indexOf("&") > 0) {
				routeName = route.split("&")[0];
			} else {
				routeName = route;
			}

			const deeplinkData = {
				route: routeName,
				params,
			};
			9;
			this.handleNotification(JSON.stringify(deeplinkData));
		}
	};

	handleNotification = (deeplinkData: any) => {
		console.log("deeplink handleNotification - ", deeplinkData);
		if (deeplinkData) {
			const {user} = Store.getState();
			console.log("deeplink user - ", user);
			if (user && user.status === "Success") {
				NavigationService.handleDeepLinkData(deeplinkData, Actions.resetDeeplinkData);
			} else {
				Store.dispatch(Actions.setDeeplinkData(deeplinkData));
			}
		}
	};

	getAllUrlParams = (url: any) => {
		if (!url) return null;

		let queryString = url.split("?")[1];
		// we'll store the parameters here
		const obj = {};

		// if query string exists
		if (queryString) {
			// stuff after # is not part of query string, so get rid of it
			queryString = queryString.split("#")[0];

			// split our query string into its component parts
			const arr = queryString.split("&");

			for (let i = 0; i < arr.length; i++) {
				// separate the keys and the values
				const a = arr[i].split("=");

				// in case params look like: list[]=thing1&list[]=thing2
				let paramNum;
				const paramName = a[0].replace(/\[\d*\]/, (v) => {
					paramNum = v.slice(1, -1);
					return '';
				});

				// set parameter value (use 'true' if empty)
				const paramValue = typeof a[1] === "undefined" ? true : a[1];

				// (optional) keep case consistent
				// paramName = paramName.toLowerCase();
				// paramValue = paramValue.toLowerCase();

				// if parameter name already exists
				if (obj[paramName]) {
					// convert value to array (if still string)
					if (typeof obj[paramName] === "string") {
						obj[paramName] = [obj[paramName]];
					}
					// if no array index number specified...
					if (typeof paramNum === "undefined") {
						// put the value on the end of the array
						obj[paramName].push(paramValue);
					}
					// if array index number specified...
					else {
						// put the value at that index number
						obj[paramName][paramNum] = paramValue;
					}
				}
				// if param name doesn't exist yet, set it
				else {
					obj[paramName] = paramValue;
				}
			}
		}

		return obj;
	};
}
