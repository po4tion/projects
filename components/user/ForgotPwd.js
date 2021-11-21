import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.umd';
import { forgotPwdValidation } from '/lib/resetPwdValidation';
import { findForgotPwd } from '/actions/handleAuth';
import { useRouter } from 'next/router';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

function ForgotPwd() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm({
		resolver: yupResolver(forgotPwdValidation),
	});

	const onSubmit = async data => {
		const { email } = data;

		await findForgotPwd({ email }).then(data => {
			if (data.error) {
				setError('email', { message: data.error });
			} else {
				router.replace('/signin');
			}
		});
	};

	return (
		<>
			<Container component="main" maxWidth="md">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 6,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Typography component="h1" variant="h5">
						비밀번호 찾기
					</Typography>
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
				</Box>
			</Container>
		</>
	);
}

export default ForgotPwd;
