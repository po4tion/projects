import { Box, Card } from "@mui/material";
import Clubs from "./Clubs";
import LiveContent from "./LiveContent";
import PredatorLimit from "./PredatorLimit";
import ProfileContent from "./ProfileContent";
import ProfileImg from "./ProfileImg";

function UserStats() {
  return (
    <Box display={"flex"} justifyContent={"space-between"}>
      <Box>
        <Card
          raised
          sx={{
            width: "800px",
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
              {ProfileImg()}
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
              >
                {ProfileContent()}
              </Box>
            </Box>
            {Clubs()}
          </Box>
        </Card>
        {PredatorLimit()}
      </Box>
      <Card raised sx={{ width: "250px" }}>
        {LiveContent()}
      </Card>
    </Box>
  );
}

export default UserStats;
