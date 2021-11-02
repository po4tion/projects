import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { signoutAxios, isAuth } from '/actions/handleAuth';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

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
					<Box>
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
									{`${isAuth().name}님`}
								</Button>
							</Link>
						)}
						{isAuth() && isAuth().role === 0 && (
							<Link href="/user" passHref>
								<Button color="primary" variant="contained" size="medium">
									{`${isAuth().name}님`}
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
					</Box>
				</Toolbar>
			)}
		</>
	);
}

export default Header;
