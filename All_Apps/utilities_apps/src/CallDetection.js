import CallDetectorManager from "react-native-call-detection";
import store from "./redux/Store";
import { isPaused, callDetection } from "./redux/Actions/PodcastPlayControl";

export const startListenerTapped = () => {
	this.callDetector = new CallDetectorManager(
		(event: any) => {
			// For iOS event will be either "Connected",
			// "Disconnected","Dialing" and "Incoming"

			// For Android event will be either "Offhook",
			// "Disconnected", "Incoming" or "Missed"

			if (event === "Disconnected") {
				console.log("disconnected");
				if (store.getState().isCallDetected) {
					store.dispatch(isPaused(false));
					store.dispatch(callDetection(false));
				}
				// Do something call got disconnected
			} else if (event === "Connected") {
				console.log("connected");
				if (!store.getState().podcastPlayControl.paused) {
					store.dispatch(isPaused(true));
					store.dispatch(callDetection(true));
				}

				// Do something call got connected
				// This clause will only be executed for iOS
			} else if (event === "Incoming") {
				console.log("incomeconnected");
				if (!store.getState().podcastPlayControl.paused) {
					store.dispatch(isPaused(true));
					store.dispatch(callDetection(true));
				}
				// Do something call got incoming
			} else if (event === "Dialing") {
				console.log("dialconnected");
				// Do something call got dialing
				// This clause will only be executed for iOS
			} else if (event === "Offhook") {
				console.log("offhookconnected");
				if (!store.getState().podcastPlayControl.paused) {
					store.dispatch(isPaused(true));
					store.dispatch(callDetection(true));
				}
				//Device call state: Off-hook.
				// At least one call exists that is dialing,
				// active, or on hold,
				// and no calls are ringing or waiting.
				// This clause will only be executed for Android
			} else if (event === "Missed") {
				console.log("missedconnected");
				if (store.getState().isCallDetected) {
					store.dispatch(isPaused(false));
					store.dispatch(callDetection(false));
				}

				// Do something call got missed
				// This clause will only be executed for Android
			}
		},
		// false, // if you want to read the phone number of the incoming call [ANDROID], otherwise false
		// () => {}, // callback if your permission got denied [ANDROID] [only if you want to read incoming number] default: console.error
		// {
		// 	title: "Phone State Permission",
		// 	message:
		// 		"This app needs access to your phone state in order to react and/or to adapt to incoming calls.",
		// }, // a custom permission request message to explain to your user, why you need the permission [recommended] - this is the default one
	);
};

export const stopListenerTapped = () => {
	this.callDetector && this.callDetector.dispose();
};
