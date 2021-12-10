import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { isAuth } from '/actions/handleAuth';
import { removeBlog, getBlogsUsers } from '/actions/handleBlog';
import moment from 'moment';
import renderHTML from 'react-render-html';
import { Body } from '/components';
import Image from 'next/image';

import { grey } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

function ManagementBlog({ blogList, token, size }) {
	const [auth, setAuth] = useState();
	const [page, setPage] = useState(1);
	const [blogs, setBlogs] = useState([]);
	const [reload, setReload] = useState(false);
	const [blogSize, setBlogSize] = useState(0);
	const router = useRouter();
	const matches = useMediaQuery('(max-width: 500px)', { noSsr: true });
	const matches600 = useMediaQuery('(max-width: 600px)', { noSsr: true });

	useEffect(() => {
		setAuth(isAuth() && isAuth().role);
	}, []);

	useEffect(() => {
		setBlogs(blogList.data);
	}, [blogList, reload]);

	useEffect(() => {
		setBlogSize(size);
	}, [size, reload]);

	const allBlog = useCallback(
		(start, end) => {
			const result = [];

			const updateBtn = blog => {
				if (auth === 0) {
					return (
						<Link href={`/user/crud/${blog.slug}`} passHref>
							<Button
								color="write"
								component="a"
								variant="contained"
								sx={{ borderBottom: 'none' }}
							>
								수정
							</Button>
						</Link>
					);
				}
			};

			const deletePost = async slug => {
				await removeBlog(encodeURIComponent(slug), token).then(data => {
					setReload(r => !r);
					router.replace(router.asPath);
				});
			};

			const deletePostAlarm = (name, slug) => {
				const result = window.confirm(`[${name}] 글을 삭제하시겠습니까?`);

				if (result) {
					deletePost(slug);
				}
			};

			const deleteBtn = blog => {
				if (auth === 0 || auth === 1) {
					return (
						<Button
							color="error"
							onClick={() => deletePostAlarm(blog.title, blog.slug)}
						>
							삭제
						</Button>
					);
				}
			};

			// 5개 단위로 인덱스 검색
			for (let i = start; i < end; i++) {
				if (blogs[i] === undefined) {
					break;
				} else {
					result.push(
						<Grid key={i} container spacing={2} sx={{ marginBottom: 2 }}>
							<Grid item xs={11} sx={{ zIndex: 10 }}>
								<Link href={`/blogs/${blogs[i].slug}`} passHref>
									<CardActionArea component="a">
										<Card
											sx={{
												display: 'flex',
												userSelect: 'none',
												position: 'relative',
												width: '100%',
												height: '200px',
											}}
										>
											<Image
												src={`${
													process.env.NEXT_PUBLIC_API
												}/api/blog/photo/${encodeURIComponent(blogs[i].slug)}`}
												priority
												width={300}
												height={200}
												objectFit="cover"
												quality={100}
												alt="썸네일 사진"
											/>

											<Box
												sx={{
													display: 'flex',
													width: '80%',
													flexDirection: 'column',
												}}
											>
												<CardHeader
													title={blogs[i].title}
													titleTypographyProps={{
														fontSize: 25,
														fontWeight: 'bold',
													}}
													subheader={`${blogs[i].postedBy.username} ${moment(
														blogs[i].updatedAt
													).format('YYYY년 MM월 DD일 HH:MM')}`}
													subheaderTypographyProps={{ fontWeight: 'bold' }}
												/>
												<CardContent
													sx={{
														overflow: 'hidden',
														textOverflow: 'ellipsis',
														display: '-webkit-box',
														WebkitLineClamp: 4,
														WebkitBoxOrient: 'vertical',
													}}
												>
													{renderHTML(blogs[i].excerpt)}
												</CardContent>
											</Box>
										</Card>
									</CardActionArea>
								</Link>
							</Grid>
							<Grid item xs={1} sx={{ zIndex: 1 }}>
								<ButtonGroup
									disableElevation
									orientation="vertical"
									variant="outlined"
									aria-label="vertical outlined button group"
									sx={{ marginLeft: -2.5 }}
								>
									{updateBtn(blogs[i])}
									{deleteBtn(blogs[i])}
								</ButtonGroup>
							</Grid>
						</Grid>
					);
				}
			}

			return result;
		},
		[auth, blogs, router, token]
	);

	const allBlogUnder500 = useCallback(
		(start, end) => {
			const result = [];

			const updateBtn = blog => {
				if (auth === 0) {
					return (
						<Link href={`/user/crud/${blog.slug}`} passHref>
							<IconButton color="info" aria-label="포스트 수정 버튼">
								<EditIcon />
							</IconButton>
						</Link>
					);
				}
			};

			const deletePost = async slug => {
				await removeBlog(encodeURIComponent(slug), token).then(data => {
					setReload(r => !r);
					router.replace('/user/crud/management');
				});
			};

			const deletePostAlarm = (name, slug) => {
				const result = window.confirm(`[${name}] 글을 삭제하시겠습니까?`);

				if (result) {
					deletePost(slug);
				}
			};

			const deleteBtn = blog => {
				if (auth === 0 || auth === 1) {
					return (
						<IconButton
							onClick={() => deletePostAlarm(blog.title, blog.slug)}
							color="warning"
							aria-label="포스트 삭제 버튼"
						>
							<ClearIcon />
						</IconButton>
					);
				}
			};

			if (!matches) {
				return;
			}

			for (let i = start; i < end; i++) {
				if (blogs[i] === undefined) {
					break;
				} else {
					result.push(
						<Grid
							key={i}
							container
							spacing={0}
							sx={{ display: 'flex', marginBottom: 2 }}
						>
							<Grid
								item
								xs={12}
								sx={{
									display: 'flex',
									justifyContent: 'flex-end',
									m: 0,
									border: '1px solid lightgray',
									borderRadius: '5px 5px 0 0',
									borderBottom: 'none',
									backgroundColor: grey[200],
								}}
							>
								{updateBtn(blogs[i])}
								{deleteBtn(blogs[i])}
							</Grid>
							<Grid item xs={12}>
								<Link href={`/blogs/${blogs[i].slug}`} passHref>
									<CardActionArea component="a">
										<Card
											sx={{
												display: 'flex',
												flexDirection: 'column',
												userSelect: 'none',
												width: '100%',
												height: '400px',
											}}
										>
											<Image
												src={`${
													process.env.NEXT_PUBLIC_API
												}/api/blog/photo/${encodeURIComponent(blogs[i].slug)}`}
												priority
												width={300}
												height={200}
												objectFit="cover"
												quality={100}
												alt="썸네일 사진"
											/>

											<Box sx={{ height: '200px' }}>
												<CardHeader
													title={blogs[i].title}
													subheader={`${blogs[i].postedBy.username} ${moment(
														blogs[i].updatedAt
													).format(
														matches600
															? 'YY년 MM월 DD일'
															: 'YYYY년 MM월 DD일 HH:MM'
													)}`}
												/>
												<CardContent
													sx={{
														overflow: 'hidden',
														textOverflow: 'ellipsis',
														display: '-webkit-box',
														WebkitLineClamp: 4,
														WebkitBoxOrient: 'vertical',
													}}
												>
													{renderHTML(blogs[i].excerpt)}
												</CardContent>
											</Box>
										</Card>
									</CardActionArea>
								</Link>
							</Grid>
						</Grid>
					);
				}
			}

			return result;
		},
		[auth, blogs, matches, matches600, router, token]
	);

	// 페이지네이션 번호 상태 관리
	const handleChange = (_, value) => {
		setPage(value);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<>
			<Body>
				<Typography gutterBottom variant="h6">
					모든 글 : <b>{blogSize}</b>
				</Typography>

				{!matches && allBlog(5 * page - 5, 5 * page)}
				{matches && allBlogUnder500(5 * page - 5, 5 * page)}
				{size > 0 && (
					<Stack spacing={2} sx={{ marginTop: 4 }}>
						<Pagination
							page={page}
							count={Math.ceil(blogSize / 5)}
							color="numbering"
							onChange={handleChange}
						/>
					</Stack>
				)}
			</Body>
		</>
	);
}

export default ManagementBlog;
