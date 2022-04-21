import { Box } from "@mui/material";
import { Body, UserInfoHeader, UserStats } from "../components";

function User() {
  return (
    <Body mw="lg">
      <Box>
        <UserInfoHeader />
        <UserStats />
      </Box>
    </Body>
  );
}

export default User;
