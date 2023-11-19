// 세계 일별 chart.js

import React from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import '../../../fonts/fonts.scss';

// middleware
import { ChartDay } from '../../../middleware/ChartDateFunc';

function ChartW() {
  const worldObj = useSelector((state) => state.worldDay);
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
        worldObj.value02.decide - worldObj.value01.decide,
        worldObj.value03.decide - worldObj.value02.decide,
        worldObj.value04.decide - worldObj.value03.decide,
        worldObj.value05.decide - worldObj.value04.decide,
        worldObj.value06.decide - worldObj.value05.decide,
        worldObj.value07.decide - worldObj.value06.decide,
        worldObj.value08.decide - worldObj.value07.decide,
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
        worldObj.value02.death - worldObj.value01.death,
        worldObj.value03.death - worldObj.value02.death,
        worldObj.value04.death - worldObj.value03.death,
        worldObj.value05.death - worldObj.value04.death,
        worldObj.value06.death - worldObj.value05.death,
        worldObj.value07.death - worldObj.value06.death,
        worldObj.value08.death - worldObj.value07.death,
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
    labels: [...ChartDay(new Date())], // 날짜값 넣기
    datasets: [view],
  };
  return <Line data={data} width={700} height={300} options={options} />;
}

export default ChartW;
