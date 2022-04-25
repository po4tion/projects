import { Avatar, ListItemAvatar } from "@mui/material";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { mobileState } from "../../../atoms/atom.mediaQuery";
import { iconAvatarType } from "../../../types/matchTypes";

function PlayerAvatar({ iconUrl }: iconAvatarType) {
  const mobile = useRecoilValue(mobileState);

  return (
    <ListItemAvatar
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Avatar
        variant="rounded"
        sx={{
          bgcolor: "#ffffff",
          position: "relative",
          width: mobile ? "5rem" : "10rem",
          height: mobile ? "5rem" : "10rem",
        }}
      >
        <Image
          src={iconUrl}
          layout="fill"
          objectFit="fill"
          quality={100}
          alt="테스트 사진"
        />
      </Avatar>
    </ListItemAvatar>
  );
}

export default PlayerAvatar;
