import axios from 'axios';
import Cookies from 'js-cookie';

export const signupAxios = async user => {
	const result = await axios
		.post('/api/auth/signup', user)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

export const signinAxios = async user => {
	const result = await axios
		.post('/api/auth/signin', user)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

export const signoutAxios = async next => {
	removeCookie('access-token');
	removeLocalStorage('user');
	next();

	const result = await axios
		.get('/api/auth/signout')
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

export const setCookie = (key, value) => {
	if (process.browser) {
		Cookies.set(key, value, {
			expires: 1,
		});
	}
};

export const getCookie = key => {
	if (process.browser) {
		return Cookies.get(key);
	}
};

export const removeCookie = key => {
	if (process.browser) {
		Cookies.remove(key, {
			expires: 1,
		});
	}
};

export const setLocalStorage = (key, data) => {
	if (process.browser) {
		localStorage.setItem(key, JSON.stringify(data));
	}
};

export const removeLocalStorage = key => {
	if (process.browser) {
		localStorage.removeItem(key);
	}
};

export const updateLocalStorage = (user, next) => {
	if (process.browser) {
		if (localStorage.getItem('user')) {
			localStorage.setItem('user', JSON.stringify(user));
			next();
		}
	}
};

export const authenticate = (value, next) => {
	setCookie('access-token', value.token);
	setLocalStorage('user', value.data);
	next();
};

export const isAuth = () => {
	if (process.browser) {
		const hasCookie = getCookie('access-token');

		if (hasCookie) {
			if (localStorage.getItem('user')) {
				return JSON.parse(localStorage.getItem('user'));
			} else {
				return false;
			}
		}
	}
};
