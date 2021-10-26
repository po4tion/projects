import { useState, useEffect } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signinValidation } from '/lib';
import { signinAxios, authenticate, isAuth } from '/actions/auth';
import Router from 'next/router';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import NextLink from 'next/link';

function Signin() {
	const [err, setErr] = useState({
		userErr: '',
		pwdErr: '',
	});

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(signinValidation),
	});

	const onSubmit = data => {
		const { email, password } = data;

		signinAxios({ email, password }).then(value => {
			if (value.error) {
				setErr({ userErr: value.error, pwdErr: '' });
			} else if (value.pwdError) {
				setErr({ userErr: '', pwdErr: value.pwdError });
			} else {
				setErr({ userErr: '', pwdErr: '' });
			}

			authenticate(value, () => {
				if (isAuth() && isAuth().role === 1) Router.push('/admin');
				else if (isAuth() && isAuth().role === 0) Router.push('/user');
				else Router.push('/');
			});
		});
	};

	const onChange = () => {
		setErr({ ...err, userErr: '' });
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
						로그인
					</Typography>
					<Box component="form" novalidate sx={{ mt: 1 }}>
						<Grid container>
							<Grid item xs={12}>
								<TextField
									autoComplete="email"
									autoFocus
									fullWidth
									id="email"
									label="이메일 입력"
									name="email"
									margin="normal"
									required
									type="email"
									{...register('email')}
									onChange={onChange}
									error={errors.email || err.userErr ? true : false}
								/>
								<Typography variant="inherit" color="error">
									{errors.email?.message || err.userErr}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								{' '}
								<TextField
									autoComplete="current-password"
									fullWidth
									id="password"
									label="비밀번호 입력"
									name="password"
									margin="normal"
									required
									type="password"
									{...register('password')}
									error={errors.password || err.pwdErr ? true : false}
								/>
								<Typography variant="inherit" color="error">
									{errors.password?.message}
									{err.pwdErr}
								</Typography>
							</Grid>
						</Grid>
						<Button
							color="primary"
							fullWidth
							onClick={handleSubmit(onSubmit)}
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							로그인
						</Button>
						<Grid container>
							<Grid item xs>
								<NextLink href="#" passHref>
									<Link underline="hover" variant="body2">
										비밀번호 찾기
									</Link>
								</NextLink>
							</Grid>
							<Grid item>
								<NextLink href="/signup" passHref>
									<Link underline="hover" variant="body2">
										회원가입
									</Link>
								</NextLink>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</>
	);
}

export default Signin;
