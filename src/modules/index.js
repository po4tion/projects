import { combineReducers } from 'redux';
import chartType from './chartType';
import chartData from './chartData';
import bgColor from './bgColor';
import date from './date';
import differ from './differ';
import month from './month';
import worldValue from './worldValue';
import worldLocal from './worldLocal';
import worldDay from './worldDay';
import worldMonth from './worldMonth';
import internalLocal from './internalLocal';

const rootReducer = combineReducers({
  chartType,
  chartData,
  bgColor,
  date,
  differ,
  month,
  worldValue,
  worldLocal,
  worldDay,
  worldMonth,
  internalLocal,
});

export default rootReducer;
