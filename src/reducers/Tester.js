import { RESET_TESTER, SUCCESS, ERROR, SET_TOTAL } from "constants/ActionTypes";

const INITIAL_STATE = {
  total: 0,
  passed: 0,
  testedItems: [],
};

const TesterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_TESTER:
      return INITIAL_STATE;

    case SET_TOTAL:
      return { ...state, total: action.payload };

    case SUCCESS:
      return {
        ...state,
        testedItems: [...state.testedItems, { ...action.payload, isRequestOk: true }],
        passed: state.passed + 1,
      };

    case ERROR:
      return {
        ...state,
        testedItems: [...state.testedItems, { ...action.payload, isRequestOk: false }],
      };

    default:
      return state;
  }
};

export default TesterReducer;
