import * as yup from 'yup';

export const signinValidation = yup.object().shape({
	email: yup
		.string()
		.required('이메일을 입력해주세요')
		.email('이메일 양식을 확인해주세요'),
	password: yup
		.string()
		.required('비밀번호를 입력해주세요')
		.min(8, '비밀번호는 8자 이상으로 입력해주세요')
		.max(32, '비밀번호는 32자 이하로 입력해주세요'),
});
