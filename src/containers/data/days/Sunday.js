import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import dotenv from 'dotenv';

import { sun } from '../../../modules/date';
import { ChartDateFunc } from '../../../middleware/ChartDateFunc';
import Highchart from '../../../containers/highchart/Highchart';

dotenv.config();

const API_KEY = process.env.REACT_APP_SERVICE_KEY;

const result = new Date();
const date = ChartDateFunc(result);

const covidUrl = `/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${date}&endCreateDt=${date}`;

function CovidData() {
  const [coronic, setCoronic] = useState(null);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await axios
  //         .get(covidUrl)
  //         .then((res) => res.data)
  //         .then((data) => {
  //           // 여기서 dispatch로 mon~sun 값 넣어주기
  //           // setCoronic({
  //           //   decideCnt: data.response.body.items.item.decideCnt,
  //           // });
  //           dispatch(sun(data.response.body.items.item[1].defCnt));
  //         });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   fetchData();
  // }, []);

  dispatch(sun(10000));

  return <Highchart />;
}

export default CovidData;
