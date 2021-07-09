import { withAuth as req } from "api/handler";

const DAYS = "/Days";

export const getDaysAll = function (pageSize, page) {
	return req.get(`${DAYS}?PageSize=${pageSize}&Page=${page}`);
};

export const postDay = function (label, dayOfWeek) {
	return req.post(`${DAYS}`, { label, dayOfWeek });
};

export const getDay = function (id) {
	return req.get(`${DAYS}/${id}`);
};

export const updateDay = function (id, label, dayOfWeek) {
	return req.put(`${DAYS}/${id}`, { label, dayOfWeek });
};

export const deleteDay = function (id) {
	return req.delete(`${DAYS}/${id}`);
};
