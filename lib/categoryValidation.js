import * as yup from 'yup';

export const categoryValidation = yup.object().shape({
	name: yup
		.string()
		.required('카테고리를 입력해주세요')
		.min(2, '카테고리는 1자 이상으로 입력해주세요')
		.max(32, '카테고리는 32자 이하로 입력해주세요'),
});
