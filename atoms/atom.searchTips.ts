import { atom } from "recoil";

export const lengthState = atom<boolean>({
  key: "lengthState",
  default: true,
});

export const emailState = atom<boolean>({
  key: "emailState",
  default: true,
});
