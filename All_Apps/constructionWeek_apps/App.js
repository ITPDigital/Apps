import React, { PureComponent } from "react";
import { View, I18nManager } from "react-native";
import { Provider } from "react-redux";
import OneSignal from "react-native-onesignal";
import firebase from "react-native-firebase";
import { Store, Navigator, PodcastRoot } from "./src";
import { startListenerTapped, stopListenerTapped } from "./src/CallDetection";
import { saveDeviceInfo } from "./src/redux/Actions/DeviceInfo";
import { DeeplinkService, NavigationService } from "./src/service";
// import { NativeModules } from "react-native";

import { setLanguage } from '../constructionWeek-apps/src/storage'

type Props = {};

// firebase.analytics().setCurrentScreen("app");

export default class App extends PureComponent<Props> {
	constructor(props) {
		super(props);

		this.deeplinkInstance = DeeplinkService.getInstance();
	}

	componentDidMount() {
		// firebase.analytics().setCurrentScreen("HOME");
		// firebase.analytics().logEvent("App_opened_trophy", {});

		firebase.crashlytics().enableCrashlyticsCollection();
		firebase.crashlytics().log("test Crashmessage");

		this.deeplinkInstance.setDeeplinkOnMount();

		console.disableYellowBox = true;
		startListenerTapped();
		console.log("------------------onesignal");
		OneSignal.init("cde79d2a-cdae-491c-86d0-b4c1931c0bd4");
		OneSignal.addEventListener("received", this.onReceived);
		OneSignal.addEventListener("opened", this.onOpened);
		OneSignal.addEventListener("ids", this.onIds);

		setLanguage("Ar");
		I18nManager.forceRTL(true);
	}

	componentWillUnmount() {
		this.deeplinkInstance.removeDeeplinkOnUnmount();
		stopListenerTapped();
		OneSignal.removeEventListener("received", this.onReceived);
		OneSignal.removeEventListener("opened", this.onOpened);
		OneSignal.removeEventListener("ids", this.onIds);
	}

	onReceived = (notification: any) => {
		console.log("------------------Notification received: ", notification);
	};

	onOpened = (openResult: any) => {
		console.log("------------------Message: ", openResult.notification.payload.body);
		console.log("------------------Data: ", openResult.notification.payload.additionalData);
		console.log("------------------isActive: ", openResult.notification.isAppInFocus);
		console.log("------------------openResult: ", openResult);
	};

	onIds = (device: any) => {
		console.log("------------------Device info: ", device);
		Store.dispatch(saveDeviceInfo(device));
	};

	render() {
		return (
			<Provider store={Store}>
				{/* <Navigator ref={navigatorRef => {
						if (navigatorRef) {
							NavigationService.setContainer(navigatorRef);
						}
					}}/> */}
				<View style={{ flex: 1 }}>
					<Navigator
						ref={navigatorRef => {
							if (navigatorRef) {
								NavigationService.setContainer(navigatorRef);
							}
						}}
					/>
					<PodcastRoot />
				</View>
			</Provider>
		);
	}
}
