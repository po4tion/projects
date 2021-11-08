import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getCookie, isAuth } from '/actions/handleAuth';
import { getCategories } from '/actions/handleCategory';
import { getTags } from '/actions/handleTag';
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

function Main({ router }) {
	// quill 본문
	const [body, setBody] = useState('');

	const handleQuill = e => {
		console.log(e);
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
					/>
					<Box sx={{ width: '100%', mt: 1 }}>
						<ReactQuill
							theme="snow"
							modules={Modules}
							formats={Formats}
							value={body}
							placeholder="내용을 입력해주세요"
							onChange={handleQuill}
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
				</Box>
			</Container>
		);
	};

	return <>{blogForm()}</>;
}

export default withRouter(Main);
