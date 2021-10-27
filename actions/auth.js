import axios from 'axios';
import { API } from '/config';
import cookie from 'js-cookie';

export const signupAxios = async user => {
	const result = await axios
		.post(`${API}/auth/signup`, user)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

export const signinAxios = async user => {
	const result = await axios
		.post(`${API}/auth/signin`, user)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

export const signoutAxios = async next => {
	removeCookie('access-token');
	removeLocalStorage('user');
	next();

	const result = await axios
		.get(`${API}/auth/signout`)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

export const setCookie = (key, value) => {
	if (process.browser) {
		cookie.set(key, value, {
			expires: 1,
		});
	}
};

export const getCookie = key => {
	if (process.browser) {
		return cookie.get(key);
	}
};

export const removeCookie = key => {
	if (process.browser) {
		cookie.remove(key, {
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
