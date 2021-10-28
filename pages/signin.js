import { useState, useEffect } from 'react';
import { signinAxios, authenticate, isAuth } from '/actions/auth';
import Router from 'next/router';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import isLength from 'validator/lib/isLength';

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
	});

	// signin API[POST]
	const handleSubmit = _ => {
		const { emailState, pwdState } = state;
		const { email, password } = info;

		if (isEmpty(email) && isEmpty(password)) {
			setState({
				emailState: '이메일을 입력해주세요',
				pwdState: '비밀번호를 입력해주세요',
			});
		} else if (isEmpty(email)) {
			setState({
				...state,
				emailState: '이메일을 입력해주세요',
			});
		} else if (isEmpty(password)) {
			setState({
				...state,
				pwdState: '비밀번호를 입력해주세요',
			});
		} else if (emailState === '' && pwdState === '') {
			signinAxios({ email, password }).then(value => {
				if (value.error) {
					setState({ ...state, emailState: value.error });
				} else if (value.pwdError) {
					setState({ ...state, pwdState: value.pwdError });
				} else {
					authenticate(value, () => {
						if (isAuth() && isAuth().role === 1) {
							Router.push('/admin');
						} else if (isAuth() && isAuth().role === 0) {
							Router.push('/user');
						} else {
							Router.push('/');
						}
					});
				}
			});
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
			setState({ emailState: '', pwdState: '' });
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
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<Grid container>
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
								{
									<Typography variant="inherit" color="error">
										{state.emailState}
									</Typography>
								}
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
								{
									<Typography variant="inherit" color="error">
										{state.pwdState}
									</Typography>
								}
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
