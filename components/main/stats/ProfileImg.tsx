import { CardMedia } from "@mui/material";
import Image from "next/image";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { profileUrlState } from "../../../atoms/atom.userInfo";

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

export default ProfileImg;
