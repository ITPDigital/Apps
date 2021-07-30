import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BrandApi } from "./Brands";
import { Actions } from "../redux";
import { Store } from "..";

export const StartBrandsService = (props) => {
	console.log("props", props);
	BrandApi(response => onSuccess(response, props), onFailure, onError);
};

onSuccess = (response, props) => {
	console.log("succ", response);
	props.setAllBrands(response);
};

onFailure = (message) => {
	console.log("message", message);
	console.log(message);
};

onError = (message) => {
	console.log("err", message);
	console.log(message);
};
