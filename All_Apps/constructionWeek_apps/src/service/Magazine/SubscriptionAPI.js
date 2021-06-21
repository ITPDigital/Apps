import { ItpAxiosInstance } from "../axios";

const SubscriptionApi = (body, onSuccess, onFailure, onError) => {
	const url = "ws/save-mag-subscription";
	const user_id = body && body.user_id;
	const amount = body && body.amount;
	const payment_gateway = body && body.payment_gateway;
	const transactionReceipt = body && body.transactionReceipt;
	const transactionId = body && body.transactionId;
	const transactionDate = body && body.transactionDate;
	const productId = body && body.productId;
	const brand_id = body && body.brandId;
	ItpAxiosInstance.post(url, {
		user_id,
		brand_id,
		amount,
		payment_gateway,
		transactionReceipt,
		transactionId,
		transactionDate,
		productId,
	})
		.then((response: any) => {
			if (response.data.status === "Success") {
				onSuccess(response.data.message);
			} else {
				onFailure(response.data, body);
			}
		})
		.catch((error: any) => {
			onError(error);
		});
};

export default SubscriptionApi;
