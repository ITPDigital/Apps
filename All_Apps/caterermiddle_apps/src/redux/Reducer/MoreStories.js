import Types from "../Types";
import createReducer from "./CreateReducer";
import { Constants } from "../../asset";

const initialMyTrove = {};

export const MoreStories = createReducer(initialMyTrove, {
	[Types.moreStories.SET_MORESTORIES](state, action) {
		console.log("reducer-data", manipulateMyTroveTablet(action.data.tid, action.data.list));
		return {
			...state,
			[action.data.tid]: manipulateMyTroveTablet(
				action.data.tid,
				action.data.list,
				action.data.type,
			),
		};
	},
	[Types.moreStories.UPDATE_MORESTORIES](state, action) {
		return {
			...state,
			[action.data.tid]: action.data.list,
		};
	},
	[Types.moreStories.SET_PAGINATION_MORESTORIES](state, action) {
		console.log("reducer_data", action.data);
		// return {
		// 	...state,
		// 	[action.data.tid]: state[action.data.tid].concat(
		// 		manipulatePaginationMyTrove(action.data.tid, action.data.list, action.data.type),
		// 	),
		// };
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
	},
	[Types.moreStories.CLEAR_MORESTORIES](state, action) {
		return {
			...state,
			[action.data.tid]: [],
		};
	},
});

const manipulateMyTroveTablet = (tid: number, list: any, type: any) => {
	console.log("manipulateDta", list.items);
	console.log("typedata", type);
	const myTroveArray = [];
	if (list.items) {
		if (list.items != null && list.items.length > 0) {
			console.log("top stories");
			myTroveArray.push({
				title: Constants.articleListSections.empty,
				data: getTabletList(list.items),
				count: 1,
				//footer: true,
			});
		}
	}
	return myTroveArray;
};

const getTabletList = (list: any) => {
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

const manipulatePaginationMyTrove = (tid: number, list: any, type: any, popedValue: any) => {
	const myTroveArray = [];
	if (tid != 0) {
		popedValue ? list.items.unshift(popedValue) : null;
		myTroveArray.push({
			title: Constants.articleListSections.empty,
			//data: list.items,
			data: getTabletList(list.items),
			count: list.count / 20,
		});
	} else if (list) {
		if (list.stories_list != null && list.stories_list.length > 0) {
			popedValue ? list.stories_list.unshift(popedValue) : null;

			myTroveArray.push({
				title: Constants.articleListSections.topStories,
				data: getTabletList(list.stories_list),
				count: 1,
				footer: true,
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
