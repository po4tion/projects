/* 
	Connect: blogs/[slug].js
*/

import { useRef, useEffect, useState, useCallback } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import moment, { relativeTimeThreshold } from 'moment';
import renderHTML from 'react-render-html';
import { getBlogInServer, removeBlog } from '/actions/handleBlog';
import { isBookmarked, bookmarked } from '/actions/handleBookmark';
import { getCookie, isAuth } from '/actions/handleAuth';
import useScript from '/lib/blog/useScript';

// MUI
import Alert from '@mui/material/Alert';
import { Body } from '/components';
import Box from '@mui/material/Box';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

function OneBlog({ blog, related }) {
	const { push } = useRouter();
	const matches = useMediaQuery('(max-width: 500px)', { noSsr: true });
	const [blogInfo, setBlogInfo] = useState(undefined);
	const [bookmark, setBookmark] = useState(undefined);
	const [userEmail, setUserEmail] = useState('userNone');
	const [postEmail, setPostEmail] = useState('postNone');
	const { title, sDesc, slug, postedBy, updatedAt, body, tags } = blog.data[0];

	useEffect(() => {
		isAuth() && setUserEmail(isAuth().email);
		setPostEmail(blog.data[0].postedBy.email);
	}, [blog.data]);

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

	// 태그 Chip 생성
	const handleTag = tags => {
		return tags.map((tag, idx) => (
			<NextLink
				key={idx}
				href={`/tags/${encodeURIComponent(tag.slug)}`}
				passHref
			>
				<Chip
					color="tagChip"
					variant="outlined"
					label={tag.name}
					sx={{ marginRight: 1 }}
				/>
			</NextLink>
		));
	};

	// 현재 선택한 블로그를 제외하고 현재 선택한 블로그의 카테고리와 연관있는
	// 블로그를 보여준다
	const relateCards = blogs => {
		// 썸네일 불러오기
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

		return blogs.map((blog, idx) => {
			return (
				<Grid
					key={blog.slug}
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

	// utteranc 댓글 관리
	const status = useScript({
		url: 'https://utteranc.es/client.js',
		theme: 'github-light',
		issueTerm: 'pathname',
		repo: 'po4tion/devblog-comments',
		ref: comment,
	});

	// 포스트 수정
	const handleUpdateBtn = () => {
		return (
			<NextLink href={`/user/crud/${slug}`} passHref>
				<Tooltip title="글 수정" arrow>
					<IconButton>
						<EditIcon fontSize="large" />
					</IconButton>
				</Tooltip>
			</NextLink>
		);
	};

	// 포스트 삭제
	const handleRemoveBtn = () => {
		const handleClick = (title, slug) => {
			const result = window.confirm(`[${title}] 글을 삭제하시겠습니까?`);

			const deletePost = slug => {
				removeBlog(encodeURIComponent(slug), getCookie('access-token')).then(
					data => {
						push('/');
					}
				);
			};

			if (result) {
				deletePost(slug);
			}
		};

		return (
			<Tooltip title="글 삭제" arrow>
				<IconButton onClick={() => handleClick(title, slug)}>
					<DeleteForeverIcon fontSize="large" />
				</IconButton>
			</Tooltip>
		);
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
				<Body>
					<Grid container rowSpacing={2}>
						<Grid
							item
							xs={12}
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
							{bookmark && (
								<Tooltip title="북마크 취소" arrow>
									<IconButton onClick={clickBookmark} sx={{ ml: -1 }}>
										<BookmarkIcon color="mark" fontSize="large" />
									</IconButton>
								</Tooltip>
							)}
							{!bookmark && (
								<Tooltip title="북마크 추가" arrow>
									<IconButton onClick={clickBookmark} sx={{ ml: -1 }}>
										<BookmarkBorderIcon fontSize="large" />
									</IconButton>
								</Tooltip>
							)}
							{userEmail === postEmail && (
								<Box>
									{handleUpdateBtn()}
									{handleRemoveBtn()}
								</Box>
							)}
						</Grid>
						<Grid item xs={12}>
							<Typography component="h1" variant={matches ? 'h4' : 'h3'}>
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
								sx={{
									textAlign: 'center',
									mb: 4,
									userSelect: 'none',
									fontWeight: 'bold',
								}}
							>
								관심 있을 만한 포스터
							</Typography>
						</Grid>

						<Grid container spacing={2}>
							{related && relateCards(related)}
							{related && handleSkeleton()}
							{!related.length && (
								<Box
									sx={{
										width: '100%',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<Alert severity="info">
										해당 게시글과 연관된 게시물이 없습니다
									</Alert>
								</Box>
							)}
						</Grid>
					</Grid>
				</Body>
			)}
		</>
	);
}

export default OneBlog;
