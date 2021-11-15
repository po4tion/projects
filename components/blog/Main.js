import { useState, useEffect } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getCookie, isAuth } from '/actions/handleAuth';
import { createBlog } from '/actions/handleBlog';
import Image from 'next/image';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListSubheader from '@mui/material/ListSubheader';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import Input from '@mui/material/Input';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '/node_modules/react-quill/dist/quill.snow.css';
import '/node_modules/react-quill/dist/quill.bubble.css';
import { Modules, Formats } from '/lib/blog/quillSetting';

function Main({ router, categories, tags, token }) {
	const [info, setInfo] = useState({
		error: '',
		success: '',
		title: '',
		hideButton: false,
	});

	const [data, setData] = useState('');

	useEffect(() => {
		setData(new FormData());
	}, [router]);

	const [ctg, setCtg] = useState(categories);
	const [tg, setTg] = useState(tags);

	// 작성 중이던 글 임시 저장 기능(뒤로 가기, 새로 고침 시 글 초기화 방지)
	const blogSave = () => {
		if (typeof window === 'undefined') {
			return '';
		}

		if (localStorage.getItem('blog')) {
			return JSON.parse(localStorage.getItem('blog'));
		} else {
			return '';
		}
	};

	const [body, setBody] = useState(blogSave());

	// title & photo control
	const handleChange = key => e => {
		const value = key === 'photo' ? e.target.files[0] : e.target.value;

		if (key === 'photo' && e.target.files.length === 0) {
			setInfo({
				...info,
				[key]: '',
			});
			return;
		}

		if (key === 'photo' && e.target && e.target.files[0].size > 1500000) {
			setInfo({
				...info,
				error: '사진의 용량은 1mb 이하여야 합니다',
				photo: '',
			});

			return;
		}

		data.set(key, value);
		setInfo({
			...info,
			error: '',
			[key]: value,
		});

		setData(data);
	};

	// 카테고리 & 태그 체크박스 control
	const [checkCtg, setCheckCtg] = useState([]);
	const [checkTg, setCheckTg] = useState([]);

	const handleCheckBox = (name, _id) => () => {
		setInfo({ ...info, error: '' });

		if (name === '카테고리') {
			const category = checkCtg.indexOf(_id);
			const store = [...checkCtg];

			// store에 선택된 카테고리가 존재하지 않을 경우
			if (category === -1) {
				store.push(_id);
			} else {
				// store에 선택된 카테고리가 존재할 경우 store 배열에서 삭제
				store.splice(category, 1);
			}

			setCheckCtg(store);
			data.set('categories', store);
		}

		if (name === '태그') {
			const tag = checkTg.indexOf(_id);
			const store = [...checkTg];

			if (tag === -1) {
				store.push(_id);
			} else {
				store.splice(tag, 1);
			}

			setCheckTg(store);
			data.set('tags', store);
		}
	};

	// quill 본문 control
	const handleQuill = e => {
		setBody(e);

		// data.set('body', e);

		// window === 'object' => 브라우저 상태
		if (typeof window !== 'undefined') {
			localStorage.setItem('blog', JSON.stringify(e));
		}
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (localStorage.getItem('blog')) {
			const value = JSON.parse(localStorage.getItem('blog'));

			data.set('body', value);
		}

		createBlog(data, token).then(data => {
			if (data.error) {
				setInfo({ ...info, error: data.error });
			} else {
				setInfo({
					...info,
					error: '',
					success: `${data.title} 글이 게시되었습니다`,
					title: '',
				});

				setBody('');
				setCtg([]);
				setTg([]);

				router.push('/admin');
			}
		});
	};

	const handleForm = (name, type) => {
		return (
			<Box
				sx={{
					width: '100%',
					mt: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<List
					subheader={
						<ListSubheader
							color="primary"
							component="div"
							id="categories"
							sx={{ fontSize: '24px' }}
						>
							{name}
						</ListSubheader>
					}
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
					{type.map((value, idx) => (
						<li key={`${idx}`}>
							<ul>
								<ListItem divider disablePadding>
									<FormControlLabel
										label={value.name}
										control={
											<Checkbox onChange={handleCheckBox(name, value._id)} />
										}
									/>
								</ListItem>
							</ul>
						</li>
					))}
				</List>
			</Box>
		);
	};

	const handlePhotoForm = () => {
		return (
			<Box
				sx={{
					width: '100%',
					mt: 10,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				{info.photo && (
					<>
						<Box
							sx={{
								// display: 'flex',
								// alignItems: 'center',
								// justifyContent: 'center',
								width: '300px',
								maxWidth: '300px',
								height: '250px',
								maxHeight: '250px',
								overflow: 'hidden',
								marginBottom: 1,
							}}
						>
							<Image
								src={URL.createObjectURL(info.photo)}
								alt="#"
								width={300}
								height={250}
							/>
						</Box>
					</>
				)}
				<label
					style={{ width: '100%', justifyContent: 'center', display: 'flex' }}
				>
					<Input
						onChange={handleChange('photo')}
						type="file"
						accept="image/*"
						sx={{ display: 'none' }}
					/>
					<Button
						fullWidth
						color="primary"
						variant="contained"
						component="span"
						sx={{ maxWidth: '300px' }}
					>
						썸네일 등록(1mb 이하)
					</Button>
				</label>
			</Box>
		);
	};

	return (
		<>
			<Container component="main" maxWidth="xl">
				<CssBaseline />
				<Grid container spacing={2}>
					<Grid item xs={8}>
						<Box
							component="form"
							onSubmit={handleSubmit}
							noValidate
							sx={{
								marginTop: 8,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							{info.error && (
								<Alert severity="error" sx={{ width: '100%' }}>
									{info.error}
								</Alert>
							)}
							<TextField
								id="title"
								label="제목을 입력해주세요"
								variant="outlined"
								fullWidth
								onChange={handleChange('title')}
								sx={{ mt: 2 }}
							/>
							<Box sx={{ width: '100%', mt: 1 }}>
								<ReactQuill
									theme="snow"
									modules={Modules}
									formats={Formats}
									value={body}
									placeholder="내용을 입력해주세요"
									onChange={handleQuill}
									style={{ height: '600px', marginBottom: '24px' }}
								/>
							</Box>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 6, mb: 2 }}
							>
								작성완료
							</Button>
						</Box>
					</Grid>
					<Grid item xs={4}>
						{handlePhotoForm()}
						{handleForm('카테고리', ctg)}
						{handleForm('태그', tg)}
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default withRouter(Main);
