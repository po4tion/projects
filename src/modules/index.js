import { combineReducers } from 'redux';
import chartType from './chartType';
import chartData from './chartData';
import bgColor from './bgColor';
import date from './date';
import differ from './differ';
import month from './month';
import worldValue from './worldValue';

const rootReducer = combineReducers({
  chartType,
  chartData,
  bgColor,
  date,
  differ,
  month,
  worldValue,
});

export default rootReducer;
