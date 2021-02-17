import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';

import NamingBlock from '../../components/molecules/NamingBlock';

dotenv.config();

const API_KEY = process.env.REACT_APP_SERVICE_KEY;

const covidUrl = `/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=20210217&endCreateDt=20210217`;

function CovidData() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(covidUrl)
          .then((res) => res.data)
          .then((data) => {
            console.log('뿌직스', data.response.body.items.item);
          });
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  return <NamingBlock />;
}

export default CovidData;
