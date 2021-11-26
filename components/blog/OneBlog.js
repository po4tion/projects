import { useRef } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { withRouter } from 'next/router';
import { getBlogInServer } from '/actions/handleBlog';
import moment from 'moment';
import renderHTML from 'react-render-html';
import useScript from '/lib/blog/useScript';

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';

function OneBlog({ router, blog, related }) {
	const { title, sDesc, slug, postedBy, updatedAt, body, tags } = blog.data;

	// 태그 Chip 생성
	const handleTag = tags => {
		return tags.map((tag, idx) => (
			<NextLink
				key={idx}
				href={`/tags/${encodeURIComponent(tag.slug)}`}
				passHref
			>
				<Chip color="secondary" label={tag.name} sx={{ marginRight: 1 }} />
			</NextLink>
		));
	};

	// 현재 선택한 블로그를 제외하고 현재 선택한 블로그의 카테고리와 연관있는
	// 블로그를 보여준다
	const relateCards = blogs => {
		return blogs.map((blog, idx) => {
			return (
				<NextLink key={idx} href={`/blogs/${blog.slug}`} passHref>
					<Grid item xs={6} md={4}>
						<Card raised sx={{ height: '400px' }}>
							<CardMedia
								component="img"
								image={`/api/blog/photo/${encodeURIComponent(blog.slug)}`}
								alt={blog.title}
								sx={{
									height: '200px',
									display: { xs: 'none', sm: 'block' },
								}}
							/>
							<CardHeader
								title={blog.title}
								subheader={
									<Box>
										<NextLink href={`/profile/${postedBy.username}`} passHref>
											<Link>{postedBy.username}</Link>
										</NextLink>{' '}
										&#183;&nbsp;
										{moment(updatedAt).format('YYYY년 MM월 DD일')}
									</Box>
								}
								sx={{ paddingBottom: 0 }}
							/>
							<CardContent sx={{ paddingTop: 0 }}>
								<Box sx={{ width: '100%' }}>{renderHTML(blog.excerpt)}</Box>
							</CardContent>
						</Card>
					</Grid>
				</NextLink>
			);
		});
	};

	const comment = useRef(null);

	const status = useScript({
		url: 'https://utteranc.es/client.js',
		theme: 'github-light',
		issueTerm: 'pathname',
		repo: 'po4tion/devblog-comments',
		ref: comment,
	});

	return (
		<>
			<Head>
				<title>
					{process.env.NEXT_PUBLIC_APP_NAME} | {title}
				</title>
				<meta name="description" content={sDesc} />
				<link
					rel="canonical"
					href={`${process.env.NEXT_PUBLIC_API}/blogs/${encodeURIComponent(
						slug
					)}`}
				/>
				<meta
					property="og:title"
					content={`${process.env.NEXT_PUBLIC_APP_NAME} | ${title}`}
				/>
				<meta property="og:description" content={sDesc} />
				<meta property="og:type" content="website" />
				<meta
					property="og:url"
					content={`${process.env.NEXT_PUBLIC_API}/blogs/${encodeURIComponent(
						slug
					)}`}
				/>
				<meta
					property="og:site_name"
					content={process.env.NEXT_PUBLIC_APP_NAME}
				/>
				<meta
					property="og:image"
					content={`${
						process.env.NEXT_PUBLIC_API
					}/api/blog/photo/${encodeURIComponent(slug)}`}
				/>
				<meta
					property="og:image:secure_url"
					content={`${
						process.env.NEXT_PUBLIC_API
					}/api/blog/photo/${encodeURIComponent(slug)}`}
				/>
				<meta property="og:image:type" content="image/jpg" />
			</Head>
			<Container component="main" maxWidth="md">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 6,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Grid container rowSpacing={2}>
						<Grid item xs={12}>
							<Typography component="h1" variant="h4">
								{title}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Divider />
						</Grid>
						<Grid item xs={12}>
							<Typography variant="h6">
								<NextLink href={`/profile/${postedBy.username}`} passHref>
									<Link underline="hover">{postedBy.username}</Link>
								</NextLink>{' '}
								&#183;&nbsp;
								{moment(updatedAt).format(`YYYY년 MM월 DD일`)}
							</Typography>
						</Grid>

						<Grid item xs={12} sx={{ marginBottom: 5 }}>
							{handleTag(tags)}
						</Grid>
						<Grid item xs={12}>
							<Box sx={{ width: '100%' }}>{renderHTML(body)}</Box>
						</Grid>

						<Divider sx={{ width: '100%', marginBottom: 5 }} />

						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Box ref={comment}></Box>
							</Grid>
							<Grid item xs={12}>
								<Typography variant="h6" sx={{ textAlign: 'center' }}>
									관심 있을 만한 포스터
								</Typography>
							</Grid>
							{relateCards(related)}
						</Grid>
					</Grid>
				</Box>
			</Container>
		</>
	);
}

export default OneBlog;
