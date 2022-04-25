import { Container } from "@mui/material";
import { sideBodyType } from "../../types/bodyTypes";

function SideBody({ children, mw }: sideBodyType) {
  return (
    <Container maxWidth={mw} sx={{ minWidth: "500px", height: "100vh" }}>
      {children}
    </Container>
  );
}

export default SideBody;
