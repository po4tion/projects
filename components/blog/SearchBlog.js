import { useState, useRef, useEffect } from 'react';
import { blogSearch } from '/actions/handleBlog';
import { BlogList } from '/components/blog';
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
import Pagination from '@mui/material/Pagination';
import Divider from '@mui/material/Divider';

function SearchBlog() {
	const [searched, setSearched] = useState([]);
	const [page, setPage] = useState(1);
	const inputRef = useRef();

	const handleBlur = () => {
		inputRef.current.blur();
	};

	useEffect(() => {
		window.addEventListener('scroll', handleBlur);

		return () => {
			window.removeEventListener('scroll', handleBlur);
		};
	});

	const handleChange = async e => {
		await blogSearch({ search: e.target.value }).then(data => {
			if (e.target.value === '') {
				setSearched([]);
			} else {
				setSearched(data);
			}
		});
	};

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

	const handlePage = (_, value) => {
		setPage(value);
	};

	return (
		<Container component="main" maxWidth="md" onScroll={handleBlur}>
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
							inputRef={inputRef}
							onChange={handleChange}
							autoFocus
							sx={{ fontSize: '2.5em', ml: 1, flex: 1 }}
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

				<Grid container spacing={2}>
					{searchedList(searched, 5 * page - 5, 5 * page)}
				</Grid>

				<Stack spacing={2} sx={{ marginTop: 4 }}>
					<Pagination
						page={page}
						count={Math.ceil(searched.length / 5)}
						onChange={handlePage}
					/>
				</Stack>
			</Box>
		</Container>
	);
}

export default SearchBlog;
