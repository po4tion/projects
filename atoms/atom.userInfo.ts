/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "recoil";

export const globalState = atom<any>({
  key: "globalState",
  default: null,
});

export const realtimeState = atom<any>({
  key: "realtimeState",
  default: null,
});

export const legendsState = atom<any>({
  key: "legendsState",
  default: null,
});

export const clubState = atom<any>({
  key: "clubState",
  default: null,
});

export const profileUrlState = atom<string | null>({
  key: "profileUrlState",
  default: null,
});

export const kdState = atom<any>({
  key: "kdState",
  default: null,
});
