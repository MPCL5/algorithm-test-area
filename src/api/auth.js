import {withoutAuth as req} from "api/handler";

const AUTH = "/Auth";

/**
 * @returns promise
 * @param {string} code code
 * @param {string} password password
 */
export const login = function (code, password) {
	return req.post(`${AUTH}/Login`, { code, password });
};
