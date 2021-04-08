import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import dotenv from 'dotenv';

import LocalBlock from '../../components/molecules/LocalBlock';
import { ChartDateFunc } from '../../middleware/ChartDateFunc';
import { internalMap, prevInternalMap } from '../../modules/internalLocal';

dotenv.config();

const date = ChartDateFunc(new Date());

const API_KEY = process.env.REACT_APP_SERVICE_KEY;

const covidUrl = `/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${
  date - 1
}&endCreateDt=${date}`;

function LocalCovidData() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(covidUrl)
          .then((res) => res.data)
          .then((data) => {
            const current = data.response.body.items.item.slice(0, 19);
            const prev = data.response.body.items.item.slice(19);

            dispatch(internalMap(current));
            dispatch(prevInternalMap(prev));
          });
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
    return () => fetchData();
  }, [dispatch]);

  return <LocalBlock />;
}

export default LocalCovidData;
