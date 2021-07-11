import { addBadResError, addSuccess } from "actions";
import axios from "axios";
import { formApiName } from "utils/formApiName";
import store from "../store";

const BASE_URL = `${process.env.REACT_APP_DOMAIN}`;

const axiosIns = axios.create({
  baseURL: BASE_URL,
});

// axios event handlers.
const beforRequest = (config) => {
  return config;
};

const afterResponse = (res) => {
  if (res.config.haveError)
    store.dispatch(addBadResError(formApiName(res.config), res.config.message));
  // else store.dispatch(addSuccess(formApiName(res.config), res.config.message));

  return res;
};

const errorHandler = (error) => {
  if (!error.config.haveError) {
    store.dispatch(
      addBadResError(formApiName(error.config), error.config.message)
    );
    return Promise.reject(error);
  } else
    store.dispatch(addSuccess(formApiName(error.config), error.config.message));
};

const setApiToken = (token) => {
  if (!!token) axiosIns.defaults.headers["Authorization"] = token;
  else delete axiosIns.defaults.headers["Authorization"];
};

const setBaseURL = (url) => {
  axiosIns.defaults.baseURL = url;
};

// set the configs.
axiosIns.interceptors.response.use(afterResponse, errorHandler);
axiosIns.interceptors.request.use(beforRequest);

export default axiosIns;
export { setApiToken, setBaseURL };
