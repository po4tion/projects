export const kdAverage = (kills: string, damage: string): number => {
  const result = +damage.replaceAll(",", "") / +kills.replaceAll(",", "");

  return Math.round(result);
};
