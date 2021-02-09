import { createAction, handleActions } from 'redux-actions';

const OPEN_ACTION = 'detail/OPEN_ACTION';

export const openAction = createAction(OPEN_ACTION);

const initialState = {
  open: false,
};

const detail = handleActions(
  {
    [OPEN_ACTION]: (state, _) => ({
      open: !state.open,
    }),
  },
  initialState
);

export default detail;
