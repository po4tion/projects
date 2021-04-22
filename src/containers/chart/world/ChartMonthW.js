// 세계 월별 chart.js

import React from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import '../../../fonts/fonts.scss';

// middleware
import { CustomChartMonth } from '../../../middleware/ChartDateFunc';

function Chart() {
  const month = useSelector((state) => state.worldMonth);
  const bg = useSelector((state) => state.bgColor.type);
  const types = useSelector((state) => state.chartType.option);

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
        month.value07.decide - month.value08.decide,
        month.value06.decide - month.value07.decide,
        month.value05.decide - month.value06.decide,
        month.value04.decide - month.value05.decide,
        month.value03.decide - month.value04.decide,
        month.value02.decide - month.value03.decide,
        month.value01.decide - month.value02.decide,
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
        month.value07.death - month.value08.death,
        month.value06.death - month.value07.death,
        month.value05.death - month.value06.death,
        month.value04.death - month.value05.death,
        month.value03.death - month.value04.death,
        month.value02.death - month.value03.death,
        month.value01.death - month.value02.death,
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
