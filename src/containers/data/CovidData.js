import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';
import { ChartDateFunc } from '../../middleware/ChartDateFunc';

import NamingBlock from '../../components/molecules/NamingBlock';

dotenv.config();

const API_KEY = process.env.REACT_APP_SERVICE_KEY;

const result = new Date();
const date = ChartDateFunc(result);

const covidUrl = `/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${date}&endCreateDt=${date}`;

function CovidData() {
  const [coronic, setCoronic] = useState({
    decideCnt: 123,
    deathCnt: 123,
    clearCnt: 123,
    examCnt: 123,
    careCnt: 123,
    accDefRate: 123,
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await axios
  //         .get(covidUrl)
  //         .then((res) => res.data)
  //         .then((data) => {
  //           setCoronic({
  //             decideCnt: data.response.body.items.item.decideCnt,
  //             deathCnt: data.response.body.items.item.deathCnt,
  //             clearCnt: data.response.body.items.item.clearCnt,
  //             examCnt: data.response.body.items.item.examCnt,
  //             careCnt: data.response.body.items.item.careCnt,
  //             accDefRate: data.response.body.items.item.accDefRate,
  //           });
  //         });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   fetchData();
  // }, [coronic]);

  // console.log('coronic:', coronic);

  return <NamingBlock coronic={coronic} />;
}

export default CovidData;
