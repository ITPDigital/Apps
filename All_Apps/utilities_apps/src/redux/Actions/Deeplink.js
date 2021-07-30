import Types from "../Types";

export function setDeeplinkData(data) {
    return {
        type: Types.deeplink.SET_DEEPLINK_DATA,
        data
    };
}

export function resetDeeplinkData() {
    return {
        type: Types.deeplink.RESET_DEEPLINK_DATA
    };
}
