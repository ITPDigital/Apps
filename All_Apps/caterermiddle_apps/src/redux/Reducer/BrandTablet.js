import Types from "../Types";
import createReducer from "./CreateReducer";
import { Constants } from "../../asset";

const initialMyTrove = {};

export const brandTablet = createReducer(initialMyTrove, {
	[Types.brandTablet.SET_BRAND_TABLET](state, action) {
		console.log("action.data", {
			...state,
			[action.data.tid]: manipulateBrandTablet(action.data.list),
		});
		return {
			...state,
			[action.data.tid]: manipulateBrandTablet(action.data.list),
		};
	},
	[Types.brandTablet.UPDATE_BRAND_TABLET](state, action) {
		return {
			...state,
			[action.data.tid]: action.data.list,
		};
	},
	[Types.brandTablet.SET_PAGINATION_BRAND_TABLET](state, action) {
		console.log("reducer_data", action.data);
		let newPaginationData = [...state[action.data.tid]];
		newPaginationData.forEach((item, index) => {
			newPaginationData[index].data =
				item.title === ""
					? manipulateArray(
							newPaginationData[index].data,

							action.data.tid,
							action.data.list,
							action.data.type,
					  )
					: [...newPaginationData[index].data];
		});
		return {
			...state,
			[action.data.tid]: [...newPaginationData],
		};
		// return {
		// 	...state,
		// 	[action.data.tid]: state[action.data.tid].concat(
		// 		manipulatePaginationBrand(action.data.tid, action.data.list),
		// 	),
		// };
	},
	[Types.brandTablet.CLEAR_BRAND_TABLET](state, action) {
		return {
			...state,
			[action.data.tid]: [],
		};
	},
});

const manipulateBrandTablet = (list: any) => {
	console.log("listinreducer", list);
	const myTroveArray = [];
	if (list) {
		if (list.top_stories != null && list.top_stories.length > 0) {
			myTroveArray.push({
				title: Constants.articleListSections.topStories,
				data: getTabletList(list.top_stories),
				count: 1,
				footer: true,
			});
		}
		if (list.editors_choice != null && list.editors_choice.length > 0) {
			myTroveArray.push({
				title: Constants.articleListSections.editorial,
				data: getTabletList(list.editors_choice),
				count: 1,
				footer: true,
			});
		}
		// if (list.podcast != null && list.podcast.length > 0) {
		// 	myTroveArray.push({
		// 		title: Constants.articleListSections.podcast,
		// 		data: [list.podcast],
		// 		count: 1,
		// 	});
		// }
		if (
			list.stories_list != null &&
			list.stories_list.length > Constants.myTroveTablet.first
		) {
			myTroveArray.push({
				title: Constants.articleListSections.empty,
				data: getTabletList(list.stories_list),
				count: 1,
			});
		}
		// if (list.videos != null && list.videos.length > 0) {
		// 	myTroveArray.push({
		// 		title: Constants.articleListSections.videos,
		// 		data: [list.videos],
		// 		count: 1,
		// 	});
		// }
	}
	console.log("myTroveArray", myTroveArray);
	return myTroveArray;
};

const getTabletList = (list: any) => {
	console.log("listinbrandTab", list);
	const result = [];
	const size = list.length;
	let i = 0;

	while (i < size) {
		const item = list[i];
		if (item.template == "T1" && !(item.content_type == "video")) {
			if (item.content_type == "article_listing" || item.content_type == "gallery") {
				result.push(item);
				i += 1;
			}
		} else if (item.content_type == "video") {
			result.push(item);
			i += 1;
		} else {
			const subArray = [];
			subArray.push(item);
			i += 1;
			if (i < size) {
				const nextItem = list[i];
				if (!(nextItem.template == "T1")) {
					subArray.push(nextItem);
					i += 1;
				}
			}
			result.push(subArray);
		}
	}
	return result;
};

const manipulatePaginationBrand = (tid: number, list: any, type: any, popedValue: any) => {
	const myTroveArray = [];

	if (list) {
		if (list.stories_list != null && list.stories_list.length > 0) {
			popedValue ? list.stories_list.unshift(popedValue) : null;

			myTroveArray.push({
				title: Constants.articleListSections.empty,
				data: getTabletList(list.stories_list),
				count: 1,
			});
		}
	}

	return myTroveArray;
};

const manipulateArray = (mainArray: Array, tid, list, type) => {
	const popedValue = mainArray.pop();
	let manipulatePageination = null;
	if (popedValue.length === 1 && popedValue[0].content_type !== "video") {
		console.log("pop", popedValue);
		manipulatePageination = manipulatePaginationBrand(tid, list, type, popedValue[0]);
	} else {
		mainArray.push(popedValue);
		manipulatePageination = manipulatePaginationBrand(tid, list, type);
	}

	const paginationData = manipulatePageination[0].data;
	return [...mainArray, ...paginationData];
};
