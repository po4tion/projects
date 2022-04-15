import { Box } from "@mui/material";
import styles from "../../styles/textSlicer.module.scss";

function Header({ name }: { name: string }) {
  const textEffect = () => {
    const result = [];

    for (let i = 0; i < 40; i++) {
      result.push(
        <div key={i} className={styles.text}>
          {name}
        </div>
      );
    }

    return result;
  };

  return (
    <Box className={styles.body} width={"100%"} sx={{ userSelect: "none" }}>
      <Box className={styles.ui}>{textEffect()}</Box>
    </Box>
  );
}

export default Header;
