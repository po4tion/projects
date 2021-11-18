import axios from 'axios';
import queryString from 'query-string';
import { isAuth } from '/actions/handleAuth';

export const createBlog = async (blog, token) => {
	let endpoint;

	if (isAuth() && isAuth().role === 1) {
		endpoint = '/api/blog';
	} else if (isAuth() && isAuth().role === 0) {
		endpoint = '/api/user/blog';
	}

	const result = await axios
		.post(endpoint, blog, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

// export const getBlog = async slug => {
// 	const result = await axios
// 		.get(`/api/blog/${slug}`)
// 		.then(res => res.data)
// 		.catch(err => err.response.data);

// 	return result;
// };

export const getBlogInServer = async slug => {
	const result = await axios
		.get(`${process.env.API}/api/blog/${slug}`)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

// export const getBlogs = async username => {
// 	const result = await axios
// 		.get(`/api/${username}/blogs`)
// 		.then(res => res.data)
// 		.catch(err => err.response.data);

// 	return result;
// };

export const getBlogsUsers = async token => {
	const result = await axios
		.get(`${process.env.API}/api/user/profileAndBlog`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

export const getBlogsInServer = async () => {
	const result = await axios
		.get(`${process.env.API}/api/blogs`)
		.then(res => res.data)
		.catch(err => err.response.data);

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
	let endpoint;

	if (isAuth() && isAuth().role === 1) {
		endpoint = `/api/blog/${slug}`;
	} else if (isAuth() && isAuth().role === 0) {
		endpoint = `/api/user/blog/${slug}`;
	}

	const result = await axios
		.put(endpoint, blog, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

export const listAll = async (limit, skip) => {
	const data = { limit, skip };
	const result = await axios
		.post('/api/blogs/blogs-categories-tags', data)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

export const listAllInServer = async (limit, skip) => {
	const data = { limit, skip };
	const result = await axios
		.post(`${process.env.API}/api/blogs/blogs-categories-tags`, data)
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
