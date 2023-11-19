import { useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { mobileState, tabletState } from "../atoms/atom.mediaQuery";
import {
  Match,
  Rank,
  SideBody,
  UserInfoHeader,
  UserStats,
} from "../components";

function User() {
  const [tablet, setTablet] = useRecoilState(tabletState);
  const [mobile, setMobile] = useRecoilState(mobileState);
  /**
   * * is mobile : state TRUE, is not mobile : state FALSE
   */
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"), { noSsr: true });
  const isMobile = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });

  useEffect(() => {
    if (isTablet) {
      setTablet(true);
    } else {
      setTablet(false);
    }
  }, [isTablet, setTablet]);

  useEffect(() => {
    if (isMobile) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [isMobile, setMobile]);

  return (
    <SideBody mw={mobile ? "sm" : tablet ? "md" : "lg"}>
      <UserInfoHeader />
      <UserStats />
      <Rank />
      <Match />
    </SideBody>
  );
}

export default User;
