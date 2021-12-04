import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

function Body({ children, maxWidth = 'md' }) {
	return (
		<Container component="main" maxWidth={maxWidth}>
			<CssBaseline />
			<Box
				sx={{
					marginTop: 6,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				{children}
			</Box>
		</Container>
	);
}

export default Body;
