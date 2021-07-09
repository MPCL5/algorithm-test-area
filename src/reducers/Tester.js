import { RESET_TESTER, SUCCESS, ERROR } from "constants/ActionTypes";

const INITIAL_STATE = {
  passed: 0,
  testedItems: [],
};

const TesterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_TESTER:
      return INITIAL_STATE;

    case SUCCESS:
      return {
        ...state,
        testedItems: [...state.testedItems, { ...action.payload }],
        passed: state.passed + 1,
      };

    case ERROR:
      return {
        ...state,
        testedItems: [...state.testedItems, { ...action.payload }],
      };

    default:
      return state;
  }
};

export default TesterReducer;
