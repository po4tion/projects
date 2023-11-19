import * as yup from 'yup';

export const contactValidation = yup.object().shape({
	name: yup
		.string()
		.required('이름을 입력해주세요')
		.min(2, '이름은 2자 이상으로 입력해주세요')
		.max(8, '이름은 8자 이하로 입력해주세요'),
	email: yup
		.string()
		.required('이메일을 입력해주세요')
		.email('이메일이 유효하지 않습니다'),
	message: yup
		.string()
		.required('내용을 입력해주세요')
		.min(2, '내용은 2자 이상으로 입력해주세요'),
});
