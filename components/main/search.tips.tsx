import { Box, Grid, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useRecoilValue } from "recoil";
import { lengthState, emailState } from "../../atoms/atom.searchTips";
import Link from "../../src/Link";

function SearchTips() {
  const tipsLengthState = useRecoilValue(lengthState);
  const tipsEmailState = useRecoilValue(emailState);

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
        <Typography color={tipsLengthState ? "#959595" : "#F44336"}>
          &middot; ID는 최소 4자, 최대 16자 입니다.
          {tipsLengthState ? null : (
            <CheckIcon color="warning" sx={{ fontSize: "14px" }} />
          )}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography color={tipsEmailState ? "#959595" : "#F44336"}>
          &middot; ID는 이메일 주소가 아닙니다.
          {tipsEmailState ? null : (
            <CheckIcon color="warning" sx={{ fontSize: "14px" }} />
          )}
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
