export const seasonSlice = (season: string): string => {
  const currentSeason = season[6] + season[7];
  const currentSplit = season[15];

  return `시즌 ${currentSeason} - 스플릿 ${currentSplit}`;
};
