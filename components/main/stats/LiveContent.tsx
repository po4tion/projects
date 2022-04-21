import { Box, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { legendsState, realtimeState } from "../../../atoms/atom.userInfo";

function HandleInGame(
  state: string,
  currentStateSecsAgo: number,
  iconUrl: string
) {
  let _state: string | null = null;
  let _time: string | null = null;

  if (state === "inMatch") {
    _state = "매치중";
    _time = `${currentStateSecsAgo}초 전`;
  } else if (state === "inLobby") {
    _state = "로비";
    _time = `${currentStateSecsAgo}초 전`;
  } else {
    _state = "오프라인";
    _time = "0초";
  }

  return (
    <Box display={"flex"} flexDirection={"column"} gap={1}>
      <Image
        src={iconUrl}
        width={250}
        height={250}
        quality={100}
        priority
        alt="선택된 레전드 사진"
      />
      <Typography>인게임 현황: {_state}</Typography>
      <Typography>인게임 시간: {_time}</Typography>
    </Box>
  );
}

/**
 ** inMatch, offline, inLobby
 */
function LiveContent() {
  const [realtime, setRealtime] = useRecoilState(realtimeState);
  const [legends, setLegends] = useRecoilState(legendsState);

  useEffect(() => {
    if (!realtime) {
      const _realtime = JSON.parse(
        sessionStorage.getItem("realtime") as string
      );

      setRealtime(_realtime);
    }
  }, [realtime, setRealtime]);

  useEffect(() => {
    if (!legends) {
      const _legends = JSON.parse(sessionStorage.getItem("legends") as string);

      setLegends(_legends);
    }
  }, [legends, setLegends]);

  const on = "#85FFBD";
  const off = "#FF0000";
  let type = off;

  if (realtime) {
    type = realtime.currentState === "offline" ? off : on;
  }

  return (
    <CardContent
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Box
          mr={1}
          width={"1rem"}
          height={"1rem"}
          bgcolor={`${type}`}
          boxShadow={`0 0 10px ${type}, 0 0 40px ${type}, 0 0 80px ${type}`}
          borderRadius={"50%"}
        ></Box>
        <Typography>{type === on ? "접속중" : "접속해제"}</Typography>
      </Box>
      {realtime && legends
        ? HandleInGame(
            realtime?.currentState,
            realtime?.currentStateSecsAgo,
            legends?.selected?.ImgAssets?.icon
          )
        : null}
    </CardContent>
  );
}

export default LiveContent;
