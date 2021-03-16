import { combineReducers } from 'redux';
import detail from './detail';
import chartType from './chartType';
import chartData from './chartData';
import bgColor from './bgColor';
import date from './date';
import differ from './differ';
import month from './month';

const rootReducer = combineReducers({
  detail,
  chartType,
  chartData,
  bgColor,
  date,
  differ,
  month,
});

export default rootReducer;
