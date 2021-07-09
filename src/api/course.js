import req from "api/handler";

const COURSES = "/Courses";

export const getCoursesAll = function (
  search,
  unitCount,
  PageSize,
  Page,
  config = {}
) {
  return req.get(COURSES, {
    params: { search, unitCount, PageSize, Page },
    ...config,
  });
};

export const postCourse = function (title, unitsCount, config = {}) {
  return req.post(`${COURSES}`, { title, unitsCount }, { ...config });
};

export const getCourse = function (id, config = {}) {
  return req.get(`${COURSES}/${id}`, { ...config });
};

export const updateCourse = function (id, title, unitsCount, config = {}) {
  return req.put(`${COURSES}/${id}`, { title, unitsCount }, { ...config });
};

export const deleteCourse = function (id, config = {}) {
  return req.delete(`${COURSES}/${id}`, { ...config });
};

export const getCourseTimeTablesAll = function (
  id,
  PageSize,
  Page,
  config = {}
) {
  return req.get(`${COURSES}/${id}/TimeTables`, {
    params: { PageSize, Page },
    ...config,
  });
};

export const getCourseMastersAll = function (id, PageSize, Page, config = {}) {
  return req.get(`${COURSES}/${id}/Masters`, {
    params: { PageSize, Page },
    ...config,
  });
};

export const postCourseChoose = function (id, config = {}) {
  return req.post(`${COURSES}/${id}/Choose`, {}, { ...config });
};
