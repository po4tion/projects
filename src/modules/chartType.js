// chart.js의 option 값(decide, death ...etc)에 해당하는 그래프를 보여주기 위한 상태 관리
import { createAction, handleActions } from 'redux-actions';

const CHANGE_TYPE_DAY = 'chartType/CHANGE_TYPE_DAY';
const CHANGE_TYPE_MONTH = 'chartType/CHANGE_TYPE_MONTH';
const CHANGE_TYPE_OPTION = 'chartType/CHANGE_TYPE_OPTION';

export const changeTypeDay = createAction(CHANGE_TYPE_DAY);
export const changeTypeMonth = createAction(CHANGE_TYPE_MONTH);
export const changeTypeOption = createAction(
  CHANGE_TYPE_OPTION,
  (option) => option
);

const initialState = {
  type: 'day',
  option: 'decide',
};

const chartType = handleActions(
  {
    [CHANGE_TYPE_DAY]: (state, __) => ({
      ...state,
      type: 'day',
    }),
    [CHANGE_TYPE_MONTH]: (state, __) => ({
      ...state,
      type: 'month',
    }),
    [CHANGE_TYPE_OPTION]: (state, action) => ({
      ...state,
      option: action.payload,
    }),
  },
  initialState
);

export default chartType;
