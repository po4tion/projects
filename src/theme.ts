import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#ff5722",
    },
    error: {
      main: red.A400,
    },
    warning: {
      main: "#F44336",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 800,
      lg: 1200,
      xl: 1600,
    },
  },
});

export default theme;
