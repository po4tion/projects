import axios from 'axios';

export const contactUs = async contactData => {
	const result = await axios
		.post('/api/contact', contactData)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};

export const contactAuthor = async contactData => {
	const result = await axios
		.post('/api/contact/withAuthor', contactData)
		.then(res => res.data)
		.catch(err => err.response.data);

	return result;
};
