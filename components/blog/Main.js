import { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { isAuth, signoutAxios } from '/actions/handleAuth';
import { createBlog } from '/actions/handleBlog';
import { createTag } from '/actions/handleTag';
import { photoResize } from '/lib/photoResize';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Input from '@mui/material/Input';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '/node_modules/react-quill/dist/quill.snow.css';
import '/node_modules/react-quill/dist/quill.bubble.css';
import { Modules, Formats } from '/lib/blog/quillSetting';

function Main({ router, token }) {
	const [info, setInfo] = useState({
		error: '',
		success: '',
		title: '',
		photo: undefined,
	});

	const [data, setData] = useState('');

	useEffect(() => {
		setData(new FormData());
	}, [router]);

	// title & photo control
	const handleThumbnail = async e => {
		const { files } = e.target;

		// 최소 한번은 사진을 더블 클릭하여 등록하였을 경우, 그 이후에 썸네일 등록 버튼 클릭 후 취소버튼을 누르면 length가 0으로 뜬다
		if (files.length === 0) {
			return;
		} else {
			const value = files[0];
			const resizeFile = await photoResize(value); // photo Resize

			// 압축한 사진인데도 불구하고 용량이 너무 클 경우 (nextjs limit data 4mb) 4000000
			if (resizeFile.size >= 4000000) {
				setInfo({
					...info,
					error: '사진의 용량이 너무 큽니다',
				});
			} else {
				data.set('photo', resizeFile); // blob data 전달
				setInfo({
					...info,
					error: '',
					photo: resizeFile,
				});

				setData(data);
			}
		}
	};

	const handleTitle = e => {
		const { value } = e.target;

		data.set('title', value);
		setInfo({
			...info,
			error: '',
			title: value,
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
		data.set('body', e);

		// window === 'object' => 브라우저 상태
		if (typeof window !== 'undefined') {
			localStorage.setItem('blog', JSON.stringify(e));
		}
	};

	const handleSubmit = e => {
		e.preventDefault();

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

	const removeThumbnail = () => {
		URL.revokeObjectURL(info.photo);

		setInfo({
			...info,
			photo: undefined,
		});

		data.delete('photo');
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
								marginBottom: 0.5,
							}}
						>
							<Image
								src={URL.createObjectURL(info.photo)}
								alt="미리보기 이미지"
								width={300}
								height={250}
							/>
						</Box>
					</>
				)}

				{!info.photo && (
					<Skeleton
						animation="wave"
						variant="rectangular"
						width={300}
						height={250}
						sx={{ marginBottom: 0.5 }}
					/>
				)}
				<Grid container sx={{ width: '300px' }}>
					<Grid item xs={9}>
						<label
							style={{
								width: '100%',
								justifyContent: 'center',
								display: 'flex',
							}}
						>
							<Input
								onChange={handleThumbnail}
								type="file"
								accept="image/*"
								sx={{ display: 'none' }}
							/>
							<Button
								fullWidth
								color="primary"
								variant="contained"
								component="span"
							>
								썸네일 등록 (선택사항)
							</Button>
						</label>
					</Grid>
					<Grid item xs={3}>
						<Button
							fullWidth
							color="primary"
							variant="contained"
							component="span"
							onClick={removeThumbnail}
						>
							취소
						</Button>
					</Grid>
				</Grid>
			</Box>
		);
	};

	const [excerpt, setExcerpt] = useState('');

	const handleExcerpt = e => {
		const { value } = e.target;

		// 150자 초과 방지
		if (value.length < 151) {
			data.set('excerpt', value);

			setExcerpt(value);
		}
	};

	const excerptForm = () => {
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
				<TextField
					value={excerpt}
					onChange={handleExcerpt}
					variant="outlined"
					placeholder="소개문구를 적어보세요 (선택사항)"
					sx={{ width: '300px' }}
					rows={8}
					multiline
				/>
				<Typography sx={{ width: '300px' }} align="right">
					{excerpt.length} / 150
				</Typography>
			</Box>
		);
	};

	const titleView = () => {
		return (
			<TextField
				id="title"
				label="제목을 입력해주세요 (필수사항)"
				variant="outlined"
				fullWidth
				onChange={handleTitle}
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

	const handleDelete = tag => {
		let tagStore = [...tags];
		const tagIdStore = [...tagId];
		const tagIdx = tagStore.indexOf(tag);

		tagIdStore.splice(tagIdx, 1);
		tagStore = tagStore.filter(t => t !== tag);

		data.set('tags', tagIdStore);

		setTagId(tagIdStore);
		setTags(tagStore);
	};

	const tagView = () => {
		return tags.map((tag, idx) => {
			return (
				<Chip
					key={idx}
					color="primary"
					label={tag}
					onDelete={() => handleDelete(tag)}
					sx={{ margin: 0.5 }}
				/>
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
				placeholder="쉼표(,)를 사용하여 태그를 등록할 수 있습니다 (필수사항)"
			/>
		);
	};

	return (
		<>
			<Container component="main" maxWidth="lg">
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
						{handlePhotoForm()}
						{excerptForm()}
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default withRouter(Main);
