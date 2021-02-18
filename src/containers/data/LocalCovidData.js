import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';

import LocalBlock from '../../components/molecules/LocalBlock';

dotenv.config();

const API_KEY = process.env.REACT_APP_SERVICE_KEY;

const covidUrl = `/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=20210217&endCreateDt=20210217`;

function LocalCovidData() {
  const [local, setLocal] = useState([
    {
      gubun: '경기',
      defCnt: 1000,
      stdDay: '2021년',
    },
    {
      gubun: '경기',
      defCnt: 1000,
      stdDay: '2021년',
    },
    {
      gubun: '경기',
      defCnt: 1000,
      stdDay: '2021년',
    },
  ]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await axios
  //         .get(covidUrl)
  //         .then((res) => res.data)
  //         .then((data) => {
  //           setLocal(data.response.body.items.item);
  //         });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   fetchData();
  // }, [local]);

  return <LocalBlock local={local} />;
}

export default LocalCovidData;
