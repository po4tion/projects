import Image from "next/image";
import { useRecoilValue } from "recoil";
import { profileUrlState } from "../../atoms/atom.userInfo";

function UserStats() {
  const urls = useRecoilValue(profileUrlState);
  const defaultUrl = process.env.NEXT_PUBLIC_DEFAULT_PROFILE_URL as string;

  return (
    <Image
      src={urls ? urls : defaultUrl}
      width={200}
      height={200}
      alt="프로필 사진"
    />
  );
}

export default UserStats;
