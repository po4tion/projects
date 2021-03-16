import { combineReducers } from 'redux';
import chartType from './chartType';
import chartData from './chartData';
import bgColor from './bgColor';
import date from './date';
import differ from './differ';
import month from './month';

const rootReducer = combineReducers({
  chartType,
  chartData,
  bgColor,
  date,
  differ,
  month,
});

export default rootReducer;
