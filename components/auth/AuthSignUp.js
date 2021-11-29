import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.umd';
import { signupValidation } from '/lib/signupValidation';
import { beforeSignup, signupAxios, isAuth } from '/actions/handleAuth';
import Router from 'next/router';
import NextLink from 'next/link';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

function Signup() {
	// protect route
	useEffect(() => {
		isAuth() && Router.push('/');
	}, []);

	const [ready, setReady] = useState(true);
	const [err, setErr] = useState('');
	const [state, setState] = useState({
		loading: false,
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(signupValidation),
	});

	const onSubmit = data => {
		setState({ loading: true });

		const { name, email, password } = data;

		beforeSignup({ name, email, password }).then(value => {
			console.log(value);
			setState({ loading: false });

			if (value.error) {
				setErr(value.error);

				setTimeout(() => {
					setErr('');
				}, 3000);
			} else {
				setErr('');
				setReady(false);
			}
		});
	};

	return (
		<>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Typography component="h1" variant="h5">
						회원가입
					</Typography>
					{ready && (
						<Box component="form" novalidate sx={{ width: '100%', mt: 1 }}>
							<Grid container spacing={1}>
								<Grid item xs={12} sx={{ textAlign: 'center' }}>
									{state.loading && <CircularProgress />}
								</Grid>
								<Grid item xs={12}>
									<TextField
										margin="normal"
										autoFocus
										defaultValue="홍길동"
										fullWidth
										id="name"
										label="이름 입력"
										name="name"
										required
										type="text"
										{...register('name')}
										error={errors.name ? true : false}
									/>
									{errors.name && (
										<Alert severity="error" sx={{ width: '100%' }}>
											{errors.name?.message}
										</Alert>
									)}
								</Grid>
								<Grid item xs={12}>
									<TextField
										margin="normal"
										fullWidth
										id="email"
										label="이메일 입력"
										name="email"
										required
										type="email"
										{...register('email')}
										error={errors.email || err ? true : false}
									/>
									{(errors.email || err) && (
										<Alert severity="error" sx={{ width: '100%' }}>
											{errors.email?.message || err}
										</Alert>
									)}
								</Grid>
								<Grid item xs={12}>
									<TextField
										margin="normal"
										fullWidth
										id="password"
										label="비밀번호 입력"
										name="password"
										required
										type="password"
										{...register('password')}
										error={errors.password ? true : false}
									/>
									{errors.password && (
										<Alert severity="error" sx={{ width: '100%' }}>
											{errors.password?.message}
										</Alert>
									)}
								</Grid>
								<Grid item xs={12}>
									<TextField
										margin="normal"
										fullWidth
										id="confirmPassword"
										label="비밀번호 재입력"
										name="confirmPassword"
										required
										type="password"
										{...register('confirmPassword')}
										error={errors.confirmPassword ? true : false}
									/>

									{errors.confirmPassword && (
										<Alert severity="error" sx={{ width: '100%' }}>
											{errors.confirmPassword?.message}
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
								가입하기
							</Button>
							<Grid container justifyContent="flex-end">
								<Grid item>
									<NextLink href="/signin" passHref>
										<Link underline="hover" variant="body2">
											계정이 있으시다면 로그인 해주세요
										</Link>
									</NextLink>
								</Grid>
							</Grid>
						</Box>
					)}
					{!ready && (
						<Alert severity="info" sx={{ width: '100%' }}>
							등록하신 이메일로 본인 인증을 완료해주세요 (스팸 또는 프로모션
							보관함을 확인해주세요)
						</Alert>
					)}
				</Box>
			</Container>
		</>
	);
}

export default Signup;
