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
export function ChartMonthFunc(result) {
  let year = result.getFullYear();
  const date = result.getDate();
  let endMonth = result.getMonth() + 1;
  let startMonth = null;

  if (endMonth < 7) {
    startMonth = endMonth + 6;
    year -= 1;
  } else {
    startMonth = endMonth - 6;
  }

  if (startMonth < 10) {
    startMonth = String(year) + '0' + String(startMonth) + '01';
  } else {
    startMonth = String(year) + String(startMonth) + '01';
  }

  if (endMonth < 10) {
    endMonth = String(year + 1) + '0' + String(endMonth) + String(date);
  } else {
    endMonth = String(year + 1) + String(endMonth) + String(date);
  }

  return [startMonth, endMonth];
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
