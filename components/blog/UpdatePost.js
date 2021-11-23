import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getCookie, isAuth } from '/actions/handleAuth';
import { updateBlog } from '/actions/handleBlog';
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

function AdminUpdatePost({ token, post }) {
	const router = useRouter();

	const [info, setInfo] = useState({
		error: '',
		success: '',
		title: post.title,
	});

	const [data, setData] = useState('');

	useEffect(() => {
		setData(new FormData());
	}, [router]);

	const [body, setBody] = useState(post.body);

	// title & photo control
	const handleChange = key => e => {
		const value = key === 'photo' ? e.target.files[0] : e.target.value;

		if (key === 'photo' && e.target.files.length === 0) {
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

	// 선택되어 있던 태그 관리
	const checkedTags = tgs => {
		const store = [];

		tgs.forEach(tag => {
			store.push(tag._id);
		});

		return store;
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

	const titleView = () => {
		return (
			<TextField
				defaultValue={info.title}
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
	const [tags, setTags] = useState(post.tags.map(tag => tag.name));
	const [tagId, setTagId] = useState(post.tags.map(tag => tag._id));

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
					<Grid item xs={4}>
						{/* {handlePhotoForm()} */}
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default AdminUpdatePost;
