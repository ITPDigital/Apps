import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import { ScalePerctFullWidth, ScalePerctFullHeight } from "./Scale";

const isTablet = DeviceInfo.isTablet();

// text sizes
const VVVV_SMALL_TEXT_SIZE = !isTablet ? 8 : 10;
const VVV_SMALL_TEXT_SIZE = !isTablet ? 9 : 11;
const VV_SMALL_TEXT_SIZE = !isTablet ? 10 : 12;
const V_SMALL_TEXT_SIZE = !isTablet ? 11 : 13;
const SMALL_TEXT_SIZE = !isTablet ? 12 : 14;
const MEDIUM_TEXT_SIZE = !isTablet ? 14 : 16;
const EXTRA_MEDIUM_TEXT = !isTablet ? 16 : 18;
const EXTRA_MEDIUM = !isTablet ? 18 : 20;
const EXTRA_MEDIUM_TEXT_SIZE = !isTablet ? 15 : 17;
const LARGE_TEXT_SIZE = !isTablet ? 17 : 19;
const EXTRA_LARGE_TEXT_SIZE = !isTablet ? 22 : 24;

// border radius
const SMOOTH_CORNER = 3;
const SMALL_RADIUS = 5;
const MEDIUM_RADIUS = 10;
const LARGE_RADIUS = 25;

const LINE_WIDTH = 1;

const fullHeight = ScalePerctFullHeight(100); 

const getStatusBarHeight = () => { 
	if (Platform.OS === "android" && Platform.Version < 21) return 0 
	if (Platform.OS === "ios" && (fullHeight === 812 || fullHeight === 896)) return 34;
	return 34;
};
     
const getHeaderHeight = () => {
	if (Platform.OS === "android" && Platform.Version < 21) return HEADER_HEIGHT_PERT - 24;
	if (Platform.OS === "android" && Platform.Version > 21) return HEADER_HEIGHT_PERT + 15;
	if (Platform.OS === "ios" && (fullHeight === 812 || fullHeight === 896)) {
		return HEADER_HEIGHT_PERT + 10;
	}
	return HEADER_HEIGHT_PERT;
};

const HEADER_HEIGHT_PERT = 65;
const HEADER_HEIGHT = getHeaderHeight();
const STATUS_BAR_HEIGHT = getStatusBarHeight();

const DEFAULT_PADDING = ScalePerctFullWidth(4);
const DEFAULT_LIST_PADDING = ScalePerctFullWidth(4);
// line height
const VERY_SMALL_LINE_HEIGHT = 12;
const SMALL_LINE_HEIGHT = 18;
const LARGE_LINE_HEIGHT = 23;
const EXTRA_LARGE_LINE_HEIGHT = 30;

const Metrics = {
	SMALL_TEXT_SIZE,
	MEDIUM_TEXT_SIZE,
	LARGE_TEXT_SIZE,
	EXTRA_LARGE_TEXT_SIZE,
	VVVV_SMALL_TEXT_SIZE,
	VVV_SMALL_TEXT_SIZE,
	VV_SMALL_TEXT_SIZE,
	V_SMALL_TEXT_SIZE,
	EXTRA_MEDIUM_TEXT_SIZE,
	EXTRA_MEDIUM_TEXT,
	EXTRA_MEDIUM,

	SMOOTH_CORNER,
	SMALL_RADIUS,
	MEDIUM_RADIUS,
	LARGE_RADIUS,

	DEFAULT_PADDING,
	DEFAULT_LIST_PADDING,

	LINE_WIDTH,

	HEADER_HEIGHT,
	STATUS_BAR_HEIGHT,
	EXTRA_LARGE_LINE_HEIGHT,
	LARGE_LINE_HEIGHT,
	SMALL_LINE_HEIGHT,
	VERY_SMALL_LINE_HEIGHT,
	isTablet,
};

export default Metrics;
