import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { rankAvatarType } from "../../../types/matchTypes";

function RankAvatar({ gameMode, rankUrl, score, scoreChange }: rankAvatarType) {
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
        alt={gameMode}
      />
      <Box textAlign={"center"}>
        <Typography variant="h5">{gameMode}</Typography>
        <Typography variant="inherit">{score}</Typography>
        <Typography variant="inherit">{scoreChange}</Typography>
      </Box>
    </Box>
  );
}

export default RankAvatar;
