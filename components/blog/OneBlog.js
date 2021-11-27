import { useRef } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import Image from 'next/image';
import { withRouter } from 'next/router';
import { getBlogInServer } from '/actions/handleBlog';
import moment, { relativeTimeThreshold } from 'moment';
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
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

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

	const handleImage = blog => {
		const src = `${
			process.env.NEXT_PUBLIC_API
		}/api/blog/photo/${encodeURIComponent(blog.slug)}`;

		const myLoader = ({ src, width, quality }) => {
			return `${
				process.env.NEXT_PUBLIC_API
			}/api/blog/photo/${encodeURIComponent(blog.slug)}?w=${width}&q=${
				quality || 75
			}`;
		};

		return (
			<Image
				width={300}
				height={200}
				objectFit="cover"
				loader={myLoader}
				quality={100}
				src={src}
				alt="thumbnail image"
			/>
		);
	};

	// 현재 선택한 블로그를 제외하고 현재 선택한 블로그의 카테고리와 연관있는
	// 블로그를 보여준다
	const relateCards = blogs => {
		return blogs.map((blog, idx) => {
			return (
				<Grid
					key={idx}
					item
					xs={12}
					sm={6}
					md={4}
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Card raised sx={{ maxWidth: 300 }}>
						<CardActionArea>
							<NextLink
								href={`/blogs/${encodeURIComponent(blog.slug)}`}
								passHref
							>
								<CardMedia title={blog.title}>
									<div
										style={{
											position: 'relative',
											width: '100%',
											height: '100%',
										}}
									>
										{handleImage(blog)}
									</div>
								</CardMedia>
							</NextLink>

							<NextLink
								href={`/blogs/${encodeURIComponent(blog.slug)}`}
								passHref
							>
								<CardContent sx={{ userSelect: 'none', height: 136 }}>
									<Typography
										gutterBottom
										variant="h6"
										component="div"
										sx={{ fontWeight: 'bold' }}
									>
										{blog.title}
									</Typography>

									<Typography
										gutterBottom
										variant="body2"
										component="div"
										sx={{
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											display: '-webkit-box',
											WebkitLineClamp: 3,
											WebkitBoxOrient: 'vertical',
										}}
									>
										{blog.excerpt}
									</Typography>
								</CardContent>
							</NextLink>
						</CardActionArea>

						<Divider />

						<Box
							sx={{
								pr: 2,
								pl: 2,
								mt: 1.5,
								mb: 1.5,
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
							<NextLink
								href={`/profile/${encodeURIComponent(blog.postedBy.username)}`}
								passHref
							>
								<Link underline="hover" sx={{ p: 0, m: 0, userSelect: 'none' }}>
									#{blog.postedBy.username}
								</Link>
							</NextLink>

							<Typography sx={{ display: 'inline-flex', userSelect: 'none' }}>
								{moment(blog.updatedAt).format('YYYY년 MM월 DD일')}
							</Typography>
						</Box>
					</Card>
				</Grid>
			);
		});
	};

	const handleSkeleton = () => {
		const store = [];

		for (let i = 0; i < 3 - related.length; i++) {
			store.push(
				<Grid
					key={i}
					item
					xs={12}
					sm={6}
					md={4}
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Skeleton
						variant="rectangular"
						width={300}
						height="100%"
						sx={{ borderRadius: 1 }}
					/>
				</Grid>
			);
		}

		return store;
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
							<Typography
								component="h1"
								variant="h3"
								sx={{ boxShadow: '0 3px 3px -3px #000' }}
							>
								{title}
							</Typography>
						</Grid>

						<Grid item xs={12}>
							<Typography variant="h6" sx={{ userSelect: 'none' }}>
								<NextLink
									href={`/profile/${encodeURIComponent(postedBy.username)}`}
									passHref
								>
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

						<Divider sx={{ width: '100%', mt: 4, mb: 2 }} />

						<Box ref={comment} sx={{ width: '100%' }} />

						<Divider sx={{ width: '100%', mt: 4, mb: 2 }} />

						<Grid item xs={12}>
							<Typography
								variant="h5"
								sx={{ textAlign: 'center', mb: 4, userSelect: 'none' }}
							>
								관심 있을 만한 포스터
							</Typography>
						</Grid>

						<Grid container spacing={2}>
							{relateCards(related)}
							{handleSkeleton()}
						</Grid>
					</Grid>
				</Box>
			</Container>
		</>
	);
}

export default OneBlog;
