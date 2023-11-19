import { Box, CardContent, LinearProgress, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { mobileState } from "../../../atoms/atom.mediaQuery";
import { globalState } from "../../../atoms/atom.userInfo";

function ProfileContent() {
  const { query } = useRouter();
  const [global, setGlobal] = useRecoilState(globalState);
  const mobile = useRecoilValue(mobileState);
  const { user } = query;

  useEffect(() => {
    if (!global) {
      const _global = JSON.parse(sessionStorage.getItem("global") as string);

      setGlobal(_global);
    }
  }, [global, setGlobal]);

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
          <Typography variant={mobile ? "h6" : "h5"}>{user}</Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Image
            src="/steam.png"
            width={30}
            height={30}
            quality={100}
            alt="스팀 사진"
          />
          <Typography variant={mobile ? "h6" : "h5"}>{global?.name}</Typography>
        </Box>
      </CardContent>
    </>
  );
}

export default ProfileContent;
