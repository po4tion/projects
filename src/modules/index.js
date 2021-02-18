import { combineReducers } from 'redux';
import detail from './detail';
import chartType from './chartType';
import chartData from './chartData';
import bgColor from './bgColor';

const rootReducer = combineReducers({
  detail,
  chartType,
  chartData,
  bgColor,
});

export default rootReducer;
