import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.umd';
import { resetPwdValidation } from '/lib/resetPwdValidation';
import { setResetPwd } from '/actions/handleAuth';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import { Body } from '/components';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';

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
