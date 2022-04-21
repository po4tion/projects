import { Container } from "@mui/material";
import { sideBodyType } from "../../types/bodyTypes";

function SideBody({ children, mw }: sideBodyType) {
  return (
    <Container maxWidth={mw} sx={{ height: "100vh", minWidth: "1200px" }}>
      {children}
    </Container>
  );
}

export default SideBody;
