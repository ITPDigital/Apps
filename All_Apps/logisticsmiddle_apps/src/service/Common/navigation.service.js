import { NavigationActions, StackActions } from "react-navigation";

let _container; // eslint-disable-line

export default class NavigationService {
	static back() {
		_container.dispatch(NavigationActions.back());
	}

	static getCurrentRouteIndex() {
		return _container && _container.state.nav ? _container.state.nav.index : null;
	}

	static getCurrentRoute() {
		if (!_container || !_container.state.nav) {
			return null;
		}

		return _container.state.nav.routes[_container.state.nav.index] || null;
	}

	static popIndex(index) {
		_container.dispatch(StackActions.pop({ n: index }));
	}

	static replace(newRouteName, params, newKey = null) {
		_container.dispatch(
			StackActions.replace({
				routeName: newRouteName,
				params,
				newKey,
			}),
		);
	}

	static navigate(routeName, params, key = null) {
		_container.dispatch(
			NavigationActions.navigate({
				type: "Navigation/NAVIGATE",
				routeName,
				params,
				key: key ? key : "",
			}),
		);
	}

	static reset(routeName, params, key = null) {
		_container.dispatch(
			StackActions.reset({
				index: 0,
				actions: [
					NavigationActions.navigate({
						type: "Navigation/NAVIGATE",
						routeName,
						params,
					}),
				],
				key,
			}),
		);
	}

	static setContainer(container) {
		_container = container;
	}

	static handleDeepLinkData(data, resetDeeplinkData = () => {}, navigation) {
		console.log("deeplink Navigation handle - ", data);
		resetDeeplinkData();
		const deeplinkData = JSON.parse(data);
		const params = deeplinkData.params ? deeplinkData.params : null;
		if (deeplinkData) {
			let resetAction;
			if (navigation) {
				navigation.navigate("HomeNavigation");
				setTimeout(() => NavigationService.navigateToDeeplink(deeplinkData, params), 100);
			} else {
				NavigationService.navigateToDeeplink(deeplinkData, params);
			}
		}
	}

	static navigateToDeeplink(deeplinkData, params) {
		// if (params.f === "1") {
		// 	resetAction = StackActions.reset({
		// 		index: 0,
		// 		actions: [
		// 			NavigationActions.navigate({
		// 				routeName: "History",
		// 			}),
		// 		],
		// 		key: null,
		// 	});
		// } else if (params.f === "2") {
		// 	resetAction = StackActions.reset({
		// 		index: 0,
		// 		actions: [
		// 			NavigationActions.navigate({
		// 				routeName: "Bookmark",
		// 			}),
		// 		],
		// 		key: null,
		// 	});
		// } else
		if (params.ct === "video") {
			resetAction = StackActions.reset({
				index: 0,
				actions: [
					NavigationActions.navigate({
						routeName: "TabHomeScreen",
					}),
				],
				key: null,
			});
		} else {
			resetAction = StackActions.replace({
				index: 0,
				actions: [
					NavigationActions.navigate({
						routeName: "TabHomeScreen",
					}),
				],
				key: null,
			});
		}

		Promise.all([_container.dispatch(resetAction)]).then(() => {
			if (deeplinkData.route !== "HomeTabScreen") {
				NavigationService.navigate(deeplinkData.route, params);
			}
		});
	}
}
