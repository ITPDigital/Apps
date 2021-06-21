// import { ToastAndroid } from "react-native";
import { ItpAxiosInstance } from "../axios";
import { Alert } from "react-native";

const ChangePasswordAPI = (userId, existingPassword, newPassword, userName) => {
	const changePasswordUrl = "ws/update-user-details";
	ItpAxiosInstance.post(changePasswordUrl, {
		id: userId,
		existing_pass: existingPassword,
		new_pass: newPassword,
		name: userName,
	})
		.then((response: any) => {
			if (response.data.status === "Success") {
				console.log("Got Manage Change Password response:", response.data);
				//Toast.show("Details are saved successfully!", Toast.TOP);
				alert("Details are saved successfully!");
				//onSuccess(response.data.items);
			} else {
				alert("Failed to Change Password:", response);
				//onFailure("Can't fetch topics");
			}
		})
		.catch((error: any) => {
			alert("Error occured in change in password");
			//onError(error);
		});
};

export default ChangePasswordAPI;
