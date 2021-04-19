import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import dotenv from 'dotenv';

// middleware
import { ChartDateFunc } from '../../../middleware/ChartDateFunc';

// molecules
import NamingBlockW from '../../../components/molecules/world/NamingBlockW';

// modules
import {
  worldDecideCnt,
  worldDeathCnt,
  prevWorldDecideCnt,
  prevWorldDeathCnt,
} from '../../../modules/worldValue';
import { worldMap, prevWorldMap } from '../../../modules/worldLocal';

// API KEY
dotenv.config();
const API_KEY = process.env.REACT_APP_SERVICE_KEY;

// Calc Date
const result = new Date();
const date = ChartDateFunc(result);

// Get data.go.kr URL
const covidUrl = `/openapi/service/rest/Covid19/getCovid19NatInfStateJson?serviceKey=${API_KEY}&startCreateDt=${date}&endCreateDt=${date}`;

const covidUrl2 = `/openapi/service/rest/Covid19/getCovid19NatInfStateJson?serviceKey=${API_KEY}&startCreateDt=${
  date - 1
}&endCreateDt=${date - 1}`;

function CovidDataW() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(covidUrl)
          .then((res) => res.data)
          .then((data) => {
            dispatch(worldMap(data.response.body.items.item));

            // 총 확진자
            const decideCnt = data.response.body.items.item
              .map((x) => x.natDefCnt)
              .reduce((acc, current) => acc + current);
            // 총 사망자
            const deathCnt = data.response.body.items.item
              .map((x) => x.natDeathCnt)
              .reduce((acc, current) => acc + current);

            dispatch(worldDecideCnt(decideCnt));
            dispatch(worldDeathCnt(deathCnt));
          });

        await axios
          .get(covidUrl2)
          .then((res) => res.data)
          .then((data) => {
            dispatch(prevWorldMap(data.response.body.items.item));

            // 총 확진자(어제)
            const prevDecideCnt = data.response.body.items.item
              .map((x) => x.natDefCnt)
              .reduce((acc, current) => acc + current);
            // 총 사망자(어제)
            const prevDeathCnt = data.response.body.items.item
              .map((x) => x.natDeathCnt)
              .reduce((acc, current) => acc + current);

            dispatch(prevWorldDecideCnt(prevDecideCnt));
            dispatch(prevWorldDeathCnt(prevDeathCnt));
          });
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();

    return () => fetchData();
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(worldDecideCnt(122992441));
  //   dispatch(worldDeathCnt(2711075));
  //   dispatch(prevWorldDecideCnt(122453200));
  //   dispatch(prevWorldDeathCnt(2755000));
  // });

  return <NamingBlockW />;
}

export default CovidDataW;
