import { Box } from "@mui/material";
import Image from "next/image";
import { useSetRecoilState } from "recoil";
import { profileUrlState, userState } from "../../atoms/atom.userInfo";
import HelpIcon from "@mui/icons-material/Help";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";

function HeaderBox() {
  return (
    <Box
      py={2}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      {HeaderLogo()}
      {HelpBtn()}
    </Box>
  );
}

function HeaderLogo() {
  const router = useRouter();
  const setUserInfo = useSetRecoilState(userState);
  const setProfileUrl = useSetRecoilState(profileUrlState);

  const goHome = () => {
    /**
     ** recoil value clear
     */
    setUserInfo({});
    setProfileUrl(null);

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

function HelpBtn() {
  return (
    <IconButton edge="end" color="primary">
      <HelpIcon color="primary" fontSize="large" />
    </IconButton>
  );
}

function UserInfoHeader() {
  return <>{HeaderBox()}</>;
}

export default UserInfoHeader;
