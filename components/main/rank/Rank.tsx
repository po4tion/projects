import { Box, Card } from "@mui/material";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { tabletState } from "../../../atoms/atom.mediaQuery";
import { globalState, kdState } from "../../../atoms/atom.userInfo";
import Kd from "./Kd";
import PredatorPlayers from "./PredatorPlayers";
import RankContent from "./RankContent";

function Rank() {
  const global = useRecoilValue(globalState);
  const [kd, setKd] = useRecoilState(kdState);
  const tablet = useRecoilValue(tabletState);

  useEffect(() => {
    if (!kd) {
      const _kd = JSON.parse(sessionStorage.getItem("kd") as string);

      setKd(_kd);
    }
  }, [kd, setKd]);

  return (
    <Box my={10}>
      <Box
        display={"flex"}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
        width={"100%"}
      >
        {tablet ? null : (
          <Card raised sx={{ width: "250px", height: "350px" }}>
            {global ? <RankContent global={global} /> : null}
          </Card>
        )}

        <Box
          width={tablet ? "100%" : "auto"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
        >
          <Card
            raised
            sx={{ width: tablet ? "100%" : "800px", height: "200px" }}
          >
            {kd ? <Kd kd={kd} /> : null}
          </Card>
          <PredatorPlayers />
        </Box>
      </Box>
    </Box>
  );
}

export default Rank;
