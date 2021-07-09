import req from "api/handler";

const DAYS = "/Days";

export const getDaysAll = function (PageSize, Page, config = {}) {
  return req.get(DAYS, { params: { PageSize, Page }, ...config });
};

export const postDay = function (label, dayOfWeek, config = {}) {
  return req.post(`${DAYS}`, { label, dayOfWeek }, { ...config });
};

export const getDay = function (id, config = {}) {
  return req.get(`${DAYS}/${id}`, { ...config });
};

export const updateDay = function (id, label, dayOfWeek, config = {}) {
  return req.put(`${DAYS}/${id}`, { label, dayOfWeek }, { ...config });
};

export const deleteDay = function (id, config = {}) {
  return req.delete(`${DAYS}/${id}`, { ...config });
};
