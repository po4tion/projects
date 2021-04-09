import React from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import '../../fonts/fonts.scss';

// middleware
import { ChartDay } from '../../middleware/ChartDateFunc';

function Chart() {
  const first = useSelector((state) => state.date.first);
  const second = useSelector((state) => state.date.second);
  const third = useSelector((state) => state.date.third);
  const fourth = useSelector((state) => state.date.fourth);
  const fifth = useSelector((state) => state.date.fifth);
  const sixth = useSelector((state) => state.date.sixth);
  const seventh = useSelector((state) => state.date.seventh);

  const types = useSelector((state) => state.chartType.option);
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
      borderColor: 'rgba(0, 0, 0, 0.5)', // 선의 색
      borderWidth: 4, // 선의 굵기(단위 px)
      backgroundColor: 'transparent',
      pointBorderColor: 'rgb(0, 0, 0)',
      hoverBackgroundColor: 'rgb(0, 0, 0)',
      hoverBorderWidth: 10,
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
      borderColor: 'rgba(255, 195, 0, 0.5)', // 선의 색
      borderWidth: 4, // 선의 굵기(단위 px)
      backgroundColor: 'transparent',
      pointBorderColor: 'rgb(255, 195, 0)',
      hoverBackgroundColor: 'rgb(255, 195, 0)',
      hoverBorderWidth: 10,
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
      borderColor: 'rgba(164, 255, 0, 0.5)', // 선의 색
      borderWidth: 4, // 선의 굵기(단위 px)
      backgroundColor: 'transparent',
      pointBorderColor: 'rgb(164, 255, 0)',
      hoverBackgroundColor: 'rgb(164, 255, 0)',
      hoverBorderWidth: 10,
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
      display: false, // label 숨기기,
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
    tooltips: {
      enabled: true,
      intersect: false,
      mode: 'nearest',
      axis: 'x',
    },
  };

  const data = {
    labels: [...ChartDay(new Date())], // 날짜값 넣기
    datasets: [view],
  };
  return <Line data={data} width={700} height={300} options={options} />;
}

export default Chart;
