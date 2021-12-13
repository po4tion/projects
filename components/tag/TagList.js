/* 
	Connect: tags/list.js
*/

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { getTags, searchTag, cleanTagList } from '/actions/handleTag';
import { getCookie, isAuth } from '/actions/handleAuth';

// MUI
import Alert from '@mui/material/Alert';
import { Body } from '/components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList as List } from 'react-window';
import Paper from '@mui/material/Paper';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from '@mui/icons-material/Search';
import TagIcon from '@mui/icons-material/Tag';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

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

	// react-window 모듈을 사용한 List
	const fixedSizeList = useCallback(() => {
		const renderRow = props => {
			const { index, style } = props;

			return (
				<ListItem
					divider
					disablePadding
					style={style}
					key={info.tags[index].slug}
					component="div"
				>
					<Link
						href={`/tags/${encodeURIComponent(info.tags[index].slug)}`}
						passHref
					>
						<ListItemButton>
							<ListItemText
								primary={info.tags[index].name}
								primaryTypographyProps={{
									fontSize: 20,
								}}
							/>
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

	// 검색어 입력 관리
	const searchBar = useCallback(() => {
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
	}, [info, searchText]);

	// 검색단어와 검색 목록 초기화
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

	// 운영자용 태그 정리 버튼
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
					<Typography variant="h5" sx={{ fontWeight: 'bold' }}>
						태그 목록
					</Typography>
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
