// 세계 카테고리 월별 데이터 FETCH 후 DISPATCH

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import dotenv from 'dotenv';

import {
  worldMonthValue01,
  worldMonthValue02,
  worldMonthValue03,
  worldMonthValue04,
  worldMonthValue05,
  worldMonthValue06,
  worldMonthValue07,
  worldMonthValue08,
} from '../../../modules/worldMonth';
import { ChartMonthFunc } from '../../../middleware/ChartDateFunc';
import ChartMonthW from '../../chart/world/ChartMonthW';

dotenv.config();

const API_KEY = process.env.REACT_APP_SERVICE_KEY;

// 날짜값을 배열로 받아온다.
const date = ChartMonthFunc();
const result = new Date().getHours();

const covidUrl = `/openapi/service/rest/Covid19/getCovid19NatInfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${
  result < 10 ? date[0] - 1 : date[0]
}&endCreateDt=${result < 10 ? date[0] - 1 : date[0]}`;
const covidUrl2 = `/openapi/service/rest/Covid19/getCovid19NatInfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${
  result < 10 ? date[1] - 1 : date[1]
}&endCreateDt=${result < 10 ? date[1] - 1 : date[1]}`;
const covidUrl3 = `/openapi/service/rest/Covid19/getCovid19NatInfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${
  result < 10 ? date[2] - 1 : date[2]
}&endCreateDt=${result < 10 ? date[2] - 1 : date[2]}`;
const covidUrl4 = `/openapi/service/rest/Covid19/getCovid19NatInfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${
  result < 10 ? date[3] - 1 : date[3]
}&endCreateDt=${result < 10 ? date[3] - 1 : date[3]}`;
const covidUrl5 = `/openapi/service/rest/Covid19/getCovid19NatInfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${
  result < 10 ? date[4] - 1 : date[4]
}&endCreateDt=${result < 10 ? date[4] - 1 : date[4]}`;
const covidUrl6 = `/openapi/service/rest/Covid19/getCovid19NatInfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${
  result < 10 ? date[5] - 1 : date[5]
}&endCreateDt=${result < 10 ? date[5] - 1 : date[5]}`;
const covidUrl7 = `/openapi/service/rest/Covid19/getCovid19NatInfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${
  result < 10 ? date[6] - 1 : date[6]
}&endCreateDt=${result < 10 ? date[6] - 1 : date[6]}`;
const covidUrl8 = `/openapi/service/rest/Covid19/getCovid19NatInfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${
  result < 10 ? date[7] - 1 : date[7]
}&endCreateDt=${result < 10 ? date[7] - 1 : date[7]}`;

function ChartValueMonth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(covidUrl)
          .then((res) => res.data)
          .then((data) => {
            const decideCnt = data.response.body.items.item
              .map((x) => x.natDefCnt)
              .reduce((acc, current) => acc + current);
            // 총 사망자
            const deathCnt = data.response.body.items.item
              .map((x) => x.natDeathCnt)
              .reduce((acc, current) => acc + current);

            dispatch(worldMonthValue01(decideCnt, deathCnt));
          });
        await axios
          .get(covidUrl2)
          .then((res) => res.data)
          .then((data) => {
            const decideCnt = data.response.body.items.item
              .map((x) => x.natDefCnt)
              .reduce((acc, current) => acc + current);
            // 총 사망자
            const deathCnt = data.response.body.items.item
              .map((x) => x.natDeathCnt)
              .reduce((acc, current) => acc + current);

            dispatch(worldMonthValue02(decideCnt, deathCnt));
          });
        await axios
          .get(covidUrl3)
          .then((res) => res.data)
          .then((data) => {
            const decideCnt = data.response.body.items.item
              .map((x) => x.natDefCnt)
              .reduce((acc, current) => acc + current);
            // 총 사망자
            const deathCnt = data.response.body.items.item
              .map((x) => x.natDeathCnt)
              .reduce((acc, current) => acc + current);

            dispatch(worldMonthValue03(decideCnt, deathCnt));
          });
        await axios
          .get(covidUrl4)
          .then((res) => res.data)
          .then((data) => {
            const decideCnt = data.response.body.items.item
              .map((x) => x.natDefCnt)
              .reduce((acc, current) => acc + current);
            // 총 사망자
            const deathCnt = data.response.body.items.item
              .map((x) => x.natDeathCnt)
              .reduce((acc, current) => acc + current);

            dispatch(worldMonthValue04(decideCnt, deathCnt));
          });
        await axios
          .get(covidUrl5)
          .then((res) => res.data)
          .then((data) => {
            const decideCnt = data.response.body.items.item
              .map((x) => x.natDefCnt)
              .reduce((acc, current) => acc + current);
            // 총 사망자
            const deathCnt = data.response.body.items.item
              .map((x) => x.natDeathCnt)
              .reduce((acc, current) => acc + current);

            dispatch(worldMonthValue05(decideCnt, deathCnt));
          });
        await axios
          .get(covidUrl6)
          .then((res) => res.data)
          .then((data) => {
            const decideCnt = data.response.body.items.item
              .map((x) => x.natDefCnt)
              .reduce((acc, current) => acc + current);
            // 총 사망자
            const deathCnt = data.response.body.items.item
              .map((x) => x.natDeathCnt)
              .reduce((acc, current) => acc + current);

            dispatch(worldMonthValue06(decideCnt, deathCnt));
          });
        await axios
          .get(covidUrl7)
          .then((res) => res.data)
          .then((data) => {
            const decideCnt = data.response.body.items.item
              .map((x) => x.natDefCnt)
              .reduce((acc, current) => acc + current);
            // 총 사망자
            const deathCnt = data.response.body.items.item
              .map((x) => x.natDeathCnt)
              .reduce((acc, current) => acc + current);

            dispatch(worldMonthValue07(decideCnt, deathCnt));
          });
        await axios
          .get(covidUrl8)
          .then((res) => res.data)
          .then((data) => {
            const decideCnt = data.response.body.items.item
              .map((x) => x.natDefCnt)
              .reduce((acc, current) => acc + current);
            // 총 사망자
            const deathCnt = data.response.body.items.item
              .map((x) => x.natDeathCnt)
              .reduce((acc, current) => acc + current);

            dispatch(worldMonthValue08(decideCnt, deathCnt));
          });
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
    return () => fetchData();
  }, [dispatch]);

  // TEST MODE
  // useEffect(() => {
  //   dispatch(worldMonthValue01(1200, 100));
  //   dispatch(worldMonthValue02(1200, 100));
  //   dispatch(worldMonthValue03(1200, 100));
  //   dispatch(worldMonthValue04(1200, 100));
  //   dispatch(worldMonthValue05(1200, 100));
  //   dispatch(worldMonthValue06(1200, 100));
  //   dispatch(worldMonthValue07(1200, 100));
  //   dispatch(worldMonthValue08(1200, 100));
  // });

  return <ChartMonthW />;
}

export default ChartValueMonth;
