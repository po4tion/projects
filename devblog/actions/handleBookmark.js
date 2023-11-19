import axios from 'axios';
import queryString from 'query-string';

// OneBlog
export const isBookmarked = async (email, slug) => {
	const data = { email, slug };
	const query = queryString.stringify(data);

	const result = axios
		.get(`/api/user/bookmark?${query}`)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

// OneBlog
export const bookmarked = async (email, slug, token) => {
	const data = { email, slug };

	const result = axios
		.post('/api/user/bookmark', data, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

// BookmarkManagement
export const removeBookmarked = async (email, slug) => {
	const body = { email, slug };

	const result = axios
		.put(`/api/user/bookmark/management`, body)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

// BookmarkManagement
export const getBookmarkList = async email => {
	const data = { email };
	const query = queryString.stringify(data);

	const result = axios
		.get(`/api/user/bookmark/management?${query}`)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};
