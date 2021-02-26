import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import dotenv from 'dotenv';

import { sun, mon, tue, wed, thur, fri, sat } from '../../../modules/date';
import { ChartDateFunc } from '../../../middleware/ChartDateFunc';
import Highchart from '../../highchart/Highchart';

dotenv.config();

const API_KEY = process.env.REACT_APP_SERVICE_KEY;

const result = new Date();
const date = ChartDateFunc(result);

const covidUrl = `/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${date}&endCreateDt=${date}`;

function ChartValue() {
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

  dispatch(mon(23000));

  dispatch(tue(20000));
  dispatch(wed(13200));
  dispatch(thur(17200));
  dispatch(fri(19200));
  dispatch(sat(9000));

  return <Highchart />;
}

export default ChartValue;
