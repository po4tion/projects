import { Box, Typography } from "@mui/material";
import { usePredatorLimit } from "../../../hooks/useApex";

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
      <Typography variant="overline">
        오늘의 배틀로얄 프레데터 제한컷은 {predator?.RP?.PC?.val || 0}(PC),{" "}
        {predator?.RP?.PS4?.val || 0}(PS4), {predator?.RP?.X1?.val || 0}(XBOX),{" "}
        {predator?.RP?.SWITCH?.val || 0}(SWITCH)입니다.
      </Typography>
      <Typography variant="overline">
        오늘의 아레나 프레데터 제한컷은 {predator?.AP?.PC?.val || 0}(PC),{" "}
        {predator?.AP?.PS4?.val || 0}(PS4), {predator?.AP?.X1?.val || 0}(XBOX),{" "}
        {predator?.AP?.SWITCH?.val || 0}(SWITCH)입니다.
      </Typography>
    </Box>
  );
}

export default PredatorLimit;
