import { ItpAxiosInstance } from "../axios";

const BrandTabletPageApi = (brand, pageNumber, onSuccess, onFailure, onError) => {
	const url = "ws/brands-listing";
	console.log("BrandPageApi called for page number ", pageNumber, "brand:", brand);
	ItpAxiosInstance.post(url, { brand, user_id: "1", page: pageNumber, device: "tablet" })
		.then((response: any) => {
			if (response) {
				console.log("Got Show BrandPageApi response:", response);
				console.log("Show BrandPageApi are :", response.data);
				onSuccess(response.data, brand);
			} else {
				console.log("Failed to Show BrandPageApi response:", response);
				onFailure("Can't fetch topics");
			}
		})
		.catch((error: any) => {
			console.log("Error to Show BrandPageApi response:", error);
			onError(error);
		});
};

export default BrandTabletPageApi;
