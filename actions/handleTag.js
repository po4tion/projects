import axios from 'axios';

export const createTag = async (tag, token) => {
	const result = await axios
		.post('/api/tag', tag, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

// cause: home index page populate
export const getTagList = async () => {
	const result = await axios
		.get(`${process.env.API}/api/tag`)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

export const getTagInServer = async slug => {
	const result = await axios
		.get(`${process.env.API}/api/tag/${slug}`)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

export const getTags = async () => {
	const result = await axios
		.get('/api/tag/list')
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

export const searchTag = async name => {
	const result = await axios
		.post('/api/tag/list', name)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

export const removeTag = async (slug, token) => {
	const result = await axios
		.delete(`/api/tag/${slug}`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};
