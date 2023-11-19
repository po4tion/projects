import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
	palette: {
		primary: {
			main: '#556cd6',
		},
		secondary: {
			main: '#19857b',
		},
		error: {
			main: red.A400,
		},
		write: {
			main: '#2196f3',
			contrastText: '#fff',
		},
		numbering: {
			main: '#ff5252',
			contrastText: '#fff',
		},
		mark: {
			main: '#ff9800',
			contrastText: '#ff9800',
		},
		tagChip: {
			main: '#2196f3',
			contrastText: '#2196f3',
		},
	},
	typography: {
		fontFamily: 'Nanum Gothic',
	},
});

export default theme;
