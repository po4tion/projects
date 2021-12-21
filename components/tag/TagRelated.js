/* 
	Connect: tags/[slug].js
*/

import { useState, useCallback } from 'react';
import { NextSeo } from 'next-seo';

// MUI
import Alert from '@mui/material/Alert';
import { BlogList } from '/components/blog';
import { Body } from '/components';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TagIcon from '@mui/icons-material/Tag';
import Typography from '@mui/material/Typography';

function TagRelated({ tag, blogs }) {
	const { name, slug } = tag;
	const [page, setPage] = useState(1);

	// 해당 태그를 가진 포스트 표시
	const displayBlog = useCallback(
		(start, end) => {
			const result = [];

			// 5개 단위로 인덱스 검색
			for (let i = start; i < end; i++) {
				if (blogs[i] === undefined) {
					break;
				}

				result.push(
					<Grid
						key={blogs[i].slug}
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
		},
		[blogs]
	);

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
							url: `${process.env.NEXT_PUBLIC_API}/images/basic.webp`,
							width: 500,
							height: 500,
							alt: 'DEVBLOG의 마스코트',
							type: 'image/webp',
						},
					],
					site_name: process.env.NEXT_PUBLIC_APP_NAME,
				}}
			/>

			<Body maxWidth="lg">
				<Typography
					gutterBottom
					color="primary"
					variant="h4"
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						userSelect: 'none',
						fontWeight: 'bold',
						mb: 4,
					}}
				>
					<TagIcon fontSize="large" />
					{name}
				</Typography>

				<Divider variant="middle" sx={{ mb: 4, width: '100%' }} />
				<Grid container spacing={2}>
					{blogs.length === 0 && (
						<Box
							sx={{
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Alert
								severity="info"
								sx={{
									width: 300,
								}}
							>
								해당 태그의 글은 삭제되었습니다
							</Alert>
						</Box>
					)}
					{displayBlog(4 * page - 4, 4 * page)}
				</Grid>
				<Stack spacing={2} sx={{ marginTop: 4 }}>
					<Pagination
						page={page}
						count={Math.ceil(blogs.length / 4)}
						color="numbering"
						onChange={handleChange}
					/>
				</Stack>
			</Body>
		</>
	);
}

export default TagRelated;
