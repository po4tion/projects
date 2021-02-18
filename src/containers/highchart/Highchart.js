import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ChartDataFunc } from '../../middleware/ChartDataFunc';

// const result = new Date();

// const coronic = ChartDataFunc(result);

// console.log('coronic', coronic);

const options = {
  chart: {
    type: 'line',
    width: 700,
  },
  title: {
    text: '일별 코로나 동향, 2020-2021',
  },

  subtitle: {
    text: '',
  },

  yAxis: {
    title: {
      text: '(명)',
    },
  },

  xAxis: {
    type: 'datetime',
    accessibility: {
      rangeDescription: 'Range: 2020 to 2021',
    },
  },

  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
  },

  plotOptions: {
    series: {
      pointStart: Date.UTC(2021, 1, 9), // 날짜 시작 (년도, 월, 일)
      pointInterval: 24 * 3600 * 1000, // 시간 간격
    },
  },

  series: [
    {
      name: '총 확진자 수',
      data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 137222],
    },
    {
      name: '사망자',
      data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
    },
    {
      name: '검사진행',
      data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
    },
    {
      name: '격리해제',
      data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227],
    },
    {
      name: '치료중',
      data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
    },
  ],

  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 600,
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
          },
        },
      },
    ],
  },
};

function Highchart() {
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default Highchart;
