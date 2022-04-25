import { Box, Card, Grow } from "@mui/material";
import { useRecoilValue } from "recoil";
import { mobileState, tabletState } from "../../../atoms/atom.mediaQuery";
import { clubState, globalState } from "../../../atoms/atom.userInfo";
import RankContent from "../rank/RankContent";
import Clubs from "./Clubs";
import LiveContent from "./LiveContent";
import PredatorLimit from "./PredatorLimit";
import ProfileContent from "./ProfileContent";
import ProfileImg from "./ProfileImg";

function UserStats() {
  const tablet = useRecoilValue(tabletState);
  const club = useRecoilValue(clubState);
  const mobile = useRecoilValue(mobileState);
  const global = useRecoilValue(globalState);

  const DeviceBox = () => {
    if (mobile) {
      return (
        <Grow in={mobile}>
          <Box
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            gap={5}
          >
            {club?.id ? (
              <Card raised sx={{ width: "250px", height: "350px" }}>
                <Clubs />
              </Card>
            ) : null}

            <Card raised sx={{ width: "250px", height: "350px" }}>
              <LiveContent />
            </Card>
            <Card raised sx={{ width: "250px", height: "350px" }}>
              {global ? <RankContent global={global} /> : null}
            </Card>
          </Box>
        </Grow>
      );
    } else if (tablet) {
      return (
        <Grow in={tablet}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-around"}
          >
            <Card raised sx={{ width: "250px", height: "350px" }}>
              <LiveContent />
            </Card>
            <Card raised sx={{ width: "250px", height: "350px" }}>
              {global ? <RankContent global={global} /> : null}
            </Card>
          </Box>
        </Grow>
      );
    } else {
      return (
        <Card raised sx={{ width: "250px" }}>
          <LiveContent />
        </Card>
      );
    }
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      flexDirection={tablet ? "column" : "row"}
    >
      <Box>
        <Card
          raised
          sx={{
            width: tablet ? "100%" : "800px",
            height: "200px",
          }}
        >
          <Box
            display={"flex"}
            height={"100%"}
            width={"100%"}
            justifyContent={"space-between"}
          >
            <Box display={"flex"}>
              <ProfileImg />
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
              >
                <ProfileContent />
              </Box>
            </Box>
            {mobile ? null : <Clubs />}
          </Box>
        </Card>
        <PredatorLimit />
      </Box>

      <DeviceBox />
    </Box>
  );
}

export default UserStats;
