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
    [CHANGE_TYPE_DAY]: (_, __) => ({
      type: 'day',
    }),
    [CHANGE_TYPE_MONTH]: (_, __) => ({
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
