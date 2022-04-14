import { Box } from "@mui/material";
import styles from "../../styles/textSlicer.module.scss";

function Header({ name }: { name: string }) {
  const textEffect = () => {
    const result = [];

    for (let i = 0; i < 40; i++) {
      result.push(<div className={styles.text}>{name}</div>);
    }

    return result;
  };

  return (
    <Box
      className={styles.body}
      sx={{ border: "1px solid black", width: "100%" }}
    >
      <Box className={styles.ui}>{textEffect()}</Box>
    </Box>
  );
}

export default Header;
