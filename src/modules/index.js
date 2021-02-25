import { combineReducers } from 'redux';
import detail from './detail';
import chartType from './chartType';
import chartData from './chartData';
import bgColor from './bgColor';
import date from './date';

const rootReducer = combineReducers({
  detail,
  chartType,
  chartData,
  bgColor,
  date,
});

export default rootReducer;
