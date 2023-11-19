import axios from 'axios';

// profile/[username].js [getStaticProps]
export const getUserBlogs = async username => {
	const result = await axios
		.get(`${process.env.API}/api/user/${username}`)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

// user/crud/update.js [getServerSideProps]
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
// ProfileUpdate
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

// ProfileUpdate
export const removeProfileImg = async username => {
	const result = await axios
		.delete(`/api/user/photo/${username}`)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};
