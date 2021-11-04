import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Footer({ title, description }) {
	return (
		<>
			<Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
				<Container maxWidth="lg">
					<Typography
						component="h2"
						variant="h6"
						align="center"
						gutterBottom
						sx={{ userSelect: 'none' }}
					>
						{title}
					</Typography>
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
