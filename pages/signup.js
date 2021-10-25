import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupValidation } from '/lib';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { signupAxios } from '/actions/auth';

function Signup() {
	const [err, setErr] = useState('');
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(signupValidation),
	});

	const onSubmit = data => {
		const { name, email, password } = data;

		signupAxios({ name, email, password }).then(value => {
			if (value.error) setErr(value.error);
			else setErr('');
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
					회원가입
				</Typography>
				<Box sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								autoFocus
								fullWidth
								id="name"
								label="Name"
								name="name"
								required
								type="text"
								{...register('name')}
								error={errors.name ? true : false}
							/>
							<Typography variant="inherit" color="error">
								{errors.name?.message}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								required
								type="email"
								{...register('email')}
								error={errors.email || err ? true : false}
							/>
							<Typography variant="inherit" color="error">
								{errors.email?.message}
								{err}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								id="password"
								label="Password"
								name="password"
								required
								type="password"
								{...register('password')}
								error={errors.password ? true : false}
							/>
							<Typography variant="inherit" color="error">
								{errors.password?.message}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								id="confirmPassword"
								label="ConfirmPassword"
								name="confirmPassword"
								required
								type="password"
								{...register('confirmPassword')}
								error={errors.confirmPassword ? true : false}
							/>
							<Typography variant="inherit" color="error">
								{errors.confirmPassword?.message}
							</Typography>
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
							<Link href="/signin" variant="body2">
								계정이 있으시다면, 로그인 해주세요
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}

export default Signup;
