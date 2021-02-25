export function ChartDateFunc(result) {
  let year = result.getFullYear();
  let month = result.getMonth();
  let date = result.getDate();

  if (month + 1 < 10) {
    month = '0' + String(month + 1);
  } else {
    month = String(month + 1);
  }

  if (date < 10) {
    date = '0' + String(date);
  } else {
    date = String(date);
  }

  const sum = String(year) + month + date;

  return sum;
}
