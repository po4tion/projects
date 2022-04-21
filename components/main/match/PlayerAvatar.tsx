import { Avatar, ListItemAvatar } from "@mui/material";
import Image from "next/image";

function PlayerAvatar({ iconUrl }: { iconUrl: string }) {
  return (
    <ListItemAvatar sx={{ height: "100%" }}>
      <Avatar
        variant="rounded"
        sx={{
          bgcolor: "#ffffff",
          position: "relative",
          width: "10rem",
          height: "10rem",
        }}
      >
        <Image
          src={iconUrl}
          width={160}
          height={160}
          quality={100}
          alt="테스트 사진"
        />
      </Avatar>
    </ListItemAvatar>
  );
}

export default PlayerAvatar;
