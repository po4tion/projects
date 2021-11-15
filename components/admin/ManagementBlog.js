import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { isAuth } from '/actions/handleAuth';
import { removeBlog } from '/actions/handleBlog';
import moment from 'moment';
import renderHTML from 'react-render-html';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

function ManagementBlog({ blogList, token, size }) {
	const [page, setPage] = useState(1);
	const { data: blogs } = blogList;
	const router = useRouter();

	const deletePost = async slug => {
		await removeBlog(slug, token).then(_ => {
			router.replace(router.asPath);
		});
	};

	const deletePostAlarm = (name, slug) => {
		const result = window.confirm(`[${name}] 글을 삭제하시겠습니까?`);

		if (result) {
			deletePost(slug);
		}
	};

	const updateBtn = blog => {
		if (isAuth() && isAuth().role === 0) {
			return (
				<Link href={`/user/crud/${blog.slug}`} passHref>
					<Button
						component="a"
						variant="outlined"
						sx={{ borderBottom: 'none' }}
					>
						수정
					</Button>
				</Link>
			);
		} else if (isAuth() && isAuth().role === 1) {
			return (
				<Link href={`/admin/crud/${blog.slug}`} passHref>
					<Button
						component="a"
						variant="outlined"
						sx={{ borderBottom: 'none' }}
					>
						수정
					</Button>
				</Link>
			);
		}
	};

	const allBlog = (start, end) => {
		const result = [];

		// 5개 단위로 인덱스 검색
		for (let i = start; i < end; i++) {
			if (blogs[i] === undefined) {
				break;
			}

			result.push(
				<Grid key={i} container spacing={2} sx={{ marginBottom: 2 }}>
					<Grid item xs={11} sx={{ zIndex: 10 }}>
						<Link href={`/blogs/${blogs[i].slug}`} passHref>
							<CardActionArea component="div">
								<Card sx={{ userSelect: 'none', position: 'relative' }}>
									<CardHeader
										title={blogs[i].title}
										subheader={`${blogs[i].postedBy.name} ${moment(
											blogs[i].updatedAt
										).format('YYYY년 MM월 DD일 HH:MM')}`}
									/>
									<CardContent>{renderHTML(blogs[i].excerpt)}</CardContent>
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
							sx={{ marginLeft: -3 }}
						>
							{updateBtn(blogs[i])}

							<Button
								onClick={() => deletePostAlarm(blogs[i].title, blogs[i].slug)}
							>
								삭제
							</Button>
						</ButtonGroup>
					</Grid>
				</Grid>
			);
		}

		return result;
	};

	// 페이지네이션 번호 상태 관리
	const handleChange = (_, value) => {
		setPage(value);
	};

	return (
		<>
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
					<Typography gutterBottom>모든 글 : {size}</Typography>

					{allBlog(5 * page - 5, 5 * page)}

					<Stack spacing={2} sx={{ marginTop: 4 }}>
						<Pagination
							page={page}
							count={Math.ceil(size / 5)}
							onChange={handleChange}
						/>
					</Stack>
				</Box>
			</Container>
		</>
	);
}

export default ManagementBlog;
