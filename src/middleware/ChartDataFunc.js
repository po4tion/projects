// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import dotenv from 'dotenv';

// export function ChartDataFunc(result) {
//   dotenv.config();

//   const API_KEY = process.env.REACT_APP_SERVICE_KEY;

//   let year = result.getFullYear();
//   let month = result.getMonth();
//   let date = result.getDate();

//   if (month + 1 < 10) {
//     month = '0' + String(month + 1);
//   } else {
//     month = String(month + 1);
//   }

//   if (date < 10) {
//     date = '0' + String(date);
//   } else {
//     date = String(date);
//   }

//   const sum = String(year) + month + date;

//   const covidUrl = `/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${sum}&endCreateDt=${sum}`;

//   const [coronic, setCoronic] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await axios
//           .get(covidUrl)
//           .then((res) => res.data)
//           .then((data) => {
//             setCoronic({
//               decideCnt: data.response.body.items.item[0].decideCnt,
//               deathCnt: data.response.body.items.item[0].deathCnt,
//               clearCnt: data.response.body.items.item[0].clearCnt,
//               examCnt: data.response.body.items.item[0].examCnt,
//               careCnt: data.response.body.items.item[0].careCnt,
//               accDefRate: data.response.body.items.item[0].accDefRate,
//             });
//           });
//       } catch (e) {
//         console.log(e);
//       }
//     };

//     fetchData();
//   }, [coronic]);

//   return coronic;
// }
