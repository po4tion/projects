import { atom } from "recoil";

export const mobileState = atom<boolean>({
  key: "mobileState",
  default: false,
});

export const tabletState = atom<boolean>({
  key: "tabletState",
  default: false,
});
