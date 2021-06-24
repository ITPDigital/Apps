import Share from "react-native-share";
import { Platform } from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import { Analytics, Events } from "../../Analytics";
import { siteKey } from "../../service/Constant";

export const shareArticle = (
	message: string,
	url: string,
	nid: Number = -1,
	contentType: string,
	link: string,
	user: string,
	data: any,
	routeFlag: any,
	site: string = siteKey,
) => {
	Analytics.logEvent(Events.share, {});
	console.log("item", routeFlag);
	const f = routeFlag || 0;
	let deeplinkUrl = " https://arabianbusiness.page.link";
	if (nid && nid > -1) {
		// deeplinkUrl = deeplinkUrl + `/?nid=${nid}&site=${site}&content_type=${contentType}`;
		const link1 = `${link  }?ct=${contentType}&f=${f}&nid=${nid}`;
		const queryEnc = encodeURIComponent(link1);

		deeplinkUrl +=
			`/?nid=${nid}&ct=${contentType}&link=${queryEnc}&f=${f}&ibi=com.pagesuite.droid.arabianbusiness&apn=com.pagesuite.droid.arabianbusiness&isi=1466594419`;
		console.log("deeplinkUrl", deeplinkUrl);
	}
	const content = Platform.OS === "android" ? message : message + deeplinkUrl;
	Share.open({
		title: message,
		message: content,
		// url: newbase64Data,
		url: deeplinkUrl,
		subject: message, //  for email
	});
	// try {
	// 	const { fs } = RNFetchBlob;
	// 	const filePath = RNFetchBlob.fs.dirs.DocumentDir + "/share";
	// 	let imagePath = null;
	// 	RNFetchBlob.config({
	// 		fileCache: true,
	// 		path: filePath,
	// 	})
	// 		.fetch("GET", url)
	// 		.then((resp: any) => {
	// 			imagePath = resp.path();
	// 			return resp.readFile("base64");
	// 		})
	// 		.then((base64Data: any) => {
	// 			const newbase64Data = `data:image/png;base64,${base64Data}`;
	// 			Share.open({
	// 				title: message,
	// 				message: message,
	// 				//url: newbase64Data,
	// 				//urls: [newbase64Data, deeplinkUrl],
	// 				 url: deeplinkUrl,
	// 				subject: message, //  for email
	// 			});
	// 			fs.unlink(filePath)
	// 				.then(() => {
	// 					console.log("success unlink");
	// 				})
	// 				.catch(err => {
	// 					console.log("err unlink", err);
	// 				});
	// 		})
	// 		.catch((err: any) => {
	// 			console.log("share error", err);
	// 			Share.open({
	// 				title: message,
	// 				message: message,
	// 				url: "",
	// 				subject: message, //  for email
	// 			});
	// 		});
	// } catch (err) {
	// 	console.log("share error", err);
	// 	Share.open({
	// 		title: message,
	// 		message: message,
	// 		url: "",
	// 		subject: message, //  for email
	// 	});
	// }
};
