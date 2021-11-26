import Link from 'next/link';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer({ title, description }) {
	return (
		<>
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
			</Box>
		</>
	);
}

export default Footer;
