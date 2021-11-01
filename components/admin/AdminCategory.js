import { useState, useEffect } from 'react';
import { createCategory } from '/actions/handleCategory';
import { getCookie } from '/actions/handleAuth';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

function AdminCategory() {
	const [token, setToken] = useState('');

	// pre-render를 통한 토큰 가져오기
	useEffect(() => {
		setToken(getCookie('access-token'));
	}, []);

	const [info, setInfo] = useState({
		name: '',
		error: false,
		success: false,
		categories: [],
		removed: '',
		reload: '',
	});

	const { name, error, success, categories, removed, reload } = info;

	// 카테고리 입력
	const handleChange = e => {
		const { value } = e.target;

		setInfo({
			...info,
			name: value,
			error: false,
			success: false,
		});
	};

	// 카테고리 추가
	const handleSubmit = e => {
		e.preventDefault();

		createCategory({ name }, token).then(data => {
			console.log(data);

			if (data.error) {
				setInfo({
					...info,
					error: '카테고리가 이미 존재합니다',
					success: false,
				});
			} else {
				setInfo({
					...info,
					name: '',
					error: false,
					success: '카테고리가 추가되었습니다',
				});
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
					<Box component="form" noValidate sx={{ width: '100%', mt: 1 }}>
						<Grid container>
							<Grid item xs={12}>
								<TextField
									value={name}
									margin="normal"
									required
									fullWidth
									id="category"
									label="카테고리 입력"
									name="category"
									autoComplete="category"
									autoFocus
									onChange={handleChange}
									error={info.error ? true : false}
								/>
							</Grid>
							{
								<Typography variant="inherit" color="error">
									{info.error}
								</Typography>
							}
							{
								<Typography variant="inherit" color="primary">
									{info.success}
								</Typography>
							}
						</Grid>
						<Button
							onClick={handleSubmit}
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							추가하기
						</Button>
					</Box>
				</Box>
			</Container>
		</>
	);
}

export default AdminCategory;
