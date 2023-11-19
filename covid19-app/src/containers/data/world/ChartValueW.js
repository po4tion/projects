// 세계 카테고리 일별 데이터 FETCH 후 DISPATCH

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import dotenv from 'dotenv';

import {
  worldDayValue01,
  worldDayValue02,
  worldDayValue03,
  worldDayValue04,
  worldDayValue05,
  worldDayValue06,
  worldDayValue07,
  worldDayValue08,
} from '../../../modules/worldDay';
import { ChartValueWFunc } from '../../../middleware/ChartDateFunc';
import ChartW from '../../chart/world/ChartW';

// SERVICE KEY
dotenv.config();
const API_KEY = process.env.REACT_APP_SERVICE_KEY;

// Date value, 날짜 값을 배열로 받아온다
const dateArray = ChartValueWFunc();
const result = new Date().getHours();

// API URL
const covidUrl = `/openapi/service/rest/Covid19/getCovid19NatInfStateJson?serviceKey=${API_KEY}&startCreateDt=${
  result < 10 ? dateArray[0] - 1 : dateArray[0]
}&endCreateDt=${result < 10 ? dateArray[0] - 1 : dateArray[0]}`;
const covidUrl2 = `/openapi/service/rest/Covid19/getCovid19NatInfStateJson?serviceKey=${API_KEY}&startCreateDt=${
  result < 10 ? dateArray[1] - 1 : dateArray[1]
}&endCreateDt=${result < 10 ? dateArray[1] - 1 : dateArray[1]}`;
const covidUrl3 = `/openapi/service/rest/Covid19/getCovid19NatInfStateJson?serviceKey=${API_KEY}&startCreateDt=${
  result < 10 ? dateArray[2] - 1 : dateArray[2]
}&endCreateDt=${result < 10 ? dateArray[2] - 1 : dateArray[2]}`;
const covidUrl4 = `/openapi/service/rest/Covid19/getCovid19NatInfStateJson?serviceKey=${API_KEY}&startCreateDt=${
  result < 10 ? dateArray[3] - 1 : dateArray[3]
}&endCreateDt=${result < 10 ? dateArray[3] - 1 : dateArray[3]}`;
const covidUrl5 = `/openapi/service/rest/Covid19/getCovid19NatInfStateJson?serviceKey=${API_KEY}&startCreateDt=${
  result < 10 ? dateArray[4] - 1 : dateArray[4]
}&endCreateDt=${result < 10 ? dateArray[4] - 1 : dateArray[4]}`;
const covidUrl6 = `/openapi/service/rest/Covid19/getCovid19NatInfStateJson?serviceKey=${API_KEY}&startCreateDt=${
  result < 10 ? dateArray[5] - 1 : dateArray[5]
}&endCreateDt=${result < 10 ? dateArray[5] - 1 : dateArray[5]}`;
const covidUrl7 = `/openapi/service/rest/Covid19/getCovid19NatInfStateJson?serviceKey=${API_KEY}&startCreateDt=${
  result < 10 ? dateArray[6] - 1 : dateArray[6]
}&endCreateDt=${result < 10 ? dateArray[6] - 1 : dateArray[6]}`;
const covidUrl8 = `/openapi/service/rest/Covid19/getCovid19NatInfStateJson?serviceKey=${API_KEY}&startCreateDt=${
  result < 10 ? dateArray[7] - 1 : dateArray[7]
}&endCreateDt=${result < 10 ? dateArray[7] - 1 : dateArray[7]}`;

function ChartValue() {
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

            dispatch(worldDayValue01(decideCnt, deathCnt));
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

            dispatch(worldDayValue02(decideCnt, deathCnt));
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

            dispatch(worldDayValue03(decideCnt, deathCnt));
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

            dispatch(worldDayValue04(decideCnt, deathCnt));
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

            dispatch(worldDayValue05(decideCnt, deathCnt));
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

            dispatch(worldDayValue06(decideCnt, deathCnt));
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

            dispatch(worldDayValue07(decideCnt, deathCnt));
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

            dispatch(worldDayValue08(decideCnt, deathCnt));
          });
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(worldDayValue01(1, 10));
  //   dispatch(worldDayValue02(2, 11));
  //   dispatch(worldDayValue03(3, 12));
  //   dispatch(worldDayValue04(4, 13));
  //   dispatch(worldDayValue05(5, 14));
  //   dispatch(worldDayValue06(6, 15));
  //   dispatch(worldDayValue07(6, 15));
  //   dispatch(worldDayValue08(7, 16));
  // });

  return <ChartW />;
}

export default ChartValue;
