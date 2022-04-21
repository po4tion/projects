import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Breakpoint, Container } from "@mui/material";

function SideBody({
  children,
  mw,
}: {
  children: ReactJSXElement[] | ReactJSXElement;
  mw: Breakpoint;
}) {
  return (
    <Container maxWidth={mw} sx={{ height: "100vh", minWidth: "1200px" }}>
      {children}
    </Container>
  );
}

export default SideBody;
