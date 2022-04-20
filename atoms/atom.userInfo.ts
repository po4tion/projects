/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "recoil";

export const userState = atom<any>({
  key: "apexUserState",
  default: {},
});

export const globalState = atom<any>({
  key: "globalState",
  default: {},
});

export const realtimeState = atom<any>({
  key: "realtimeState",
  default: {},
});

export const legendsState = atom<any>({
  key: "legendsState",
  default: {},
});

export const clubState = atom<any>({
  key: "clubState",
  default: {},
});

export const profileUrlState = atom<string | null>({
  key: "profileUrlState",
  default: null,
});
