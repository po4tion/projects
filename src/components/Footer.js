import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Footer({ title, description }) {
	return (
		<>
			<Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
				<Container maxWidth="lg">
					<Typography variant="h6" align="center" gutterBottom>
						{title}
					</Typography>
					<Typography
						variant="subtitle1"
						align="center"
						color="text.secondary"
						component="p"
					>
						{description}
					</Typography>
					<Typography variant="body2" color="text.secondary" align="center">
						{'Copyright © '}
						DEVBLOG&nbsp;
						{new Date().getFullYear()}
						{'.'}
					</Typography>
				</Container>
			</Box>
		</>
	);
}

export default Footer;
