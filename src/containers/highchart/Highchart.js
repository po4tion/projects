import React from 'react';
import { useSelector } from 'react-redux';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function Highchart() {
  const result = useSelector((state) => state.bgColor.type);

  const first = useSelector((state) => state.date.first);
  const second = useSelector((state) => state.date.second);
  const third = useSelector((state) => state.date.third);
  const fourth = useSelector((state) => state.date.fourth);
  const fifth = useSelector((state) => state.date.fifth);
  const sixth = useSelector((state) => state.date.sixth);
  const seventh = useSelector((state) => state.date.seventh);

  const _date = new Date();

  const options = {
    chart: {
      type: 'line',
      width: 700,
      backgroundColor: `${result === 'moon' ? '#2f3640' : '#fff'}`,
      borderRadius: '7px',
    },
    title: {
      text: '',
      style: {
        color: `${result === 'moon' ? '#f5f6fa' : '#2c3a47'}`,
        fontWeight: 'bold',
      },
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
      itemStyle: {
        color: '#778ca3',
      },
    },

    plotOptions: {
      series: {
        pointStart: Date.UTC(2021, _date.getMonth(), _date.getDate() - 6), // 날짜 시작 (년도, 월, 일)
        pointInterval: 24 * 3600 * 1000, // 시간 간격
      },
    },

    series: [
      {
        name: '총 확진자 수',
        data: [first, second, third, fourth, fifth, sixth, seventh],
      },
      {
        name: '사망자',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121],
      },
      {
        name: '검사진행',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147],
      },
      {
        name: '격리해제',
        data: [null, null, 7988, 12169, 15112, 22452, 34400],
      },
      {
        name: '치료중',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274],
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

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default Highchart;
