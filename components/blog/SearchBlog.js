import { useState, useCallback } from 'react';
import { blogSearch, unBlogSearch } from '/actions/handleBlog';
import { BlogList } from '/components/blog';
import moment from 'moment';
import 'moment/locale/ko';
import Link from 'next/link';
import { Body } from '/components';

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
import Pagination from '@mui/material/Pagination';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function SearchBlog() {
	const [searched, setSearched] = useState([]);
	const [page, setPage] = useState(1);
	const [alignment, setAlignment] = useState('body');

	const searchedList = (searched, start, end) => {
		const result = [];

		for (let i = start; i < end; i++) {
			if (searched[i] === undefined) {
				break;
			}

			const post = searched[i];

			result.push(
				<Grid
					key={i}
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
				console.log(e.target.searchText.value);
				console.log(data);
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

	const handlePagination = useCallback(() => {
		const handlePage = (_, value) => {
			setPage(value);
		};

		return (
			<Pagination
				page={page}
				count={searched.length ? Math.ceil(searched.length / 4) : 1}
				onChange={handlePage}
			/>
		);
	}, [page, searched]);

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
						width: 500,
						minWidth: 500,
						height: 70,
					}}
				>
					<InputBase
						autoFocus
						sx={{ fontSize: '2.5em', ml: 1, flex: 1 }}
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
