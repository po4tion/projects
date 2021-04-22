// 일별, 월별 카테고리를 통해 그래프를 변경하기 위한 상태 관리
import { createAction, handleActions } from 'redux-actions';

const CHANGE_TYPE_DAY = 'chartType/CHANGE_TYPE_DAY';
const CHANGE_TYPE_MONTH = 'chartType/CHANGE_TYPE_MONTH';

export const changeTypeDay = createAction(CHANGE_TYPE_DAY);
export const changeTypeMonth = createAction(CHANGE_TYPE_MONTH);

const initialState = {
  type: 'day',
};

const chartType = handleActions(
  {
    [CHANGE_TYPE_DAY]: (_, __) => ({
      type: 'day',
    }),
    [CHANGE_TYPE_MONTH]: (_, __) => ({
      type: 'month',
    }),
  },
  initialState
);

export default chartType;
