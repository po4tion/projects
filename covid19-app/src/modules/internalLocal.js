// 국내 각 지역에 해당하는 값들 위한 상태 관리
import { createAction, handleActions } from 'redux-actions';

const INTERNAL_LOCAL = 'internalLocal/INTERNAL_LOCAL';
const PREV_INTERNAL_LOCAL = 'internalLocal/PREV_INTERNAL_LOCAL';

export const internalMap = createAction(INTERNAL_LOCAL, (local) => local);
export const prevInternalMap = createAction(
  PREV_INTERNAL_LOCAL,
  (prev) => prev
);

const initialState = {
  array: [],
  prevArray: [],
};

const internalLocal = handleActions(
  {
    [INTERNAL_LOCAL]: (state, action) => ({
      ...state,
      array: action.payload,
    }),
    [PREV_INTERNAL_LOCAL]: (state, action) => ({
      ...state,
      prevArray: action.payload,
    }),
  },
  initialState
);

export default internalLocal;
