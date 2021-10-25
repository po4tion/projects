import Link from 'next/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Header() {
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
				<Typography
					align="center"
					component="h2"
					noWrap
					variant="h4"
					sx={{ fontWeight: 'bold' }}
				>
					{process.env.APP_NAME}
				</Typography>
				<Link href="/signin" passHref>
					<Button color="primary" variant="contained" size="medium">
						로그인
					</Button>
				</Link>
			</Toolbar>
		</>
	);
}

export default Header;
