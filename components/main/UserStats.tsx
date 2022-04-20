/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { profileUrlState, userState } from "../../atoms/atom.userInfo";
import { usePredatorLimit } from "../../hooks/useApex";

function ProfileImg() {
  const [urls, setUrls] = useRecoilState(profileUrlState);
  const defaultUrl = process.env.NEXT_PUBLIC_DEFAULT_PROFILE_URL as string;

  useEffect(() => {
    if (!urls) {
      const _profileUrl = sessionStorage.getItem("profileurl");

      setUrls(_profileUrl);
    }
  }, [setUrls, urls]);

  return (
    <CardMedia sx={{ display: "flex" }}>
      <Image
        src={urls || defaultUrl}
        width={200}
        height={200}
        alt="프로필 사진"
      />
    </CardMedia>
  );
}

function ProfileContent() {
  const { query } = useRouter();
  const { global } = useRecoilValue(userState);
  const setUserStats = useSetRecoilState(userState);
  const { user } = query;

  useEffect(() => {
    if (!global) {
      const _userInfo = JSON.parse(
        sessionStorage.getItem("userinfo") as string
      );

      setUserStats(_userInfo);
    }
  }, [global, setUserStats]);

  return (
    <>
      <CardContent>
        <Typography variant="h6">Lv. {global?.level}</Typography>
        <LinearProgress
          color="secondary"
          variant="determinate"
          value={global?.toNextLevelPercent || 0}
          sx={{ width: "6rem" }}
        />
      </CardContent>
      <CardContent>
        <Box display={"flex"} alignItems={"center"} gap={1} pb={2}>
          <Image
            src="/origin.png"
            width={30}
            height={30}
            quality={100}
            alt="오리진 사진"
          />
          <Typography variant="h5">{user}</Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Image
            src="/steam.png"
            width={30}
            height={30}
            quality={100}
            alt="스팀 사진"
          />
          <Typography variant="h5">{global?.name}</Typography>
        </Box>
      </CardContent>
    </>
  );
}

/**
 ** inMatch, offline, inLobby
 */
function LiveContent() {
  const { realtime, legends } = useRecoilValue(userState);

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

function Clubs(club: any) {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      width="200px"
    >
      {club ? (
        <>
          <Typography variant="overline">클럽</Typography>
          <Image
            src={club?.logo || process.env.NEXT_PUBLIC_DEFAULT_CLUB_URL}
            width={150}
            height={150}
            quality={100}
            alt="club 사진"
          />
          <Typography>{`[${club?.tag || ""}]${club?.name || ""}`}</Typography>
        </>
      ) : (
        <Typography>클럽이 존재하지 않습니다.</Typography>
      )}
    </Box>
  );
}

function UserStats() {
  const { club } = useRecoilValue(userState);

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
            {Clubs(club)}
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
