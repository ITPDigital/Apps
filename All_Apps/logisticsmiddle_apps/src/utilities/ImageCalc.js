import { Image } from "react-native";

import { ScalePerctFullWidth, ScalePerctFullHeight } from "../asset";


const fullWidth = ScalePerctFullWidth(100);
export function getImageHeight(url) {
	let imageHeight = 400;
	Image.getSize(url, (width, height) => {
		const ratio = width / fullWidth;
		imageHeight = height / ratio;
	});
	return imageHeight;
}

export const getImageDisplayHeight = (width, height) => {
	const ratio = width / fullWidth;
	const imageHeight = height / ratio;
	return imageHeight;
};
