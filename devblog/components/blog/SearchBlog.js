/* 
	Connect: blogs/search.js
*/

import { useState, useCallback } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import { blogSearch, unBlogSearch } from '/actions/handleBlog';

// MUI
import { BlogList } from '/components/blog';
import { Body } from '/components';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

function SearchBlog() {
	const [searched, setSearched] = useState([]);
	const [page, setPage] = useState(1);
	const [alignment, setAlignment] = useState('body');
	const matches = useMediaQuery('(max-width: 500px)', { noSsr: true });

	// 검색된 포스트 표시
	const searchedList = (searched, start, end) => {
		const result = [];

		for (let i = start; i < end; i++) {
			if (searched[i] === undefined) {
				break;
			}

			const post = searched[i];

			result.push(
				<Grid
					key={post.slug}
					item
					xs={12}
					sm={6}
					md={3}
					sx={{
						mb: 2,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<BlogList blog={post} />
				</Grid>
			);
		}

		return result;
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (alignment === 'body') {
			blogSearch({ search: e.target.searchText.value }).then(data => {
				if (data.length === 0) {
					setSearched([]);
				} else {
					setSearched(data);
				}
			});
		} else {
			unBlogSearch({ username: e.target.searchText.value }).then(data => {
				if (data.length === 0) {
					setSearched([]);
				} else {
					setSearched(data);
				}
			});
		}
	};

	// 페이지네이션 관리
	const handlePagination = useCallback(() => {
		const handlePage = (_, value) => {
			setPage(value);
			window.scrollTo({ top: 0, behavior: 'smooth' });
		};

		return (
			<Pagination
				page={page}
				count={searched.length ? Math.ceil(searched.length / 4) : 1}
				color="numbering"
				onChange={handlePage}
			/>
		);
	}, [page, searched]);

	// 검색 카테고리 관리
	const handleToggleBtn = useCallback(() => {
		const handleToggle = (_, newAlignment) => {
			setAlignment(newAlignment);
		};

		return (
			<ToggleButtonGroup
				size="large"
				color="primary"
				value={alignment}
				exclusive
				onChange={handleToggle}
				sx={{ display: 'flex', justifyContent: 'center' }}
			>
				<ToggleButton value="body" sx={{ fontSize: '1.2em' }}>
					본문 / 제목 / 소개글
				</ToggleButton>
				<ToggleButton value="username" sx={{ fontSize: '1.2em' }}>
					작성자
				</ToggleButton>
			</ToggleButtonGroup>
		);
	}, [alignment]);

	return (
		<Body maxWidth="lg">
			<Stack direction="column" spacing={2} sx={{ marginBottom: 10 }}>
				{handleToggleBtn()}
				<Paper
					component="form"
					onSubmit={handleSubmit}
					sx={{
						p: '2px 4px',
						display: 'flex',
						alignItems: 'center',
						width: matches ? 300 : 500,
						height: matches ? 50 : 70,
					}}
				>
					<InputBase
						autoFocus
						sx={{ fontSize: matches ? '1.2em' : '2.5em', ml: 1, flex: 1 }}
						placeholder="검색어를 입력해주세요"
						name="searchText"
						inputProps={{ 'aria-label': '검색어를 입력해주세요' }}
					/>
					<Tooltip title="클릭" arrow>
						<IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
							<SearchIcon color="primary" fontSize="large" />
						</IconButton>
					</Tooltip>
				</Paper>

				<Typography fontSize="large">
					총 <b>{searched.length}개</b>의 포스트를 찾았습니다
				</Typography>
			</Stack>

			<Grid container spacing={2}>
				{searchedList(searched, 4 * page - 4, 4 * page)}
			</Grid>

			<Stack spacing={2} sx={{ marginTop: 4 }}>
				{handlePagination()}
			</Stack>
		</Body>
	);
}

export default SearchBlog;
