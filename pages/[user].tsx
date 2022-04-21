import {
  Match,
  Rank,
  SideBody,
  UserInfoHeader,
  UserStats,
} from "../components";

function User() {
  return (
    <SideBody mw="lg">
      <UserInfoHeader />
      <UserStats />
      <Rank />
      <Match />
    </SideBody>
  );
}

export default User;
