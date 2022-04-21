import { Box, CircularProgress } from "@mui/material";

function LoadingProgress() {
  return (
    <Box position="absolute" right="1rem" bottom="1rem">
      <CircularProgress color="secondary" size={50} />
    </Box>
  );
}

export default LoadingProgress;
