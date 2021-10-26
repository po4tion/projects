import axios from 'axios';
import { API } from '/config';
import cookie from 'js-cookie';

export const signupAxios = user => {
	return axios
		.post(`${API}/auth/signup`, user)
		.then(res => res.data)
		.catch(err => err.response.data);
};

export const signinAxios = user => {
	return axios
		.post(`${API}/auth/signin`, user)
		.then(res => res.data)
		.catch(err => err.response.data);
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

export const setLocalStorage = (key, data) => {
	if (process.browser) {
		localStorage.setItem(key, JSON.stringify(data));
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
