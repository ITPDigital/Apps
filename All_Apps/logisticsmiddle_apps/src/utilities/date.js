import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
var locale = require('relative-time-format/locale/ar-AE')


TimeAgo.addLocale(en);
const ago = new TimeAgo("en-AR");

function timeAgo(timeStamp) {
	let time = ago.format(new Date(timeStamp * 1000));

	if (time.charAt(0) == "a") {
		time = time.replace("a", "A");
	} else if (time.charAt(0) == "i") {
		time = time.replace("i", "I");
	} else if (time.charAt(0) == "j") {
		time = time.replace("j", "J");
	}

	if (time.search("In") === 0) {
		time = time.replace("In", "").concat(" ago");

		if (time.charAt(1) == "a") {
			time = time.replace("a", "A");
		}
	}

	return time;
}
export default timeAgo;
