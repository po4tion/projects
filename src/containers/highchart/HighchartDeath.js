import React from 'react';
import { useSelector } from 'react-redux';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function HighchartDeath() {
  // Chart BG-C Type change
  const result = useSelector((state) => state.bgColor.type);

  // ~7days Value
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
        // deathCnt
        name: '사망자',
        data: [
          first.deathCnt,
          second.deathCnt,
          third.deathCnt,
          fourth.deathCnt,
          fifth.deathCnt,
          sixth.deathCnt,
          seventh.deathCnt,
        ],
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

export default HighchartDeath;
