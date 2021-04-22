// 다크모드 설정을 위한 상태관리
import { createAction, handleActions } from 'redux-actions';

const CHANGE_TYPE_SUN = 'bgColor/CHANGE_TYPE_SUN';
const CHANGE_TYPE_MOON = 'bgColor/CHANGE_TYPE_MOON';

export const changeTypeSun = createAction(CHANGE_TYPE_SUN);
export const changeTypeMoon = createAction(CHANGE_TYPE_MOON);

const initialState = {
  type: 'sun',
};

const bgColor = handleActions(
  {
    [CHANGE_TYPE_SUN]: (_, __) => ({
      type: 'sun',
    }),
    [CHANGE_TYPE_MOON]: (_, __) => ({
      type: 'moon',
    }),
  },
  initialState
);

export default bgColor;
