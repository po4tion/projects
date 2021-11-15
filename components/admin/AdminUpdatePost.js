import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getCookie, isAuth } from '/actions/handleAuth';
import { updateBlog } from '/actions/handleBlog';
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

function AdminUpdatePost({ categories, tags, token, post }) {
	const router = useRouter();

	const [info, setInfo] = useState({
		error: '',
		success: '',
		title: post.title,
		hideButton: false,
	});

	const [data, setData] = useState('');

	useEffect(() => {
		setData(new FormData());
	}, [router]);

	const [ctg, setCtg] = useState(categories);
	const [tg, setTg] = useState(tags);
	const [body, setBody] = useState(post.body);

	// title & photo control
	const handleChange = key => e => {
		const value = key === 'photo' ? e.target.files[0] : e.target.value;

		if (e.target.files.length === 0) {
			data.set(key, undefined);

			setInfo({
				...info,
				[key]: '',
			});

			setData(data);
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

	// 선택되어 있던 카테고리 관리
	const checkedCategories = ctgs => {
		const store = [];

		ctgs.forEach(ctg => {
			store.push(ctg._id);
		});

		return store;
	};

	// 선택되어 있던 태그 관리
	const checkedTags = tgs => {
		const store = [];

		tgs.forEach(tag => {
			store.push(tag._id);
		});

		return store;
	};

	// 카테고리 & 태그 체크박스 control
	const [checkedCtg, setCheckedCtg] = useState(
		checkedCategories(post.categories)
	);
	const [checkedTg, setCheckedTg] = useState(checkedTags(post.tags));

	// 체크박스 control
	const handleCheckBox = (name, _id) => () => {
		setInfo({ ...info, error: '' });

		if (name === '카테고리') {
			const category = checkedCtg.indexOf(_id);
			const store = [...checkedCtg];

			// store에 선택된 카테고리가 존재하지 않을 경우
			if (category === -1) {
				store.push(_id);
			} else {
				// store에 선택된 카테고리가 존재할 경우 store 배열에서 삭제
				store.splice(category, 1);
			}

			setCheckedCtg(store);
			data.set('categories', store);
		}

		if (name === '태그') {
			const tag = checkedTg.indexOf(_id);
			const store = [...checkedTg];

			if (tag === -1) {
				store.push(_id);
			} else {
				store.splice(tag, 1);
			}

			setCheckedTg(store);
			data.set('tags', store);
		}
	};

	const isChecked = (name, id) => {
		if (name === '카테고리') {
			const result = checkedCtg.indexOf(id);

			if (result !== -1) {
				return true;
			}

			return false;
		}

		if (name === '태그') {
			const result = checkedTg.indexOf(id);

			if (result !== -1) {
				return true;
			}

			return false;
		}
	};

	// quill 본문 control
	const handleQuill = e => {
		setBody(e);

		data.set('body', e);
	};

	const handleSubmit = async e => {
		e.preventDefault();

		await updateBlog(data, post.slug, token).then(data => {
			if (data.error) {
				setInfo({
					...info,
					error: '업데이트 할 수 없습니다',
				});
			} else {
				setInfo({
					...info,
					success: '수정되었습니다',
				});

				if (isAuth() && isAuth().role === 0) {
					router.replace('/user');
				} else if (isAuth() && isAuth().role === 1) {
					router.replace('/admin');
				}
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
											<Checkbox
												checked={isChecked(name, value._id)}
												onChange={handleCheckBox(name, value._id)}
											/>
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
								defaultValue={info.title}
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

export default AdminUpdatePost;
