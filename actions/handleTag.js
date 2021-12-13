import axios from 'axios';

// Main, UpdatePost
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

// index.js [getStaticProps], blogs/[slug].js [getStaticProps]
export const getTagList = async () => {
	const result = await axios
		.get(`${process.env.API}/api/tag`)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

// tags/[slug].js [getStaticProps]
export const getTagInServer = async slug => {
	const result = await axios
		.get(`${process.env.API}/api/tag/${slug}`)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

// TagList
export const getTags = async () => {
	const result = await axios
		.get('/api/tag/list')
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

// TagList
export const searchTag = async name => {
	const result = await axios
		.post('/api/tag/list', name)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

// TagList
export const cleanTagList = async (id, token) => {
	const result = await axios
		.post('/api/tag/cleanTags', id, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		})
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};
