import req from "api/handler";

const BELLS = "/Bells";

/**
 * @returns promise
 */
export const getBellsAll = function (PageSize, Page, config = {}) {
  return req.get(`${BELLS}`, { params: { PageSize, Page }, ...config });
};

/**
 * @returns promise
 * @param {string} label label
 * @param {string} bellOfDay bell of day
 */
export const postBell = function (label, bellOfDay, config = {}) {
  return req.post(`${BELLS}`, { label, bellOfDay }, { ...config });
};

/**
 * @returns promise
 * @param {string} id id
 */
export const getBell = function (id, config = {}) {
  return req.get(`${BELLS}/${id}`, { ...config });
};

/**
 * @returns promise
 * @param {string} id id
 * @param {string} label label
 * @param {string} bellOfDay bell of day
 */
export const updateBell = function (id, label, bellOfDay, config = {}) {
  return req.put(`${BELLS}/${id}`, { label, bellOfDay }, { ...config });
};

/**
 * @returns promise
 * @param {string} id id
 */
export const deleteBell = function (id, config = {}) {
  return req.delete(`${BELLS}/${id}`, { ...config });
};
