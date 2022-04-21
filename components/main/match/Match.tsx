import { Box, List, ListItem, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useMatchHistory } from "../../../hooks/useApex";
import { matchType } from "../../../types/matchTypes";
import { getData } from "../../../utils/matchData";
import { FlexBody } from "../../container";
import Combat from "./Combat";
import PlayerAvatar from "./PlayerAvatar";
import RankAvatar from "./RankAvatar";

function Match() {
  const { query } = useRouter();
  const { matches } = useMatchHistory(
    query.user as string,
    query.user ? true : false
  );
  const data = getData(matches || null);

  return (
    (
      <FlexBody mw="lg" jc="flex-start">
        {data?.map((item: matchType) => (
          <List
            key={item.id}
            sx={{
              borderTop: "2px solid",
              borderColor: item.color,
              borderRadius: "12px",
              width: "100%",
              bgcolor: "#ffffff",
            }}
          >
            <ListItem
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <PlayerAvatar iconUrl={item.iconUrl} />
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={5}
              >
                <RankAvatar
                  gameMode="배틀로얄"
                  rankUrl={item.rankUrl}
                  score={item.score}
                  scoreChange={item.scoreChange}
                />
                <RankAvatar
                  gameMode="아레나"
                  rankUrl={item.arenaRankUrl}
                  score={item.arenaScore}
                  scoreChange={item.arenaScoreChange}
                />
              </Box>
              <Combat damage={item.damage} kill={item.kill} />
              <Box height={"100%"} display={"flex"} alignItems={"flex-end"}>
                <Typography>{item.recordDate}</Typography>
              </Box>
            </ListItem>
          </List>
        ))}
      </FlexBody>
    ) || null
  );
}

export default Match;
