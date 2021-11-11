import Head from 'next/head';
import { useState } from 'react';
import { withRouter } from 'next/router';
import {
	getBlogsInServer,
	listAllInServer,
	listAll,
} from '/actions/handleBlog';
import { BlogList } from '/components/blog';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';

function Home({
	router,
	blogs,
	categories,
	tags,
	blogSize,
	limitNum,
	skipNum,
	allSize,
}) {
	const [blogObj, setBlogObj] = useState(blogs);
	const [size, setSize] = useState(blogSize);
	const [limit, setLimit] = useState(limitNum);
	const [skip, setSkip] = useState(skipNum);
	const [hasMore, setHasMore] = useState(true);

	const displayBlog = () => {
		return blogObj.map((blog, idx) => {
			return (
				<article key={idx}>
					<BlogList blog={blog} />
				</article>
			);
		});
	};

	const getMoreBlog = async () => {
		// 2 페이지씩 증가(mongoose 기준)
		const addSkip = limit + skip;

		const result = await listAll(limit, addSkip).then(async data => {
			setBlogObj(blog => [...blog, ...data.blogs]);
			setSize(data.size);
			setSkip(addSkip);

			if (allSize.data.length <= addSkip + limit) {
				setHasMore(false);
			}

			// 블로그 총 개수가 홀수일 경우
			if (allSize.data.length === addSkip + limit + 1) {
				await listAll(1, addSkip + limit).then(data => {
					setBlogObj(blog => [...blog, ...data.blogs]);
					setSize(data.size);
					setHasMore(false);
				});
			}
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
					content={`${process.env.NEXT_PUBLIC_API}/public/images/kuma.jpg`}
				/>
				<meta
					property="og:image:secure_url"
					content={`${process.env.NEXT_PUBLIC_API}/public/images/kuma.jpg`}
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
					<InfiniteScroll
						dataLength={size}
						next={getMoreBlog}
						hasMore={hasMore}
						loader={
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<CircularProgress />
							</Box>
						}
						endMessage={
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Alert severity="info">마지막 글입니다</Alert>
							</Box>
						}
					>
						{displayBlog()}
					</InfiniteScroll>
				</Box>
			</Container>
		</>
	);
}

export default withRouter(Home);

export async function getServerSideProps() {
	const res = await getBlogsInServer();
	const limit = 2,
		skip = 0;
	const data = await listAllInServer(limit, skip);

	return {
		props: {
			blogs: data.blogs,
			categories: data.categories,
			tags: data.tags,
			blogSize: data.size,
			limitNum: limit,
			skipNum: skip,
			allSize: res,
		},
	};
}
