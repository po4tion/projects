import { Box, Fade, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { mobileState } from "../../../atoms/atom.mediaQuery";
import { usePredatorLimit } from "../../../hooks/useApex";
import { numberFormat } from "../../../utils/numberFormat";

function PredatorPlayers() {
  const { predator } = usePredatorLimit(true);
  const mobile = useRecoilValue(mobileState);

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      gap={2}
      height={mobile ? "200px" : " 146px"}
    >
      {predator ? (
        <Fade in={predator ? true : false}>
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Typography variant="overline" align="center">
              오늘의 배틀로얄 마스터~프레데터 인원수는{" "}
              {numberFormat(predator.RP.PC.totalMastersAndPreds) || 0}(PC),{" "}
              {numberFormat(predator.RP.PS4.totalMastersAndPreds) || 0}(PS4),{" "}
              {numberFormat(predator.RP.X1.totalMastersAndPreds) || 0}
              (XBOX),{" "}
              {numberFormat(predator.RP.SWITCH.totalMastersAndPreds) || 0}
              (SWITCH)입니다.
            </Typography>
            <Typography variant="overline" align="center">
              오늘의 아레나 마스터~프레데터 인원수는{" "}
              {numberFormat(predator.AP.PC.totalMastersAndPreds) || 0}(PC),{" "}
              {numberFormat(predator.AP.PS4.totalMastersAndPreds) || 0}(PS4),{" "}
              {numberFormat(predator.AP.X1.totalMastersAndPreds) || 0}
              (XBOX),{" "}
              {numberFormat(predator.AP.SWITCH.totalMastersAndPreds) || 0}
              (SWITCH)입니다.
            </Typography>
          </Box>
        </Fade>
      ) : null}
    </Box>
  );
}

export default PredatorPlayers;
