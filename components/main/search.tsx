import { useEffect, useState } from "react";
import { Box, Fade, Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Search() {
  const [appearance, setAppearance] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAppearance(true);
    }, 3500);
  });

  return (
    <Box
      sx={{
        border: "2px solid rgba(245, 67, 67, 0.58)",
        borderRadius: "25px",
        background: "rgba(255, 255, 255, 0.08)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(9px)",
        WebkitBackdropFilter: "blur(9px)",
        padding: "20px 30px",
        width: "600px",
        opacity: appearance ? 1 : 0,
      }}
    >
      {appearance ? (
        <Fade in={appearance}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Input
              placeholder="Origin ID를 입력해주세요"
              sx={{ fontSize: "1.5rem", width: "400px" }}
            />
            <SearchIcon fontSize="large" />
          </Box>
        </Fade>
      ) : (
        <Input sx={{ fontSize: "1.5rem", opacity: 0 }} />
      )}
    </Box>
  );
}

export default Search;
