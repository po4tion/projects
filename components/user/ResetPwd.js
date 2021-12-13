/* 
	Connect: user/reset/[id].js
*/

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.umd';
import { setResetPwd } from '/actions/handleAuth';
import { resetPwdValidation } from '/lib/resetPwdValidation';

// MUI
import Alert from '@mui/material/Alert';
import { Body } from '/components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function ResetPwd({ params }) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm({
		resolver: yupResolver(resetPwdValidation),
	});

	// 새로운 비밀번호 등록
	const onSubmit = async data => {
		setLoading(true);
		const { password } = data;

		await setResetPwd({
			resetPasswordLink: params,
			newPassword: password,
		}).then(data => {
			if (data.error) {
				setLoading(false);
				setError('password', { message: data.error });
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
					비밀번호 재설정
				</Typography>
				{loading && <CircularProgress />}
				<Box component="form" novalidate sx={{ width: '100%', mt: 1 }}>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<TextField
								margin="normal"
								autoFocus
								defaultValue=""
								fullWidth
								id="password"
								label="로그인시 사용할 비밀번호를 입력해주세요"
								name="password"
								required
								type="password"
								{...register('password')}
								error={errors.password ? true : false}
							/>
							{errors.password && (
								<Alert severity="warning" sx={{ width: '100%' }}>
									{errors.password?.message}&nbsp;
									{errors.password?.message.startsWith('링크') && (
										<NextLink href="/user/forgot" passHref>
											<Link underline="hover">재전송</Link>
										</NextLink>
									)}
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
						비밀번호 변경
					</Button>
				</Box>
			</Body>
		</>
	);
}

export default ResetPwd;
