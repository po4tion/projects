/* 
	Connect: user/forgot.js
*/

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.umd';
import { findForgotPwd } from '/actions/handleAuth';
import { forgotPwdValidation } from '/lib/resetPwdValidation';

// MUI
import Alert from '@mui/material/Alert';
import { Body } from '/components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function ForgotPwd() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm({
		resolver: yupResolver(forgotPwdValidation),
	});

	const onSubmit = async data => {
		setLoading(true);
		const { email } = data;

		await findForgotPwd({ email }).then(data => {
			if (data.error) {
				setLoading(false);
				setError('email', { message: data.error });
			} else {
				setLoading(false);
				router.replace('/signin');
			}
		});
	};

	return (
		<>
			<Body>
				<Typography component="h1" variant="h5">
					비밀번호 찾기
				</Typography>
				{loading && <CircularProgress />}
				<Box component="form" novalidate sx={{ width: '100%', mt: 1 }}>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<TextField
								margin="normal"
								defaultValue=""
								fullWidth
								id="email"
								label="로그인시 사용하는 이메일을 입력해주세요"
								name="email"
								required
								type="email"
								{...register('email')}
								error={errors.email ? true : false}
							/>
							{errors.email && (
								<Alert severity="warning" sx={{ width: '100%' }}>
									{errors.email?.message}
								</Alert>
							)}
						</Grid>
					</Grid>
					<Button
						onClick={handleSubmit(onSubmit)}
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						비밀번호 초기화 링크 전송 (5분 안에 전송된 링크를 클릭해주세요)
					</Button>
				</Box>
			</Body>
		</>
	);
}

export default ForgotPwd;
