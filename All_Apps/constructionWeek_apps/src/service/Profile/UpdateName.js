import { Alert } from "react-native";
import Toast from "react-native-simple-toast";
import { ItpAxiosInstance } from "../axios";

const updatenameAPI = (userId, userName) => {
	const changePasswordUrl = "ws/update-user-details";
	ItpAxiosInstance.post(changePasswordUrl, {
		id: userId,
		name: userName,
	})
		.then((response: any) => {
			if (response.data.status === "Success") {
				//console.log("Got Manage Change Password response:", response.data);
				//Toast.show("Details updated successfully", Toast.TOP);
				alert("Details updated successfully");
				//onSuccess(response.data.items);
			} else {
				alert("Failed to Change Password:", response);
				//onFailure("Can't fetch topics");
			}
		})
		.catch((error: any) => {
			alert("Error occured in updating profile name.");
			//onError(error);
		});
};

export default updatenameAPI;
