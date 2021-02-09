import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';

import NamingBlock from '../../components/molecules/NamingBlock';

dotenv.config();

const API_KEY = process.env.REACT_APP_SERVICE_KEY;

const covidUrl = `/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=20210208&endCreateDt=20210209`;

function CovidData() {
  const [coronic, setCoronic] = useState({
    decideCnt: 10000,
    deathCnt: 10000,
    clearCnt: 10000,
    examCnt: 10000,
    careCnt: 10000,
    accDefRate: 10000,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(covidUrl)
          .then((res) => res.data)
          .then((data) => {
            setCoronic({
              ...coronic,
              decideCnt: data.response.body.items.item[0].decideCnt,
              deathCnt: data.response.body.items.item[0].deathCnt,
              clearCnt: data.response.body.items.item[0].clearCnt,
              examCnt: data.response.body.items.item[0].examCnt,
              careCnt: data.response.body.items.item[0].careCnt,
              accDefRate: data.response.body.items.item[0].accDefRate,
            });
          });
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [coronic]);

  console.log('coronic:', coronic);

  return <NamingBlock coronic={coronic} />;
}

export default CovidData;
