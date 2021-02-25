import { createAction, handleActions } from 'redux-actions';

const MON = 'date/MON';
const TUE = 'date/TUE';
const WED = 'date/WED';
const THUR = 'date/THUR';
const FRI = 'date/FRI';
const SAT = 'date/SAT';
const SUN = 'date/SUN';

export const mon = createAction(MON, (mon) => mon);
export const tue = createAction(TUE, (tue) => tue);
export const wed = createAction(WED, (wed) => wed);
export const thur = createAction(THUR, (thur) => thur);
export const fri = createAction(FRI, (fri) => fri);
export const sat = createAction(SAT, (sat) => sat);
export const sun = createAction(SUN, (sun) => sun);

const initialState = {
  monday: 0,
  tuesday: 0,
  wednesday: 0,
  thursday: 0,
  friday: 0,
  saturday: 0,
  sunday: 0,
};

const date = handleActions(
  {
    [MON]: (state, action) => ({
      ...state,
      monday: action.payload,
    }),
    [TUE]: (state, action) => ({
      ...state,
      tuesday: action.payload,
    }),
    [WED]: (state, action) => ({
      ...state,
      wednesday: action.payload,
    }),
    [THUR]: (state, action) => ({
      ...state,
      thursday: action.payload,
    }),
    [FRI]: (state, action) => ({
      ...state,
      friday: action.payload,
    }),
    [SAT]: (state, action) => ({
      ...state,
      saturday: action.payload,
    }),
    [SUN]: (state, action) => ({
      ...state,
      sunday: action.payload,
    }),
  },
  initialState
);

export default date;
