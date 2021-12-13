/* 
	Connect: signin.js
*/

import { useState, useEffect } from 'react';
import Router from 'next/router';
import NextLink from 'next/link';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import isLength from 'validator/lib/isLength';
import { signinAxios, authenticate, isAuth } from '/actions/handleAuth';

// MUI
import Alert from '@mui/material/Alert';
import { Body } from '/components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import router from 'next/router';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function AuthSignIn() {
	useEffect(() => {
		isAuth() && Router.push('/');
	}, []);

	const [info, setInfo] = useState({
		email: '',
		password: '',
	});

	const [state, setState] = useState({
		emailState: '',
		pwdState: '',
		loading: false,
	});

	// signin API[POST]
	const handleSubmit = _ => {
		setState({ ...state, loading: true });

		const { emailState, pwdState } = state;
		const { email, password } = info;

		if (isEmpty(email) && isEmpty(password)) {
			setState({
				emailState: '이메일을 입력해주세요',
				pwdState: '비밀번호를 입력해주세요',
				loading: false,
			});
		} else if (isEmpty(email)) {
			setState({
				...state,
				emailState: '이메일을 입력해주세요',
				loading: false,
			});
		} else if (isEmpty(password)) {
			setState({
				...state,
				pwdState: '비밀번호를 입력해주세요',
				loading: false,
			});
		} else if (emailState === '' && pwdState === '') {
			signinAxios({ email, password }).then(value => {
				if (value.error) {
					setState({
						...state,
						emailState: value.error,
						loading: false,
					});
				} else if (value.pwdError) {
					setState({
						...state,
						pwdState: value.pwdError,
						loading: false,
					});
				} else {
					authenticate(value, () => {
						setState({ ...state, loading: false });

						if (isAuth()) {
							router.replace('/');
						} else {
							router.replace('/');
						}
					});
				}
			});
		} else if (emailState !== '' || pwdState !== '') {
			setState({ ...state, loading: false });
		}
	};

	// 이메일 유효성 검사
	const handleEmail = e => {
		const { value } = e.target;

		if (isEmpty(value)) {
			setState({ ...state, emailState: '이메일을 입력해주세요' });
		} else if (!isEmail(value)) {
			setState({ ...state, emailState: '이메일 양식에 맞게 입력해주세요' });
		} else {
			setInfo({ ...info, email: value });
			setState({ ...state, emailState: '', pwdState: '' });
		}
	};

	// 비밀번호 유효성 검사
	const handlePassword = e => {
		const { value } = e.target;

		if (isEmpty(value)) {
			setState({ ...state, pwdState: '비밀번호를 입력해주세요' });
		} else if (isLength(value, { min: 8, max: 32 })) {
			setInfo({ ...info, password: value });
			setState({ ...state, pwdState: '' });
		} else {
			setState({
				...state,
				pwdState: '비밀번호는 8자 이상, 32자 이하로 입력해주세요',
			});
		}
	};

	return (
		<>
			<Body maxWidth="xs">
				<Typography component="h1" variant="h5">
					로그인
				</Typography>
				<Box component="form" noValidate sx={{ width: '100%', mt: 1 }}>
					<Grid container>
						<Grid item xs={12} sx={{ textAlign: 'center' }}>
							{state.loading && <CircularProgress />}
						</Grid>
						<Grid item xs={12}>
							<TextField
								margin="normal"
								required
								fullWidth
								id="email"
								label="이메일 입력"
								name="email"
								autoComplete="email"
								autoFocus
								onChange={handleEmail}
								error={state.emailState ? true : false}
							/>
							{state.emailState && (
								<Alert severity="error" sx={{ width: '100%' }}>
									{state.emailState}
								</Alert>
							)}
						</Grid>
						<Grid item xs={12}>
							<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								label="비밀번호 입력"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={handlePassword}
								error={state.pwdState ? true : false}
							/>
							{state.pwdState && (
								<Alert severity="error" sx={{ width: '100%' }}>
									{state.pwdState}
								</Alert>
							)}
						</Grid>
					</Grid>
					<Button
						onClick={handleSubmit}
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						로그인
					</Button>
					<Grid container>
						<Grid item xs>
							<NextLink href="/user/forgot" passHref>
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
			</Body>
		</>
	);
}

export default AuthSignIn;
