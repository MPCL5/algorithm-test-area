import req from "api/handler";

const TIME_TABLES = "/TimeTables";

export const getTimeTablesAll = function (
  StudentId,
  CourseId,
  MasterId,
  PageSize,
  Page,
  config = {}
) {
  return req.get(TIME_TABLES, {
    params: { StudentId, CourseId, MasterId, PageSize, Page },
    ...config,
  });
};

export const getTimeTable = function (id, config = {}) {
  return req.get(`${TIME_TABLES}/${id}`, { ...config });
};

export const postTimeTableChoose = function (id, config = {}) {
  return req.post(`${TIME_TABLES}/${id}/Choose`, {}, { ...config });
};

export const postStartProcess = function (maxClassPerBell, config = {}) {
  return req.post(
    `${TIME_TABLES}/StartProcess?maxClassPerBell=${maxClassPerBell}`,
    {},
    { ...config }
  );
};
