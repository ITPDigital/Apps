import { Dimensions } from "react-native";

const gFullHeight = Dimensions.get("window").height;
const gFullWidth = Dimensions.get("window").width;

export const ScalePerctFullHeight = (height: number) => (gFullHeight * height) / 100;

export const ScalePerctFullWidth = (width: number) => (gFullWidth * width) / 100;
