import { combineReducers } from 'redux';
import detail from './detail';
import chartType from './chartType';

const rootReducer = combineReducers({
  detail,
  chartType,
});

export default rootReducer;
