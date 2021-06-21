import {ItpAxiosInstance, PaywallItpIntance} from '../axios';
import {siteKey} from '../Constant';

const ResetPasswordApi = (
  email,
  onSuccess: Function,
  onFailure,
  onError,
  onFaliureEmail
) => {
  const url = 'mobileapp/forgot_password'; //"ws/reset-pwd";
  // login='robodiego'
  // password='Buddy6jar!'
  // ItpAxiosInstance.post(url, {
  // 	email,
  // 	site_key: siteKey,
  // })
  // 	.then((response: any) => {
  // 		if (response.data.status === "Success") {
  // 			onSuccess(response.data.message);
  // 		} else if (response.data.status === "Failed") {
  // 			onFailure(response.data.message);
  // 		}
  // 		// console.log("reset password response", response);
  // 		// onSuccess(response.data.message);
  // 	})
  // 	.catch((error: any) => {
  // 		console.log("reset password response");

  // 		onError(error);
  // 	});
  console.log('help :' + email + ',site_key: ' + siteKey);
  PaywallItpIntance.post(url, {
    email,
    sitekey: 'CWO',
  })
    .then((response: any) => {
      console.log('help response :' + JSON.stringify(response.data.status));
      if (response.status === 200) {
        onSuccess(response.data);
      } else if (response.data.status === 'Failed') {
        onFailure(response.data.message);
      }
    })
    .catch((error: any) => {
      console.log('reset password response'+error);

      if (error.request.status == 401) {
        onFaliureEmail(error.request.status);
      } else {
        onError(error);
      }
    });
};

export default ResetPasswordApi;
