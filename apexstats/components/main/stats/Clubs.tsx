import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { mobileState } from "../../../atoms/atom.mediaQuery";
import { clubState } from "../../../atoms/atom.userInfo";

function Clubs() {
  const [club, setClub] = useRecoilState(clubState);
  const mobile = useRecoilValue(mobileState);

  useEffect(() => {
    if (!club) {
      const _club = JSON.parse(sessionStorage.getItem("club") as string);

      setClub(_club);
    }
  }, [club, setClub]);

  return (
    <Box
      height={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={mobile ? "space-between" : "center"}
      flexDirection={"column"}
      mr={mobile ? 0 : 2}
    >
      {club?.id ? (
        <>
          <Typography variant={mobile ? "h6" : "overline"}>클럽</Typography>
          <Image
            src={club?.logo || process.env.NEXT_PUBLIC_DEFAULT_CLUB_URL}
            width={150}
            height={150}
            quality={100}
            alt="club 사진"
          />
          <Typography>{`[${club?.tag || ""}]${club?.name || ""}`}</Typography>
        </>
      ) : null}
    </Box>
  );
}

export default Clubs;
