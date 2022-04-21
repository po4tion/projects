import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { globalState } from "../../../atoms/atom.userInfo";

function Rank() {
  const global = useRecoilValue(globalState);

  console.log(global);
  console.log(global?.rank.rankedSeason);
  return (
    <Box height={"300px"} my={15}>
      {global ? (
        <Box
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          gap={5}
        >
          <Typography variant="h4">시즌 12 스플릿 2</Typography>
          <Box
            display={"flex"}
            width="50%"
            alignItems={"center"}
            justifyContent={"space-around"}
          >
            <Box textAlign={"center"}>
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
              <Typography>{global.rank.rankScore}</Typography>
            </Box>
            <Box textAlign={"center"}>
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
              <Typography>{global.arena.rankScore}</Typography>
            </Box>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}

export default Rank;
