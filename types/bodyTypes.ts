import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Breakpoint } from "@mui/material";

export interface flexBodyType {
  children: ReactJSXElement[] | ReactJSXElement;
  mw: Breakpoint;
  jc: string;
}

export interface sideBodyType {
  children: ReactJSXElement[] | ReactJSXElement;
  mw: Breakpoint;
}
