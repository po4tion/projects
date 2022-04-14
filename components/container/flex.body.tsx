import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Breakpoint, Container } from "@mui/material";

function FlexBody({
  children,
  mw,
}: {
  children: ReactJSXElement;
  mw: Breakpoint;
}) {
  return (
    <Container
      maxWidth={mw}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      {children}
    </Container>
  );
}

export default FlexBody;
