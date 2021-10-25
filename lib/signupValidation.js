import * as yup from 'yup';

export const signupValidation = yup.object().shape({
	name: yup
		.string()
		.required('이름을 입력해주세요')
		.min(2, '이름은 2자 이상으로 입력해주세요')
		.max(8, '이름은 8자 이하로 입력해주세요'),
	email: yup
		.string()
		.required('이메일을 입력해주세요')
		.email('이메일이 유효하지 않습니다'),
	password: yup
		.string()
		.required('비밀번호를 입력해주세요')
		.min(8, '비밀번호는 8자 이상으로 입력해주세요')
		.max(32, '비밀번호는 32자 이하로 입력해주세요'),
	confirmPassword: yup
		.string()
		.required('비밀번호를 다시 입력해주세요')
		.oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다'),
});
