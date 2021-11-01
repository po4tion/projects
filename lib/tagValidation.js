import * as yup from 'yup';

export const tagValidation = yup.object().shape({
	name: yup
		.string()
		.required('태그를 입력해주세요')
		.min(2, '태그는 1자 이상으로 입력해주세요')
		.max(32, '태그는 32자 이하로 입력해주세요'),
});
