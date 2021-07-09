import { withAuth as req } from "api/handler";

const BELLS = "/Bells";

/**
 * @returns promise
 */
export const getBellsAll = function () {
	return req.get(`${BELLS}`);
};

/**
 * @returns promise
 * @param {string} label label
 * @param {string} bellOfDay bell of day
 */
export const postBell = function (label, bellOfDay) {
	return req.post(`${BELLS}`, { label, bellOfDay });
};

/**
 * @returns promise
 * @param {string} id id
 */
export const getBell = function (id) {
	return req.get(`${BELLS}/${id}`);
};

/**
 * @returns promise
 * @param {string} id id
 * @param {string} label label
 * @param {string} bellOfDay bell of day
 */
export const updateBell = function (id, label, bellOfDay) {
	return req.put(`${BELLS}/${id}`, { label, bellOfDay });
};

/**
 * @returns promise
 * @param {string} id id
 */
export const deleteBell = function (id) {
	return req.delete(`${BELLS}/${id}`);
};
