/* 
	Connect: user/crud/bookmark.js
*/

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getBookmarkList, removeBookmarked } from '/actions/handleBookmark';
import { isAuth } from '/actions/handleAuth';

// MUI
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import { Body } from '/components';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';

function BookmarkManagement() {
	const [bookmark, setBookmark] = useState([]);
	const [msg, setMsg] = useState('북마크를 불러오는 중입니다');
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(0);
	const [removed, setRemoved] = useState(false);
	const matches = useMediaQuery('(max-width: 500px)', { noSsr: true });

	useEffect(() => {
		isAuth() &&
			getBookmarkList(isAuth().email).then(data => {
				if (data.error === null) {
					setSize(0);
					setBookmark([]);
				} else {
					setSize(data.length);
					setBookmark(data);
					setMsg('등록된 북마크가 없습니다');
				}
			});
	}, [removed]);

	// 북마크 등록 & 취소
	const handleBookmark = bookmark => {
		const handleDelete = slug => {
			removeBookmarked(isAuth().email, slug).then(data => {
				setRemoved(r => !r);
			});
		};

		return bookmark.map((bm, idx) => {
			return (
				<ListItem
					divider
					key={idx}
					secondaryAction={
						<Tooltip title="삭제하기" arrow>
							<IconButton
								edge="end"
								aria-label="delete"
								onClick={() => handleDelete(bm.slug)}
							>
								<DeleteIcon
									color="primary"
									fontSize="large"
									sx={{
										transition: 0.5,
										'&:active': {
											transform: 'scale(0.9)',
										},
									}}
								/>
							</IconButton>
						</Tooltip>
					}
					sx={{
						transition: 0.5,
						'&:hover': {
							transform: 'scale(1.05)',
						},
					}}
				>
					<ListItemAvatar>
						<Avatar
							variant="rounded"
							sx={{
								position: 'relative',
								width: 48,
								height: 48,
								border: '1px solid lightgray',
							}}
						>
							<Image
								layout="fill"
								objectFit="cover"
								quality={100}
								src={`${
									process.env.NEXT_PUBLIC_API
								}/api/blog/photo/${encodeURIComponent(bm.slug)}`}
								alt="thumbnail image"
							/>
						</Avatar>
					</ListItemAvatar>

					<Link href={`/blogs/${encodeURIComponent(bm.slug)}`} passHref>
						<ListItemText
							primary={bm.title}
							primaryTypographyProps={{ fontSize: '1.5em' }}
							secondary={bm.postedBy.username}
							secondaryTypographyProps={{ fontSize: '1.1em' }}
							sx={{
								width: 350,
								userSelect: 'none',
							}}
						/>
					</Link>
				</ListItem>
			);
		});
	};

	// 페이지네이션 설정
	const handlePagination = useCallback(() => {
		const handleChange = (_, value) => {
			setPage(value);

			window.scrollTo({ top: 0, behavior: 'smooth' });
		};

		return (
			<Pagination
				page={page}
				count={size ? Math.ceil(size / 5) : 1}
				color="numbering"
				onChange={handleChange}
			/>
		);
	}, [page, size]);

	return (
		<>
			<Body maxWidth="md">
				{bookmark.length !== 0 && (
					<List sx={{ width: matches ? 400 : '100%' }}>
						{handleBookmark(bookmark.slice(page * 5 - 5, page * 5))}
					</List>
				)}
				{size === 0 && (
					<Alert sx={{ mb: 4 }} severity="info">
						{msg}
					</Alert>
				)}
				<Stack sx={{ mt: 2 }}>{handlePagination()}</Stack>
			</Body>
		</>
	);
}

export default BookmarkManagement;
