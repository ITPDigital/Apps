import React, { PureComponent } from "react";
import { ToastAndroid } from "react-native";
import { ItpAxiosInstance } from "../axios";
import { Strings } from "../../asset";

const ProfilePicUpload = (userId, path, fileName, imageType) => {
	console.log("path", path);
	const uploadURL = "ws/upload-profile-pic/";
	const ProfilePicUploadUrl = uploadURL + userId;
	const formData = new FormData();
	formData.append("prof_pic", {
		uri: path,
		name: fileName,
		type: imageType,
	});
	ItpAxiosInstance.post(ProfilePicUploadUrl, formData)
		.then((response: any) => {
			if (response.data.status === "Success") {
				console.log("profile sucess", response);
				//Toast.show(Strings.profile.ON_SUC_PROF_PIC_UPLOAD, Toast.TOP);
				alert(Strings.profile.ON_SUC_PROF_PIC_UPLOAD);
			} else {
				console.log("Failure on Image Upload", response);
				//onFailure("Can't fetch topics");
			}
		})
		.catch((error: any) => {
			console.log("Error  on Image Upload", error);
			alert("Error occured in Profile pic upload. Please try again later.");
		});
};

export default ProfilePicUpload;
