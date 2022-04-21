import { Container } from "@mui/material";
import { flexBodyType } from "../../types/bodyTypes";

function FlexBody({ children, mw, jc }: flexBodyType) {
  return (
    <Container
      maxWidth={mw}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: jc,
        flexDirection: "column",
        height: "100%",
      }}
    >
      {children}
    </Container>
  );
}

export default FlexBody;
