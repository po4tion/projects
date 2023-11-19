/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import { seasonSlice } from "../../../utils/seasonSlice";

function RankContent({ global }: { global: any }) {
  return (
    <CardContent
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography>{seasonSlice(global.rank.rankedSeason)}</Typography>
      <Box width={"130px"} height={"130px"} position={"relative"}>
        <Image
          src={global.rank.rankImg}
          layout="fill"
          objectFit="cover"
          quality={100}
          alt="배틀로얄 랭크 사진"
        />
      </Box>
      <Typography>배틀로얄</Typography>
      <Box width={"120px"} height={"120px"} position={"relative"}>
        <Image
          src={global.arena.rankImg}
          layout="fill"
          objectFit="cover"
          quality={100}
          alt="아레나 랭크 사진"
        />
      </Box>
      <Typography pt={"10px"}>아레나</Typography>
    </CardContent>
  );
}

export default RankContent;
