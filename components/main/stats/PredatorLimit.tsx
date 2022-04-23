import { Box, Fade, Typography } from "@mui/material";
import { usePredatorLimit } from "../../../hooks/useApex";
import { numberFormat } from "../../../utils/numberFormat";

function PredatorLimit() {
  const { predator } = usePredatorLimit(true);

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      gap={2}
      height={"146px"}
    >
      {predator ? (
        <Fade in={predator}>
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Typography variant="overline">
              오늘의 배틀로얄 프레데터 제한컷은{" "}
              {numberFormat(predator.RP.PC.val) || 0}(PC),{" "}
              {numberFormat(predator.RP.PS4.val) || 0}(PS4),{" "}
              {numberFormat(predator.RP.X1.val) || 0}
              (XBOX), {numberFormat(predator.RP.SWITCH.val) || 0}(SWITCH)입니다.
            </Typography>
            <Typography variant="overline">
              오늘의 아레나 프레데터 제한컷은{" "}
              {numberFormat(predator.AP.PC.val) || 0}(PC),{" "}
              {numberFormat(predator.AP.PS4.val) || 0}(PS4),{" "}
              {numberFormat(predator.AP.X1.val) || 0}
              (XBOX), {numberFormat(predator.AP.SWITCH.val) || 0}(SWITCH)입니다.
            </Typography>
          </Box>
        </Fade>
      ) : null}
    </Box>
  );
}

export default PredatorLimit;
