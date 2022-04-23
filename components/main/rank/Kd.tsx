import { Box, CardContent, Typography } from "@mui/material";

function Kd({ kd }: { kd: { kills: string; damage: string } }) {
  return (
    <CardContent
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        height="100%"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
      >
        <Typography variant="h4">총 {kd.kills} 킬</Typography>
        <Typography variant="h4">총 {kd.damage} 데미지</Typography>
      </Box>
    </CardContent>
  );
}

export default Kd;
