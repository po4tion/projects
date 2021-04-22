// 국내 일별 데이터 FETCH 후 DISPATCH

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
import Chart from '../../chart/Chart';

dotenv.config();

const API_KEY = process.env.REACT_APP_SERVICE_KEY;

const result = new Date();
const date = ChartDateFunc(result);

const covidUrl = `/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${
  date - 6
}&endCreateDt=${date}`;

function ChartValue() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(covidUrl)
          .then((res) => res.data)
          .then((data) => {
            // 총 확진자
            dispatch(
              first(
                data.response.body.items.item[6].decideCnt,
                data.response.body.items.item[6].deathCnt,
                data.response.body.items.item[6].examCnt,
                data.response.body.items.item[6].clearCnt,
                data.response.body.items.item[6].careCnt
              )
            );
            dispatch(
              second(
                data.response.body.items.item[5].decideCnt,
                data.response.body.items.item[5].deathCnt,
                data.response.body.items.item[5].examCnt,
                data.response.body.items.item[5].clearCnt,
                data.response.body.items.item[5].careCnt
              )
            );
            dispatch(
              third(
                data.response.body.items.item[4].decideCnt,
                data.response.body.items.item[4].deathCnt,
                data.response.body.items.item[4].examCnt,
                data.response.body.items.item[4].clearCnt,
                data.response.body.items.item[4].careCnt
              )
            );
            dispatch(
              fourth(
                data.response.body.items.item[3].decideCnt,
                data.response.body.items.item[3].deathCnt,
                data.response.body.items.item[3].examCnt,
                data.response.body.items.item[3].clearCnt,
                data.response.body.items.item[3].careCnt
              )
            );
            dispatch(
              fifth(
                data.response.body.items.item[2].decideCnt,
                data.response.body.items.item[2].deathCnt,
                data.response.body.items.item[2].examCnt,
                data.response.body.items.item[2].clearCnt,
                data.response.body.items.item[2].careCnt
              )
            );
            dispatch(
              sixth(
                data.response.body.items.item[1].decideCnt,
                data.response.body.items.item[1].deathCnt,
                data.response.body.items.item[1].examCnt,
                data.response.body.items.item[1].clearCnt,
                data.response.body.items.item[1].careCnt
              )
            );
            dispatch(
              seventh(
                data.response.body.items.item[0].decideCnt,
                data.response.body.items.item[0].deathCnt,
                data.response.body.items.item[0].examCnt,
                data.response.body.items.item[0].clearCnt,
                data.response.body.items.item[0].careCnt
              )
            );
          });
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
    return () => fetchData();
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(first(1, 10, 30, 40, 60));
  //   dispatch(second(2, 11, 29, 41, 59));
  //   dispatch(third(3, 12, 28, 42, 58));
  //   dispatch(fourth(4, 13, 27, 43, 57));
  //   dispatch(fifth(5, 14, 26, 44, 56));
  //   dispatch(sixth(6, 15, 25, 45, 55));
  //   dispatch(seventh(7, 16, 24, 46, 54));
  // });

  return <Chart />;
}

export default ChartValue;
