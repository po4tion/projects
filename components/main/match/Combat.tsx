import { Box, Typography } from "@mui/material";
import { combatType } from "../../../types/matchTypes";

function Combat({ damage, kill }: combatType) {
  return (
    <Box>
      <Typography variant="h5">총 전투력</Typography>
      <Typography>피해 {damage || 0} </Typography>
      <Typography>사살 {kill}</Typography>
    </Box>
  );
}

export default Combat;
