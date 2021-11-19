import axios from 'axios';

export const getUserBlogs = async username => {
	const result = await axios
		.get(`${process.env.API}/api/user/${username}`)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

export const getUserProfile = async token => {
	const result = await axios
		.get(`${process.env.API}/api/user/profile`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		.then(res => res.data)
		.catch(err => err.response);

	return result;
};

export const updateUserProfile = async (user, token) => {
	const result = await axios
		.put('/api/user/update', user, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

export const getPhoto = async username => {
	const result = await axios
		.get(`/api/user/photo/${username}`)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};
