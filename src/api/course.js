import { withAuth as req } from "api/handler";

const COURSES = "/Courses";

export const getCoursesAll = function (search, unitCount, pageSize, page) {
	return req.get(
		`${COURSES}?search=${search}&unitCount=${unitCount}&PageSize=${pageSize}&Page=${page}`
	);
};

export const postCourse = function (title, unitsCount) {
	return req.post(`${COURSES}`, { title, unitsCount });
};

export const getCourse = function (id) {
	return req.get(`${COURSES}/${id}`);
};

export const updateCourse = function (id, title, unitsCount) {
	return req.put(`${COURSES}/${id}`, { title, unitsCount });
};

export const deleteCourse = function (id) {
	return req.delete(`${COURSES}/${id}`);
};

export const getCourseTimeTablesAll = function (id, pageSize, page) {
	return req.get(
		`${COURSES}/${id}/TimeTables?PageSize=${pageSize}&Page=${page}`
	);
};

export const getCourseMastersAll = function (id, pageSize, page) {
	return req.get(
		`${COURSES}/${id}/Masters?PageSize=${pageSize}&Page=${page}`
	);
};

export const postCourseChoose = function (id) {
	return req.post(
		`${COURSES}/${id}/Choose`
	);
};