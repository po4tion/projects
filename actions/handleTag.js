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
