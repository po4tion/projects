import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signinValidation } from '/lib';
import { signinAxios } from '/actions/auth';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/Link';

function Signin() {
	const [err, setErr] = useState('');
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(signinValidation),
	});

	const onSubmit = data => {
		const { email, password } = data;

		signinAxios({ email, password }).then(value => {
			if (value.error) setErr(value.error);
		});
	};

	return (
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
				<Box sx={{ mt: 1 }}>
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
								error={errors.email ? true : false}
							/>
							<Typography variant="inherit" color="error">
								{errors.email?.message}
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
								error={errors.password ? true : false}
							/>
							<Typography variant="inherit" color="error">
								{errors.password?.message}
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
							<Link href="#" passHref>
								비밀번호 찾기
							</Link>
						</Grid>
						<Grid item>
							<Link href="/signup" passHref>
								회원가입
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}

export default Signin;
