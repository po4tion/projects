import axios from 'axios';
import Cookies from 'js-cookie';

// AuthSignUp
export const beforeSignup = async user => {
	const result = await axios
		.post('/api/localAuth/beforeSignup', user)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

// AuthSignUp, BeforeSignIn
export const signupAxios = async token => {
	const result = await axios
		.post('/api/localAuth/signup', token)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

// AuthSignIn
export const signinAxios = async user => {
	const result = await axios
		.post('/api/localAuth/signin', user)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

// components/blog/Main.js, AuthDelete, Main, Header
export const signoutAxios = async next => {
	removeCookie('access-token');
	removeLocalStorage('user');
	localStorage.removeItem('blog');
	next();

	const result = await axios
		.get('/api/localAuth/signout')
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

// AuthDelete
export const deleteUserInfo = async token => {
	const result = await axios
		.delete('/api/localAuth/deleteUser', {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
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

// AuthDelete, OneBlog, UpdatePost
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

// ProfileUpdate
export const updateLocalStorage = (user, next) => {
	if (process.browser) {
		if (localStorage.getItem('user')) {
			localStorage.setItem('user', JSON.stringify(user));
			next();
		}
	}
};

// AuthSignIn
export const authenticate = (value, next) => {
	setCookie('access-token', value.token);
	setLocalStorage('user', value.data);
	next();
};

// components/blog/Main.js, AuthSignIn, AuthSignUp, ProtectAdminRoute, ProtectRoute, Main, ManagementBlog, OneBlog, UpdatePost, BookmarkManagement, ForgotPwd, Header
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

// ForgotPwd
export const findForgotPwd = async email => {
	const result = axios
		.put('/api/password/forgot', email)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

// ResetPwd
export const setResetPwd = async value => {
	const result = axios
		.put(`/api/password/reset`, value)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};
