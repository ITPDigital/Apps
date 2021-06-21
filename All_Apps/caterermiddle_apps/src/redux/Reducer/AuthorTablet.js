import Types from "../Types";
import createReducer from "./CreateReducer";
import { Constants } from "../../asset";

const initialMyTrove = {};

export const AuthorTablet = createReducer(initialMyTrove, {
	[Types.authorTablet.SET_AUTHOR_TABLET](state, action) {
		console.log("action.data", {
			...state,
			[action.data.tid]: manipulateBrandTablet(action.data.list),
		});
		return {
			...state,
			[action.data.tid]: manipulateBrandTablet(action.data.list),
		};
	},
	[Types.authorTablet.UPDATE_AUTHOR_TABLET](state, action) {
		console.log("update ", action.data.list);
		console.log("action.dataUpdate", {
			...state,
			[action.data.tid]: action.data.list[0].data,
		});
		return {
			...state,
			[action.data.tid]: action.data.list,
		};
	},
	[Types.authorTablet.SET_PAGINATION_AUTHOR_TABLET](state, action) {
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
	},
	[Types.authorTablet.CLEAR_AUTHOR_TABLET](state, action) {
		return {
			...state,
			[action.data.tid]: [],
		};
	},
});

const manipulateBrandTablet = (list: any) => {
	console.log("listinreducer", list.items);
	const myTroveArray = [];
	if (list) {
		if (list.items != null && list.items.length > 0) {
			myTroveArray.push({
				title: Constants.articleListSections.empty,
				data: getTabletList(list.items),
				count: 1,
				footer: true,
			});
		}
	}
	console.log("myTroveArray", myTroveArray);
	return myTroveArray;
};

const getTabletList = (list: any) => {
	console.log("author response", list);
	if (list != null && list.length > 0) {
		const result = [];
		const size = list.length;
		let i = 0;

		while (i < size) {
			const item = list[i];
			console.log("mytrovetablet response", item);
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
		console.log("res mytrovetablet response", result);
		return result;
	}
};

const manipulatePaginationBrand = (tid: number, list: any, type: any, popedValue: any) => {
	const myTroveArray = [];
	if (tid != 0 && list.items != null && list.items.length > 0) {
		popedValue ? list.items.unshift(popedValue) : null;

		myTroveArray.push({
			title: Constants.articleListSections.empty,
			//data: list.items,
			data: getTabletList(list.items),
			count: list.count / 20,
		});
	}
	// else if (list) {
	// 	if (list.stories_list != null && list.stories_list.length > 0) {
	// 		myTroveArray.push({
	// 			title: Constants.articleListSections.empty,
	// 			//data: list.stories_list,
	// 			data: getTabletList(list.stories_list.slice(Constants.myTroveTablet.second)),
	// 			count: 1,
	// 		});
	// 	}
	// }
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
