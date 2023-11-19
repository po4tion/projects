import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { mobileState, tabletState } from "../../../atoms/atom.mediaQuery";
import { rankAvatarType } from "../../../types/matchTypes";

function RankAvatar({ gameMode, rankUrl, score, scoreChange }: rankAvatarType) {
  const tablet = useRecoilValue(tabletState);
  const mobile = useRecoilValue(mobileState);

  const DeviceBox = () => {
    if (mobile) {
      return (
        <>
          <Image
            src={rankUrl}
            width={120}
            height={120}
            quality={100}
            alt={gameMode}
          />
          <Box textAlign={"center"}>
            <Typography variant="inherit">{score}</Typography>
            <Typography variant="inherit">{scoreChange}</Typography>
          </Box>
        </>
      );
    } else {
      return (
        <>
          <Image
            src={rankUrl}
            width={120}
            height={120}
            quality={100}
            alt={gameMode}
          />
          <Box textAlign={"center"}>
            <Typography variant={tablet ? "overline" : "h5"}>
              {gameMode}
            </Typography>
            <Typography variant="inherit">{score}</Typography>
            <Typography variant="inherit">{scoreChange}</Typography>
          </Box>
        </>
      );
    }
  };

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyItems={"center"}
      height={"100%"}
    >
      <DeviceBox />
    </Box>
  );
}

export default RankAvatar;
