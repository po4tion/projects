import axios from 'axios';
import queryString from 'query-string';
import { isAuth, handleResponse } from '/actions/handleAuth';

// Main
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

// user/crud/[slug].js [getServerSideProps], blogs/[slug].js [getStaticProps], OneBlog
export const getBlogInServer = async slug => {
	const result = await axios
		.get(`${process.env.API}/api/user/blog/${slug}`)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

// user/crud/management.js [getServerSideProps], ManagementBlog
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

// HomeList
export const getBlogs = async (limit, skip) => {
	const data = { limit, skip };
	const result = await axios
		.post('/api/blogs', data)
		.then(res => res.data)
		.catch(err => err.response);

	return result;
};

// admin/crud/management.js [getServerSideProps]
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

// ManagementBlog
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

// UpdatePost
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

// blogs/[slug].js [getStaticProps]
export const blogRelatedInServer = async blog => {
	const result = await axios
		.post(`${process.env.API}/api/blogs/related`, blog)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

// SearchBlog
export const blogSearch = async params => {
	const query = queryString.stringify(params);
	const result = await axios
		.get(`/api/blogs/search?${query}`)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

// SearchBlog
export const unBlogSearch = async params => {
	const query = queryString.stringify(params);
	const result = await axios
		.get(`/api/blogs/usernameSearch?${query}`)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};
