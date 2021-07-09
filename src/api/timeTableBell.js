import { withAuth as req } from "api/handler";

const TIME_TABLE_BELLS = "/TimeTableBells";

export const getTimeTableBellsAll = function (pageSize, page) {
	return req.get(`${TIME_TABLE_BELLS}?PageSize=${pageSize}&Page=${page}`);
};

export const postTimeTableBells = function (dayId, bellId, timeTableId) {
	return req.post(`${TIME_TABLE_BELLS}`, { dayId, bellId, timeTableId });
};

export const getTimeTableBell = function (id) {
	return req.get(`${TIME_TABLE_BELLS}/${id}`);
};

export const deleteTimeTableBell = function (id) {
	return req.delete(`${TIME_TABLE_BELLS}/${id}`);
};
