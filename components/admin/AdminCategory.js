import { useState, useEffect } from 'react';
import {
	createCategory,
	getCategories,
	removeCategory,
} from '/actions/handleCategory';
import { getCookie } from '/actions/handleAuth';

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
import Alert from '@mui/material/Alert';

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
		reload: false,
		loading: false,
	});
	const [categories, setCategories] = useState(null);
	const { name, error, success, reload, loading } = info;

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
			}
		});
	};

	// 카테고리 삭제 알람
	const deleteCtgCheck = (name, slug) => {
		const result = window.confirm(`${name} 카테고리를 삭제하시겠습니까?`);

		if (result) {
			deleteCategory(name, slug);
		}
	};

	// 카테고리 삭제
	const deleteCategory = async (name, slug) => {
		setInfo({
			...info,
			loading: true,
		});

		await removeCategory(slug, token).then(data => {
			if (data.error) {
				setInfo({
					...info,
					error: `${name} 카테고리 삭제가 불가능합니다`,
					success: false,
					loading: false,
				});
			} else {
				setInfo({
					...info,
					error: false,
					success: `${name} 카테고리가 삭제되었습니다`,
					loading: false,
					reload: !reload,
				});
			}
		});
	};

	// 결과창 초기화
	const mouseHandler = () => {
		setInfo({
			...info,
			error: false,
			success: false,
		});
	};

	return (
		<>
			<Container component="main" maxWidth="md">
				<CssBaseline />

				<Grid container spacing={2}>
					<Grid item xs={6}>
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
											error={error ? true : false}
										/>
									</Grid>
									{error && (
										<Alert severity="error" sx={{ width: '100%' }}>
											{error}
										</Alert>
									)}
									{success && (
										<Alert severity="success" sx={{ width: '100%' }}>
											{success}
										</Alert>
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
					</Grid>
					<Grid item xs={6}>
						<Box
							onMouseMove={mouseHandler}
							sx={{
								width: '100%',
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
													<ListItemButton
														onDoubleClick={() =>
															deleteCtgCheck(ctg.name, ctg.slug)
														}
													>
														<ListItemText primary={`${ctg.name}`} />
													</ListItemButton>
												</ListItem>
											</ul>
										</li>
									))}
							</List>

							<Typography sx={{ mt: '30px' }} color="secondary">
								* 더블 클릭을 하여 카테고리를 삭제할 수 있습니다
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default AdminCategory;
