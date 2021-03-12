import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import dotenv from 'dotenv';

import {
  first,
  second,
  third,
  fourth,
  fifth,
  sixth,
  seventh,
} from '../../../modules/date';
import { ChartDateFunc } from '../../../middleware/ChartDateFunc';
import Highchart from '../../highchart/Highchart';

dotenv.config();

const API_KEY = process.env.REACT_APP_SERVICE_KEY;

const result = new Date();
const date = ChartDateFunc(result);

const covidUrl = `/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${date}&endCreateDt=${date}`;

function ChartValue() {
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
  //           // dispatch(seventh(data.response.body.items.item.decideCnt));
  //         });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   fetchData();
  // }, [dispatch]);

  dispatch(first(10000));
  dispatch(second(20000));
  dispatch(third(30000));
  dispatch(fourth(40000));
  dispatch(fifth(35000));
  dispatch(sixth(40000));
  dispatch(seventh(45000));

  return <Highchart />;
}

export default ChartValue;
