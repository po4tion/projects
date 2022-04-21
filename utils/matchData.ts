/* eslint-disable @typescript-eslint/no-explicit-any */
import { dateFormat } from "./dateFormat";

export const getData = (matches: any[]) => {
  const store = matches?.map((match) => {
    const { metadata, matches, stats } = match;

    const items = {
      recordDate: dateFormat(metadata.startDate.value),
      iconUrl: matches[0].metadata.legendPortraitImageUrl.value,
      color: matches[0].metadata.legendColor.value,
      rankUrl: matches[0].stats.rankScore.metadata.rankScoreInfo.image,
      arenaRankUrl:
        matches[0].stats.arenaRankScore.metadata.arenaRankScoreInfo.image,
      id: matches[0].id,
      kill: stats.kills.value,
      damage: stats.damage?.value,
      score: stats.rankScore.value,
      arenaScore: stats.arenaRankScore.value,
      scoreChange: stats.rankScoreChange.value,
      arenaScoreChange: stats.arenaRankScoreChange.value,
    };

    return items;
  });

  return store;
};
