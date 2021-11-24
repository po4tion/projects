import axios from 'axios';
import queryString from 'query-string';
import { isAuth, handleResponse } from '/actions/handleAuth';

export const createBlog = async (blog, token) => {
	const result = await axios
		.post('/api/user/blog', blog, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

export const getBlogInServer = async slug => {
	const result = await axios
		.get(`${process.env.API}/api/user/blog/${slug}`)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

export const getBlogsUsers = async token => {
	const result = await axios
		.get(`${process.env.API}/api/user/profileAndBlog`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		.then(res => res.data)
		.catch(err => err.response);

	return result;
};

export const getBlogs = async (limit, skip) => {
	const data = { limit, skip };
	const result = await axios
		.post('/api/blogs', data)
		.then(res => res.data)
		.catch(err => err.response);

	return result;
};

export const getBlogsInServer = async (limit, skip) => {
	const data = { limit, skip };
	const result = await axios
		.post(`${process.env.API}/api/blogs`, data)
		.then(res => res.data)
		.catch(err => err.response);

	return result;
};

export const adminManageBlogs = async token => {
	const result = await axios
		.get(`${process.env.API}/api/blogs/admin`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		.then(res => res.data)
		.catch(err => err.response);

	return result;
};

export const removeBlog = async (slug, token) => {
	let endpoint;

	if (isAuth() && isAuth().role === 1) {
		endpoint = `/api/blog/${slug}`;
	} else if (isAuth() && isAuth().role === 0) {
		endpoint = `/api/user/blog/${slug}`;
	}

	const result = await axios
		.delete(endpoint, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

export const updateBlog = async (blog, slug, token) => {
	const result = await axios
		.put(`/api/user/blog/${slug}`, blog, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

export const blogRelated = async blog => {
	const result = await axios
		.post(`/api/blogs/related`, blog)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

export const blogRelatedInServer = async blog => {
	const result = await axios
		.post(`${process.env.API}/api/blogs/related`, blog)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

export const blogSearch = async params => {
	const query = queryString.stringify(params);
	const result = await axios
		.get(`/api/blogs/search?${query}`)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};
