import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { signoutAxios, isAuth } from '/actions/handleAuth';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

function Header({ title }) {
	const [start, setStart] = useState(false);

	useEffect(() => {
		setStart(true);
	}, []);

	const onClick = () => signoutAxios(() => Router.replace('/signin'));

	return (
		<>
			{start && (
				<Toolbar
					sx={{
						borderBottom: 1,
						borderColor: 'divider',
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<Link href="/" passHref>
						<Typography
							align="center"
							component="h2"
							noWrap
							variant="h4"
							sx={{ userSelect: 'none', fontWeight: 'bold' }}
						>
							{title}
						</Typography>
					</Link>
					<Box sx={{ height: '100%' }}>
						<Link href="/blogs/search" passHref>
							<IconButton type="button" sx={{ p: '10px' }} aria-label="search">
								<SearchIcon fontSize="large" />
							</IconButton>
						</Link>
						{!isAuth() && (
							<Link href="/signin" passHref>
								<Button color="primary" variant="contained" size="medium">
									로그인
								</Button>
							</Link>
						)}
						{isAuth() && isAuth().role === 1 && (
							<Link href="/admin" passHref>
								<Button color="primary" variant="contained" size="medium">
									{`${isAuth().username}님`}
								</Button>
							</Link>
						)}
						{isAuth() && isAuth().role === 0 && (
							<Link href="/user" passHref>
								<Button color="primary" variant="contained" size="medium">
									{`${isAuth().username}님`}
								</Button>
							</Link>
						)}
						{isAuth() && (
							<Link href="/deleteAccount" passHref>
								<Button
									color="primary"
									variant="contained"
									size="medium"
									sx={{ ml: 0.5 }}
								>
									회원탈퇴
								</Button>
							</Link>
						)}
						{isAuth() && (
							<Button
								onClick={onClick}
								color="primary"
								variant="contained"
								size="medium"
								sx={{ ml: 0.5 }}
							>
								로그아웃
							</Button>
						)}
						<Link href="/admin/contact" passHref>
							<Button color="primary" variant="contained" size="medium">
								고객문의
							</Button>
						</Link>
					</Box>
				</Toolbar>
			)}
		</>
	);
}

export default Header;
