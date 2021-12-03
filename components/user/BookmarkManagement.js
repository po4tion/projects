import { useState, useEffect, useCallback } from 'react';
import { Body } from '/components';
import {
	getBookmarkList,
	getBookmarkSize,
	removeBookmarked,
} from '/actions/handleBookmark';
import { isAuth } from '/actions/handleAuth';
import Image from 'next/image';
import Link from 'next/link';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';

function BookmarkManagement() {
	const [bookmark, setBookmark] = useState(undefined);
	const [limit, setLimit] = useState(5);
	const [skip, setSkip] = useState(0);
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(0);
	const [removed, setRemoved] = useState(false);

	useEffect(() => {
		isAuth() &&
			getBookmarkSize(isAuth().email).then(data => {
				setSize(data.size);
			});
	}, [removed]);

	useEffect(() => {
		isAuth() &&
			getBookmarkList(isAuth().email, limit, skip).then(data => {
				setBookmark(data);
			});
	}, [limit, skip, removed]);

	const handleBookmark = useCallback(() => {
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
							sx={{ position: 'relative', width: 48, height: 48 }}
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
	}, [bookmark]);

	const handlePagination = useCallback(() => {
		const handleChange = (_, value) => {
			setPage(value);
			setSkip((value - 1) * limit);
		};

		return (
			<Pagination
				page={page}
				count={size ? Math.ceil(size / limit) : 1}
				color="primary"
				onChange={handleChange}
			/>
		);
	}, [page, size, limit]);

	return (
		<>
			<Body>
				{!bookmark && <CircularProgress sx={{ mb: 4 }} />}
				{bookmark && <List>{handleBookmark()}</List>}
				<Stack>{handlePagination()}</Stack>
			</Body>
		</>
	);
}

export default BookmarkManagement;
