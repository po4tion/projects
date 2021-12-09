import { NextSeo } from 'next-seo';
import { useState, useCallback } from 'react';
import { BlogList } from '/components/blog';
import { getBlogs } from '/actions/handleBlog';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import InfiniteScroll from 'react-infinite-scroll-component';

function HomeList({ blogs, limitNum, skipNum }) {
	const { pathname } = useRouter();
	const [blogObj, setBlogObj] = useState(blogs);
	const [limit, setLimit] = useState(limitNum);
	const [skip, setSkip] = useState(skipNum);
	const [hasMore, setHasMore] = useState(true);

	// 버튼을 통해 새로운 블로그 정보를 불러온다
	const getMoreBlog = async () => {
		// 4 페이지씩 증가(mongoose 기준)
		const addSkip = limit + skip;

		const result = await getBlogs(limit, addSkip).then(data => {
			if (data.size === 0) {
				setHasMore(false);
			} else {
				setBlogObj([...blogObj, ...data.blogs]);
				setSkip(addSkip);
			}
		});
	};

	// getMoreBlog에서 추가된 새로운 블로글 출력한다
	const displayNewBlog = useCallback(() => {
		return blogObj.map((blog, idx) => {
			return (
				<Grid
					key={idx}
					xs={12}
					sm={6}
					md={4}
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
	}, [blogObj]);

	return (
		<>
			<NextSeo
				title={process.env.NEXT_PUBLIC_APP_NAME}
				description="개발자들의 글이 숨쉬는 곳"
				canonical={`${process.env.NEXT_PUBLIC_API}${pathname}`}
				openGraph={{
					url: `${process.env.NEXT_PUBLIC_API}${pathname}`,
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
					<InfiniteScroll
						dataLength={blogObj.length}
						next={getMoreBlog}
						hasMore={hasMore}
						loader={
							<Typography variant="h5" align="center" mt={4}>
								로딩중...
							</Typography>
						}
						endMessage={
							<Typography variant="h5" align="center" mt={4}>
								마지막 글입니다
							</Typography>
						}
						scrollThreshold={0.5}
					>
						<Grid container spacing={2}>
							{displayNewBlog()}
						</Grid>
					</InfiniteScroll>
				</Box>
			</Container>
		</>
	);
}

export default HomeList;
