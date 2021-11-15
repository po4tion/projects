import Head from 'next/head';
import { useState } from 'react';
import { BlogList } from '/components/blog';
import { listAll } from '/actions/handleBlog';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';

function HomeList({
	router,
	blogs,
	categories,
	tags,
	blogSize,
	limitNum,
	skipNum,
}) {
	const [blogObj, setBlogObj] = useState([]);
	const [size, setSize] = useState(blogSize);
	const [limit, setLimit] = useState(limitNum);
	const [skip, setSkip] = useState(skipNum);
	const [loading, setLoading] = useState(false);

	// 처음 pre-rendering을 통해 소수의 블로그를 출력한다
	const displayBlog = () => {
		return blogs.map((blog, idx) => {
			return (
				<article key={idx}>
					<BlogList blog={blog} />
				</article>
			);
		});
	};

	// 버튼을 통해 새로운 블로그 정보를 불러온다
	const getMoreBlog = async () => {
		setLoading(true);
		// 2 페이지씩 증가(mongoose 기준)
		const addSkip = limit + skip;

		const result = await listAll(limit, addSkip).then(data => {
			setBlogObj([...blogObj, ...data.blogs]);
			setSize(data.size);
			setSkip(addSkip);
			setLoading(false);
		});
	};

	// 블로그 더보기 버튼
	const getMoreBtn = () => {
		if (size > 0 && size >= limit) {
			return (
				<Button size="large" variant="outlined" onClick={getMoreBlog}>
					더보기
				</Button>
			);
		} else {
			return <Alert severity="info">마지막 글입니다</Alert>;
		}
	};

	// getMoreBlog에서 추가된 새로운 블로글 출력한다
	const displayNewBlog = () => {
		return blogObj.map((blog, idx) => {
			return (
				<article key={idx}>
					<BlogList blog={blog} />
				</article>
			);
		});
	};

	return (
		<>
			<Head>
				<title>{process.env.NEXT_PUBLIC_APP_NAME} | 홈</title>
				<meta name="description" content="개발자들의 글이 숨쉬는 곳" />
				<link
					rel="canonical"
					href={`${process.env.NEXT_PUBLIC_API}${router.pathname}`}
				/>
				<meta
					property="og:title"
					content={`${process.env.NEXT_PUBLIC_APP_NAME} | 홈`}
				/>
				<meta property="og:description" content="개발자들의 글이 숨쉬는 곳" />
				<meta property="og:type" content="website" />
				<meta
					property="og:url"
					content={`${process.env.NEXT_PUBLIC_API}${router.pathname}`}
				/>
				<meta
					property="og:site_name"
					content={process.env.NEXT_PUBLIC_APP_NAME}
				/>
				<meta
					property="og:image"
					content={`${process.env.NEXT_PUBLIC_API}/images/kuma.jpg`}
				/>
				<meta
					property="og:image:secure_url"
					content={`${process.env.NEXT_PUBLIC_API}/images/kuma.jpg`}
				/>
				<meta property="og:image:type" content="image/jpg" />
			</Head>
			<Container component="main" maxWidth="md">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					{displayBlog()}
					{displayNewBlog()}
					{loading && (
						<Box sx={{ marginBottom: 2 }}>
							<CircularProgress />
						</Box>
					)}
					{getMoreBtn()}
				</Box>
			</Container>
		</>
	);
}

export default HomeList;
