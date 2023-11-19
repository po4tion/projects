// 국내 월별 chart.js

import React from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';

// middleware
import { CustomChartMonth } from '../../middleware/ChartDateFunc';
import '../../fonts/fonts.scss';

function Chart() {
  // 총 8개월간의 값들을 가져와 계산 후 그래프에 출력
  const month01 = useSelector((state) => state.month.month01);
  const month02 = useSelector((state) => state.month.month02);
  const month03 = useSelector((state) => state.month.month03);
  const month04 = useSelector((state) => state.month.month04);
  const month05 = useSelector((state) => state.month.month05);
  const month06 = useSelector((state) => state.month.month06);
  const month07 = useSelector((state) => state.month.month07);
  const month08 = useSelector((state) => state.month.month08);

  const types = useSelector((state) => state.chartType.option);

  // 다크모드로 인해 차트의 색을 바꿔줘야 한다
  const bg = useSelector((state) => state.bgColor.type);

  let view = {};

  if (types === 'decide') {
    view = {
      label: ['확진자'],
      borderColor: 'rgba(255, 0, 0, 0.5)', // 선의 색
      borderWidth: 4, // 선의 굵기(단위 px)
      backgroundColor: 'transparent',
      pointBorderColor: 'rgb(255, 0, 0)',
      hoverBackgroundColor: 'rgb(255, 0, 0)',
      hoverBorderWidth: 10,
      data: [
        month07.decideCnt - month08.decideCnt,
        month06.decideCnt - month07.decideCnt,
        month05.decideCnt - month06.decideCnt,
        month04.decideCnt - month05.decideCnt,
        month03.decideCnt - month04.decideCnt,
        month02.decideCnt - month03.decideCnt,
        month01.decideCnt - month02.decideCnt,
      ],
    };
  } else if (types === 'death') {
    view = {
      label: ['사망자'],
      borderColor: 'rgba(0, 0, 0, 0.5)', // 선의 색
      borderWidth: 4, // 선의 굵기(단위 px)
      backgroundColor: 'transparent',
      pointBorderColor: 'rgb(0, 0, 0)',
      hoverBackgroundColor: 'rgb(0, 0, 0)',
      hoverBorderWidth: 10,
      data: [
        month07.deathCnt - month08.deathCnt,
        month06.deathCnt - month07.deathCnt,
        month05.deathCnt - month06.deathCnt,
        month04.deathCnt - month05.deathCnt,
        month03.deathCnt - month04.deathCnt,
        month02.deathCnt - month03.deathCnt,
        month01.deathCnt - month02.deathCnt,
      ],
    };
  } else if (types === 'exam') {
    view = {
      label: ['검사진행'],
      borderColor: 'rgba(255, 195, 0, 0.5)', // 선의 색
      borderWidth: 4, // 선의 굵기(단위 px)
      backgroundColor: 'transparent',
      pointBorderColor: 'rgb(255, 195, 0)',
      hoverBackgroundColor: 'rgb(255, 195, 0)',
      hoverBorderWidth: 10,
      data: [
        month07.examCnt - month08.examCnt,
        month06.examCnt - month07.examCnt,
        month05.examCnt - month06.examCnt,
        month04.examCnt - month05.examCnt,
        month03.examCnt - month04.examCnt,
        month02.examCnt - month03.examCnt,
        month01.examCnt - month02.examCnt,
      ],
    };
  } else if (types === 'clear') {
    view = {
      label: ['격리해제'],
      borderColor: 'rgba(164, 255, 0, 0.5)', // 선의 색
      borderWidth: 4, // 선의 굵기(단위 px)
      backgroundColor: 'transparent',
      pointBorderColor: 'rgb(164, 255, 0)',
      hoverBackgroundColor: 'rgb(164, 255, 0)',
      hoverBorderWidth: 10,
      data: [
        month07.clearCnt - month08.clearCnt,
        month06.clearCnt - month07.clearCnt,
        month05.clearCnt - month06.clearCnt,
        month04.clearCnt - month05.clearCnt,
        month03.clearCnt - month04.clearCnt,
        month02.clearCnt - month03.clearCnt,
        month01.clearCnt - month02.clearCnt,
      ],
    };
  } else if (types === 'care') {
    view = {
      label: ['치료중'],
      borderColor: 'rgba(0, 125, 255, 0.5)', // 선의 색
      borderWidth: 4, // 선의 굵기(단위 px)
      backgroundColor: 'transparent',
      pointBorderColor: 'rgb(0, 125, 255)',
      hoverBackgroundColor: 'rgb(0, 125, 255)',
      hoverBorderWidth: 10,
      data: [
        month07.careCnt,
        month06.careCnt,
        month05.careCnt,
        month04.careCnt,
        month03.careCnt,
        month02.careCnt,
        month01.careCnt,
      ],
    };
  }

  const options = {
    legend: {
      display: false, // label 숨기기
    },
    elements: {
      point: {
        pointStyle: 'rect',
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: bg === 'moon' ? '#fff' : '#2f3640',
            fontSize: 12,
            fontFamily: 'Jal_Onuel',
          },
          gridLines: {
            color:
              bg === 'moon'
                ? 'rgba(255, 255, 255, 0.5)'
                : 'rgba(47, 54, 64, 0.5)',
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: bg === 'moon' ? '#fff' : '#2f3640',
            fontSize: 12,
            fontFamily: 'Jal_Onuel',
          },
          gridLines: {
            color:
              bg === 'moon'
                ? 'rgba(255, 255, 255, 0.5)'
                : 'rgba(47, 54, 64, 0.5)',
          },
        },
      ],
    },
    responsive: true,

    // Line에 마우스 hover 시, 두 값 사이 중 더 가까운 값이 표시
    tooltips: {
      enabled: true,
      intersect: false,
      mode: 'nearest',
      axis: 'x',
    },
  };

  const data = {
    labels: [...CustomChartMonth(new Date())], // 날짜값 넣기
    datasets: [view],
  };
  return <Line data={data} width={700} height={300} options={options} />;
}

export default Chart;
