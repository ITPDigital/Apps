import { ItpAxiosInstance } from "../axios";
import {apis} from "../apis";   

// function getBrandString(selectedBrands) {
// 	//console.log(selectedBrands);
// 	let brands;
// 	selectedBrands.forEach((item, index) => {
// 		if (index === 0) {
// 			brands = item.field_site_key;
// 		} else {
// 			brands = brands + "|" + item.field_site_key;
// 		}
// 	});
// 	return brands;
// }

const BrandsPreferenceAPI = (userId, selectedBrands, onSuccess, onFailure, onError) => {
	const url = apis.save_preferences_brand; 
	ItpAxiosInstance.post(url, { user_id: userId, values: selectedBrands })
		.then((response: any) => {
			if (response) {
				onSuccess(response, selectedBrands);
			} else {
				onFailure(response);
			}
		})
		.catch((error: any) => {
			onError(error);
		});
};

export default BrandsPreferenceAPI;
