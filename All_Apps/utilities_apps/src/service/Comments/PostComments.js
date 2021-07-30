import { commentsAxiosInstance } from "../axios";
import Moment from "moment";

const PostComments = (
	userName,
	userMailId,
	profilePicture,
	comments: any,
	userId,
	nid,
	siteKey,
	profilePic,
	onPostSuccess,
	onPostError,
	articleTitle,
	articleUrl,
) => {
	const url = "v1beta1/projects/trove-d009d/databases/(default)/documents/comments";
	// login='robodiego'
	// password='Buddy6jar!'
	// const date = new Date();
	// const isoDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
	// const isoDate = new Date(date.getTime()).toISOString();
	const date = new Date();
	const isoDate = Moment.utc(date).format();

	console.log("UTCstring", isoDate);

	commentsAxiosInstance
		.post(url, {
			fields: {
				comment: {
					stringValue: `${comments}`,
				},
				imageUrl: {
					stringValue: `${profilePicture}`,
				},
				name: {
					stringValue: `${userName}`,
				},
				email_id: {
					stringValue: `${userMailId}`,
				},
				userid: {
					stringValue: `${userId}`,
				},
				nid_sitekey: {
					stringValue: `${nid}~${siteKey}`,
				},
				sitekey: {
					stringValue: `${siteKey}`,
				},
				nid: {
					stringValue: `${nid}`,
				},
				status: {
					integerValue: 0,
				},
				createTime: {
					timestampValue: `${isoDate}`,
				},
				article_title: {
					stringValue: `${articleTitle}`,
				},
				article_url: {
					stringValue: `${articleUrl}`,
				},
			},
		})
		.then((response: any) => {
			console.log("response in post comments", response.data);

			onPostSuccess(response.data);
		})
		.catch((error: any) => {
			console.log("error error", error);

			onPostError(error);
		});
};

export default PostComments;
