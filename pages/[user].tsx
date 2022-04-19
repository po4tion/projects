import { useRouter } from "next/router";

function User() {
  const router = useRouter();
  const { pid } = router.query;

  return <div>하이 : {pid}</div>;
}

export default User;
