import { Box } from "@mui/material";
import Image from "next/image";
import { useSetRecoilState } from "recoil";
import {
  clubState,
  globalState,
  legendsState,
  profileUrlState,
  realtimeState,
} from "../../atoms/atom.userInfo";
import { useRouter } from "next/router";
import HelpModal from "./HelpModal";

function HeaderBox() {
  return (
    <Box
      pt={4}
      pb={10}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <HeaderLogo />
      <HelpModal />
    </Box>
  );
}

function HeaderLogo() {
  const router = useRouter();
  const setGlobalState = useSetRecoilState(globalState);
  const setRealtimeState = useSetRecoilState(realtimeState);
  const setLegendsState = useSetRecoilState(legendsState);
  const setClubState = useSetRecoilState(clubState);
  const setProfileUrl = useSetRecoilState(profileUrlState);

  const goHome = () => {
    /**
     ** recoil value clear
     */
    setGlobalState(null);
    setRealtimeState(null);
    setLegendsState(null);
    setClubState(null);
    setProfileUrl(null);

    sessionStorage.clear();

    router.push("/");
  };

  return (
    <Box onClick={goHome} sx={{ cursor: "pointer" }}>
      <Image
        src="/Logo.png"
        width={300}
        height={60}
        quality={100}
        alt="ApexStats 로고"
      />
    </Box>
  );
}

function UserInfoHeader() {
  return <HeaderBox />;
}

export default UserInfoHeader;
