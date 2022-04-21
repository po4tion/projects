import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Fade,
  IconButton,
  Input,
  Skeleton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SearchTips from "./SearchTips";
import debounce from "lodash/debounce";
import { checkLength, checkEmail } from "../../utils/validation";
import { useSetRecoilState } from "recoil";
import { lengthState, emailState } from "../../atoms/atom.searchTips";
import { useUser, useProfileImg } from "../../hooks/useApex";
import {
  clubState,
  globalState,
  legendsState,
  profileUrlState,
  realtimeState,
} from "../../atoms/atom.userInfo";
import { useRouter } from "next/router";

function Skeletons({ w, h }: { w: string; h: string }) {
  return (
    <Skeleton
      variant="rectangular"
      width={w}
      height={h}
      sx={{ bgcolor: "#ffffff" }}
    />
  );
}

function SearchInput({ appearance }: { appearance: boolean }) {
  const [originId, setOriginId] = useState<string>("");
  const [startFetch, setStartFetch] = useState(false);
  const setLengthState = useSetRecoilState(lengthState);
  const setEmailState = useSetRecoilState(emailState);

  const { user, isLoading: userLoading } = useUser(
    originId as string,
    startFetch
  );
  const { url } = useProfileImg(originId as string, startFetch);
  const setGlobalState = useSetRecoilState(globalState);
  const setRealtimeState = useSetRecoilState(realtimeState);
  const setLegendsState = useSetRecoilState(legendsState);
  const setClubState = useSetRecoilState(clubState);
  const setProfileUrl = useSetRecoilState(profileUrlState);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    let next = false;

    /**
     ** url type 1. origin url 2. "" string
     */
    if (user && (url || url === "")) {
      setGlobalState(user.global);
      setRealtimeState(user.realtime);
      setLegendsState(user.legends);
      setClubState(user.club);
      setProfileUrl(url);

      sessionStorage.setItem("userinfo", JSON.stringify(user));
      sessionStorage.setItem("global", JSON.stringify(user.global));
      sessionStorage.setItem("realtime", JSON.stringify(user.realtime));
      sessionStorage.setItem("legends", JSON.stringify(user.legends));
      sessionStorage.setItem("club", JSON.stringify(user.club));
      sessionStorage.setItem("profileurl", url);

      next = !next;
    }

    if (next) {
      setLoading(false);
      router.push(`/${encodeURIComponent(originId)}`);
    }
  }, [
    user,
    url,
    setProfileUrl,
    originId,
    router,
    setGlobalState,
    setRealtimeState,
    setLegendsState,
    setClubState,
  ]);

  const validation = (): boolean => {
    const resultLength = checkLength(originId as string);
    const resultEmail = checkEmail(originId as string);

    setLengthState(resultLength);
    setEmailState(resultEmail);

    return resultLength && resultEmail;
  };

  const handleValidation = () => {
    const result = validation();

    if (result) {
      setStartFetch(true);
      setLoading(true);
    }
  };

  const debounceChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setOriginId(e.target.value);
  }, 50);

  const enterSearch = debounce((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleValidation();
    }
  }, 50);

  const clickIcon = () => {
    handleValidation();
  };

  const handleProgress = () => {
    if (loading) {
      return LoadingProgress();
    } else if (!userLoading) {
      return null;
    }
  };

  return (
    <>
      <Box
        border={"2px solid rgba(245, 67, 67, 0.58)"}
        borderRadius={"25px"}
        boxShadow={"0 4px 30px rgba(0, 0, 0, 0.1)"}
        bgcolor={"rgba(255, 255, 255, 0.08)"}
        p={"15px 30px"}
        width={"600px"}
        sx={{
          backdropFilter: "blur(9px)",
          WebkitBackdropFilter: "blur(9px)",
          opacity: appearance ? 1 : 0,
        }}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Input
            onChange={debounceChange}
            onKeyDown={enterSearch}
            placeholder="Origin ID를 입력해주세요"
            sx={{ fontSize: "1.5rem", width: "400px" }}
          />
          <IconButton edge="end" color="primary" onClick={clickIcon}>
            <SearchIcon color="primary" fontSize="large" />
          </IconButton>
        </Box>
      </Box>
      {handleProgress()}
    </>
  );
}

function LoadingProgress() {
  return (
    <Box position="absolute" right="1rem" bottom="1rem">
      <CircularProgress color="secondary" size={50} />
    </Box>
  );
}

function Search() {
  const [appearance, setAppearance] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAppearance(true);
    }, 3500);
  });

  return (
    <>
      {appearance ? (
        <Fade in={appearance}>
          <Box>
            <SearchInput appearance={appearance} />
            <SearchTips />
          </Box>
        </Fade>
      ) : (
        <>
          <Skeletons w="600px" h="85px" />
          <Skeletons w="600px" h="146px" />
        </>
      )}
    </>
  );
}

export default Search;
