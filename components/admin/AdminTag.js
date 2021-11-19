import { useState, useEffect } from 'react';
import { createTag, getTags, removeTag } from '/actions/handleTag';
import { getCookie, signoutAxios } from '/actions/handleAuth';
import { useRouter } from 'next/router';

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

function AdminTag({ accessToken }) {
	const router = useRouter();
	const [token, setToken] = useState(accessToken);
	const [info, setInfo] = useState({
		name: '',
		error: '',
		success: '',
		reload: false,
		loading: false,
	});
	const [tags, setTags] = useState(null);
	const { name, error, success, reload, loading } = info;

	// 태그 리스트 불러오기
	useEffect(() => {
		getTagList();
	}, [reload]);

	const getTagList = async () => {
		const result = await getTags();
		const data = await result.data;

		setTags(data);
	};

	// 태그 입력
	const handleChange = e => {
		const { value } = e.target;

		setInfo({
			...info,
			name: value,
			error: false,
			success: false,
		});
	};

	// 태그 추가
	const handleSubmit = e => {
		setInfo({
			...info,
			loading: true,
		});

		createTag({ name }, token).then(data => {
			if (data.error) {
				setInfo({
					...info,
					error: data.error,
					success: false,
					loading: false,
				});

				// 토큰 만료 handler
				if (data.error.startsWith('토큰')) {
					signoutAxios(() => router.replace('/signin'));
				}
			} else {
				setInfo({
					...info,
					name: '',
					error: false,
					success: '태그가 추가되었습니다',
					loading: false,
					reload: !reload,
				});
			}
		});
	};

	// 태그 삭제 알람
	const deleteTagCheck = (name, slug) => {
		const result = window.confirm(`${name} 태그를 삭제하시겠습니까?`);

		if (result) {
			deleteTag(name, slug);
		}
	};

	// 태그 삭제
	const deleteTag = async (name, slug) => {
		setInfo({
			...info,
			loading: true,
		});

		await removeTag(slug, token).then(data => {
			if (data.error) {
				setInfo({
					...info,
					error: `${name} 태그 삭제가 불가능합니다`,
					success: false,
					loading: false,
				});

				// 토큰 만료 handler
				if (data.error.startsWith('토큰')) {
					signoutAxios(() => router.replace('/signin'));
				}
			} else {
				setInfo({
					...info,
					error: false,
					success: `${name} 태그가 삭제되었습니다`,
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
											id="tag"
											label="태그 입력"
											name="tag"
											autoComplete="tag"
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
								{tags &&
									tags.map(tg => (
										<li key={`${tg._id}`}>
											<ul>
												<ListItem divider disablePadding>
													<ListItemButton
														onDoubleClick={() =>
															deleteTagCheck(tg.name, tg.slug)
														}
													>
														<ListItemText primary={`${tg.name}`} />
													</ListItemButton>
												</ListItem>
											</ul>
										</li>
									))}
							</List>

							<Typography sx={{ mt: '30px' }} color="secondary">
								* 더블 클릭을 하여 태그를 삭제할 수 있습니다
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default AdminTag;
