import axios from 'axios';
import queryString from 'query-string';

export const isBookmarked = async (email, slug) => {
	const data = { email, slug };
	const query = queryString.stringify(data);
	const result = axios
		.get(`/api/user/bookmark?${query}`)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

export const bookmarked = async (email, slug) => {
	const data = { email, slug };
	const result = axios
		.post('/api/user/bookmark', data)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};
