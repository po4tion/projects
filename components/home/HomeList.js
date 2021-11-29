import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { BlogList } from '/components/blog';
import { getBlogs } from '/actions/handleBlog';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';

function HomeList({ router, blogs, blogSize, limitNum, skipNum }) {
	const [blogObj, setBlogObj] = useState([]);
	const [size, setSize] = useState(blogSize);
	const [limit, setLimit] = useState(limitNum);
	const [skip, setSkip] = useState(skipNum);
	const [loading, setLoading] = useState(false);

	// 처음 pre-rendering을 통해 소수의 블로그를 출력한다
	const displayBlog = () => {
		return blogs.map((blog, idx) => {
			return (
				<Grid
					key={idx}
					xs={12}
					sm={6}
					md={3}
					lg={3}
					item
					sx={{
						mb: 2,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<BlogList blog={blog} />
				</Grid>
			);
		});
	};

	// 버튼을 통해 새로운 블로그 정보를 불러온다
	const getMoreBlog = async () => {
		setLoading(true);
		// 2 페이지씩 증가(mongoose 기준)
		const addSkip = limit + skip;

		const result = await getBlogs(limit, addSkip).then(data => {
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
			return (
				<Alert severity="info" sx={{ mt: 4 }}>
					마지막 글입니다
				</Alert>
			);
		}
	};

	// getMoreBlog에서 추가된 새로운 블로글 출력한다
	const displayNewBlog = () => {
		return blogObj.map((blog, idx) => {
			return (
				<Grid
					key={idx}
					xs={12}
					sm={6}
					md={3}
					lg={3}
					item
					sx={{
						mb: 2,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<BlogList blog={blog} />
				</Grid>
			);
		});
	};

	return (
		<>
			<NextSeo
				title={process.env.NEXT_PUBLIC_APP_NAME}
				description="개발자들의 글이 숨쉬는 곳"
				canonical={`${process.env.NEXT_PUBLIC_API}${router.pathname}`}
				openGraph={{
					url: `${process.env.NEXT_PUBLIC_API}${router.pathname}`,
					title: `${process.env.NEXT_PUBLIC_APP_NAME} | 홈`,
					description: '개발자들의 글이 숨쉬는 곳',
					images: [
						{
							url: `${process.env.NEXT_PUBLIC_API}/images/kuma.jpg`,
							width: 600,
							height: 1000,
							alt: 'DEVBLOG 마스코트',
							type: 'image/jpeg',
						},
					],
					site_name: process.env.NEXT_PUBLIC_APP_NAME,
				}}
			/>

			<Container component="main" maxWidth="lg">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
					}}
				>
					<Grid container spacing={2}>
						{displayBlog()}
						{displayNewBlog()}
					</Grid>

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
