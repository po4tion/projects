/* 
	Connect: index.js
*/

import { useState, useCallback, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getBlogs } from '/actions/handleBlog';
import { getOneTag } from '/actions/handleTag';

// MUI
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Body } from '/components';
import { BlogList } from '/components/blog';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InfiniteScroll from 'react-infinite-scroll-component';
import Typography from '@mui/material/Typography';

function HomeList() {
	const { pathname } = useRouter();
	const [blogObj, setBlogObj] = useState([]);
	const [limit, setLimit] = useState(8);
	const [skip, setSkip] = useState(0);
	const [hasMore, setHasMore] = useState(true);

	// tagList 가져오기(populate)
	useEffect(() => {
		const getTagData = async () => {
			await getOneTag();
		};

		getTagData();
	}, []);

	// 처음으로 보여지는 유저 포스트 8개 가져오기
	useEffect(() => {
		const limit = 8,
			skip = 0;

		const getBlogData = async () => {
			const data = await getBlogs(limit, skip);
			const blogs = await data.blogs;

			setBlogObj(blogs);
		};

		getBlogData();
	}, []);

	// 새로운 포스트 정보 관리
	const getMoreBlog = async () => {
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

	// 포스트 표시
	const displayNewBlog = useCallback(() => {
		return blogObj.map((blog, idx) => {
			return (
				<Grid
					key={blog.slug}
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
							url: `${process.env.NEXT_PUBLIC_API}/images/basic.webp`,
							width: 600,
							height: 1000,
							alt: 'DEVBLOG 마스코트',
							type: 'image/webp',
						},
					],
					site_name: process.env.NEXT_PUBLIC_APP_NAME,
				}}
			/>

			<Body maxWidth="lg">
				<InfiniteScroll
					dataLength={blogObj.length}
					next={getMoreBlog}
					hasMore={hasMore}
					loader={
						<Typography variant="h4" align="center" mt={4}>
							로딩중...
						</Typography>
					}
					endMessage={
						<Alert
							severity="info"
							variant="outlined"
							sx={{
								display: 'flex',
								justifyContent: 'center',
								width: 300,
								margin: '0 auto',
								fontWeight: 700,
								fontSize: 25,
							}}
						>
							<AlertTitle sx={{ fontWeight: 'bold' }}>알림</AlertTitle>
							마지막 글입니다
						</Alert>
					}
					scrollThreshold={0.5}
				>
					<Grid container spacing={2}>
						{displayNewBlog()}
					</Grid>
				</InfiniteScroll>
			</Body>
		</>
	);
}

export default HomeList;
