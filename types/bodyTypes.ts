import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Breakpoint } from "@mui/material";

export interface flexBodyType {
  children: ReactJSXElement[] | ReactJSXElement | null;
  mw: Breakpoint;
  jc: string;
}

export interface sideBodyType {
  children: ReactJSXElement[] | ReactJSXElement | null;
  mw: Breakpoint;
}
