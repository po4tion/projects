import { useState } from 'react';
import { blogSearch } from '/actions/handleBlog';
import renderHTML from 'react-render-html';
import moment from 'moment';
import 'moment/locale/ko';
import Link from 'next/link';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';

function SearchBlog() {
	const [searched, setSearched] = useState([]);

	const handleChange = async e => {
		await blogSearch({ search: e.target.value }).then(data => {
			if (e.target.value === '') {
				setSearched([]);
			} else {
				setSearched(data);
			}
		});
	};

	const searchedList = searched => {
		return searched.map((post, idx) => (
			<Paper key={idx} sx={{ width: 600, my: 1, p: 2, userSelect: 'none' }}>
				<Link href={`/blogs/${post.slug}`} passHref>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography align="left" variant="h5" sx={{ fontWeight: 600 }}>
								{post.title}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							{renderHTML(post.excerpt)}
						</Grid>

						<Grid item xs={12}>
							<Typography>
								{post.postedBy.name} &#183;&nbsp;
								{moment(post.updatedAt).format('YYYY년 MM월 DD일')}
							</Typography>
						</Grid>
					</Grid>
				</Link>
			</Paper>
		));
	};

	return (
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
				<Stack direction="column" spacing={2} sx={{ marginBottom: 10 }}>
					<Paper
						component="form"
						sx={{
							p: '2px 4px',
							display: 'flex',
							alignItems: 'center',
							width: 600,
							height: 70,
						}}
					>
						<InputBase
							onChange={handleChange}
							autoFocus
							sx={{ fontSize: 25, ml: 1, flex: 1 }}
							placeholder="검색어를 입력해주세요"
							inputProps={{ 'aria-label': '검색어를 입력해주세요' }}
						/>
						<IconButton
							type="submit"
							disabled
							sx={{ p: '10px' }}
							aria-label="search"
						>
							<SearchIcon color="primary" fontSize="large" />
						</IconButton>
					</Paper>
					{searched.length !== 0 && (
						<Typography fontSize="large">
							총 <b>{searched.length}개</b>의 포스트를 찾았습니다
						</Typography>
					)}
				</Stack>
				<Stack sx={{ width: 600 }}>{searchedList(searched)}</Stack>
			</Box>
		</Container>
	);
}

export default SearchBlog;
