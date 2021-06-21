import { ItpAxiosInstance } from "../axios";
import { setBackgroundArticleData } from "../../storage";
import { I18nManager } from 'react-native'

const ArticleDisplayApi = (articleId, onSuccess, onFailure, onError) => {
	const url = I18nManager.isRTL ? `http://trove.itp.com/ws/article-details/${articleId}~ab_ar`:`ws/article-details/${articleId}`;
	//const url = `http://trove.itp.com/ws/article-details/${articleId}~ab_ar`;
	console.log("ARTICLEURLIS---"+url);
	ItpAxiosInstance.get(url)
		.then((response: any) => {
			if (response.status === 200) {
				onSuccess(response);
			} else {
				onFailure(response);
			}
		})
		.catch((error: any) => {
			onError(error);
		});
};
const ArticleDisplayOnBackgroundReq = (articleId, onBackgroundSuccess)=>{
	const url = I18nManager.isRTL ? `http://trove.itp.com/ws/article-details/${articleId}~ab_ar`:`ws/article-details/${articleId}`;
	//const url = `http://trove.itp.com/ws/article-details/${articleId}~ab_ar`;

	console.log("ARTICLEURLISBACK---"+url);

	ItpAxiosInstance.get(url)
		.then((response: any) => {
			if (response.status === 200) {
				setBackgroundArticleData(response)
			} else {
				alert("Something went wrong")
			}
		})
		.catch((error: any) => {
			//onError(error);
		});
}

export{ArticleDisplayApi,ArticleDisplayOnBackgroundReq};
