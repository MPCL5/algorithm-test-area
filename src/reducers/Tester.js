import { RESET_TESTER, SUCCESS, ERROR } from "constants/ActionTypes";

const INITIAL_STATE = {
  tested: 0,
  error: [],
  successes: [],
};

const TesterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_TESTER:
      return INITIAL_STATE;

    case SUCCESS:
      return {
        ...state,
        successes: [...state.successes, { ...action.payload }],
        tested: state.tested + 1,
      };

    case ERROR:
      return {
        ...state,
        error: [...state.error, { ...action.payload }],
        tested: state.tested + 1,
      };

    default:
      return state;
  }
};

export default TesterReducer;
