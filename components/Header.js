import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signoutAxios, isAuth } from '/actions/handleAuth';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import BookIcon from '@mui/icons-material/Book';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import LogoutIcon from '@mui/icons-material/Logout';
import { grey } from '@mui/material/colors';

function Header({ title }) {
	const [start, setStart] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const router = useRouter();

	useEffect(() => {
		setStart(true);
	}, []);

	const sliceFirstUsername = () => {
		const userName = isAuth() && isAuth().username;
		const firstWord = userName.slice(0, 1);

		return firstWord;
	};

	const handleIcon = e => {
		setAnchorEl(e.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleSignOut = () => {
		return signoutAxios(() => router.replace('/signin'));
	};

	const handleMenu = () => {
		return (
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						'& .MuiAvatar-root': {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<Link href="/user/crud/management" passHref>
					<MenuItem>
						<Avatar>
							<BookIcon />
						</Avatar>
						내 블로그
					</MenuItem>
				</Link>

				{isAuth().role === 1 && (
					<Link href="/admin/crud/management" passHref>
						<MenuItem>
							<Avatar>
								<BookIcon />
							</Avatar>
							유저 블로그 관리
						</MenuItem>
					</Link>
				)}

				<Divider />

				<Link href="/admin/contact" passHref>
					<MenuItem>
						<Avatar>
							<ContactSupportIcon />
						</Avatar>
						고객문의
					</MenuItem>
				</Link>

				<Link href="/user/crud/update" passHref>
					<MenuItem>
						<Avatar>
							<SettingsIcon />
						</Avatar>
						설정
					</MenuItem>
				</Link>

				<MenuItem onClick={handleSignOut}>
					<Avatar>
						<LogoutIcon />
					</Avatar>
					로그아웃
				</MenuItem>
			</Menu>
		);
	};

	return (
		<>
			{start && (
				<Toolbar
					sx={{
						bgcolor: grey[100],
						borderBottom: 1,
						borderColor: 'divider',
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<Link href="/" passHref>
						<Tooltip arrow title="홈으로">
							<Typography
								align="center"
								component="h2"
								noWrap
								variant="h4"
								sx={{ userSelect: 'none', fontWeight: 'bold' }}
							>
								{title}
							</Typography>
						</Tooltip>
					</Link>
					<Box sx={{ height: '100%' }}>
						<Link href="/blogs/search" passHref>
							<Tooltip arrow title="검색">
								<IconButton
									type="button"
									sx={{ p: '10px' }}
									aria-label="search"
								>
									<SearchIcon fontSize="large" />
								</IconButton>
							</Tooltip>
						</Link>

						{isAuth() && (
							<Link href="/user/crud/blog" passHref>
								<Button
									color="primary"
									variant="contained"
									size="large"
									sx={{ height: 36, ml: 2 }}
								>
									글쓰기
								</Button>
							</Link>
						)}

						{isAuth() && (
							<Tooltip arrow title="클릭해주세요" sx={{ ml: 2 }}>
								<IconButton onClick={handleIcon} size="small">
									<Avatar
										sx={{
											width: 36,
											height: 36,
										}}
									>
										{sliceFirstUsername()}
									</Avatar>
								</IconButton>
							</Tooltip>
						)}
						{isAuth() && handleMenu()}

						{!isAuth() && (
							<Link href="/signin" passHref>
								<Button color="primary" variant="contained" size="medium">
									로그인
								</Button>
							</Link>
						)}
					</Box>
				</Toolbar>
			)}
		</>
	);
}

export default Header;
