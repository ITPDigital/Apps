import { connect } from "react-redux";
//import { TopicApi } from "./Topics";
import { bindActionCreators } from "redux";
import { Actions } from "../redux";
import { Store } from "../../src";

export class StartUp {
	constructor(props) {
		//TopicApi(response => this.onSuccess(response, props), this.onFailure, this.onError);
	}

	onSuccess = (response, props) => {
		// console.log("On success: ", response);
		props.setAllTopics(response);
	};

	onFailure = (message: string) => {
		console.log("On Failure message", message);
		console.log(message);
	};

	onError = (message: string) => {
		console.log("error", message);
		console.log(message);
	};
}
// export const StartUp = props => {
// 	console.log(" Topics props", props);
// 	TopicApi(response => onSuccess(response, props), onFailure, onError);
// };

// onSuccess = (response, props) => {
// 	console.log("On success: ", response);
// 	props.setAllTopics(response);
// };

// onFailure = message => {
// 	console.log("On Failure message", message);
// 	console.log(message);
// };

// onError = message => {
// 	console.log("error", message);
// 	console.log(message);
// };

// function mapStateToProps() {
// 	// state
// 	return {};
// }

// function mapDispatchToProps(dispatch) {
// 	return bindActionCreators(Actions, dispatch);
// }

// export default connect(
// 	mapStateToProps,
// 	mapDispatchToProps,
// )(StartUp);
