import { Box, Card } from "@mui/material";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { globalState, kdState } from "../../../atoms/atom.userInfo";
import Kd from "./Kd";
import PredatorPlayers from "./PredatorPlayers";
import RankContent from "./RankContent";

function Rank() {
  const global = useRecoilValue(globalState);
  const [kd, setKd] = useRecoilState(kdState);

  useEffect(() => {
    if (!kd) {
      const _kd = JSON.parse(sessionStorage.getItem("kd") as string);

      setKd(_kd);
    }
  }, [kd, setKd]);

  return (
    <Box display={"flex"} my={10} justifyContent={"space-between"}>
      <Box
        display={"flex"}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
        width={"100%"}
      >
        <Card raised sx={{ width: "250px" }}>
          {global ? <RankContent global={global} /> : null}
        </Card>
        <Box>
          <Card raised sx={{ width: "800px", height: "200px" }}>
            {kd ? <Kd kd={kd} /> : null}
          </Card>
          <PredatorPlayers />
        </Box>
      </Box>
    </Box>
  );
}

export default Rank;
