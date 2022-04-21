export const dateFormat = (date: string): string => {
  const base = new Date(date);
  const year = base.getFullYear();
  const month = base.getMonth() + 1;
  const day = base.getDate();

  return `${year}년 ${month}월 ${day}일`;
};
