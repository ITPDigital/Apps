import Types from "../Types";

export function deeplink(state = {}, action) {
    if (action.type === Types.deeplink.SET_DEEPLINK_DATA) {
        return {
            ...state,
            deeplinkData: action.data
        };
    } else if (action.type === Types.deeplink.RESET_DEEPLINK_DATA) {
        return {
            ...state,
            deeplinkData: null
        };
    } else {
        return state;
    }
}
