import { useState, useEffect, useCallback } from 'react';
import { Body } from '/components';
import { getTags, searchTag, cleanTagList } from '/actions/handleTag';
import { getCookie, isAuth } from '/actions/handleAuth';
import Link from 'next/link';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList as List } from 'react-window';
import TagIcon from '@mui/icons-material/Tag';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Alert from '@mui/material/Alert';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

function TagList() {
	const [info, setInfo] = useState({
		size: -1,
		tags: [],
		loading: true,
	});
	const [reload, setReload] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [role, setRole] = useState(0);

	useEffect(() => {
		const result = async () => {
			await getTags().then(data => {
				setInfo({
					size: data.size,
					tags: data.docs,
					loading: false,
				});
			});
		};

		result();
	}, [reload]);

	useEffect(() => {
		isAuth() && setRole(isAuth().role);
	}, []);

	const fixedSizeList = useCallback(() => {
		const renderRow = props => {
			const { index, style } = props;

			return (
				<ListItem
					divider
					disablePadding
					style={style}
					key={index}
					component="div"
				>
					<Link
						href={`/tags/${encodeURIComponent(info.tags[index].slug)}`}
						passHref
					>
						<ListItemButton>
							<ListItemText primary={info.tags[index].name} />
						</ListItemButton>
					</Link>
				</ListItem>
			);
		};

		return (
			<List height={600} width={360} itemSize={50} itemCount={info.size}>
				{renderRow}
			</List>
		);
	}, [info]);

	const searchBar = () => {
		const handleSubmit = async e => {
			e.preventDefault();

			setInfo({ ...info, loading: true });

			await searchTag({ name: e.target.searchTag.value }).then(data => {
				setInfo({
					size: data.size,
					tags: data.docs,
					loading: false,
				});
			});
		};

		const handleChange = e => {
			setSearchText(e.target.value);
		};

		return (
			<Paper
				component="form"
				onSubmit={handleSubmit}
				sx={{
					display: 'flex',
					alignItems: 'center',
					width: 360,
					height: 50,
					mb: 2,
				}}
			>
				<InputBase
					autoFocus
					sx={{ ml: 1, flex: 1 }}
					placeholder="검색어를 입력해주세요"
					name="searchTag"
					inputProps={{ 'aria-label': '검색어를 입력해주세요' }}
					onChange={handleChange}
					value={searchText}
				/>
				<Tooltip title="클릭" arrow placement="top">
					<IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
						<SearchIcon color="primary" fontSize="large" />
					</IconButton>
				</Tooltip>
			</Paper>
		);
	};

	const reloadBtn = () => {
		const handleClick = () => {
			setReload(r => !r);
			setSearchText('');
			setInfo({ ...info, loading: true });
		};

		return (
			<Tooltip title="초기화" arrow placement="top">
				<IconButton
					onClick={handleClick}
					type="button"
					sx={{ p: '10px' }}
					aria-label="clean"
				>
					<RestartAltIcon color="primary" />
				</IconButton>
			</Tooltip>
		);
	};

	const cleanBtn = () => {
		const handleClick = () => {
			const token = getCookie('access-token');

			for (let i = 0; i < info.size; i++) {
				cleanTagList({ id: info.tags[i]._id }, token);
			}

			setReload(r => !r);
		};

		return (
			<Tooltip title="태그 리스트 정리" arrow placement="top">
				<IconButton
					onClick={handleClick}
					type="button"
					sx={{ p: '10px' }}
					aria-label="clean"
				>
					<CleaningServicesIcon color="warning" />
				</IconButton>
			</Tooltip>
		);
	};

	return (
		<Body>
			<Box
				sx={{
					width: '100%',
					height: 720,
					maxWidth: 360,
					bgcolor: 'background.paper',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						mb: 2,
					}}
				>
					<TagIcon fontSize="large" />
					<Typography variant="h5">태그 목록</Typography>
					{reloadBtn()}
					{role === 1 && cleanBtn()}
				</Box>

				{searchBar()}
				{info.loading && (
					<Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
						<CircularProgress />
					</Box>
				)}

				{info.size > 0 && info.tags.length !== 0 && fixedSizeList()}
				{info.size === 0 && (
					<Alert severity="info">검색한 단어에 해당하는 태그가 없습니다</Alert>
				)}
			</Box>
		</Body>
	);
}

export default TagList;
