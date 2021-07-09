import { withAuth as req } from "api/handler";

const TIME_TABLES = "/TimeTables";

export const getTimeTablesAll = function (
	studentId,
	courseId,
	masterId,
	pageSize,
	page
) {
	return req.get(
		`${TIME_TABLES}?StudentId=${studentId}&CourseId=${courseId}&MasterId=${masterId}&PageSize=${pageSize}&Page=${page}`
	);
};

export const getTimeTable = function (id) {
	return req.get(`${TIME_TABLES}/${id}`);
};

export const postTimeTableChoose = function (id) {
	return req.post(`${TIME_TABLES}/${id}/Choose`);
};

export const postStartProcess = function (maxClassPerBell) {
	return req.post(`${TIME_TABLES}/StartProcess?maxClassPerBell=${maxClassPerBell}`);
};