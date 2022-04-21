import { Skeleton } from "@mui/material";

function Skeletons({ w, h }: { w: string; h: string }) {
  return (
    <Skeleton
      variant="rectangular"
      width={w}
      height={h}
      sx={{ bgcolor: "#ffffff" }}
    />
  );
}

export default Skeletons;
