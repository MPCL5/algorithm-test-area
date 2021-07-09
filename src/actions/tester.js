import { RESET_TESTER, SUCCESS, ERROR } from "constants/ActionTypes";
import {
  BADE_RESPONSE,
  INVALID_DATA,
  MISSING_PROPERTY,
} from "constants/ErrorTypes";

export const resetTester = () => {
  return { type: RESET_TESTER };
};

export const addBadResError = (api, message = "") => {
  return { type: ERROR, payload: { type: BADE_RESPONSE, api, message } };
};

export const addMissingPropError = (api, prop, message = "") => {
  return {
    type: ERROR,
    payload: { type: MISSING_PROPERTY, api, prop, message },
  };
};

export const addInvalidData = (api, prop, message = "") => {
  return {
    type: ERROR,
    payload: { type: INVALID_DATA, api, prop, message },
  };
};

export const addSuccess = (api, message = "") => {
  return {
    type: SUCCESS,
    payload: { api, message },
  };
};
