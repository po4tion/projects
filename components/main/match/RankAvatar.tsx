import { Box, Typography } from "@mui/material";
import Image from "next/image";

function RankAvatar({
  rankUrl,
  score,
  scoreChange,
}: {
  rankUrl: string;
  score: number;
  scoreChange: number;
}) {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyItems={"center"}
      height={"100%"}
    >
      <Image
        src={rankUrl}
        width={120}
        height={120}
        quality={100}
        alt="테스트 사진2"
      />
      <Box textAlign={"center"}>
        <Typography variant="h5">배틀로얄</Typography>
        <Typography variant="inherit">{score}</Typography>
        <Typography variant="inherit">{scoreChange}</Typography>
      </Box>
    </Box>
  );
}

export default RankAvatar;
