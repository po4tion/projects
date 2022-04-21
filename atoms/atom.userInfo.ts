/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "recoil";

export const userState = atom<any>({
  key: "apexUserState",
  default: null,
});

export const profileUrlState = atom<string | null>({
  key: "profileUrlState",
  default: null,
});
