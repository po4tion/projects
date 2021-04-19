import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import dotenv from 'dotenv';

import {
  month01,
  month02,
  month03,
  month04,
  month05,
  month06,
  month07,
  month08,
} from '../../../modules/month';
import { ChartMonthFunc } from '../../../middleware/ChartDateFunc';
import ChartMonth from '../../chart/ChartMonth';

dotenv.config();

const API_KEY = process.env.REACT_APP_SERVICE_KEY;

const date = ChartMonthFunc();

const covidUrl = `/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${date[0]}&endCreateDt=${date[0]}`;
const covidUrl2 = `/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${date[1]}&endCreateDt=${date[1]}`;
const covidUrl3 = `/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${date[2]}&endCreateDt=${date[2]}`;
const covidUrl4 = `/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${date[3]}&endCreateDt=${date[3]}`;
const covidUrl5 = `/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${date[4]}&endCreateDt=${date[4]}`;
const covidUrl6 = `/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${date[5]}&endCreateDt=${date[5]}`;
const covidUrl7 = `/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${date[6]}&endCreateDt=${date[6]}`;
const covidUrl8 = `/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${date[7]}&endCreateDt=${date[7]}`;

function ChartValueMonth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(covidUrl)
          .then((res) => res.data)
          .then((data) => {
            const decide = data.response.body.items.item.decideCnt;
            const death = data.response.body.items.item.deathCnt;
            const exam = data.response.body.items.item.accExamCnt;
            const clear = data.response.body.items.item.clearCnt;
            const care = data.response.body.items.item.careCnt;

            dispatch(month01(decide, death, exam, clear, care));
          });
        await axios
          .get(covidUrl2)
          .then((res) => res.data)
          .then((data) => {
            const decide = data.response.body.items.item.decideCnt;
            const death = data.response.body.items.item.deathCnt;
            const exam = data.response.body.items.item.accExamCnt;
            const clear = data.response.body.items.item.clearCnt;
            const care = data.response.body.items.item.careCnt;

            dispatch(month02(decide, death, exam, clear, care));
          });
        await axios
          .get(covidUrl3)
          .then((res) => res.data)
          .then((data) => {
            const decide = data.response.body.items.item.decideCnt;
            const death = data.response.body.items.item.deathCnt;
            const exam = data.response.body.items.item.accExamCnt;
            const clear = data.response.body.items.item.clearCnt;
            const care = data.response.body.items.item.careCnt;

            dispatch(month03(decide, death, exam, clear, care));
          });
        await axios
          .get(covidUrl4)
          .then((res) => res.data)
          .then((data) => {
            const decide = data.response.body.items.item.decideCnt;
            const death = data.response.body.items.item.deathCnt;
            const exam = data.response.body.items.item.accExamCnt;
            const clear = data.response.body.items.item.clearCnt;
            const care = data.response.body.items.item.careCnt;

            dispatch(month04(decide, death, exam, clear, care));
          });
        await axios
          .get(covidUrl5)
          .then((res) => res.data)
          .then((data) => {
            const decide = data.response.body.items.item.decideCnt;
            const death = data.response.body.items.item.deathCnt;
            const exam = data.response.body.items.item.accExamCnt;
            const clear = data.response.body.items.item.clearCnt;
            const care = data.response.body.items.item.careCnt;

            dispatch(month05(decide, death, exam, clear, care));
          });
        await axios
          .get(covidUrl6)
          .then((res) => res.data)
          .then((data) => {
            const decide = data.response.body.items.item.decideCnt;
            const death = data.response.body.items.item.deathCnt;
            const exam = data.response.body.items.item.accExamCnt;
            const clear = data.response.body.items.item.clearCnt;
            const care = data.response.body.items.item.careCnt;

            dispatch(month06(decide, death, exam, clear, care));
          });
        await axios
          .get(covidUrl7)
          .then((res) => res.data)
          .then((data) => {
            const decide = data.response.body.items.item.decideCnt;
            const death = data.response.body.items.item.deathCnt;
            const exam = data.response.body.items.item.accExamCnt;
            const clear = data.response.body.items.item.clearCnt;
            const care = data.response.body.items.item.careCnt;

            dispatch(month07(decide, death, exam, clear, care));
          });
        await axios
          .get(covidUrl8)
          .then((res) => res.data)
          .then((data) => {
            const decide = data.response.body.items.item.decideCnt;
            const death = data.response.body.items.item.deathCnt;
            const exam = data.response.body.items.item.accExamCnt;
            const clear = data.response.body.items.item.clearCnt;
            const care = data.response.body.items.item.careCnt;

            dispatch(month08(decide, death, exam, clear, care));
          });
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
    return () => fetchData();
  }, [dispatch]);

  // TEST MODE
  // dispatch(month01(1, 2, 3, 4, 5));
  // dispatch(month02(1, 2, 3, 4, 5));
  // dispatch(month03(1, 2, 3, 4, 5));
  // dispatch(month04(1, 2, 3, 4, 5));
  // dispatch(month05(1, 2, 3, 4, 5));
  // dispatch(month06(1, 2, 3, 4, 10));
  // dispatch(month07(1, 2, 3, 4, 5));
  // dispatch(month08(1, 2, 3, 4, 5));

  return <ChartMonth />;
}

export default ChartValueMonth;
