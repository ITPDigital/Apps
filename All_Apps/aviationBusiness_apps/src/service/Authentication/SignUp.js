import {ItpAxiosInstance, PaywallItpIntance} from '../axios';
import {siteKey,mainSiteKey} from '../Constant';
import subUrls from '../../config.js';   
const subUrl =   subUrls();  
import {apis} from "../apis";   

// const PRODUCTION = "http://murugappan.pythonanywhere.com/";
// const PATH = "api/v1/seller/";

function SignUpApi(   
  name,
  email,
  password,  
  deviceId,
  onSuccess,
  onFailure,
  onError, 
  onRegisteredEmail  
) {
  const url = subUrl+apis.register; //'ws/create-user';
  console.log(
    'signup : name: ' +
      name +
      ', email:' +
      email +
      ', pass:' +
      password +
      'device_id:' +
      deviceId +
      ',site_key: ' +
      siteKey +
      'url' +
      url
  );

  return PaywallItpIntance.post(url, {      
   email,    
    sitekey: mainSiteKey,
    name,
    password:password
  })
    .then((response: any) => {
      console.log('signup - api status code: ' + response.status);
      if (response.status == '200') {
        console.log('signup - success : ' + JSON.stringify(response));
        onSuccess(response.data);
      } else {
        console.log('signup - fail : ' + JSON.stringify(response.data));
        onFailure(response.data);
      }
    })
    .catch((error: any) => {
      if(error.request.status == 401){
        //  console.log("sign up error: "+ JSON.stringify(error.request._response));
        onRegisteredEmail(error.request._response)
      }
      else{
        onError(error); 
      }
    });

  // return ItpAxiosInstance.post(url, {
  //   name,
  //   email,
  //   pass: password,
  //   device_id: deviceId,
  //   site_key: siteKey,
  // })
  //   .then((response: any) => {
  //     console.log('reg', response);
  //     if (response.data.status === 'Success') {
  //       onSuccess(response.data.message);
  //     } else {
  //       onFailure(response.data);
  //     }
  //   })
  //   .catch((error: any) => {
  //     onError(error);
  //   });
}

export default SignUpApi;
