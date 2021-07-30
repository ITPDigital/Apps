import { ItpAxiosInstance } from "../axios";
import {apis} from "../apis";   

const FollowAuthor = (authorId, siteKey, followFlag) => { 
	const url = apis.save_preferences_author;  
	const key = authorId + "~" + siteKey;
	console.log("Author Details API is calling for the author: ", key);

	ItpAxiosInstance.post(url, {
		author: key,
		flag: followFlag,
	})
		.then((response: any) => {
			if (response) {
				console.log("Success in Author Details data fetching: ", response);
			} else {
				console.log("Failure in Author Details data fetching ", response);
			}
		})
		.catch((error: any) => {
			alert("Something went wornt please try again later.");
			console.log("Error in Author Details data fetching: ", error);
		});
};

export default FollowAuthor;
