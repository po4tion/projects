import { useState } from 'react';
import Head from 'next/head';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { BlogList } from '/components/blog';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function CtgRelated({ category, blogs }) {
	const { name, slug } = category;
	const [page, setPage] = useState(1);

	const displayBlog = (start, end) => {
		const result = [];

		// 5개 단위로 인덱스 검색
		for (let i = start; i < end; i++) {
			if (blogs[i] === undefined) {
				break;
			}

			result.push(<BlogList key={i} blog={blogs[i]} />);
		}

		return result;
	};

	const handleChange = (_, value) => {
		setPage(value);
	};

	return (
		<>
			<Head>
				<title>
					{process.env.NEXT_PUBLIC_APP_NAME} | {name}
				</title>
				<meta
					name="description"
					content={`[${name}] 카테고리와 관련된 포스트`}
				/>
				<link
					rel="canonical"
					href={`${process.env.NEXT_PUBLIC_API}/categories/${slug}`}
				/>
				<meta
					property="og:title"
					content={`${process.env.NEXT_PUBLIC_APP_NAME} | ${name}`}
				/>
				<meta
					property="og:description"
					content={`${name} 카테고리와 관련된 포스트`}
				/>
				<meta property="og:type" content="website" />
				<meta
					property="og:url"
					content={`${process.env.NEXT_PUBLIC_API}/categories/${slug}`}
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
					<Typography gutterBottom color="primary">
						{name}
					</Typography>
					{displayBlog(5 * page - 5, 5 * page)}
					<Stack spacing={2} sx={{ marginTop: 4 }}>
						<Pagination
							page={page}
							count={Math.ceil(blogs.length / 5)}
							onChange={handleChange}
						/>
					</Stack>
				</Box>
			</Container>
		</>
	);
}

export default CtgRelated;
