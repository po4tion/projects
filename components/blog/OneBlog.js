import { useRef, useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import NextLink from 'next/link';
import Image from 'next/image';
import { getBlogInServer } from '/actions/handleBlog';
import moment, { relativeTimeThreshold } from 'moment';
import renderHTML from 'react-render-html';
import useScript from '/lib/blog/useScript';
import { isBookmarked, bookmarked } from '/actions/handleBookmark';
import { getCookie, isAuth } from '/actions/handleAuth';

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
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Tooltip from '@mui/material/Tooltip';

function OneBlog({ blog, related }) {
	const [blogInfo, setBlogInfo] = useState(undefined);

	const { title, sDesc, slug, postedBy, updatedAt, body, tags } = blog.data[0];

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
		return (
			<Image
				width={300}
				height={250}
				objectFit="cover"
				quality={100}
				src={`${
					process.env.NEXT_PUBLIC_API
				}/api/blog/photo/${encodeURIComponent(blog.slug)}`}
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
								<CardMedia title={blog.title}>{handleImage(blog)}</CardMedia>
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

	const [bookmark, setBookmark] = useState(undefined);

	useEffect(() => {
		isAuth() &&
			isBookmarked(isAuth().email, blog.data[0].slug).then(data => {
				setBookmark(data.docs);
			});
	}, [blog.data]);

	const clickBookmark = () => {
		isAuth() &&
			bookmarked(isAuth().email, slug, getCookie('access-token')).then(data => {
				setBookmark(bm => !bm);
			});
	};

	return (
		<>
			{blog && (
				<NextSeo
					title={`${process.env.NEXT_PUBLIC_APP_NAME} | ${title}`}
					description={sDesc}
					canonical={`${process.env.NEXT_PUBLIC_API}/blogs/${encodeURIComponent(
						slug
					)}`}
					openGraph={{
						url: `${process.env.NEXT_PUBLIC_API}/blogs/${encodeURIComponent(
							slug
						)}`,
						title: `${process.env.NEXT_PUBLIC_APP_NAME} | ${title}`,
						description: sDesc,
						images: [
							{
								url: `${
									process.env.NEXT_PUBLIC_API
								}/api/blog/photo/${encodeURIComponent(slug)}`,
								width: 500,
								height: 500,
								alt: '썸네일',
								type: 'image/jpeg',
							},
						],
						site_name: process.env.NEXT_PUBLIC_APP_NAME,
					}}
				/>
			)}

			{blog && (
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
								{bookmark && (
									<Tooltip title="북마크 취소" arrow>
										<IconButton
											onClick={clickBookmark}
											sx={{
												position: 'absolute',
												ml: -8,
											}}
										>
											<BookmarkIcon fontSize="large" />
										</IconButton>
									</Tooltip>
								)}
								{!bookmark && (
									<Tooltip title="북마크 추가" arrow>
										<IconButton
											onClick={clickBookmark}
											sx={{
												position: 'absolute',
												ml: -8,
											}}
										>
											<BookmarkBorderIcon fontSize="large" />
										</IconButton>
									</Tooltip>
								)}
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
								{related && relateCards(related)}
								{related && handleSkeleton()}
							</Grid>
						</Grid>
					</Box>
				</Container>
			)}
		</>
	);
}

export default OneBlog;
