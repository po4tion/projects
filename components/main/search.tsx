import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { Box, Fade, IconButton, Input, Skeleton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SearchTips from "./search.tips";
import debounce from "lodash/debounce";
import { checkLength, checkEmail } from "../../utils/validation";
import { useSetRecoilState } from "recoil";
import { lengthState, emailState } from "../../atoms/atom.searchTips";
import { useUser, useProfileImg } from "../../hooks/useApex";
import { profileUrlState, userState } from "../../atoms/atom.userInfo";
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
  const [originId, setOriginId] = useState<string | null>(null);
  const [startFetch, setStartFetch] = useState(false);
  const setLengthState = useSetRecoilState(lengthState);
  const setEmailState = useSetRecoilState(emailState);

  const { user } = useUser(originId as string, startFetch);
  const { url } = useProfileImg(originId as string, startFetch);
  const setUserInfo = useSetRecoilState(userState);
  const setProfileUrl = useSetRecoilState(profileUrlState);

  const router = useRouter();

  useEffect(() => {
    let next = false;

    if (user && url) {
      setUserInfo(user);
      setProfileUrl(url);
      next = !next;
    }

    if (next) {
      router.push(`/${originId}`);
    }
  }, [user, url, setUserInfo, setProfileUrl, originId, router]);

  const validation = (): boolean => {
    const resultLength = checkLength(originId as string);
    const resultEmail = checkEmail(originId as string);

    setLengthState(resultLength);
    setEmailState(resultEmail);

    return resultLength && resultEmail;
  };

  const debounceChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setOriginId(e.target.value);
  }, 200);

  const enterSearch = debounce((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      validation();
    }
  }, 200);

  const clickIcon = () => {
    const result = validation();

    if (result) {
      setStartFetch(true);
    }
  };

  return (
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
