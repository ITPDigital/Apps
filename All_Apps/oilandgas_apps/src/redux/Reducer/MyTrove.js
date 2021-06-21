import Types from "../Types";
import createReducer from "./CreateReducer";
import { Constants } from "../../asset";
import { I18nManager } from "react-native";

const initialMyTrove = {};

export const myTrove = createReducer(initialMyTrove, {
	[Types.myTrove.SET_MY_TROVE](state, action) {
		console.log("myTroveData details,  state:", state, "Action:", action);

		return {
			...state,
			[action.data.tid]: manipulateMyTrove(
				action.data.tid,
				action.data.list,
				action.data.type,
			),
		};
	},
	[Types.myTrove.UPDATE_MY_TROVE](state, action) {
		return {
			...state,
			[action.data.tid]: action.data.list,
		};
	},
	[Types.myTrove.SET_PAGINATION_MY_TROVE](state, action) {
		return {
			...state,
			[action.data.tid]: state[action.data.tid]
			// .concat(
			// 	manipulatePaginationMyTrove(action.data.tid, action.data.list, action.data.type),
			// ),
		};
	},
	[Types.myTrove.CLEAR_MY_TROVE](state, action) {
		return {
			...state,
			[action.data.tid]: [],
		};
	},
});

const manipulateMyTrove = (tid: number, list: any, type: any) => {
	console.log("listin", list);
	//alert("my")
	const myTroveArray = [];
	let isTopSories = false;
	if (type !== "brand" && tid != 0) {
		console.log("manipulateMyTrove")
		myTroveArray.push({
			title: Constants.articleListSections.empty,
			data: list.items,
			count: list.count / 20,
		});
	} else if (list) {

		console.log("ACTUALLISTIS", list);

		if (list.top_stories != null && list.top_stories.length > 0) {
			myTroveArray.push({
				title: "",//Constants.articleListSections.topStories,
				data: list.top_stories.slice(0, 5),
				count: 1,
				marquee: list.marquee != null && list.marquee.length > 0 ? list.marquee.slice(0, 5) : null,
				isReadMore: false,
				isTopSories: true
			});
			isTopSories = true
		}
		if (list.editors_choice != null && list.editors_choice.length > 0) {
			myTroveArray.push({
				title: Constants.articleListSections.editorial,
				data: [list.editors_choice],
				count: 1,
				isTopSories: true
			});
		}
		if (list.stories_list != null && list.stories_list.length > 0) {
			myTroveArray.push({
				title: Constants.articleListSections.empty,
				data: list.stories_list.slice(0, 3),
				count: 1,
				marquee: list.marquee != null && list.marquee.length > 0 ? list.marquee.slice(0, 5) : null,
				isTopSories: true

			});
			isTopSories = true
		}

		if (list.mostread != null && list.mostread.length > 3) { // NTODO change industries to most read articles
			myTroveArray.push({
				title: I18nManager.isRTL ? "الأكثر قراءة القصص" : "Most read stories",//Constants.articleListSections.empty,
				data: list.mostread.slice(0, 6),
				count: 1,
				isTopSories: isTopSories
			});
		}
		if (list.videos != null && list.videos.length > 0) {
			myTroveArray.push({
				title: Constants.articleListSections.videos,
				data: [list.videos],
				count: 1,
				isReadMore: true,
				dataLength: 0

			});
		}

		// if (list.industries != null && list.industries.length > 0) {
		// 	myTroveArray.push({
		// 		title: "Industries",//Constants.articleListSections.empty,
		// 		data: list.industries.slice(0, 5),
		// 		count: 1,
		// 		isReadMore: true,
		// 		previousTitle: list.videos != null && list.videos.length > 3 ? "Videos" : "",
		// 		dataLength: 4,
		// 		tagId: 88,

		// 	});
		// }
		// if (list.opinion != null && list.opinion.length > 0) {
		// 	myTroveArray.push({
		// 		title: "Opinion",//Constants.articleListSections.empty,
		// 		data: list.opinion.slice(0, 5),
		// 		count: 1,
		// 		isReadMore: true,
		// 		previousTitle: list.industries != null && list.industries.length > 3 ? "Industries" : "",
		// 		dataLength: 4,
		// 		tagId: 1,


		// 	});
		// }
		if (list.lifestyle != null && list.lifestyle.length > 3) {
			myTroveArray.push({
				title: "Lifestyle",//Constants.articleListSections.empty,
				data: list.lifestyle.slice(0, 4),
				count: 1,
				isReadMore: false,
				previousTitle: list.opinion != null && list.opinion.length > 3 ? "Videos" : "",
				dataLength: 4,
				tagId: 11,


			});
		}
		// if (list.startup != null && list.startup.length > 3) {
		// 	myTroveArray.push({
		// 		title: "Startup",//Constants.articleListSections.empty,
		// 		data: list.startup.slice(0, 5),
		// 		count: 1,
		// 		isReadMore: true,
		// 		previousTitle: list.lifestyle != null && list.lifestyle.length > 3 ? "Lifestyle" : "",
		// 		dataLength: 4,
		// 		tagId: 5,


		// 	});
		// }
		// if (list.ceo != null && list.ceo.length > 3) {
		// 	myTroveArray.push({
		// 		title: "CEO",//Constants.articleListSections.empty,
		// 		data: list.ceo.slice(0, 5), //NTODO
		// 		count: 1,
		// 		isReadMore: true,
		// 		previousTitle: list.startup != null && list.startup.length > 3 ? "Startup" : "",
		// 		dataLength: 4,
		// 		tagId: 36,


		// 	});
		// }

		if (list.politics != null && list.politics.length > 3) {
			myTroveArray.push({
				title: "POLITICS",//Constants.articleListSections.empty,
				data: list.politics.slice(0, 5), //NTODO
				count: 1,
				isReadMore: true,
				previousTitle: list.politics != null && list.politics.length > 3 ? "Lifestyle" : "",
				dataLength: 4,
				tagId: 103,


			});
		}

		if (list.business != null && list.business.length > 3) {
			myTroveArray.push({
				title: "Business",//Constants.articleListSections.empty,
				data: list.business.slice(0, 5), //NTODO
				count: 1,
				isReadMore: true,
				previousTitle: list.business != null && list.business.length > 3 ? "POLITICS" : "",
				dataLength: 4,
				tagId: 103,


			});
		}

		if (list.technology != null && list.technology.length > 3) {
			myTroveArray.push({
				title: "Technology",//Constants.articleListSections.empty,
				data: list.technology.slice(0, 5), //NTODO
				count: 1,
				isReadMore: true,
				previousTitle: list.technology != null && list.technology.length > 3 ? "Business" : "",
				dataLength: 4,
				tagId: 103,


			});
		}

		if (list.podcast != null && list.podcast.length > 0) {
			myTroveArray.push({
				title: Constants.articleListSections.podcast,
				data: [list.podcast],
				count: 1,
			});
		}

	}
	console.log("myTroveArray: " + JSON.stringify(myTroveArray))
	return myTroveArray;
};

const manipulatePaginationMyTrove = (tid: number, list: any, type: any) => {
	const myTroveArray = [];
	console.log("list1 ", list);
	console.log("type0 ", type);
	// if (type === "brand") {
	// 	myTroveArray.push({
	// 		title: Constants.articleListSections.empty,
	// 		data: list.,
	// 		count: list.count / 20,
	// 	});
	// }

	if (type !== "brand" && tid != 0) {
		console.log("list2 ", list);
		myTroveArray.push({
			title: Constants.articleListSections.empty,
			data: list.items,
			count: list.count / 20,
		});
	} else if (list) {
		console.log("list3 ", list);
		if (list.stories_list != null && list.stories_list.length > 0) {
			myTroveArray.push({
				title: Constants.articleListSections.empty,
				data: list.stories_list,
				count: 1,
			});
		}
	}
	console.log("myTroveArray ", myTroveArray);
	return myTroveArray;
};
