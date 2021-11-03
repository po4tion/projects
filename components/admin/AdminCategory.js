import { useState, useEffect } from 'react';
import { createCategory, getCategories } from '/actions/handleCategory';
import { getCookie } from '/actions/handleAuth';
import Router from 'next/router';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

function AdminCategory({ accessToken }) {
	// pre-render를 통한 토큰 가져오기
	/* 방법 1.
	useEffect(() => {
		setToken(getCookie('access-token'));
	}, []); */

	// 방법 2는 category page에서 getServerSideProps로 토큰값을 넘겨주는 것
	const [token, setToken] = useState(accessToken);
	const [info, setInfo] = useState({
		name: '',
		error: '',
		success: '',
		removed: '',
		reload: false,
		loading: false,
	});
	const [categories, setCategories] = useState(null);
	const { name, error, success, removed, reload, loading } = info;

	// 카테고리 리스트 불러오기
	useEffect(() => {
		getCategoryList();
	}, [reload]);

	const getCategoryList = async () => {
		const result = await getCategories();
		const data = await result.data;

		setCategories(data);
	};

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
		setInfo({
			...info,
			loading: true,
		});

		createCategory({ name }, token).then(data => {
			if (data.error) {
				setInfo({
					...info,
					error: '카테고리가 이미 존재합니다',
					success: false,
					loading: false,
				});
			} else {
				setInfo({
					...info,
					name: '',
					error: false,
					success: '카테고리가 추가되었습니다',
					loading: false,
					reload: !reload,
				});

				// Router.reload(window.location.pathname);
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
						<Grid item xs={12} sx={{ textAlign: 'center' }}>
							{loading && <CircularProgress />}
						</Grid>
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
							{info.error && (
								<Typography variant="inherit" color="error">
									{info.error}
								</Typography>
							)}
							{info.success && (
								<Typography variant="inherit" color="primary">
									{info.success}
								</Typography>
							)}
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
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<List
						sx={{
							width: '100%',
							maxWidth: 360,
							bgcolor: 'background.paper',
							position: 'relative',
							overflow: 'auto',
							maxHeight: 300,
							'& ul': { padding: 0 },
						}}
					>
						{categories &&
							categories.map(ctg => (
								<li key={`${ctg._id}`}>
									<ul>
										<ListItem divider disablePadding>
											<ListItemButton onDoubleClick={() => console.log('hi')}>
												<ListItemText primary={`${ctg.name}`} />
											</ListItemButton>
										</ListItem>
									</ul>
								</li>
							))}
					</List>
				</Box>
			</Container>
		</>
	);
}

export default AdminCategory;
