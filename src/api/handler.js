import axios from "axios";
import { store } from "reducers/store";

const BASE_URL = `https://${process.env.REACT_APP_DOMAIN}/api`;

const withoutAuth = axios.create({
	baseURL: BASE_URL,
});

const withAuth = axios.create({
	baseURL: BASE_URL,
});

// axios event handlers.
const beforRequest = (config) => {
	return config;
};

const afterResponse = (response) => {
	return response;
};

const errorHandler = (error) => {
	return Promise.reject(error);
};

function listener() {
	const storeValues = store.getState();
	const {
		auth: { token },
	} = storeValues;

	withAuth.defaults.headers["Authorization"] = `Bearer ${token}`;
	withAuth.defaults.headers["Access-Control-Allow-Origin"] = "*";
}

// set the configs.
withAuth.interceptors.response.use(afterResponse, errorHandler);
withAuth.interceptors.request.use(beforRequest);

withoutAuth.interceptors.response.use(afterResponse, errorHandler);
withoutAuth.interceptors.request.use(beforRequest);

store.subscribe(listener); // attach the listener.

export default withoutAuth;
export { withAuth, withoutAuth };
