import { Grid, Typography } from "@mui/material";
import Link from "../../src/Link";

function SearchTips() {
  return (
    <Grid
      container
      rowSpacing={1}
      mt="10px"
      p="20px 30px"
      width="600px"
      sx={{ userSelect: "none" }}
    >
      <Grid item xs={12}>
        <Typography color="#959595">
          &middot; ID는 최소 4자, 최대 16자 입니다.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography color="#959595">
          &middot; ID는 이메일 주소가 아닙니다.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography color="#959595">
          &middot; ID를 모르실 경우,{" "}
          <Link
            href="https://www.origin.com/kor/ko-kr/store"
            color="secondary"
            underline="none"
            target="_blank"
            rel="noopener noreferrer"
          >
            Origin
          </Link>{" "}
          또는{" "}
          <Link
            href="https://www.ea.com/ko-kr"
            color="secondary"
            underline="none"
            target="_blank"
            rel="noopener noreferrer"
          >
            EA
          </Link>
          에서 확인할 수 있습니다.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default SearchTips;
