import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Breakpoint, Container } from "@mui/material";

function Body({ children, mw }: { children: ReactJSXElement; mw: Breakpoint }) {
  return (
    <Container maxWidth={mw} sx={{ height: "100vh", minWidth: "800px" }}>
      {children}
    </Container>
  );
}

export default Body;
