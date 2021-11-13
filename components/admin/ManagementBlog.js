import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { isAuth } from '/actions/handleAuth';
import { getBlogsInServer, removeBlog } from '/actions/handleBlog';
import moment from 'moment';
import renderHTML from 'react-render-html';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function ManagementBlog({ blogList, token, size }) {
	const [page, setPage] = useState(1);
	const { data: blogs } = blogList;

	const allBlog = (start, end) => {
		const result = [];

		// 5개 단위로 인덱스 검색
		for (let i = start; i < end; i++) {
			if (blogs[i] === undefined) {
				break;
			}

			result.push(
				<Link key={i} href={`/blogs/${blogs[i].slug}`} passHref>
					<Grid item xs={12}>
						<Card>
							<CardHeader
								title={blogs[i].title}
								subheader={`${blogs[i].postedBy.name} ${moment(
									blogs[i].updatedAt
								).format('YYYY년 MM월 DD일 HH:MM')}`}
							/>
							<CardContent>{renderHTML(blogs[i].excerpt)}</CardContent>
						</Card>
					</Grid>
				</Link>
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
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography align="right">총 개수: {size}</Typography>
						</Grid>
						{allBlog(5 * page - 5, 5 * page)}
					</Grid>
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
