import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import reducer from "./Reducer";

const middlewares = [thunk];
if (__DEV__) {
	middlewares.push(createLogger({}));
}

function configureStore(initialState) {
	return createStore(reducer, initialState, applyMiddleware(...middlewares));
}

const store = configureStore({});
export default store;
