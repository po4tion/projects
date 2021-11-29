import { useState } from 'react';
import { NextSeo } from 'next-seo';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { BlogList } from '/components/blog';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

function TagRelated({ tag, blogs }) {
	const { name, slug } = tag;
	const [page, setPage] = useState(1);

	const displayBlog = (start, end) => {
		const result = [];

		// 5개 단위로 인덱스 검색
		for (let i = start; i < end; i++) {
			if (blogs[i] === undefined) {
				break;
			}

			result.push(
				<Grid
					key={i}
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
					<BlogList blog={blogs[i]} />
				</Grid>
			);
		}

		return result;
	};

	const handleChange = (_, value) => {
		setPage(value);
	};

	return (
		<>
			<NextSeo
				title={`${process.env.NEXT_PUBLIC_APP_NAME} | ${name}`}
				description={`#${name}로 검색된 글들`}
				canonical={`${process.env.NEXT_PUBLIC_API}/tags/${encodeURIComponent(
					slug
				)}`}
				openGraph={{
					url: `${process.env.NEXT_PUBLIC_API}/tags/${encodeURIComponent(
						slug
					)}`,
					title: `${process.env.NEXT_PUBLIC_APP_NAME} | ${name}`,
					description: `태그 ${name} 으로/로 검색된 글들`,
					images: [
						{
							url: `${process.env.NEXT_PUBLIC_API}/images/kuma.jpg`,
							width: 500,
							height: 500,
							alt: 'DEVBLOG의 마스코트',
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
					}}
				>
					<Typography
						gutterBottom
						color="secondary"
						variant="h4"
						sx={{ userSelect: 'none', fontWeight: 'bold', mb: 4 }}
					>
						#{name}
					</Typography>
					<Divider variant="middle" sx={{ mb: 4, width: '100%' }} />
					<Grid container spacing={2}>
						{displayBlog(5 * page - 5, 5 * page)}
					</Grid>
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

export default TagRelated;
