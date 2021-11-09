import axios from 'axios';

export const createCategory = async (category, token) => {
	const result = await axios
		.post('/api/category', category, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

export const getCategories = async () => {
	const result = await axios
		.get(`/api/categories`)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

export const getCategoriesInServer = async () => {
	const result = await axios
		.get(`${process.env.API}/api/categories`)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

export const getCategory = async slug => {
	const result = await axios
		.get(`/api/category/${slug}`)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

export const removeCategory = async (slug, token) => {
	const result = await axios
		.delete(`/api/category/${slug}`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};
