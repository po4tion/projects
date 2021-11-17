import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { BlogList } from '/components/blog';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function Blogs({ blogs, user }) {
	const [page, setPage] = useState(1);

	const userInfo = () => {
		return (
			<>
				<Link passHref href={user.profile}>
					<Typography variant="h5" sx={{ userSelect: 'none' }}>
						<b>{user.username}</b> 님의 포스트(총 {blogs.length} 개)
					</Typography>
				</Link>
			</>
		);
	};

	const userBlog = (start, end) => {
		const store = [];

		for (let i = start; i < end; i++) {
			if (blogs[i] === undefined) {
				break;
			}
			store.push(
				<article key={i}>
					<BlogList blog={blogs[i]} noLink={false} />
				</article>
			);
		}

		return store;
	};

	const handleChange = (_, value) => {
		setPage(value);
	};

	return (
		<>
			<Head>
				<title>
					{process.env.NEXT_PUBLIC_APP_NAME} | {user.name}
				</title>
				<meta name="description" content={`${user.name}님의 블로그`} />
				<link
					rel="canonical"
					href={`${process.env.NEXT_PUBLIC_API}/profile/${user.username}`}
				/>
				<meta
					property="og:title"
					content={`${process.env.NEXT_PUBLIC_APP_NAME} | ${user.name}`}
				/>
				<meta property="og:description" content={`${user.name}님의 블로그`} />
				<meta property="og:type" content="website" />
				<meta
					property="og:url"
					content={`${process.env.NEXT_PUBLIC_API}/profile/${user.username}`}
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
					{userInfo()}
					<Divider variant="middle" sx={{ mt: 4, mb: 4, width: '100%' }} />
					{userBlog(5 * page - 5, 5 * page)}
					<Stack spacing={2} sx={{ marginTop: 4 }}>
						<Pagination
							onChange={handleChange}
							page={page}
							count={Math.ceil(blogs.length / 5)}
						/>
					</Stack>
				</Box>
			</Container>
		</>
	);
}

export default Blogs;
