// 세계 각 나라의 API 데이터를 위한 상태 관리
import { createAction, handleActions } from 'redux-actions';

const WORLD_LOCAL = 'worldLocal/WORLD_LOCAL';
const PREV_WORLD_LOCAL = 'worldLocal/PREV_WORLD_LOCAL';

export const worldMap = createAction(WORLD_LOCAL, (local) => local);
export const prevWorldMap = createAction(PREV_WORLD_LOCAL, (prev) => prev);

const initialState = {
  array: [],
  prevArray: [],
};

const worldLocal = handleActions(
  {
    [WORLD_LOCAL]: (state, action) => ({
      ...state,
      array: action.payload,
    }),
    [PREV_WORLD_LOCAL]: (state, action) => ({
      ...state,
      prevArray: action.payload,
    }),
  },
  initialState
);

export default worldLocal;
