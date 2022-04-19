import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Breakpoint, Container } from "@mui/material";

function Body({
  children,
  mw,
}: {
  children: ReactJSXElement[] | ReactJSXElement;
  mw: Breakpoint;
}) {
  return (
    <Container
      maxWidth={mw}
      sx={{ height: "100vh", minWidth: "800px", border: "1px solid black" }}
    >
      {children}
    </Container>
  );
}

export default Body;
