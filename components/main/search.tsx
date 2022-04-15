import { ChangeEvent, useEffect, useState } from "react";
import { Box, Fade, IconButton, Input, Skeleton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SearchTips from "./search.tips";

function Skeletons({ w, h }: { w: string; h: string }) {
  return (
    <Skeleton
      variant="rectangular"
      width={w}
      height={h}
      sx={{ bgcolor: "#ffffff" }}
    />
  );
}

function SearchInput({ appearance }: { appearance: boolean }) {
  const [originId, setOriginId] = useState<string | null>(null);

  const handleId = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <Box
      border={"2px solid rgba(245, 67, 67, 0.58)"}
      borderRadius={"25px"}
      boxShadow={"0 4px 30px rgba(0, 0, 0, 0.1)"}
      bgcolor={"rgba(255, 255, 255, 0.08)"}
      p={"15px 30px"}
      width={"600px"}
      sx={{
        backdropFilter: "blur(9px)",
        WebkitBackdropFilter: "blur(9px)",
        opacity: appearance ? 1 : 0,
      }}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Input
          onChange={handleId}
          placeholder="Origin ID를 입력해주세요"
          sx={{ fontSize: "1.5rem", width: "400px" }}
        />
        <IconButton edge="end" color="primary">
          <SearchIcon color="primary" fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
}

function Search() {
  const [appearance, setAppearance] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAppearance(true);
    }, 3500);
  });

  return (
    <>
      {appearance ? (
        <Fade in={appearance}>
          <Box>
            <SearchInput appearance={appearance} />
            <SearchTips />
          </Box>
        </Fade>
      ) : (
        <>
          <Skeletons w="600px" h="85px" />
          <Skeletons w="600px" h="146px" />
        </>
      )}
    </>
  );
}

export default Search;
