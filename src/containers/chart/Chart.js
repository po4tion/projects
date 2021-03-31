import React from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';

// middleware
import { CustomChartDay } from '../../middleware/ChartDateFunc';
import { reduce } from 'highcharts';

function Chart() {
  const first = useSelector((state) => state.date.first);
  const second = useSelector((state) => state.date.second);
  const third = useSelector((state) => state.date.third);
  const fourth = useSelector((state) => state.date.fourth);
  const fifth = useSelector((state) => state.date.fifth);
  const sixth = useSelector((state) => state.date.sixth);
  const seventh = useSelector((state) => state.date.seventh);

  const types = useSelector((state) => state.chartType.option);
  let view = {
    label: ['확진자'],
    borderColor: 'rgba(255, 0, 0, 0.5)', // 선의 색
    borderWidth: 4, // 선의 굵기(단위 px)
    backgroundColor: 'transparent',
    pointBorderColor: 'red',
    hoverBackgroundColor: 'red',
    hoverBorderWidth: 10,
    data: [
      first.decideCnt,
      second.decideCnt,
      third.decideCnt,
      fourth.decideCnt,
      fifth.decideCnt,
      sixth.decideCnt,
      seventh.decideCnt,
    ],
  };

  if (types === 'decide') {
    view = {
      label: ['확진자'],
      borderColor: 'rgba(255, 0, 0, 0.5)', // 선의 색
      borderWidth: 4, // 선의 굵기(단위 px)
      backgroundColor: 'transparent',
      pointBorderColor: 'red',
      hoverBackgroundColor: 'red',
      hoverBorderWidth: 10,
      data: [
        first.decideCnt,
        second.decideCnt,
        third.decideCnt,
        fourth.decideCnt,
        fifth.decideCnt,
        sixth.decideCnt,
        seventh.decideCnt,
      ],
    };
  } else if (types === 'death') {
    view = {
      label: ['사망자'],
      borderColor: 'black', // 선의 색
      borderWidth: 4, // 선의 굵기(단위 px)
      backgroundColor: 'transparent',
      hoverBackgroundColor: 'green',
      hoverBorderColor: 'red',
      data: [
        first.deathCnt,
        second.deathCnt,
        third.deathCnt,
        fourth.deathCnt,
        fifth.deathCnt,
        sixth.deathCnt,
        seventh.deathCnt,
      ],
    };
  } else if (types === 'exam') {
    view = {
      label: ['검사진행'],
      borderColor: 'orange', // 선의 색
      borderWidth: 4, // 선의 굵기(단위 px)
      backgroundColor: 'transparent',
      hoverBackgroundColor: 'green',
      hoverBorderColor: 'red',
      data: [
        first.examCnt,
        second.examCnt,
        third.examCnt,
        fourth.examCnt,
        fifth.examCnt,
        sixth.examCnt,
        seventh.examCnt,
      ],
    };
  } else if (types === 'clear') {
    view = {
      label: ['격리해제'],
      borderColor: 'green', // 선의 색
      borderWidth: 4, // 선의 굵기(단위 px)
      backgroundColor: 'transparent',
      hoverBackgroundColor: 'green',
      hoverBorderColor: 'red',
      data: [
        first.clearCnt,
        second.clearCnt,
        third.clearCnt,
        fourth.clearCnt,
        fifth.clearCnt,
        sixth.clearCnt,
        seventh.clearCnt,
      ],
    };
  } else {
    view = {
      label: ['치료중'],
      borderColor: 'darkblue', // 선의 색
      borderWidth: 2, // 선의 굵기(단위 px)
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      hoverBackgroundColor: 'green',
      hoverBorderColor: 'red',
      data: [
        first.careCnt,
        second.careCnt,
        third.careCnt,
        fourth.careCnt,
        fifth.careCnt,
        sixth.careCnt,
        seventh.careCnt,
      ],
    };
  }

  const options = {
    legend: {
      display: false, // label 숨기기
      labels: {
        boxWidth: 10,
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            stepSize:
              types === 'decide'
                ? 500
                : types === 'death'
                ? 10
                : types === 'exam'
                ? 3500
                : types === 'clear'
                ? 500
                : types === 'care'
                ? 100
                : 100, // 스케일에 대한 사용자 고정 정의 값
          },
        },
      ],
    },
    responsive: true,
    plugins: {
      tooltip: {
        position: 'nearest',
        mode: 'index',
        intersect: false,
        borderWidth: 10,
      },
    },
  };

  const data = {
    labels: [...CustomChartDay(new Date())], // 날짜값 넣기
    datasets: [view],
  };
  return <Line data={data} width={700} height={300} options={options} />;
}

export default Chart;
