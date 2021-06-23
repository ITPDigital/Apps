import {ItpAxiosInstance, PaywallItpIntance} from '../axios';
import {logError} from '.';
import {siteKey} from '../Constant';
import subUrls from '../../config.js';   
const subUrl =   subUrls();
const LoginApi = ( 
  email,
  password,
  onSuccess,
  onFailure,
  onError,
  onUnregisterUser,
  onInvalidCredentials
) => {
  //In login first we ahve to check is email is registered with us by hiting emial registr api and theb check authenticate api
  //const url = "ws/sign-in";
  const isVerifiedMailApiUrl = subUrl+'ulistnewtable';
  const authenticateApiUrl = subUrl+'authenticate';

  PaywallItpIntance.post(isVerifiedMailApiUrl, {
    email,
    site_key: 'CWO',
  })
    .then((response: any) => {
      console.log('login ulist' + response.status);
      if (response.status == 200) {
        //call authenticate api to login
        PaywallItpIntance.post(authenticateApiUrl, {
          email,
          password,
          sitekey: 'CWO',
        })
          .then((response: any) => {
            console.log('login response' + response);
            if (response.status == 200) {
              console.log('login success: ' + response);
              onSuccess(response);
            } else {
              // alert("login failed: "+response.status);
              onFailure(response);
            }
          })
          .catch((error: any) => {
            onInvalidCredentials(error.request.status);
            logError(email, error, authenticateApiUrl);
            //onError(error);
            console.log(
              'login authenticate failed: ',
              JSON.stringify(error.request.status)
            );
          });
      }
    })
    .catch((error: any) => {
      // logError(email, error, isVerifiedMailApiUrl);
      //onError(error);
      console.log('Error: in login: ', JSON.stringify(error.request.status));
      // alert(error.request.status)
      if (error.request.status == 401) {
        //land on registration screen
        //alert('not register,please register to continue');
        onUnregisterUser(
          'Email is not register with us,please register to continue'
        );
      } else {
        alert('onerror');
        logError(email, error, isVerifiedMailApiUrl);
        onError(error);
      }
    });

  // login='robodiego'
  // password='Buddy6jar!'
  // ItpAxiosInstance.post(url, {
  // 	email,
  // 	pass: password,
  // 	site_key: siteKey,
  // })
  // 	.then((response: any) => {
  // 		console.log("login response", response, email, password);
  // 		if (response.data.status === "Success") {
  // 			onSuccess(response.data);
  // 		} else if (response.data.status === "Failed") {
  // 			onFailure(response.data);
  // 		}
  // 	})
  // 	.catch((error: any) => {
  // 		logError(email, error, url);
  // 		onError(error);
  // 		console.log("Error: in login: ", error);
  // 	});
};

const SocialLogin = (
  sm_id,
  sm_type,
  name,
  email_id,
  onSuccess,
  onFailure,
  onError
) => {
  //"mobileapp/sm_authenticate";
  const url = 'ws/login-sm';
  console.log('social', email_id, name);
  console.log(
    'sm_id: ',
    sm_id,
    'sm_type: ',
    sm_type,
    'name: ',
    name,
    'emailid: ',
    email_id
  );
  // PaywallItpIntance.post(url, {
  //  // sm_id,
  //   //sm_type,
  //   //name,
  //   email,
  //   siteKey: "CWO",
  // })
  //   .then((response: any) => {
  //     console.log('Social login response:', JSON.stringify(response));
  //     if (response.status === 200) {
  //       console.log('Social login success:');
  //       onSuccess(response);
  //     } else if (response.data.status === 'Failed') {
  //       console.log('Social login Failed:', response.data);
  //       onFailure(response.data, sm_id, sm_type);
  //     }
  //   })
  //   .catch((error: any) => {
  //     console.log('Social login response:', JSON.stringify(error));

  //     if (error.request.status == 401) {
  //       //land on registration screen
  //       alert('error sttaus 401');
  //       //onUnregisterUser('Email is not register with us,please register to continue');
  //     } else {
  // 	  alert("onerror")
  // 	  logError(email, error, isVerifiedMailApiUrl);
  //       onError(error);
  //     }
  //   });
  ItpAxiosInstance.post(url, {
    sm_id,
    sm_type,
    name,
    email_id,
    site_key: siteKey,
  })
    .then((response: any) => {
      console.log('Social login response:', response);
      if (response.data.status === 'Success') {
        console.log('Social login success:');
        //check ulistnewtable to verify email
        //if verify call sm_authenticate
        //not verify then call register api
        //then call sm_authenticate

        PaywallItpIntance.post(subUrl+'ulistnewtable', {
          email: email_id,
          sitekey: 'CWO',
        })
          .then((response) => {
            console.log("social ulistnewtable: "+ JSON.stringify(response))
            if (response.status == 200) {
              //call sm_authenticate,here no catch block bcz if user is verified only then we are calling api
              PaywallItpIntance.post(subUrl+'sm_authenticate', {
                email: email_id,
                sitekey: 'CWO',
              }).then((response: any) => {
                console.log("social sm_authenticate: "+ JSON.stringify(response))

                if (response.status == 200) {
                  console.log('login success: ' + response);
                  onSuccess(response);
                }
              });
            }
          })
          .catch((error) => {
            console.log("social ulist error: "+ JSON.stringify(error))

            if (error.request.status == 400 ||error.request.status == 401 ) {
              //user is not register
              //then call registre api

              PaywallItpIntance.post("mobileapp/register", {
                sitekey: 'CWO',
                email: email_id,
                twitter_id: sm_type === "TWITTER" ? email_id:"",
                fb_id : sm_type ==="FACEBOOK"?  email_id:"",
                google_id : sm_type ==="GOOGLE"?  email_id:"",

              }).then((response: any) => {
                console.log("social register: "+ JSON.stringify(response))

                console.log('signup - api status code: ' + response.status);
                if (response.status == '200') {
                  //call sm+authenticateF
                  PaywallItpIntance.post(subUrl+'sm_authenticate', {
                    email: email_id,
                    sitekey: 'CWO',
                  }).then((response: any) => {
                    console.log("social sm_authenticate second: "+ JSON.stringify(response))

                    if (response.status == 200) {
                      console.log('login success: ' + response);
                      onSuccess(response);
                    }
                  });
                }
              });
            }
          });

      } else if (response.data.status === 'Failed') {
        console.log('Social login Failed:', response.data);
        onFailure(response.data, sm_id, sm_type);
      }
    })
    .catch((error: any) => {
      logError(email_id, error, url);

      console.log('Social login error:', error);
      onError(error);
    });
};
const smAuthenticate = () => {
  PaywallItpIntance.post(subUrl+'sm_authenticate', {
    email: email_id,
    sitekey: 'CWO',
  })
    .then((response: any) => { 
      if (response.status == 200) {
        console.log('login success: ' + response);
        onSuccess(response);
      }
    })
    .catch((error) => {
      if (error.request.status == 400) {
        //user is not register
        //then call registre api
        PaywallItpIntance.post(url, {
          email,
          sitekey: 'CWO',
          email: email_id,
          twitter_id: email_id,
        }).then((response: any) => {
          console.log('signup - api status code: ' + response.status);
          if (response.status == '200') {
            //call sm+authenticate
            smAuthenticate();
          }
        });
      }
    });
};

export {LoginApi, SocialLogin};
