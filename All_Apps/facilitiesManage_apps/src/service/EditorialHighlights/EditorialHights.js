import { ItpAxiosInstance } from "../axios";
import {apis} from "../apis";  

const EditorailHighlightsApi = (pageNumber, onSuccess, onFailure, onError) => {
	const url = apis.get_editors_choice; 
	console.log("EditorailHighlightsApi called for page number ", pageNumber);
	ItpAxiosInstance.post(url, { user_id: "1", page: pageNumber, device: "tablet" })
		.then((response: any) => {
			if (response) {
				console.log("Got Show EditorailHighlightsApi response:", response);
				console.log("Show EditorailHighlightsApi are :", response.data);
				onSuccess(response.data);
			} else {
				console.log("Failed to Show EditorailHighlightsApi response:", response);
				onFailure("Can't fetch topics");
			}
		})
		.catch((error: any) => {
			console.log("Error to Show EditorailHighlightsApi response:", error);
			onError(error);
		});
};

export default EditorailHighlightsApi;
