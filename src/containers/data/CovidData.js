import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import dotenv from 'dotenv';
import { ChartDateFunc } from '../../middleware/ChartDateFunc';

import NamingBlock from '../../components/molecules/NamingBlock';
import { difference } from '../../modules/differ';

dotenv.config();

const API_KEY = process.env.REACT_APP_SERVICE_KEY;

const result = new Date();
const date = ChartDateFunc(result);

const covidUrl = `/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${
  date - 1
}&endCreateDt=${date}`;

function CovidData() {
  const [coronic, setCoronic] = useState({
    decideCnt: 12322,
    deathCnt: 12322,
    clearCnt: 12322,
    examCnt: 12322,
    careCnt: 12322,
    accDefRate: 1.3,
  });

  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await axios
  //         .get(covidUrl)
  //         .then((res) => res.data)
  //         .then((data) => {
  //           setCoronic({
  //             decideCnt: data.response.body.items.item[1].decideCnt,
  //             deathCnt: data.response.body.items.item[1].deathCnt,
  //             clearCnt: data.response.body.items.item[1].clearCnt,
  //             examCnt: data.response.body.items.item[1].examCnt,
  //             careCnt: data.response.body.items.item[1].careCnt,
  //             accDefRate: data.response.body.items.item[1].accDefRate,
  //           });

  //           dispatch(
  //             difference(
  //               data.response.body.items.item[0].decideCnt -
  //                 data.response.body.items.item[1].decideCnt
  //             )
  //           );
  //         });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   fetchData();
  // }, [coronic]);

  return <NamingBlock coronic={coronic} />;
}

export default CovidData;
