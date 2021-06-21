import AsyncStorage from '@react-native-community/async-storage';

export function setCurrentUserIdStorage(userId: number) {
  console.log('setting id 1', userId);
  if (userId == null) {
    AsyncStorage.removeItem('userId');
  } else {
    console.log('setting id', userId);
    AsyncStorage.setItem('userId', `${userId}`);
  }
}

export function getCurrentUserIdStorage() {
  console.log('getting id');
  return AsyncStorage.getItem('userId');
}

export function setCurrentUserEmailStorage(userMailId: number) {
  console.log('setting mail id 1', userMailId);
  if (userMailId == null) {
    AsyncStorage.removeItem('userMailId');
  } else {
    console.log('setting mail id', userMailId);
    AsyncStorage.setItem('userMailId', `${userMailId}`);
  }
}

export function getCurrentUserEmailStorage() {
  console.log('getting id');
  return AsyncStorage.getItem('userMailId');
}

export function setCurrentUserToken(tokenId: string) {
  console.log('setting token', tokenId);
  if (tokenId == null) {
    AsyncStorage.removeItem('tokenId');
  } else {
    console.log('setting token', tokenId);
    AsyncStorage.setItem('tokenId', `${tokenId}`);
  }
}

export function getCurrentUserToken() {
  console.log('getting token');
  return AsyncStorage.getItem('tokenId');
}

export function setSubscribeUserIdStorage(userId: number) {
  console.log('setting id 1', userId);
  if (userId == null) {
    AsyncStorage.removeItem('subscribeUserId');
  } else {
    console.log('setting id', userId);
    AsyncStorage.setItem('subscribeUserId', `${userId}`);
  }
}

export function getSubscribeUserIdStorage() {
  console.log('getting id');
  return AsyncStorage.getItem('subscribeUserId');
}
// export function setUserStorage(id: number, user: any) {
// 	console.log("setting id 1", user);
// 	if (user == null) {
// 		AsyncStorage.removeItem(`user${id}`);
// 	} else {
// 		console.log("setting id", user);
// 		AsyncStorage.setItem(`user${id}`, JSON.stringify({ user }));
// 	}
// }

// export function getUserStorage(id: number) {
// 	console.log("getting id");
// 	return AsyncStorage.getItem(`user${id}`);
// }

export function setMenuTopics(menuTopics: Object) {
  console.log('setting menuTopics', menuTopics);
  if (menuTopics == null) {
    AsyncStorage.removeItem('menuTopics');
  } else {
    console.log('setting menuTopics', JSON.stringify(menuTopics));
    AsyncStorage.setItem('menuTopics', JSON.stringify(menuTopics));
  }
}

export function getMenuTopics() {
  console.log('getting menuTopics');
  return AsyncStorage.getItem('menuTopics');
}

export function setBackgroundArticleData(articleData: Object) {
	console.log("async in setBackgroundArticleData"+ articleData)
  if (articleData != null) {
	let articleId = articleData.data.nid;
	console.log("async articleid in save"+ articleId)
    AsyncStorage.setItem("article_"+ articleId, JSON.stringify(articleData));
  }
}

export function getArticleBackgroundData(nid: any) {
  if (nid != null) {
	  console.log("async nid in get"+ JSON.stringify(nid));
    return AsyncStorage.getItem("article_"+ nid);
  }
}


export function setTopicId(topicid: number) {
  console.log('setting id 1', topicid);
  if (topicid == null) {
    AsyncStorage.removeItem('topicid');
  } else {
    console.log('setting id', topicid);
    AsyncStorage.setItem('topicid', `${topicid}`);
  }
}

export function getTagIdStorage() {
  console.log('getting id');
  return AsyncStorage.getItem('topicid');
}

export function setTopicName(topicname: String) {
  console.log('setting topicname', topicname);
  if (topicname == null) {
    AsyncStorage.removeItem('topicname');
  } else {
    console.log('setting topicname', topicname);
    AsyncStorage.setItem('topicname', `${topicname}`);
  }
}

export function getTopicNameStorage() {
  console.log('getting topicname');
  return AsyncStorage.getItem('topicname');
}

export function setUserName(username: String) {
  console.log('setting username', username);
  if (username == null) {
    AsyncStorage.removeItem('username');
  } else {
    console.log('setting username', username);
    AsyncStorage.setItem('username', `${username}`);
  }
}

export function getUserNameStorage() {
  console.log('getting username');
  return AsyncStorage.getItem('username');
}

export function setUserActionInAsync(user) {
  console.log('USERDATA setting' + JSON.stringify(user));
  return AsyncStorage.setItem('userLoginData',JSON.stringify(user));
}
export function getUserActionInAsync() {
  console.log('getting userLoginData');
  return AsyncStorage.getItem('userLoginData');
}

export function setSubscriptionStatus(status: String) {
  console.log('subscriptionstatus', status);
    AsyncStorage.setItem('status', `${status}`);  
}

export function getSubscriptionStatus() {
  console.log('getting status');
  return AsyncStorage.getItem('status');
}

export function setLanguage(lang: String) {
  console.log('setting language', lang);
  if (lang == null) {
    AsyncStorage.removeItem('lang');
  } else {
    console.log('setting lang', lang);
    AsyncStorage.setItem('lang', `${lang}`);
  }
}

export function getLanguage() {
  console.log('getting lang');
  return AsyncStorage.getItem('lang');
}

