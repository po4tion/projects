import { Box, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { kdAverage } from "../../../utils/kdAverage";

function Kd({ kd }: { kd: { kills: string; damage: string } }) {
  const { query } = useRouter();

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
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Typography variant="h5" align="center">
          {query.user}님은 {kd.kills} 킬을 하셨습니다.
        </Typography>
        <Typography variant="h5" align="center">
          {query.user}님은 {kd.damage} 데미지를 입혔습니다.
        </Typography>
        <Typography variant="h5" align="center">
          {query.user}님은 평균 {kdAverage(kd.kills, kd.damage)} 데미지를
          입혔습니다.
        </Typography>
      </Box>
    </CardContent>
  );
}

export default Kd;
