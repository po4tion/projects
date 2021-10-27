import Link from 'next/link';
import Router from 'next/router';
import { signoutAxios, isAuth } from '/actions/auth';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Header() {
	const onClick = () => signoutAxios(() => Router.replace('/signin'));

	return (
		<>
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
						{process.env.APP_NAME}
					</Typography>
				</Link>
				{!isAuth() && (
					<Link href="/signin" passHref>
						<Button color="primary" variant="contained" size="medium">
							로그인
						</Button>
					</Link>
				)}
				{isAuth() && (
					<Button
						onClick={onClick}
						color="primary"
						variant="contained"
						size="medium"
					>
						로그아웃
					</Button>
				)}
			</Toolbar>
		</>
	);
}

export default Header;
