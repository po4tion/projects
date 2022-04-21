import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { clubState } from "../../../atoms/atom.userInfo";

function Clubs() {
  const [club, setClub] = useRecoilState(clubState);

  useEffect(() => {
    if (!club) {
      const _club = JSON.parse(sessionStorage.getItem("club") as string);

      setClub(_club);
    }
  }, [club, setClub]);

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      width="200px"
    >
      {club?.id ? (
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

export default Clubs;
