import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getCookie, isAuth } from '/actions/handleAuth';
import { createBlog } from '/actions/handleBlog';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '/node_modules/react-quill/dist/quill.snow.css';
import '/node_modules/react-quill/dist/quill.bubble.css';
import { Modules, Formats } from '/lib/blog/quillSetting';
import { settings } from 'nprogress';

function Main({ router, categories, tags }) {
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

	const getTagList = async () => {
		await getTags().then(data => {
			if (data.error) {
				setInfo({
					...info,
					error: data.error,
				});
			} else {
				settings(data);
			}
		});
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

	// title & photo control
	const handleChange = key => e => {
		const value = key === 'photo' ? e.target.files[0] : e.target.value;

		data.set(key, value);

		setInfo({
			...info,
			error: '',
			[key]: value,
		});

		setData(data);
	};

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

		console.log('handleSubmit');
	};

	const blogForm = () => {
		return (
			<Container component="main" maxWidth="lg">
				<CssBaseline />
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
					<TextField
						id="title"
						label="제목을 입력해주세요"
						variant="outlined"
						fullWidth
						onChange={handleChange('title')}
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
						sx={{ mt: 3, mb: 2 }}
					>
						작성완료
					</Button>
					{ctg.map((c, i) => (
						<li key={i}>
							<p>{c.name}</p>
						</li>
					))}
				</Box>
			</Container>
		);
	};

	return <>{blogForm()}</>;
}

export default withRouter(Main);
