import axios from 'axios';
import { API } from '/config';

export const signupAxios = user => {
	return axios
		.post(`${API}/auth/signup`, user)
		.then(res => res.data)
		.catch(err => err.response.data);
};
