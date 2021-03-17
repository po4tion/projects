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

// 월별 그래프 월단위 API 입력값
export function ChartMonthFunc() {
  const array = [];

  const dateSet = new Date();
  let yearSet = dateSet.getFullYear();
  const monthSet = dateSet.getMonth();

  // 현재 날짜
  const current =
    String(yearSet) +
    (monthSet + 1 < 10 ? '0' + String(monthSet + 1) : String(monthSet + 1)) +
    (dateSet.getDate() < 10
      ? '0' + String(dateSet.getDate())
      : String(dateSet.getDate()));

  array.push(current);

  const date = new Date(yearSet, monthSet, 0);

  for (let i = 0; i < 7; i++) {
    let day;
    let month = date.getMonth() - i;

    // 전년도로 넘어가는 경우
    if (month < 0) {
      month += 12;
      day = new Date(yearSet - 1, month + 1, 0);
    } else {
      day = new Date(yearSet, month + 1, 0);
    }

    const prev =
      String(day.getFullYear()) +
      (month + 1 < 10 ? '0' + String(month + 1) : String(month + 1)) +
      (day.getDate() < 10
        ? '0' + String(day.getDate())
        : String(day.getDate()));

    array.push(prev);
  }

  return array;
}

// 일별 그래프 일별단위 데이터 추출
export function CustomChartDay(result) {
  let month = result.getMonth() + 1; // +1
  let date = result.getDate();
  let array = [];

  for (let i = 6; i >= 0; i--) {
    const keyword = month + '월 ' + (date - i) + '일';
    array.push(keyword);
  }

  return array;
}

// 월별 그래프 월별단위 데이터 추출
export function CustomChartMonth(result) {
  let month = result.getMonth() + 1;
  let array = [];

  if (month < 7) {
    month += 6;
  } else {
    month -= 6;
  }

  for (let i = 0; i < 7; i++) {
    let keyword = month + i;

    if (keyword > 12) {
      keyword -= 12;
    }

    keyword += '월';

    array.push(keyword);
  }

  return array;
}
