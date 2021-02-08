import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';

import NamingBlock from '../../components/molecules/NamingBlock';

dotenv.config();

const API_KEY = process.env.REACT_APP_SERVICE_KEY;

const covidUrl = `/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=20210207&endCreateDt=20210208`;

function CovidData() {
  const [coronic, setCoronic] = useState();
  const [curCoronic, setcurCoronic] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(covidUrl)
          .then((res) => res.data)
          .then((data) => {
            setCoronic(data.response.body.items.item[0].decideCnt);
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
