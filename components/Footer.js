import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import useMediaQuery from '@mui/material/useMediaQuery';
import SearchIcon from '@mui/icons-material/Search';
import TagIcon from '@mui/icons-material/Tag';

function Footer({ title, description }) {
	const [start, setStart] = useState(false);

	useEffect(() => {
		setStart(true);
	}, []);

	const matches = useMediaQuery('(max-width: 500px)', { noSsr: true });
	const [dial, setDial] = useState(false);
	const router = useRouter();

	const handleSpeedDial = useCallback(() => {
		const handleOpen = () => {
			setDial(true);
		};

		const handleClose = () => {
			setDial(false);
		};

		const handleRouter = key => () => {
			if (key === 'tag') {
				router.push('/tags/list');
			} else {
				router.push('/blogs/search');
			}
		};

		const actions = [
			{ icon: <TagIcon />, name: '태그 검색', route: 'tag' },
			{ icon: <SearchIcon />, name: '포스트 검색', route: 'post' },
		];

		return (
			<Box sx={{ flexGrow: 1 }}>
				<SpeedDial
					ariaLabel="speed dial (min-width 500px)"
					sx={{ position: 'fixed', bottom: 16, right: 16 }}
					icon={<SpeedDialIcon />}
					onClose={handleClose}
					onOpen={handleOpen}
					open={dial}
				>
					{actions.map(action => (
						<SpeedDialAction
							key={action.name}
							icon={action.icon}
							tooltipTitle={action.name}
							onClick={handleRouter(action.route)}
						/>
					))}
				</SpeedDial>
			</Box>
		);
	}, [dial, router]);

	return (
		<>
			{start && (
				<Box
					component="footer"
					sx={{
						bgcolor: 'background.paper',
						py: 3,
						mt: 2,
					}}
				>
					<Container maxWidth="lg">
						<Typography
							component="h2"
							variant="h6"
							align="center"
							sx={{ userSelect: 'none' }}
						>
							{title}
						</Typography>
						<Box sx={{ display: 'flex', justifyContent: 'center' }}>
							<Link href="https://github.com/po4tion/devblog" passHref>
								<a target="_blank">
									<IconButton
										type="button"
										sx={{ p: '10px' }}
										aria-label="githubURL"
									>
										<GitHubIcon fontSize="large" />
									</IconButton>
								</a>
							</Link>
						</Box>
						<Typography
							variant="subtitle1"
							align="center"
							color="text.secondary"
							component="p"
							sx={{ userSelect: 'none' }}
						>
							{description}
						</Typography>
						<Typography
							component="p"
							variant="body2"
							color="text.secondary"
							align="center"
							sx={{ userSelect: 'none' }}
						>
							{'Copyright © '}
							{title}&nbsp;
							{new Date().getFullYear()}
							{'.'}
						</Typography>
					</Container>
					{matches && handleSpeedDial()}
				</Box>
			)}
		</>
	);
}

export default Footer;
