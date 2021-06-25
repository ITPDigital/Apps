export const emailValidator = (email: string) => {
	const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
	return reg.test(email) === true;
};

export const passwordValidator = (password: string) => {
	const reg = new RegExp("(?=.{6,})");
	return reg.test(password) === true;
};
