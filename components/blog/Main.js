import { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { isAuth, signoutAxios } from '/actions/handleAuth';
import { createBlog } from '/actions/handleBlog';
import { createTag } from '/actions/handleTag';
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
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '/node_modules/react-quill/dist/quill.snow.css';
import '/node_modules/react-quill/dist/quill.bubble.css';
import { Modules, Formats } from '/lib/blog/quillSetting';

function Main({ router, token }) {
	const [info, setInfo] = useState({
		error: '',
		success: '',
		title: '',
	});

	const [data, setData] = useState('');

	useEffect(() => {
		setData(new FormData());
	}, [router]);

	// title & photo control
	const handleChange = key => e => {
		const value = key === 'photo' ? e.target.files[0] : e.target.value;

		if (key === 'photo' && e.target.files.length === 0) {
			URL.revokeObjectURL(info.photo);

			setInfo({
				...info,
				[key]: '',
			});

			data.set(key, undefined);
			setData(data);

			return;
		}

		if (key === 'photo' && e.target && e.target.files[0].size > 1500000) {
			URL.revokeObjectURL(info.photo);

			setInfo({
				...info,
				error: '사진의 용량은 1mb 이하여야 합니다',
				[key]: '',
			});

			data.set(key, undefined);
			setData(data);

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

	// quill 본문 control
	const handleQuill = e => {
		setBody(e);

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

				// 토큰 만료 handler
				if (data.error.startsWith('토큰')) {
					signoutAxios(() => router.replace('/signin'));
				}
			} else {
				setInfo({
					...info,
					error: '',
					success: `${data.title} 글이 게시되었습니다`,
					title: '',
				});

				setBody('');
				setTags([]);
				URL.revokeObjectURL(info.photo);

				if (isAuth() && isAuth().role === 1) {
					router.push('/admin');
				} else if (isAuth() && isAuth().role === 0) {
					router.push('/user');
				}
			}
		});
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

	const titleView = () => {
		return (
			<TextField
				id="title"
				label="제목을 입력해주세요"
				variant="outlined"
				fullWidth
				onChange={handleChange('title')}
				sx={{ mt: 2 }}
			/>
		);
	};

	// Tag Control
	const [currentTag, setCurrentTag] = useState('');
	const [tags, setTags] = useState([]);
	const [tagId, setTagId] = useState([]);

	const handleTags = async e => {
		const { value } = e.target;

		// 쉼표(,)만 입력하는 상황 방지
		if (value === ',') {
			setCurrentTag('');

			return;
		}

		// 쉼표(,)를 통해 태그 등록
		if (value.substr(value.length - 1) === ',') {
			setCurrentTag('');

			const delComma = value.substr(0, value.length - 1);
			const duplication = tags.indexOf(delComma);

			// 태그 중복 입력 Control
			if (duplication === -1) {
				setTags([...tags, delComma]);

				const tag = { name: delComma };

				const store = [...tagId];

				await createTag(tag, token).then(value => {
					store.push(value.data._id);
					setTagId([...tagId, value.data._id]);

					data.set('tags', store);
				});
			}
		} else {
			setCurrentTag(value);
		}
	};

	const tagView = () => {
		return tags.map((tag, idx) => {
			return (
				<Chip key={idx} color="primary" label={tag} sx={{ margin: 0.5 }} />
			);
		});
	};

	const inputView = () => {
		return (
			<Input
				value={currentTag}
				onChange={handleTags}
				sx={{ width: '100%', padding: 0.5 }}
				type="text"
				placeholder="쉼표(,)를 사용하여 태그를 등록할 수 있습니다"
			/>
		);
	};

	return (
		<>
			<Container component="main" maxWidth="md">
				<CssBaseline />
				<Grid container spacing={2}>
					<Grid item xs={12}>
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
							{titleView()}
							<Paper
								sx={{
									display: 'flex',
									flexWrap: 'wrap',
									p: 0.5,
									mt: 1,
									width: '100%',
								}}
							>
								{tagView()}
								{inputView()}
							</Paper>

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
				</Grid>
			</Container>
		</>
	);
}

export default withRouter(Main);
