import { addBadResError, addSuccess } from "actions";
import axios from "axios";
import store from "../store";

const BASE_URL = `${process.env.REACT_APP_DOMAIN}/api`;

const axiosIns = axios.create({
  baseURL: BASE_URL,
});

// axios event handlers.
const beforRequest = (config) => {
  return config;
};

const afterResponse = (res) => {
  if (res.config.haveError)
    store.dispatch(addBadResError(formApiName(res.config)));
  else store.dispatch(addSuccess(formApiName(res.config)));

  return res;
};

const errorHandler = (error) => {
  if (!error.config.haveError)
    store.dispatch(addBadResError(formApiName(error.config)));
  else store.dispatch(addSuccess(formApiName(error.config)));

  return Promise.reject(error);
};

const setApiToken = (token) => {
  if (!!token) axiosIns.defaults.headers["Authorization"] = `Bearer ${token}`;
  else delete axiosIns.defaults.headers["Authorization"];
};

const setBaseURL = (url) => {
  axiosIns.defaults.baseURL = url;
};

const formApiName = (config) => {
  return `${config.method.toLocaleUpperCase()} - ${config.url}`;
};

// set the configs.
axiosIns.interceptors.response.use(afterResponse, errorHandler);
axiosIns.interceptors.request.use(beforRequest);

export default axiosIns;
export { setApiToken, setBaseURL };
