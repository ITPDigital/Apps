import { commentsAxiosInstance } from "../axios";

const GetComments = (page, nid, siteKey, onSuccess, onError) => {
	const url = "v1beta1/projects/trove-d009d/databases/(default)/documents:runQuery";
	// login='robodiego'
	// password='Buddy6jar!'
	commentsAxiosInstance
		.post(url, {
			structuredQuery: {
				where: {
					compositeFilter: {
						op: "AND",
						filters: [
							{
								fieldFilter: {
									field: {
										fieldPath: "nid_sitekey",
									},
									op: "EQUAL",
									value: {
										stringValue: `${nid}~${siteKey}`,
									},
								},
							},
							{
								fieldFilter: {
									field: {
										fieldPath: "status",
									},
									op: "EQUAL",
									value: {
										integerValue: 1,
									},
								},
							},
						],
					},
				},
				offset: `${page}`,
				limit: 10,
				orderBy: [
					{
						field: {
							fieldPath: "createTime",
						},
						direction: "DESCENDING",
					},
				],
				from: [
					{
						collectionId: "comments",
					},
				],
			},
		})
		.then((response: any) => {
			onSuccess(response.data);
		})
		.catch((error: any) => {
			console.log("error error", error);

			onError(error);
		});
};

export default GetComments;
