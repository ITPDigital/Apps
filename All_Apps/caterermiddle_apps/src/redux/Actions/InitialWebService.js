import Types from "../Types";

export function setInitialWebServiceData(articles) {
	return (dispatch, getState) => {
		dispatch({
			type: Types.initialWebService.SET_INITIAL_WEBSERVICE_DATA,
			data: { articles },
		});
	};
}
