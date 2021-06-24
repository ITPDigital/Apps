import Types from "../Types";
import createReducer from "./CreateReducer";
import { Constants } from "../../asset";

const initialMyTrove = {};

export const myTroveTablet = createReducer(initialMyTrove, {
	[Types.myTrove.SET_MY_TROVE_TABLET](state, action) {
		console.log("reducer_data", action.data);
		return {
			...state,
			[action.data.tid]: manipulateMyTroveTablet(
				action.data.tid,
				action.data.list,
				action.data.type,
			),
		};
	},
	[Types.myTrove.UPDATE_MY_TROVE_TABLET](state, action) {
		return {
			...state,
			[action.data.tid]: action.data.list,
		};
	},
	[Types.myTrove.SET_PAGINATION_MY_TROVE_TABLET](state, action) {
		// console.log("act1", state);
		// let manipulatePageination = manipulatePaginationMyTrove(
		// 	action.data.tid,
		// 	action.data.list,
		// 	action.data.type,
		// );
		// let paginationData = manipulatePageination[0].data;
		let newPaginationData = [...state[action.data.tid]];
		newPaginationData.forEach((item, index) => {
			// console.log("index0", item);

			// console.log("index", item.data.pop());
			// console.log("index1", item);

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
		// y[3] = z
		// console.log("y---", y[3].concat(x[0].data));
		// console.log("Pagination", {
		// 	...state,
		// 	[action.data.tid]: state[action.data.tid].forEach(element => {
		// 		element.title === "" ? element.data.concat(x[0].data) : console.log("null");
		// 	}),
		// });
		// // console.log("Pagination", {
		// 	...state,
		// 	[action.data.tid]: [...y],
		// });
		// console.log("new data", {
		// 	...state,
		// 	[action.data.tid]: state[action.data.tid].concat(
		// 		manipulatePaginationMyTrove(action.data.tid, action.data.list, action.data.type),
		// 	),
		// });

		return {
			...state,
			[action.data.tid]: [...newPaginationData],
		};
	},
	[Types.myTrove.CLEAR_MY_TROVE_TABLET](state, action) {
		return {
			...state,
			[action.data.tid]: [],
		};
	},
});

const manipulateMyTroveTablet = (tid: number, list: any, type: any) => {
	console.log("tablist", list);
	const myTroveArray = [];
	if (tid != 0) {
		console.log("tablist1", list);

		myTroveArray.push({
			title: Constants.articleListSections.empty,
			data: getTabletList(list.items),
			count: list.count / 20,
		});
	}
	if (list) {
		console.log("tablist2", list);

		if (list.top_stories != null && list.top_stories.length > 0) {
			console.log("tablist3", list);

			myTroveArray.push({
				title: Constants.articleListSections.topStories,
				data: getTabletList(list.top_stories),
				count: 1,
				footer: true,
			});
		}
		if (list.editors_choice != null && list.editors_choice.length > 0) {
			console.log("tablist4", list);

			myTroveArray.push({
				title: Constants.articleListSections.editorial,
				data: getTabletList(list.editors_choice),
				count: 1,
				footer: true,
			});
		}
		if (list.podcast != null && list.podcast.length > 0) {
			console.log("tablist5", list);

			myTroveArray.push({
				title: Constants.articleListSections.podcast,
				data: [list.podcast],
				count: 1,
			});
		}
		// if (list != null && list.length > 0) {
		myTroveArray.push({
			title: Constants.articleListSections.WorthFollowing,
			data: [list],
			count: 1,
		});
		// }
		if (list.stories_list != null && list.stories_list.length > 0) {
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
		// if (
		// 	list.stories_list != null &&
		// 	list.stories_list.length > Constants.myTroveTablet.second
		// ) {
		// 	myTroveArray.push({
		// 		title: Constants.articleListSections.empty,
		// 		data: getTabletList(list.stories_list.slice(Constants.myTroveTablet.second)),
		// 		count: 1,
		// 	});
		// }
	}
	console.log("myTroveArraytab", myTroveArray);

	return myTroveArray;
};

const getTabletList = (list: any) => {
	console.log("getlist", list);
	const result = [];
	const size = list.length;
	let i = 0;

	while (i < size) {
		const item = list[i];
		if (item.template == "T1" && !(item.content_type == "video")) {
			if (item.content_type == "article_listing" || item.content_type == "gallery") {
				result.push(item);
				console.log("getlistres1", result);

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
	console.log("getlistres", result);
	return result;
};

const manipulatePaginationMyTrove = (tid: number, list: any, type: any, popedValue: any) => {
	const myTroveArray = [];
	if (type !== "brand" && tid != 0) {
		popedValue ? list.items.unshift(popedValue) : null;

		myTroveArray.push({
			title: Constants.articleListSections.empty,
			//data: list.items,
			data: getTabletList(list.items),
			count: list.count / 20,
		});
	} else if (list) {
		if (list.stories_list != null && list.stories_list.length > 0) {
			// list.stories_list.push(popedValue);
			//sconsole.log("indexid", list.stories_list.indexOf(nid));
			popedValue ? list.stories_list.unshift(popedValue) : null;

			myTroveArray.push({
				title: Constants.articleListSections.empty,
				//data: list.stories_list,
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
		manipulatePageination = manipulatePaginationMyTrove(tid, list, type, popedValue[0]);
	} else {
		mainArray.push(popedValue);
		manipulatePageination = manipulatePaginationMyTrove(tid, list, type);
	}

	const paginationData = manipulatePageination[0].data;
	return [...mainArray, ...paginationData];
};
